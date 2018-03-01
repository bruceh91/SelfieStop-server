import {Router} from 'express'
import Table from '../table';

let router = Router();
let imagesTable = new Table('images');

router.get('/', (req, res) => {
    console.log('get all images');
    imagesTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get(`${process.env.IMG_URL}/test-stop.jpg`, (req, res) => {
    console.log('get 1 image')
    imagesTable.getOne(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// ${process.env.IMG_URL}

router.post('/', (req, res) => {
    console.log('image.js router post')
    imagesTable.insert(req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
    console.log('update 1 image')
    imagesTable.update(req.params.id, req.body)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    imagesTable.delete(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});



export default router;