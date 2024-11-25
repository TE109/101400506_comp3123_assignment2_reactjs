const mongoose = require('mongoose');


const EmployeeSchema = mongoose.Schema(
    {
        "_id": mongoose.Schema.Types.ObjectId,
        "first_name": String,
        "last_name": String,
        "email": String,
        "position": String,
        "salary": Number,
        "date_of_joining": Date,
        "department": String,
        "created_at": Date,
        "updated_at": Date
       }       
)


const Employee = mongoose.model("Employee",EmployeeSchema);
module.exports = Employee;