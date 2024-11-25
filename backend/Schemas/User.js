const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        "_id": mongoose.Schema.Types.ObjectId,
        "username": String,
        "email": String,
        "password": String, // This should be hashed
        "created_at": Date,
        "updated_at": Date
       }
);

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;