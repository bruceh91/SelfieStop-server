import { Router } from 'express';
import Table from '../table';
import { executeQuery } from '../config/db';

let router = Router();
let stopsTable = new Table('stops');
let imagesTable = new Table('images');


//gets all stops with image
router.get('/', (req, res) => {
    console.log('get all stops');
    let sql =
        `select
        i.image as image,
        i.rating as imagerating,
        i.url as imageurl,
        i._created as imagecreated,
        s.name as stopname,
        s.description as description,
        s.city as city,
        s.lat as lat,
        s.lng as lng,
        s.rating as stoprating,
        u.firstname as uploadedby,
        u2.firstname as stopsubmittedby
     from userstops us
        join images i on i.id=us.imageid
        join stops s on s.id=us.stopid
        join users u on u.id=us.userid
        join users u2 on u2.id=s.userid;`;
    executeQuery(sql)
        .then((data) => {
            res.json(data);
            // console.log(JSON.stringify(data));
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