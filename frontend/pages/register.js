
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
    <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className= "mb-2 ">
            <h1 className="text-center text-2xl font-bold text-gray-700 mb-4">Register </h1>
                <div className="text-gray-700 text-base mb-4"> Status :  {status}</div>
        </div>
        
        <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username  </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"
                name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                E-mail  </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="email"
                name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" input type="password"
                name="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        <div className="flex items-center justify-between">
            <button onClick={register} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Register   </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                Login here  </a>
        </div>
       
        </form>
    </div>
    );


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>

                 <div className={styles.container}>
                     <br/>
                     <br/>
                     <br/>
                     {registerForm()}
                     <div className={styles.gif}>
                    <img src="https://i.pinimg.com/originals/54/b3/01/54b301f91e3765d80b30c57a717ae1d7.gif "className="img-fluid z-depth-1"/><a href="/login"></a>
                </div>
                </div>            
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
