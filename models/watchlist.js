var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var WatchSchema = new mongoose.Schema({
    id: String
});

WatchSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Watch", WatchSchema);