import { Router } from 'express'
import Table from '../table';
import AWS from 'aws-sdk';
import fs from 'fs';
import { executeQuery } from '../config/db';
import piexif from 'piexifjs';
import lz from 'lz-string';
import b64toBlob from 'b64-to-blob';

let router = Router();
let imagesTable = new Table('images');
// let stopsTable = new Table('stops');

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




//POST IMAGE AND IMAGE DATA TO DB
// router.post('/', (req, res) => {

//     //////////   gets exif data
//     let exifObj = piexif.load(req.body.uri);
//     // console.log(exifObj);
//     //// latitude
//     let exifLat = (`${exifObj.GPS[2][0][0]}.${exifObj.GPS[2][1][0]}${exifObj.GPS[2][2][0]}`);
//     //// longitude
//     let exifLng = (`-${exifObj.GPS[4][0][0]}.${exifObj.GPS[4][1][0]}${exifObj.GPS[4][2][0]}`); /// have to write if statements for people to add negatives for other hemispheres
//     //// width
//     let exifW = exifObj.Exif[40962];
//     //// Height
//     let exifH = exifObj.Exif[40963];
//     //// Orientation
//     let exifOr = 0;
    
//     if (exifW >= exifH) {
//         exifOr = 1;
//     } else if (exifW < exifH) {
//         exifOr = 2;
//     } else if (exifW = exifH) {
//         exifOr = 3;
//     };

//     // console.log(`lat = ${exifLat}, lng = ${exifLng}, Height = ${exifH}, Width = ${exifW}, Orientation = ${exifOr}`);


//     var tagHolder = (`"${req.body.uri.split(',')[1]}"`)

//     // let byteChars = atob(req.body.uri);
//     // let byteNums = new Array(byteChars.length);
//     // for (var i = 0; i < byteChars.length; i++) {
//     //     byteNums[i] = byteChars.charCodeAt(i);
//     // }

//     // let byteArr = new Uint8Array(byteNumbs);
//     // let blob = new Blob([byteArray], {type: `image/${tagHolder}`})

//     // let blob = b64toBlob(req.body.uri, {type: `image/${tagHolder}`}) 



//     ///////// takes off beginning base64 tag
//     var dataHolder = (`"${req.body.uri.split(',')[1]}"`);
//     // console.log(dataHolder);

//     ///////// compresses data
//     // console.log("original size: " + dataHolder.length);
//     // let compressed = lz.compress(dataHolder);
//     // console.log("compressed size " + compressed.length);

//     //////// sends to database
//     let sql = `INSERT INTO images (image, lat, lng, height, width, orientation, userid, stopid, URL) VALUES (${dataHolder}, ${exifLat}, ${exifLng}, ${exifH}, ${exifW}, ${exifOr}, 31, 21, "wide")`;
//     executeQuery(sql, req)
// });



router.post('/', (req, res) => {
    console.log('image.js router post')



    //     //////////   gets exif data
    // let exifObj = piexif.load(req.body.uri);
    // // console.log(exifObj);
    // //// latitude
    // // let exifLat = (`${exifObj.GPS[2][0][0]}.${exifObj.GPS[2][1][0]}${exifObj.GPS[2][2][0]}`);
    // //// longitude
    // // let exifLng = (`-${exifObj.GPS[4][0][0]}.${exifObj.GPS[4][1][0]}${exifObj.GPS[4][2][0]}`); /// have to write if statements for people to add negatives for other hemispheres
    // //// width
    // let exifW = exifObj.Exif[40962];
    // //// Height
    // let exifH = exifObj.Exif[40963];
    // //// Orientation
    // let exifOr = 0;
    
    // if (exifW >= exifH) {
    //     exifOr = 1;
    // } else if (exifW < exifH) {
    //     exifOr = 2;
    // } else if (exifW = exifH) {
    //     exifOr = 3;
    // };

    // console.log(`lat = ${exifLat}, lng = ${exifLng}, Height = ${exifH}, Width = ${exifW}, Orientation = ${exifOr}`);



    // AWS.config.update({
    //     accessKeyId: process.env.AWS_ACCESSKEY,
    //     secretAccessKey: process.env.AWS_SECRET,
    //     "region": "us-east-2"
    // });

    // var s3 = new AWS.S3();

    // let imgId = new Date().getTime();
    // var extensionHolder = req.body.uri.split(`;`)[0].split(`/`);
    // var imageExtension = extensionHolder[1];

    // let buf = new Buffer(req.body.uri.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    // // console.log(req)

    // var params = {
    //     Bucket: 'selfietester',
    //     Key: `${imgId}.${imageExtension}`,
    //     Body: buf,
    //     ContentEncoding: 'base64',
    //     ContentType: `image/${imageExtension}`,
    //     ACL: 'public-read'
    // };
    // s3.putObject(params, function (err, res) {
    //     if (err) {
    //         console.log(err)
    //         console.log("Error uploading data: ", params);
    //     } else {
    //         console.log("Successfully uploaded data", params);
    //     }
    // });

//     router.post('/', (req, res) => {
//     console.log('stop.js router post')
//     stopsTable.insert(req.body)
//         .then((results) => {
//             res.json(results);
//         }).catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

    //////// sends to database
    console.log(`req.body       ${req.body.lat}`);
    // let sql = `INSERT INTO images (image, userid, stopid, URL) VALUES ("lolol", ${req.body.userId}, 21, "${imgURL}")`;
    // console.log(sql);
    // executeQuery(sql, req)
    // .then(res.send());
    res.send('yo', 201);

    // var b64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABA......";
    // var bin = atob(b64.split(',')[1]);
    // var exif = EXIF.readFromBinaryFile(new BinaryFile(bin));
    // alert(exif.Orientation);

                                                                
                                                                          
    // let sql = `INSERT INTO images (URL) VALUES (${imgId});`;  
    // executeQuery(sql, params)                                
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