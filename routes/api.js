var fs = require('fs');

var express = require('express');
var router = express.Router();
var Employee = require('../models/employee.js');
var Location = require('../models/location.js');
var UploadedPic = require('../models/uploadpic.js');
var UploadedDoc = require('../models/uploaddoc.js');

//var multer = require('multer');
var path = require('path');

//for get request of MongoDB
// var MongoClient = require('mongodb').MongoClient;
// var uri = 'mongodb://raju:datapro9@ds249818.mlab.com:49818/';

let emailid, phonenumber, filenameprefix, onlyfilename, finalfilenamewithext, filepath;

// var storageFile = multer.diskStorage({
//
//     destination: (req, file, cb) => {
//       cb(null, 'dataprofiles');
//     },
//     //cb: callback function
//     filename: (req, file, cb) => {
//       emailid = req.body.email;
//       phonenumber = req.body.phone;
//       onlyfilename = req.body.onlyfilename;
//       var cdate = new Date();
//       filenameprefix  = emailid + "-" + phonenumber + "-" + cdate.getDate() + "-" + (cdate.getMonth() + 1 ) + "-" + cdate.getFullYear() + "-" + cdate.getHours() + "-" + cdate.getMinutes() + "-" + cdate.getSeconds();
//       finalfilenamewithext = filenameprefix + "-" + onlyfilename;
//       cb(null, finalfilenamewithext);
//     }
// });

// var storagePic = multer.diskStorage({
//
//     destination: (req, file, cb) => {
//       cb(null, 'dataproimages');
//     },
//     //cb: callback function
//     filename: (req, file, cb) => {
//       var phonenumber = req.body.phone;
//       var emailid = req.body.email;
//       var cdate = new Date();
//       filepath  = emailid + "-" + phonenumber + "-" + cdate.getDate() + "-" + (cdate.getMonth() + 1 ) + "-" + cdate.getFullYear() + "-" + cdate.getHours() + "-" + cdate.getMinutes() + "-" + cdate.getSeconds() + ".jpg";
//
//       cb(null, filepath);
//     }
// });

//SETTING UP ROUTES - that is to define the application end points (URIs) and set up how the application responds to client requests.


router.get('/executives', function(req, res){
  res.send('Hai Sai Srinivas Sir, this is Datapro Executive Application version2!');
});  //end of get route

//to add a new employee Document in the MongoDB database
router.post('/executives', function(req, res){
  //console.log(req.body);
   var emp = new Employee({
     ename : req.body.employeeName,
     email : req.body.employeeEmail,
     phone : req.body.employeePhone,
     state : req.body.employeeState,
     desig : req.body.employeeDesig
   });

   emp.save(function(err){
      if(err){
          console.log('Error during registration:' + err.message);
          res.json({"serverresult" : err.message});
      }

      else{
        console.log('Registration has been successful!');
        res.json({"serverresult" : "Successfully Registered!"});
      }
   });
});

router.post('/mylocation', function(req, res){
  //console.log(req.body);

   var location = new Location({
     email : req.body.employeeEmail,
     phone   : req.body.employeePhone,
     latitude : req.body.latitude,
     longitude : req.body.longitude,
     ldate : req.body.ldate,
     ltime : req.body.ltime   //date and time separated for ease of Analytics and delete data by from and to date
   });

   location.save(function(err){
        res.json({"serverlocresult" : "Successfully Sent your location data!"});
   });
});

router.post('/myuploadedpic', function(req, res){

  //FOR WRITING THE DECODED IMAGE - SUCCESS
   //var buffer = Buffer.from(req.body.photo, 'base64');
   //To decode base64 encoded string back to binary
   //Here "buffer" is a base64String

   //Saving only the photo in a file, for easy browsing of Photos through File Explorer
   //var cdate = new Date();
   //var filename  = req.body.email + "-" + cdate.getDate() + "-" + (cdate.getMonth() + 1 ) + "-" + cdate.getFullYear() + "-" + cdate.getHours() + "-" + cdate.getMinutes() + "-" + cdate.getSeconds();
   //prefixing with email id for ease of Analytics
   // fs.writeFile("dataproimages/" +  filename + '.png', buffer, {encoding: 'base64'}, function(err) {
   //   if(err){
   //     console.log('Sorry, Image file could not be saved! ' + err);
   //     res.json({"serverpicresult" : "Failed Saving the Pic!"});
   //   }
   //   else {
   //     console.log('Image file saved successfully! : ' + filename + ".png");
   //     res.json({"serverpicresult" : "Successfully Saved the Pic!"});
   //   }
   // });

   //FOR WRITING THE FULL-SIZE PICTURE
   // var upload2 = multer({
   //   storage: storagePic
   // }).single('image')
   // upload2(req, res, function(err) {
   //
   //   if(err){
   //     console.log('Image uploading failed' + err);
   //     res.send("Image uploading failed" + err);
   //   }
   //   else{
   //     console.log('Image is saved to a file in Server');
       //now writing the same to MongoDB database

       // var uploadedPic = new UploadedPic({
       //   email : req.body.email,
       //   phone   : req.body.phone,
       //   photoDescription : req.body.imageDescription,
       //   picDate : req.body.currentDate,
       //   picTime : req.body.currentTime   //date and time separated for ease of Analytics and delete data by from and to date
       // });

       //Saving the picture details in the MongoDB Database
       //console.log(req.body);

        var uploadedPic = new UploadedPic({
          email : req.body.email,
          phone   : req.body.phone,
          picDate : req.body.currentDate,
          picTime : req.body.currentTime,
          photoDescription :   req.body.photoDescription
        });

       uploadedPic.save(function(err){
          if(err){
            console.log('Image details could not be saved to database');
            res.json({"serverpicresult" : "Failed Saving the Pic in the Database!"});
          }else{
            console.log('Image details saved to database');
            res.json({"serverpicresult" : "Pic saved in the Database Successfully!"});
            }
       });
});  //end of route

router.post('/myuploadeddoc', function(req, res){

    //Then saving in a file
      // var upload = multer({
    	// 	storage: storageFile
    	// }).single('uploaded_file')
    	// upload(req, res, function(err) {
      //
      //   if(err){
      //     console.log('File uploading failed' + err);
      //     res.send("File uploading failed" + err);
      //   }
        // else{
        //   console.log('File is uploaded');
        //
        //   var uploadedDoc = new UploadedDoc({
        //     email : req.body.email,
        //     phone : req.body.phone,
        //     finalfilename : req.body.onlyfilename,
        //     docDate : req.body.currentDate,
        //     docTime : req.body.currentTime   //date and time separated for ease of Analytics and delete data by from and to date
        //   });
          //Saving the document data in the MongoDB Database

          //console.log(req.body);

           var uploadedDoc = new UploadedDoc({
             email : req.body.email,
             phone   : req.body.phone,
             docDate : req.body.currentDate,
             docTime : req.body.currentTime,
             finalfilename :   req.body.fileName
           });

          uploadedDoc.save(function(err){
             if(err){
               console.log('Failed saving File details in the Database!');
               res.json({"serverdocresult" : "failed in saving doc"});
             }else{
               console.log('File details saved in the Database Successfully!');
               res.json({"serverdocresult" : "Doc saved in the Database Successfully!"});
               }
          });
});  //end of route

//now exporting the above route to be used in the main index.js file
module.exports = router;
