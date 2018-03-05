import { Router } from 'express'
import Table from '../table';
import AWS from 'aws-sdk';
import fs from 'fs';
import { executeQuery } from '../config/db';

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

router.get('/:id?', (req, res) => {
    console.log('get 1 image')
    imagesTable.getOne(req.params.id)
        .then((results) => {
            res.json(results);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


router.post('/', (req, res) => {
    console.log('image.js router post')

    AWS.config.update({
        

        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRET,
        "region": "us-east-2"
    });

    var s3 = new AWS.S3();

    let imgId = new Date().getTime()

    var extensionHolder = req.body.image.split(`;`)[0].split(`/`);
    var imageExtension = extensionHolder[1];

    var params = {
        Bucket: 'selfietester',
        Key: `${imgId}`,
        Body: `${req.body.image}`,
        ContentEncoding: 'base64',
        ContentType: `image/${imageExtension}`,
        ACL: 'public-read'
    };
    s3.putObject(params, function (err, res) {
        if (err) {
            console.log("Error uploading data: ", err);
        } else {
            console.log("Successfully uploaded data   ", req.key);
        }
    });                                                            /////////////////////////
                                                                  //////    !!!      //////        
    // let sql = `INSERT INTO images (URL) VALUES (${imgId});`;  //////  IMPORTANT  //////
    // executeQuery(sql, params)                                //////      !!!    ////// 
});                                                            /////////////////////////

router.put('/:id', (req, res) => {
    console.log('update 1 image')
    imagesTable.update(req.params.id, req.body) ``
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