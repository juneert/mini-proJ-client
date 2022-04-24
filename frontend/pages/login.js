import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password, remember },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const reMem = async () => {
    setRemember(!remember);
  };

    const loginForm = () => (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <div className= "mb-4 ">
            <h1 className="text-center text-2xl font-bold text-gray-700   mb-4">Login </h1>
                <div className="text-gray-700 text-base  mb-4"> Status : {status}</div>
            </div>
            
        <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
             Username
        </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text"
            name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" input type="password"
            name="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        ConfirmPassword
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" input type="password"
            name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3"></div>
    <label className="md:w-2/3 block text-gray-500 font-bold">
      <input className="mr-2 leading-tight" id='remember_me'name='remember_me' type="checkbox" onClick={reMem}/>
      <span className="text-sm">  Remember Me </span>
    </label>
  </div>
    <div className="flex items-center justify-between">
      <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
        Login
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
      Register here!!
      </a>
    </div>
  </form>
</div>
    );

    const copyText = () => {
        navigator.clipboard.writeText(token);
    };
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
                <div className={styles.container}>
                <br />
                <br/>
                <br/>
                {loginForm()}
                <div className={styles.gif}>
                    <img src="https://i.pinimg.com/originals/00/4b/17/004b173f6e3d6843df10114e087f30a8.gif "className="img-fluid z-depth-1"/><a href="/login"></a>
                </div>
                </div>
                <div>
                </div>

        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
