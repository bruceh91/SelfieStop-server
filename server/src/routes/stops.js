import { Router } from 'express';
import Table from '../table';
import { executeQuery } from '../config/db';

let router = Router();
let stopsTable = new Table('stops');
let imagesTable = new Table('images');


//gets all stops with image
// router.get('/', (req, res) => {
//     console.log('get all stops');
//     let sql =
//         `select
//         i.image as image,
//         i.url as imageurl,
//        i.rating as imagerating,
//        i._created as imagecreated,
//        i.lat as imagelat,
//        i.lng as imagelng,
//        i.height as imageheight,
//        i.width as imagewidth,
//        i.orientation as orientation,
//        s.name as stop,
//        s.description as description,
//        s.city as city,
//        s.lat as stoplat,
//        s.lng as stoplng,
//        s.rating as stoprating,
//        u.firstname as uploadedby,
//        u2.firstname as stopsubmittedby
    
//     from userstops us
//         join images i on i.id=us.imageid
//        join stops s on s.id=us.stopid
//        join users u on u.id=us.userid
//        join users u2 on u2.id=s.userid;`;
//     executeQuery(sql)
//         .then((data) => {
//             res.json(data);
//         }).catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });



router.get('/', (req, res) => {
    console.log('get all web stops');
    stopsTable.getAll()
        .then((results) => {
            // console.log(results)
            res.json(results);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(err, 500);
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