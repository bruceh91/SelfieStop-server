import { Router } from 'express';
import passport from 'passport';
import Table from '../table';
import { makeHash } from "../utils/hash";

let router = Router();

let classTable = new Table('tokens');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, tok, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!tok) {
            return res.status(401).json(info);
        } else {
            return res.send(tok, 201);
        }
    })(req, res, next);
});

router.delete('/logout/:id', (req, res) => {
    classTable.delete(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get("/generate/:pw", (req, res, next) => {
    makeHash(req.params.pw)
        .then(hash => {
            res.send(hash);
        })
        .catch(err => {
            next(err);
        });
});

export default router;