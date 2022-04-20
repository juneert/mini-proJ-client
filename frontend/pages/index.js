import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div>
        <Navbar />
        <div className={styles.container}>
        <div className={styles.welcome}>
            <p> ยินดีต้อนรับเข้าสู่ร้าน "K-POP FOR GOT7"</p>
        </div>     
        <div className = {styles.image}>
            <img src="https://s.isanook.com/jo/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2pvLzAvdWQvNDg4LzI0NDAyMjUvcGljc2FydF8wMS0xNi0wNC41Mi4yNi5qcGc=.jpg"/>
        </div> 
        <div className={styles.im}>
           <a href="/login">ล็อคอินเพื่อเข้าสู่ระบบ</a>
        </div>
        </div>
       
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
