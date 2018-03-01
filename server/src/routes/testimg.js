var AWS = require('aws-sdk');
var fs = require("fs");
var s3 = new AWS.S3();

var bucketName = 'gc-2';

//createBucket();
listBuckets();
//deleteBucket();
//fileUpload();
//putObject();
//getObject();
//listObjects();
//downloadFile();
//copyObject();
//deleteObject();
//deleteObjects();

console.log("Program execution done!!!!!!!!!")

function createBucket(){
    s3.createBucket({Bucket: bucketName}, function(err, data) {        
        if (err) {        
           console.log("createBucket error :" + err);        
        } else {        
            console.log("Bucket Created:");
            console.dir(data);
        }        
    });    
}

function listBuckets(){
    s3.listBuckets(function(err,data){
        if(err) 
            console.log("Error while fetching data:" + err)
        else
        {
            console.log("List of objects :")
            console.dir(data)
            data.Buckets.forEach(item=>{
                console.log(item.Key + " date:"+ item.CreationDate);
            })

        }
    });
}

function deleteBucket(){
    //Write code to delete all the objects from bucket and then delete bucket.
    params = {Bucket: bucketName}
    s3.deleteBucket(params, function(err, data){
        if(err)
            console.log("Error in bucket deletion: " + err);
        else
            console.log("Bucket deleted successfuly");
    });
}

function fileUpload(){
    fs.readFile("c:/MyFiles/Test.txt", function(err,data){
        if(err)
            console.log("Error in file reading :"+ err);
        else
        {
            console.log("File read successfully :" + data);
            params = {Bucket:bucketName, Key:"Test.txt",Body:data};

            s3.putObject(params,function(err,data){
                if(err)
                    console.log("Error in putObject:"+ err);
                else
                {
                    console.log("Uploaded successfully. :")
                    console.dir(data);
                }
            });
        }
    });
}

function putObject(){
    params = {Bucket:bucketName, Key:"demo/Project.txt",Body:"learning aws-sdk with node js",Tagging: "Env=Dev&ProjectName=ABC"};
    
    s3.putObject(params,function(err,data){
        if(err)
            console.log("Error in putObject:"+ err);
        else
        {
            console.log("Uploaded successfully. :");
            console.dir(data);
        }
    });
}

function getObject(){
    params = {Bucket:bucketName, Key:"demo/Project.txt"};
    
    s3.getObject(params,function(err,data){
        if(err)
            console.log("Error in getObject:"+ err);
        else
        {
            console.log("Object retrived successfully. data:");
            console.log(data.Body.toString('utf8'));
        }
    });
}


function listObjects(){
    var params = {
        Bucket: bucketName, 
        MaxKeys: 2
    };

    s3.listObjects(params, function(err,data){
        if(err)
            console.log("Error in listing files:"+ err);
        else
        {
            console.log("Get list of objects :");
            data.Contents.forEach(element => {
                console.log(element.Key);
            }); 
        }
        console.dir(data);
    });
}

function downloadFile(){
    params = {Bucket:bucketName, Key:"demo/Project.txt"};
    
    s3.getObject(params,function(err,data){
        if(err)
            console.log("Error in getObject:"+ err);
        else
        {
            fs.writeFile("c:/myfiles/Test1234.txt",data.Body,'utf8',function(err,data){
                if(err)
                    console.log("Error in fiel write :" + err);
                else
                    console.log("File downloaded successfully.");
            })
        }
    });
}

function copyObject(){
    var destinationBucket = "gc-3";
    var params = {
    Bucket: destinationBucket, 
    CopySource: bucketName +"/demo/Project.txt", 
    Key: "demo/Project.txt"
    };
    s3.copyObject(params, function(err, data) {
        if (err) 
        console.log("Error in copying file: " + err);
        else
        {
        console.log("Ojbect get copied successfully:")
        console.dir(data);
        }
    });
}

function deleteObject(){
    var params = {
        Bucket: bucketName, 
        Key: "demo/Project.txt"
    };

    s3.deleteObject(params, function(err, data) {
        if (err) 
        console.log(err, err.stack);
        else     
        console.log("Object deleted successfully.");
    });
}

function deleteObjects(){
    var params = {
        Bucket: bucketName, 
        Delete:{
            Objects:[
                {Key: "Project.txt"}, 
                {Key: "Test.txt"}
            ], 
            Quiet: false
        }
    };

    s3.deleteObjects(params, function(err, data) {
        if (err) 
            console.log("Error in delete objects: " + err); 
        else     
        {
            console.log("All the provided objects get deleted:");
            console.dir(data);           
        }
    });
}