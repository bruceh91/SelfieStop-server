import {Router} from 'express'
import Table from '../table';

let router = Router();
let stopsTable = new Table('stops');

router.get('/', (req, res) => {
    console.log('get all stops');
    stopsTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/:id?', (req, res) => {
    console.log('get 1 stop')
    stopsTable.getOne(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log('stop.js router post')
    stopsTable.insert(req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    console.log('update 1 stop')
    stopsTable.update(req.params.id, req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    stopsTable.delete(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});



export default router;