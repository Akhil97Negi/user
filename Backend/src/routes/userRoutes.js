

const express = require('express')
const { getUsers, createUser, updateUser, deleteUser, exportUsers } = require('../controller/userController')

const userRouter = express.Router()

userRouter.get('/users' , getUsers)
userRouter.post('/users' , createUser)
userRouter.put('/users/:id' , updateUser)
userRouter.delete('/users/:id' , deleteUser)

userRouter.get('/users/exports' , exportUsers)

module.exports = userRouter
