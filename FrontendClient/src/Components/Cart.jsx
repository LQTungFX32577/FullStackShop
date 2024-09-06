import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faArrowLeft, faArrowRight, faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { cartAction } from "../UI/CartRedux";
import formatCash from "../UI/TranslateMoney";
import { useState } from "react";

function Cart() {
    const ProductData = useSelector(state => state.cart.productItem);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const product = JSON.parse(localStorage.getItem("Cart"))
    const [saveItem, setSaveItem] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(ProductData);
    
    const Data = {
        productData: ProductData,
        item: product
    }

    localStorage.setItem("cartItem", JSON.stringify(Data.productData));
    let total = 0;
    let quantity =0;
     Data.item?.map((data) => {
        return total += (data.item.price *  data.quantity)
    })
     Data.item?.map((data) => {
        return quantity += data.quantity
    })

function ClickToChange() {
    if(saveItem) {
        setSaveItem(false)
    } else {
        setSaveItem(true)
    }
}

const [discount, setDiscount] = useState(total);
// const [inUse, setInUse] = useState(false);
// localStorage.setItem("Cost", JSON.stringify(discount));
//     function CouponExchange() {
//         if(coupon.current.value === "khanhtran"){   
//             setDiscount(total/total);
//             setInUse(true);
//             toast.success('coupon added!')
//         }else{
//             setDiscount(total);
//             setInUse(false);
//             toast.error("coupon not found!")
//         }
//     }
    function checkOut() {
        if(!userData){
            alert('you must login first!');
            navigate('/cart');
        }
        else{
            fetch('https://fullstackshop-twinst.onrender.com/shop/addProducts', {
                method: "PATCH",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData.token
                },
                body: JSON.stringify({user: userData, product: ProductData}),
             }).then(result => {
                if(result.status !== 201){
                    alert(`${result.body}`)
                }
                else{
                    navigate('/checkout')
                }
             })
        }
    }
   
    return (
        <>
            <div className={style.container}>
                <header className={style.header}>
                    <h1>Cart</h1>
                    <p>Cart</p>
                </header>
                <h1>SHOPPING CART</h1>
                <div className={style.content}>
                <div className={style.info}>
                    <p>IMAGE</p>
                    <p>PRODUCT</p>
                    <p>PRICE</p>
                    <p>QUANTITY</p>
                    <p>TOTAL</p>
                    <p>REMOVE</p>
                </div>
                        <div className={style.body}>
                            <div className={style.list}>
                                {!saveItem && Data.productData.map((data) => (
                                    <> 
                                        <div className={style.data}>
                                            <img src={data.item.photos[0]}/>
                                            <h3>{data.item.name}</h3>
                                            <p>{formatCash(data.item.price)}</p>
                                            <span className={style.span }>
                                                <button onClick={() => {dispatch(cartAction.DecreaseItem(data)); setDiscount(total- data.item.price)}}> <FontAwesomeIcon icon={faMinus}/></button>
                                                <p>{data.quantity}</p>
                                                <button onClick={() => {dispatch(cartAction.IncreaseItem(data)); setDiscount(total+ Number(data.item.price))}}> <FontAwesomeIcon icon={faPlus}/></button>
                                            </span>
                                            <h3>{formatCash(data.quantity * data.item.price)}</h3>
                                            <button onClick={() => dispatch(cartAction.removeCartItem(data))}><FontAwesomeIcon icon={faTrashCan}/></button>
                                        </div>
                                        
                                    </>
                                ))}
                                {saveItem && Data.item.map((data) => (
                                    <> 
                                        <div className={style.data}>
                                            <img src={data.item.photos[0]}/>
                                            <h3>{data.item.name}</h3>
                                            <p>{formatCash(data.item.price)}</p>
                                            <span className={style.span }>
                                                <button onClick={() => {dispatch(cartAction.DecreaseItem(data)); setDiscount(total- data.item.price)}}> <FontAwesomeIcon icon={faMinus}/></button>
                                                <p>{data.quantity}</p>
                                                <button onClick={() => {dispatch(cartAction.IncreaseItem(data)); setDiscount(total+ Number(data.item.price))}}> <FontAwesomeIcon icon={faPlus}/></button>
                                            </span>
                                            <h3>{formatCash(data.quantity * data.item.price)}</h3>
                                            <button onClick={() => dispatch(cartAction.removeCartItem(data))}><FontAwesomeIcon icon={faTrashCan}/></button>
                                            <button onClick={() => {dispatch(cartAction.SaveItem(data))}}>editItem</button>
                                        </div>
                                        
                                    </>
                                ))}
                                <div className={style.link}>
                                    <Link className={style.linkShop} to="/shop"><FontAwesomeIcon icon={faArrowLeft}/> Continue Shopping</Link>
                                    <button onClick={ClickToChange}>Saved Item</button>
                                    <Link onClick={checkOut} className={style.linkCheck}>Proceed Checkout <FontAwesomeIcon icon={faArrowRight}/></Link>
                                </div>
                            </div>
                            <div className={style.bottom}>
                                <div className={style.total}>
                                    <h3>CART TOTAL</h3>
                                    <p>{quantity} Products</p>
                                    {/* <h4>SUBTOTAL:</h4> */}
                                </div> 
                                {/* {inUse && 
                                <span style={{display:"flex", flexDirection:"row"}}>
                                    <p style={{color:"gray"}}>Coupon: InUse khanhtran</p>
                                    <button onClick={() => {setDiscount(total); setInUse(false)}} style={{backgroundColor:"white", color:"red", border:"none"}}>x</button>
                                </span>
                                } */}
                                <div className={style.total}>
                                    <h4>TOTAL:</h4>
                                     <p>{formatCash(discount)}VND</p>
                                </div>
                                {/* <input ref={coupon} type="text" placeholder="Enter your coupon"></input>
                                <button onClick={CouponExchange}>Apply Coupon</button> */}
                            </div>
                        </div>
                </div>
                
            </div>
        </>
    )
}
export default Cart
