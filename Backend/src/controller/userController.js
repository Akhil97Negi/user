const userModel = require("../models/userModel")
const {Parser} = require('json2csv')

//get all users
const getUsers = async (req, res) =>{
    try {
        const users = await userModel.find({deleted : false})
        res.json(users)
    } catch (error) {
        res.status(500).json({message : "Error fetching users" , error: error.message})
    }
}

//create a new user 
const createUser = async(req, res) =>{
    const {firstName , lastName, email , password } = req.body

    if(!firstName || !lastName || !email || !password ){
        return res.status(400).json({message : 'All fields are required'})
    }

    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message : "user with this email already exist"})
        }
    const newUser = new userModel({
        firstName, lastName ,email, password
    })
     await newUser.save()
     res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message : 'Error creating user', error : error.message})
    }
}

//deleting user
const deleteUser = async (req, res) =>{
    const userId = req.params.id

    try {
        const user  = await userModel.findById(userId)
        if(!user || user.deleted){
            return res.status(400).json({message : 'User not found or already deleted'})
        }
        user.deleted = true
        await user.save()
        res.json({message : 'user deleted sucessfully'})
    } catch (error) {
        res.status(500).json({message : 'Error deleting user', error : error.message})
    }
}

//update user details
const updateUser = async (req, res) =>{
    const userId = req.params.id
    const {firstName, lastName, email, password} = req.body

    try {
        const user = await userModel.findById(userId)
        if(!userId || user.deleted){
            return res.status(404).json({message : 'user not found'})

        }
        //update field
        if(firstName) user.firstName = firstName
        if(lastName) user.lastName = lastName
        if(email) user.email = email
        if(password) user.password = password
        
      await user.save()
      res.json({message : 'User updated sucessfully' , user})
 
 
    } catch (error) {
        res.status(500).json({message : 'Error updating user', error : error.message})
    }
}

//export user data to csv

const exportUsers = async (req, res) =>{
    try {
        const users = await userModel.find({deleted : false})

        const fields  = ['_id', 'firstName' , 'lastName', 'email']
        const json2csvParser = new Parser({fields})
        const csv = json2csvParser.parse(users) 

        req.header('Content-Type', 'text/csv')
        res.attachment('users.csv')
        res.send(csv)
    } catch (error) {
        res.status(500).json({message : "Error exporting users", error : error.message})
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    exportUsers
}


