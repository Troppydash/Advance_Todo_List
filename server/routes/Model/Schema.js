var mongoose = require("mongoose");
let week1Schema = new mongoose.Schema({
    Monday: Array ,
    Tuesday: Array ,
    Wednesday: Array ,
    Thursday: Array ,
    Friday: Array ,
    Saturday: Array ,
    Sunday: Array ,
    Date: Date
}, { versionKey: false });
const week1_model = mongoose.model('week_1' , week1Schema);

module.exports = week1_model;

