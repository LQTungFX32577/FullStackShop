import { Link } from "react-router-dom"
import style from "./CheckOut.module.css"
import { useEffect, useRef, useState } from "react";
import formatCash from "../UI/TranslateMoney";
import { toast } from "react-toastify";
function Checkout() {
    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const address = useRef();
    const coupon = useRef();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const [data,setData] = useState();
    let total =0;
     useEffect(() => {
         const api = async() => {

              const response = await fetch('https://fullstackshop-twinst.onrender.com/shop/getCart', {
                           headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + token
                            }
                            })
               const Data = await response.json();   
               setData(Data);        
               
            };
            api();
        },[])
        data?.cart.map(data => {
            return total += (data.item.price * data.quantity)
        })

    const [discount, setDiscount] = useState(total);
    const [exchange,setExchange] = useState(0);
    const [inUse, setInUse] = useState(false);
   
    function CouponExchange() {
        if(coupon.current.value === "khanhtran"){   
            setDiscount(total - total*99/100);
            setExchange(99);
            setInUse(true);
            toast.success('coupon added!')
        }else{
            setDiscount(total);
            setInUse(false);
            toast.error("coupon not found!")
        }
    }   
    function handleSubmit(event) {
        event.preventDefault();
        const FromData = new FormData(event.target);
        name.current.value = "";
        email.current.value = "";
        phone.current.value = "";
        address.current.value = "";
        const infoData = Object.fromEntries(FromData.entries());
        fetch('http://localhost:3100/shop/checkout', {
            method:"POST",
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({info: infoData, cart: data.cart, total: discount > 0 ? discount : total})
        })
        toast.success("Valid Information!") 
    }
    function Credit() {
       if(name.current.value === "" || email.current.value === "" || phone.current.value === "" || address.current.value === ""){
        toast.warning('you must sign info first!')
       } 
       else{
           fetch('https://fullstackshop-twinst.onrender.com/shop/credit', {
            method:"POST",
            headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({email: email.current.value,
                address: address.current.value, 
                name:name.current.value, phone:phone.current.value , 
                cart: data.cart, total: discount > 0 ? discount : total})
           }).then(res => res.json()).then(data => {
            if(data) {
                window.location.href = data.url
            }
           })
       }
    }
    return (
        <>
  
            <div className={style.container}>
               <div>
                <header className={style.header}>
                        <h1>CHECKOUT</h1>
                        <span className={style.span}>
                            <Link to={"/"}>HOME/</Link>
                            <Link to={"/cart"}>CART/</Link>
                            <p>CHECKOUT</p>
                        </span>
                    </header>
                    <div className={style.form}>
                        <h1>BILLING DETAILS</h1>
                        <form onSubmit={handleSubmit} className={style.content}>
                            <label htmlFor="name">FULL NAME*</label>
                            <input ref={name} id="name" type="text" name="name" required />
                            <label htmlFor="email">EMAIL*</label>
                            <input ref={email} id="email" type="email" name="email" required/>
                            <label  htmlFor="phone">PHONE NUMBER*</label>
                            <input ref={phone} id="phone" type="text" name="phone" required />
                            <label htmlFor="address">ADDRESS*</label>
                            <input ref={address}  id="address" type="text" name="address" required/>
                            <button type="submit">Place Oder</button>
                        </form>
                        <button onClick={Credit} style={{backgroundColor:"gray", color:"white"}}>Pay by Credit</button>
                    </div>
                    
               </div>
               <div className={style.order}>
                 <h3>YOUR ORDER</h3>  
                 <div>
                     {data && data?.cart.map((data,index) => (
                        <>
                            <h4 style={{textAlign:"left", fontSize:"18px", color:"gray"}}>{index + 1}-- {data.item.name} x {data.quantity}</h4>
                        </>
                        
                     ))}
                    <h4>TOTAL: {formatCash(total)}VND</h4>
                    <div className={style.total}>
                                    {exchange>0 && <p className={exchange > 0 ? style.exchange: style.disExchange}>-{exchange}%</p>}
                                    <h4>SUBTOTAL:</h4>
                                    <p>{formatCash(total)}VND</p>
                                </div> 
                                {inUse && 
                                <span style={{display:"flex", flexDirection:"row"}}>
                                    <p style={{color:"gray"}}>Coupon: InUse khanhtran</p>
                                    <button onClick={() => {setDiscount(total); setInUse(false);setExchange(0)}} style={{backgroundColor:"white", color:"red", border:"none"}}>x</button>
                                </span>
                                }
                                <div className={style.total}>
                                    <h4>TOTAL:</h4>
                                     <p>{formatCash(discount)}VND</p>
                                </div>
                                <input className={style.input} ref={coupon} type="text" placeholder="Enter your coupon"></input>
                                <button className={style.button} onClick={CouponExchange}>Apply Coupon</button>
                    </div> 
    
                </div>

            </div>
        </>
    )
}
export default Checkout
