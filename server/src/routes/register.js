import { Router } from 'express'
import Table from '../table';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { makeHash } from "../../lib/utils/hash";

let router = Router();
let classTable = new Table('users');

router.post('/', (req, res) => {
    console.log('tried');
    makeHash(req.body.password).then(hash => {
        console.log(req.body);
        classTable
          .insert({
            email: req.body.email,
            username: req.body.username,
            password: hash
          })
          .then(results => {
            res.json(results);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500);
          });
      });
});

export default router;