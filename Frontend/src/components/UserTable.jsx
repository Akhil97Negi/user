// // const { useState, useEffect } = require("react")
// // const { fetchUsers, exportUsers, deleteUser } = require("../api/api")
// // const { default: DeleteUser } = require("./DeleteUser")

// import { useEffect, useState } from "react"
// import { deleteUser, exportUsers, fetchUsers } from "../api/api"
// import DeleteUser from "./DeleteUser"



// const UserTable  = ({onUserAdded}) =>{
//     const [users, setUsers] = useState([])
//     const [showDeletePromt , setShowDeletePromt] = useState(false)
//     const [selectedUserIds, setSelectedUserIds] = useState([])
//     const [userIdToDelete, setUserIdToDelete] = useState(null)
     
    
//     useEffect(() =>{
//         const getUsers = async () =>{
//             const userList = await fetchUsers()
//             setUsers(userList)

//         }
//         getUsers()
//     }, [onUserAdded])

//     const handleSelectedUser = (userId) =>{
//         setSelectedUserIds((prevSelected) =>
//          prevSelected.includes(userId)
//             ? prevSelected.filter((id) => id !== userId) : [...prevSelected , userId]
//         )
//     }

//     const handleDelete = async () =>{
//         if(userIdToDelete){
//             await deleteUser(userIdToDelete)
//             setUsers(users.filter((user) => user._id !== userIdToDelete))
//             setShowDeletePromt(false)
//             setUserIdToDelete(null)
//         }
//     }

//     const handleExport = async () =>{
//         const csvData = await exportUsers()
//         const url = window.URL.creteObjectURL(new Blob([csvData]))
//         const link = document.createElement('a')
//         link.href = url
//         link.setAttribute('download', 'users.csv')
//         document.body.appendChild(link)
//         link.click()
//     }

//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Select</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>

//                 </thead>
//                 <tbody>
//                     {users.map((user) =>(
//                         <tr key={user._id}>
//                             <td>
//                                 <input type="checkbox" 
//                                 checked={selectedUserIds.includes(user._id)} 
//                                 onChange={() => handleSelectedUser(user._id)}
//                                 />
//                             </td>
//                             <td>{user.firstName}</td>
//                             <td>{user.lastName}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <button onClick={() =>{
//                                     setUserIdToDelete(user._id)
//                                     setShowDeletePromt(true)
//                                 }}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button onClick={handleExport}>Export</button>

//             {showDeletePromt && (
//                 <DeleteUser onConfirm={handleDelete} onCancel={() => setShowDeletePromt(false)} />
//             )}
//         </div>
//     )
// }

// export default UserTable



// src/components/UserTable.js
import { useEffect, useState } from "react";
import { deleteUser, exportUsers, fetchUsers } from "../api/api";
import DeleteUser from "./DeleteUser";
import './UserTable.css'; 

const UserTable = ({ onUserAdded }) => {
    const [users, setUsers] = useState([]);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const getUsers = async () => {
            const userList = await fetchUsers();
            setUsers(userList);
        };
        getUsers();
    }, [onUserAdded]);

    const handleSelectedUser = (userId) => {
        setSelectedUserIds((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDelete = async () => {
        if (userIdToDelete) {
            await deleteUser(userIdToDelete);
            setUsers(users.filter((user) => user._id !== userIdToDelete));
            setShowDeletePrompt(false);
            setUserIdToDelete(null);
        }
    };

    const handleExport = async () => {
        const csvData = await exportUsers();
        const url = window.URL.createObjectURL(new Blob([csvData]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
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
                    {currentUsers.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedUserIds.includes(user._id)}
                                    onChange={() => handleSelectedUser(user._id)}
                                />
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        setUserIdToDelete(user._id);
                                        setShowDeletePrompt(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button className="export-btn" onClick={handleExport}>Export</button>

            {showDeletePrompt && (
                <DeleteUser
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeletePrompt(false)}
                />
            )}
        </div>
    );
};

export default UserTable;
