var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var week1_model = require("./Model/Schema");
var week2_model = require("./Model/Schema2");

// Default Controller
router.get('/weekOne' , function ( req , res , next ) {
    console.log("hi");
    try {
        // Get All
        week1_model.find({})
            .then(json1 => {
                // If Empty, Seed Database, Else return data
                if (json1.length < 1) {
                    res.redirect('/createDatabase/1');
                } else {

                    week2_model.find({})
                        .then(json2 => {
                            // If Empty, Seed Database, Else return data
                            if (json2.length < 1) {
                                res.redirect('/createDatabase/2');
                            } else {

                                res.send({
                                    weekOneData: json1 ,
                                    weekTwoData: json2
                                });

                            }
                        });


                }
            });
    } catch (e) {
        throw e;
    }
});

// Seed Database
router.get('/createDatabase/:week' , function ( req , res , next ) {
    // Seed Database
    try {
        let hw;
        if (req.params.week == 1) {
            hw = new week1_model({
                    "Monday": ["Monday"] ,
                    "Tuesday": ["Tuesday"] ,
                    "Wednesday": ["Wednesday"] ,
                    "Thursday": ["Thursday"] ,
                    "Friday": ["Fridayg"] ,
                    "Saturday": ["Saturday"] ,
                    "Sunday": ["Sunday"] ,
                    "Date": Date.now() ,
                }
            );
        } else {
            var date = new Date();
            while (date.getDay() !== 1) {
                date.setDate(date.getDate() + 1);
            }
            hw = new week2_model({
                    "Monday": ["Monday"] ,
                    "Tuesday": ["Tuesday"] ,
                    "Wednesday": ["Wednesday"] ,
                    "Thursday": ["Thursday"] ,
                    "Friday": ["Friday"] ,
                    "Saturday": ["Saturday"] ,
                    "Sunday": ["Sunday"] ,
                    "Date": date ,
                }
            );
        }

        hw.save()
            .then(json => {
                // If Success, redirect to Fetch Data
                res.redirect("/weekOne");
            });
    } catch (e) {
        throw e;
    }
});

// Delete Database
router.delete("/deleteDatabase" , ( req , res , next ) => {
    try {
        // Get Week 2 Data
        week2_model.find({})
            .then(json2 => {

                // Update Week One Data
                const json = json2[0];

                // Delete Week 1
                week1_model.deleteMany({} , () => {

                    let newVal = new week1_model({
                        "Monday": json.Monday,
                        "Tuesday": json.Tuesday,
                        "Wednesday": json.Wednesday,
                        "Thursday": json.Thursday,
                        "Friday": json.Friday,
                        "Saturday": json.Saturday ,
                        "Sunday": json.Sunday,
                        "Date": json.Date ,
                    });
                    newVal.save()
                        .then(() => {
                            // Delete Week 2
                            week2_model.deleteMany({} , () => {

                                res.send("success");
                            })
                        })
                })
            });


    } catch (e) {
        throw e;
    }
});


// Save week One
router.post('/weekOne/save' , ( req , res , next ) => {
    try {
        // Save New Order
        let updatedWeek1 = new week1_model(req.body);
        week1_model.findOneAndUpdate({} , updatedWeek1 , {
            new: true ,
            runValidators: true
        })
            .then(doc => {
                res.send(`Success: \n Data: ${ doc }`);
            })
    } catch (e) {
        throw e;
    }
});

// Save week
router.post('/weekTwo/save' , ( req , res , next ) => {
    try {
        // Save New Order
        let updatedWeek2 = new week2_model(req.body);
        week2_model.findOneAndUpdate({} , updatedWeek2 , {
            new: true ,
            runValidators: true
        })
            .then(doc => {
                res.send(`Success: \n Data: ${ doc }`);
            })
    } catch (e) {
        throw e;
    }
});
module.exports = router;
