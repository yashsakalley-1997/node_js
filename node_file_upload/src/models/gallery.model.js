const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
    pictures:[{type:String}],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"profile_users"}
})

module.exports = mongoose.model("gallery",gallerySchema);
