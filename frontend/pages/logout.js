import Head from 'next/head'
import Layout from '../components/layout'
// import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import Navbar from '../components/navbar'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            
                <div>
                    <Navbar/>
                    <div className={styles.container}>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <div className={styles.gif}>
                    <img src="https://www.icegif.com/wp-content/uploads/adios-icegif-5.gif"className="img-fluid z-depth-1"/><a href="/login"></a>
                </div>
                <div className="w-1/2 ">
                        <form className=" text-center rounded px-8 pt-6 pb-8 mb-4 ">
                            <div className="text-black text-6xl text-bold text-s  mb-2">
                            <h1>Logout</h1>
                            <h2> {status}  </h2>
                            </div>
                           
                            
                        </form>
                        
                    </div>
                    
                </div>

                </div>
        </Layout>
    )
}
