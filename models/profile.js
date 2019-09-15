const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    describe: {
        type: String
    },
    income: {
        type: String
    },
    outcome: {
        type: String
    },
    // cash: {
    //     type: String,
    //     required: true
    // },
    remark: {
        type: String
    },
    date: {
        type: String,
        default: Date.now
    }
}
);
module.exports = Profile = mongoose.model("profile", ProfileSchema);