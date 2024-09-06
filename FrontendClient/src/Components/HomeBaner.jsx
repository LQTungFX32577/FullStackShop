/* eslint-disable react/prop-types */
import {  Link, useNavigate } from "react-router-dom"
import style from "./HomeBanner.module.css"
import { useEffect, useRef, useState } from "react";
import { ModalPopUp } from "./ModalPopUp";
import { toast } from "react-toastify";
import formatCash from "../UI/TranslateMoney";


function HomeBanner({ products }) {
    
    const navigate = useNavigate();
    const scrollF = useRef();
    const dialog = useRef();
    const [modalData, setModalData] = useState([]);
    const mail = useRef()
    
    function sendMail(e) {
        e.preventDefault();
        
        toast.info('Thank you for subscribed')
        fetch('http://localhost:3100/user/mail', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({data: "Cam on ban da dang ky!!", mail: mail.current.value})
        })
    }
    useEffect(() => {
        function scroll(e) {
            e.preventDefault();
        
        if(e.deltaY < 0) {
            scrollF.current.scrollLeft -= 100;
        }else{  
            scrollF.current.scrollLeft += 100;
        }
    }
        scrollF.current.addEventListener('wheel', scroll);
    },[])

    return (
        <>
            <header className={style.container}>
                <div className={style.leftContent}>
                    <p id="pp"> NEW INSPIRATION 2024 </p>
                    <h2>20% OFF ON NEW SEASON</h2>
                    <button onClick={() => navigate('shop')}>Browse Collections</button>
                </div>
            </header>
            <div className={style.product}>
                <div>
                    <p>CAREFULLY CREATED COLLECTIONS</p>
                    <h2>BROWSE  OUR CATEGORIES</h2>
                </div>
                <div className={style.list}>
                    <Link to="/shop?categories=iphone"><img src="../../public/product_1.png"/></Link>
                    <Link to="/shop?categories=mac"><img src="../../public/product_2.png"/></Link>

                </div>
                <div className={style.list}>
                    <Link to="/shop?categories=ipad"><img src="../../public/product_3.png"/></Link>
                    <Link to="/shop?categories=watch"><img src="../../public/product_4.png"/></Link>
                    <Link to="/shop?categories=airpods"><img src="../../public/product_5.png"/></Link>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap:"50px", marginTop:"80px"}}>
                <div>
                    <p>MADE THE HARD WAY</p>
                    <h2>TOP TRENDING PRODUCTS</h2>
                </div>
                <ul className={style.listProduct} ref={scrollF} >
                    {products.map((data) => (
                        <>
                        <ModalPopUp ref={dialog} products={modalData}/>     
                        <li key={data._id} ref={dialog} onClick={() =>{setModalData(data);dialog.current.open()}}>
                              <img src={data.photos[0]} alt="image"></img>
                            <p>{data.name}</p>
                            <p>{formatCash(data.price)}VND</p>
                        </li>
                        </>
                    ))}
                </ul>
                           
            </div>
            <div className={style.last}>
                <div className={style.lastUp}>
                    <div>
                        <h2>FREE SHIPPING</h2>
                        <p>Free Shipping Worlwide</p>
                    </div>
                    <div>
                        <h2>24 X 7 SERVICE</h2>
                        <p>Free Shipping Worlwide</p>
                    </div>
                    <div>
                        <h2>FESTIVAL OFFER</h2>
                        <p>Free Shipping Worlwide</p>
                    </div>
                </div>
                <div className={style.lastDown}>
                    <div>
                        <h2>LET IS BE FRIENDS!</h2>
                        <p>Nisi nisi tempor consequat laboris nisi.</p>
                    </div>
                    <div>
                         <form method="POST" onSubmit={sendMail}>
                            <input ref={mail} type="email" placeholder="Subcribe us by your email!" required></input>
                            <button type="submit">SUBSCRIBE</button>
                         </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBanner