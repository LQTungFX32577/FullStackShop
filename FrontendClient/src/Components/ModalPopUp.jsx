/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle, useRef } from "react";
import style from "./ModalPopUp.module.css";
import { useNavigate } from "react-router-dom";
import formatCash from "../UI/TranslateMoney";
import { createPortal } from "react-dom";

export const ModalPopUp = forwardRef(function ModalPopUp({ products },ref) {
   console.log(products);
   
    
    const navigate = useNavigate();
    const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
        open() {
            dialog.current.showModal();
        }
    }
  })
  return (
    createPortal( 
      <dialog ref={dialog} method="dialog">
      <div className={style.dialog}>
          <img src={products.photos}/>
          <div className={style.content}>
          <h2>{products.name}</h2>
          <p>{formatCash(products.price)}VND</p>
          <p>{products?.long_desc}</p>
          <div className={style.button}>
              <button className={style.close} onClick={()=>dialog.current.close()}>Close</button>
              <button className={style.detail} onClick={()=>navigate(`/product/${products.name}`)}>View Detail</button>
          </div>
          </div>
      </div>
      </dialog>, document.getElementById("modal"))
  )
})