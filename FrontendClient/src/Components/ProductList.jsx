/* eslint-disable react/prop-types */
import { useState } from "react";
import style from "./ProductList.module.css"
import { useNavigate } from "react-router-dom";
import formatCash from "../UI/TranslateMoney";
function ProductList({ Data }) {
    const [state,setState] = useState("");
    const navigate = useNavigate();
    let isState;
    function find(e) {
       setState(e.target.value);
    }
    const Products = Data.filter((data => {
        return data.name.includes(state);
    }))
    if(state == "") {
           isState = true;  
    }
    else {
         isState = false;
    }
    const original = Data.map((data) => (
        <li key={data._id}>
             <img onClick={() => navigate(`/product/${data.name}`)} src={data.photos[0]}></img>
             <h2>{data.name}</h2>
             <p>{formatCash(data.price)}VND</p>
        </li>
      ))
    const Filter = Products.map((data) => (
        <li key={data._id}>
             <img onClick={() => navigate(`/product/${data.name}`)} src={data.photos[0]}></img>
             <h2>{data.name}</h2>
             <p>{formatCash(data.price)}VND</p>
        </li>
      ))
    return (
        <>
           <ul className={style.container}>
              <input onChange={find} type="text" placeholder="Find product by name"></input>
              {isState ? original : Filter}
           </ul>
        </>
    )
}
export default ProductList