import { Router } from 'express'
import Table from '../table';
import AWS from 'aws-sdk';
import fs from 'fs';
import { executeQuery } from '../config/db';
import atob from 'atob';

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
    console.log('get 1 blog')
    imagesTable.getOne(req.params.id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// router.get('/:id?', (req, res) => {
//     console.log('get 1 image')

//     AWS.config.update({
//         accessKeyId: process.env.AWS_ACCESSKEY,
//         secretAccessKey: process.env.AWS_SECRET,
//         "region": "us-east-2"
//     });

//     var s3 = new AWS.S3();

//     s3.getObject({ Key: '1520291572736.jpeg' }, function (err, file) {
//         if (err) {
//             console.log(err)
//             console.log("Error getting data: ", file);
//         } else {
//             console.log("Successfully got data", file);
//         }
//         // $timeout(function () {
//         //     $scope.s3url = "data:image/jpeg;base64," + encode(file.Body);
//         // }, 1);
//     });

//     // function encode(data) {
//     //     var str = data.reduce(function (a, b) { return a + String.fromCharCode(b) }, '');
//     //     return btoa(str).replace(/.{76}(?=.)/g, '$&\n');
//     // }

//     // imagesTable.getOne(req.params.id)
//     //     .then((results) => {
//     //         res.json(results);
//     //     }).catch((err) => {
//     //         console.log(err);
//     //         res.sendStatus(500);
//     //     });
// });




//POST BASE64 IMAGE TO DB
router.post('/', (req, res) => {
    var dataHolder = (`"${req.body.uri.split(',')[1]}"`);
    console.log(dataHolder);
    let sql = `INSERT INTO images (image) VALUES (${dataHolder})`;
    executeQuery(sql, req)
});



// router.post('/', (req, res) => {
//     console.log('image.js router post')


//     console.log(`req.body       ${req.body.description}`);

//     AWS.config.update({
//         accessKeyId: process.env.AWS_ACCESSKEY,
//         secretAccessKey: process.env.AWS_SECRET,
//         "region": "us-east-2"
//     });

//     var s3 = new AWS.S3();

//     let imgId = new Date().getTime();
//     var extensionHolder = req.body.uri.split(`;`)[0].split(`/`);
//     var imageExtension = extensionHolder[1];

//     // let buf = new Buffer(req.body.uri.replace(/^data:image\/\w+;base64,/, ""), 'base64')

//     var params = {
//         Bucket: 'selfietester',
//         Key: `${imgId}.${imageExtension}`,
//         Body: `${req.body.uri}`,
//         ContentEncoding: 'base64',
//         ContentType: `image/${imageExtension}`,
//         ACL: 'public-read'
//     };
//     s3.putObject(params, function (err, res) {
//         if (err) {
//             console.log(err)
//             console.log("Error uploading data: ", params);
//         } else {
//             console.log("Successfully uploaded data", params);
//         }
//     });

    // var b64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABA......";
    // var bin = atob(b64.split(',')[1]);
    // var exif = EXIF.readFromBinaryFile(new BinaryFile(bin));
    // alert(exif.Orientation);

//     /////////////////////////
//     //////    !!!      //////        
//     // let sql = `INSERT INTO images (URL) VALUES (${imgId});`;  //////  IMPORTANT  //////
//     // executeQuery(sql, params)                                //////      !!!    ////// 
// });                                                            /////////////////////////

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