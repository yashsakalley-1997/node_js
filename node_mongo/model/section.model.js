const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        id:{type: Number, required: true,unique:true},
        section_name:{type: String,required: true,unique:true}
    }
)
// Section Model.
const Section = mongoose.model("section",sectionSchema);

module.exports = Section;

