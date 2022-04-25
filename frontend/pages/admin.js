import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/addmin.module.css";
import Link from "next/link";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/shops";
// import { Spring, animated } from 'react-spring'

const URL_IN = "http://localhost/api/income";
//C:\Users\Admin\Desktop\Mini Project in DCW\frontend\image\add_image.png
// const emptyImageUrl = '/image/add_image.png';

const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [shops, setShops] = useState({});
  const [income, setIncome] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  //////////////////name  description price quantity  imageUrl 
  const [imageUrl, setImageUrl] = useState();
  
  const handleChangeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result)
    }

    if (file)
      reader.readAsDataURL(file);
  }


  ///////////////


  const [shop, setShop] = useState({});
  useEffect(() => {
    setImageUrl();
    getShops();
    /*    getIncome();  */
    profileUser();




  }, []);
  const profileUser = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getShopById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setShop(result.data);
  };
  /*
    const getIncome = async () => {
      let result = await axios.get(URL_IN);
      setIncome(result.data);
    };
  */
  const getShops = async () => {
    let result = await axios.get(URL);
    setShops(result.data.list);
  };
// name  description price quantity  imageUrl 
  const addShop = async () => {
    let result = await axios.post(URL, {
      name,
      description,
      price,
      quantity,                
      imageUrl,
    });
    console.log(result);
    getShops();
  };

  const deleteShop = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getShops();
  };

  const updateShop = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      description,
      price,
      quantity,                
      imageUrl,
    });
    console.log(result);
    getShops();
  };

// name  description price quantity  imageUrl 
  const showShops = () => {
    if (shops && shops.length) {
      return shops.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div className={styles.listItem1} key={index}>
                <div><b>ชื่อ :</b> {item.name} <br /></div>
                <div><b>รายละเอียด :</b> {item.description} <br /></div>
                <div><b>ราคา :</b> {item.price} บาท<br /></div>
                <div><b>มีอยู่จำนวน :</b> {item.quantity} ชิ้น</div>
            </div>
            <br/>
            <div><img src={item.imageUrl } style={{ width: "200px", height: "200px" }} /></div>
            <br/>
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getShopById(item.id)}>
                Get
              </button>

              <button
                className={styles.button_update}
                onClick={() => updateShop(item.id)}>
                Update
              </button>

              <button
                className={styles.button_delete}
                onClick={() => deleteShop(item.id)}>
                Delete
              </button>

            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  // console.log(imageUrl);
  return (
     <div>
         <Navbar /> 
         <div className={styles.container}>
            <br/>
            
        <div className="w-1/2 max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        
        <div className= "mb-4 ">
            <h1 className="text-center text-2xl  text-black mb-4">เพิ่มเติมสินค้าภายในร้าน</h1>       
        </div>

        <div className="mb-4 ">
            <label className="block text-black text-sm font-bold mb-2" >
                NameProduct </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" >
               Description </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
             type="text"
             name="description"
             onChange={(e) => setDescription(e.target.value)}
           ></input>
        </div>

        <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" >
               Price </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>

        <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" >
               Quantity </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
            type="number"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </div>

        <div className="mb-4">
        Image (รูปภาพ) :
        <label className='form-control'>
          <img className='image' src={imageUrl} />
          <input className='input-file' type='file' onChange={handleChangeImage} />
        </label>
        </div>
        
         <button
          className={styles.button_add}
          onClick={() => addShop(name, description, price, quantity, imageUrl)}
        >
          Add
        </button>

        </form>
    </div>
        <div className={styles.addlist}>{showShops()}</div>
    </div>
    </div>
    
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
