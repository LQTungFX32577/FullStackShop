/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./ProductItem.module.css";
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../UI/CartRedux";
import {   useState } from "react";
import formatCash from "../UI/TranslateMoney";
import { toast } from "react-toastify";
function ProductItem({ Item }) {
   const Related = useRouteLoaderData('root');
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [quantity,setQuantity] = useState(1);
   const relatedProduct = Related.filter((data) => {
    return data.category === `${Item[0].category}`
   })
   console.log(Item);
   

   const product = {
    item: Item[0],
    quantity: quantity
   }
    return (
        <>
            <div className={style.container}>
                <div className={style.upContent}>
                    <div className={style.upLeftContent}>
                    <img src={Item[0].photos[0]} alt="image"/>
                    <img src={Item[0].photos[1]} alt="image"/>
                    <img src={Item[0].photos[2]} alt="image"/>
                    <img src={Item[0].photos[3]} alt="image"/>
                    </div>
                    <img style={{marginLeft:"10px", marginRight:"50px"}} src={Item[0].photos[0]} alt="image"/>
                    <div className={style.upRightContent}>
                    <h1>{Item[0].name}</h1>
                    <p>{formatCash(Item[0].price)}VND</p>
                    <p>{Item[0].short_desc}</p>
                    <h3>CATEGORY: {Item[0].category}</h3>
                    <h3>Store Available: {Item[0].count}</h3>
                    <div>
                        <input onChange={(e) => setQuantity(Number(e.target.value))} placeholder="QUANTITY" type="number"></input>
                        <button onClick={() => {
                            if(Item[0].count <=0){
                                toast.warning('sold out!')
                            }else{
                                dispatch(cartAction.addToCart(product))
                            }
                            }}>
                           <FontAwesomeIcon icon={faCartShopping}/> Add to cart</button>
                    </div>
                    
                    </div>
                </div>
                <div className={style.downContent}>
                    <h2>DESCRIPTION</h2>
                    <p><strong>PRODUCT DESCRIPTION</strong></p>
                    <p>{Item[0].long_desc}</p>
                    <p><strong>RELATED PRODUCTS</strong></p>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {relatedProduct.map((data) => (
                            <>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <img className={style.related} onClick={() => navigate(`/product/${data.name}`) } style={{width:"400px"}} src={data.photos[0]}/>
                                <p style={{textAlign:"center"}}>{data.name}</p>
                            </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductItem