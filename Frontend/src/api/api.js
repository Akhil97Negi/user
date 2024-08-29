import axios from 'axios'

const API_URL = 'https://user-dj33.onrender.com/api/users'

//get all users
export const fetchUsers = async () =>{
    const res = await axios.get(API_URL)
    return res.data
}

//create new user

export const createUser = async (userData) =>{
    const res = await axios.post(API_URL, userData)
    return res.data
}

//update a user

export const updateUser = async () =>{
    const res = await axios.put(`${API_URL}/${userId}`, updatedData)
    return res.data
}

//delete a user
export const deleteUser = async (userId) =>{
    const res = await axios.delete(`${API_URL}/${userId}` )
    return res.data
}

//export user data

export const exportUsers = async () =>{
    const res = await axios.get(`${API_URL}/exports` , {responseType : 'blob'})
    return res.data
}

