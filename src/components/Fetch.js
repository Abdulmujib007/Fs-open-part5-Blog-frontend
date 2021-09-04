import axios from 'axios'


const baseUrl = '/api/blog'
const userUrl  = '/api/user'
const loginUrl = '/api/login'

let token = null
const getToken = newToken => {
    token =  `bearer ${newToken}`
}

const getAllBlog = async() => {
    const response  = await axios.get(baseUrl)
    return response.data
}

const login =  async Credential => {
    const response = await axios.post(loginUrl,Credential)
    return response.data
}
const addmore = async newBlog => {
    const config = {
        headers:{Authorization:token}
    }
const response = await axios.post(baseUrl,newBlog,config)
 return response.data
}

export default {getAllBlog,login,getToken,addmore}