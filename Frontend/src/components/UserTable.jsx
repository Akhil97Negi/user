// const { useState, useEffect } = require("react")
// const { fetchUsers, exportUsers, deleteUser } = require("../api/api")
// const { default: DeleteUser } = require("./DeleteUser")

import { useEffect, useState } from "react"
import { deleteUser, exportUsers, fetchUsers } from "../api/api"
import DeleteUser from "./DeleteUser"



const UserTable  = ({onUserAdded}) =>{
    const [users, setUsers] = useState([])
    const [showDeletePromt , setShowDeletePromt] = useState(false)
    const [selectedUserIds, setSelectedUserIds] = useState([])
    const [userIdToDelete, setUserIdToDelete] = useState(null)
     
    
    useEffect(() =>{
        const getUsers = async () =>{
            const userList = await fetchUsers()
            setUsers(userList)

        }
        getUsers()
    }, [onUserAdded])

    const handleSelectedUser = (userId) =>{
        setSelectedUserIds((prevSelected) =>
         prevSelected.includes(userId)
            ? prevSelected.filter((id) => id !== userId) : [...prevSelected , userId]
        )
    }

    const handleDelete = async () =>{
        if(userIdToDelete){
            await deleteUser(userIdToDelete)
            setUsers(users.filter((user) => user._id !== userIdToDelete))
            setShowDeletePromt(false)
            setUserIdToDelete(null)
        }
    }

    const handleExport = async () =>{
        const csvData = await exportUsers()
        const url = window.URL.creteObjectURL(new Blob([csvData]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'users.csv')
        document.body.appendChild(link)
        link.click()
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {users.map((user) =>(
                        <tr key={user._id}>
                            <td>
                                <input type="checkbox" 
                                checked={selectedUserIds.includes(user._id)} 
                                onChange={() => handleSelectedUser(user._id)}
                                />
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() =>{
                                    setUserIdToDelete(user._id)
                                    setShowDeletePromt(true)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleExport}>Export</button>

            {showDeletePromt && (
                <DeleteUser onConfirm={handleDelete} onCancel={() => setShowDeletePromt(false)} />
            )}
        </div>
    )
}

export default UserTable