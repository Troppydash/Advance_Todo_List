var mongoose = require("mongoose");
let week2Schema = new mongoose.Schema({
    Monday: Array ,
    Tuesday: Array ,
    Wednesday: Array ,
    Thursday: Array ,
    Friday: Array ,
    Saturday: Array ,
    Sunday: Array ,
    Date: Date
}, { versionKey: false });
const week2_model = mongoose.model('week_2' , week2Schema);

module.exports = week2_model;
