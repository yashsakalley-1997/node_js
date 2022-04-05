const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        first_name: {type:String, required:true},
        last_name: {type:String, required:true}
    }
)
// Authors Model.
const Author = mongoose.model("author",authorSchema);

module.exports = Author;