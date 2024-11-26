const express = require("express");
const app = express();
const mongoose = require('mongoose');
const crypto = require('crypto');
const { UUID } = require('bson');
let userModel = require("./Schemas/User");
let employeeModel = require("./Schemas/Employee");


const port = process.env.PORT || 3000;
const url = "/api/v1";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/?retryWrites=true&w=majority&appName=Comp3123Cluster";
mongoose.connect(uri,{
    pkFactory: { createPk: () =>  new UUID().toBinary() }
})


// Allow user to create new account
app.post(url + '/user/signup', async (req,res) => {
    id = new mongoose.Types.ObjectId();
    const user = new userModel({
        _id: id,
        username : req.body.username,
        email : req.body.email,
        password : crypto.createHash('md5').update(req.body.password).digest('hex'),
    })
    try{
        await user.save();
        res.status(201).send("User created Sucsesfully User Id: " + id);
    }catch(err){
        console.log("ERROR: " + err);
        res.status(500).send(err);
    }
    
})

// Allow user to login to the system
app.post(url + '/user/login', async(req,res) => {
    try {
        const filter = { 
            email : req.body.email,
            password : crypto.createHash('md5').update(req.body.password).digest('hex'),
        };
        const user = await userModel.findOne(filter);
        if (user == null) throw 'Null Exception Error'
        res.status(200).send("Login successful");
    } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).send(err);
    }
})

// Create new employee
app.post(url + '/emp/employees', async (req,res) => {
    id = new mongoose.Types.ObjectId();
    let today = new Date();var dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    const employee = new employeeModel({
        _id: id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        position : req.body.position,
        salary : req.body.salary,
        date_of_joining : req.body.date_of_joining,
        department : req.body.department,
        created_at : today,

    })
    try{
        await employee.save();
        res.status(201).send("Employee created Sucsesfully employee_id: " + id);
    }catch(err){
        console.log("ERROR: " + err);
        res.status(500).send(err);
    }
})

// Get all employee list
app.get(url + '/emp/employees', async (req,res) => {
    try {
        const employee = await employeeModel.find();
        res.status(200).send(employee);
    } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).send(err);
    } 
})


// Get employee details by employee id
app.get(url + '/emp/employees/:eid',async (req,res) => {
    const filter = {
        _id : req.params.eid,
    }
    try {
        const employee = await employeeModel.findOne(filter);
        if (employee == null) throw 'Null Exception Error'
        res.status(200).send(employee);
    } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).send(err);
    } 
})


// Update employee details
app.put(url + '/emp/employees/:eid', async(req,res) => {
    const filter = {
        _id : req.params.eid,
    }
    const update = {
        position : req.body.position,
        salary : req.body.salary
    }
    try {
        const employee = await employeeModel.findOneAndUpdate(filter,update);
        res.status(200).send("Employee details updated successfully");
    } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).send(err);
    } 
})

// User can delete employee by employee id
app.delete(url + '/emp/employees/:eid', async (req,res) => {
    const filter = {
        _id : req.params.eid,
    }
    try {
        const employee = await employeeModel.deleteOne(filter);
        res.status(204).send(employee);
    } catch (err) {
        console.log("ERROR: " + err);
        res.status(500).send(err);
    } 
})

app.listen(port, () => {
    
})