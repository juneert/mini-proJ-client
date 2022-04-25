//Profile
import React, { Component } from 'react';
import Navbar from '../components/navbar'
// import styles from '../styles/Home.module.css'
import styles from '../styles/contact.module.css';
class Contact extends Component {
    state = {}
    render() {
        return(
                <div>
                    <Navbar/>
                    <div className={styles.container}>
                    <br/><br/><br/>
                    <div className={styles.gif}>
                    <img src="https://i.pinimg.com/originals/7b/13/7c/7b137c48419e95e12416e783cc804e45.gif "className="img-fluid z-depth-1"/><a href="/login"></a>
                </div>
                    <div className="w-1/2 max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                            <div className="text-black  text-s  mb-2">
                                 <p> นางสาวปาริชาติ เครือเตียว</p>
                                 <p> รหัสนักศึกษา 6035512076</p>
                                 
                                <div className="flex items-center justify-start ">
                                 <img src="https://cdn-icons.flaticon.com/png/512/3059/premium/3059502.png?token=exp=1650717432~hmac=0272ecd45ed80ea0fb8ccf51c0fecd1a" width="16" height="16"/> 
                                <p> : 095-0737939</p>
                                </div>
                                <br/>
                                <img src="https://scontent.furt3-1.fna.fbcdn.net/v/t39.30808-6/270033442_4731795233567292_1791226752849397589_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGm-6SL80u3Mon8CHLxonp-x1tGFZiD5sPHW0YVmIPmwzIzKOKgnH3JOGnH-TY3goruM6Xo2lc7i5fKBawUfXBE&_nc_ohc=JxwJctFMAeEAX_C8tWU&tn=5vHJY9x9ImN38lk6&_nc_ht=scontent.furt3-1.fna&oh=00_AT8fxGbGFw7AWMYrxuYHLv7At3we7et_lMnYiC-f-kprqQ&oe=62682F0F" width="250px" height="250px" />
                                 
                                 <br/>
                                 <div className='flex justify-start md:justify-between items-center '>
                                 <p className="text-white">::::::::::</p>
                                 <a href="https://www.instagram.com/en.junnei/">
                                     <img src="https://marjanvanaubel.com/wp-content/uploads/2019/11/instagram-logo.png" width="60px" height="60px" /> 
                                </a>
                                <p className="text-white">::::::::::::::::</p>
                                <a href="https://www.facebook.com/parichat.kruetiaw/">
                                     <img src="https://e1.pngegg.com/pngimages/574/184/png-clipart-icones-de-medias-sociaux-facebook-noa-beach-club-noir-et-blanc-ligne-zone-symbole-cercle.png" width="60px" height="60px" />
                                </a>

                                 </div>

                            </div>
                           
                            
                        </form>
                        
                    </div>
                </div>
                </div>


        )
    }
}
export default Contact;