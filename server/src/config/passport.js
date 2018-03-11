import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../table';
import { encode, decode } from '../utils/tokens';
import { checkPassword } from "../utils/hash";

let usersTable = new Table('users');
let tokensTable = new Table('tokens');

let userID;

function configurePassport(app) {
    passport.use(
        new LocalStrategy(
          {
            usernameField: "email",
            passwordField: "password",
            session: false
          },
          (email, password, done) => {
            usersTable
              .find({ email })
              .then(results => results[0])
              .then(result => {
                if (result && result.password) {
                  userID = result.id;
                  console.log(`b      ${userID}`);
                  checkPassword(password, result.password)
                    .then(matches => {
                      if (matches) {
                        // password is correct
                        tokensTable.insert({
                            userid: result.id
                          }).then(idObj => encode(idObj.id))
                          .then(tokenVal => {
                            return done(null, { token: tokenVal, userId: userID });
                          });
                      } else {
                        // password is incorrect
                        return done(null, false, {
                          message: "pass"
                        });
                      }
                    }).catch(err => {
                      throw err;
                    });
                } else {
                  return done(null, false, { message: "email" });
                }
              }).catch(err => {
                return done(err);
              });
          }
        )
      );

    passport.use(new BearerStrategy((token, done) => {
        let tokenId = decode(token);
        if(!tokenId) {
            return done(null, false, { message: 'invalid token' })
        }
        tokensTable.getOne(tokenId)
        .then((tokenRecord) => {
            return usersTable.getOne(tokenRecord.userid);
        }).then((user) => {
            if (user) {
                delete user.password;
                return done(null, user);  // after this, req.user is set
            } else {
                return done(null, false, { message: 'Invalid token' });
            }
        }).catch((err) => {
            return done(err);
        });
    }));

    app.use(passport.initialize());
}

export default configurePassport;