import style from './Product.module.css';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  formatCash  from '../../../../FrontendClient/src/UI/TranslateMoney.js';
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function Product() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const token = user?.token
    const role = user.role
    const navigate = useNavigate();
    const userData = useFetch('https://fullstackshop-twinst.onrender.com/admin/product');
    console.log(userData);
    const [state,setState] = useState("");
    let isState;
    const Products = userData?.filter((data => {
        return data.name.toLowerCase().includes(state.toLowerCase());
    }))
    if(state == "") {
           isState = true;  
    }
    else {
         isState = false;
    }
    
    return (
        <>
                <div>
                    <h1 className={style.h1}>All Product</h1>
                    <button onClick={() =>{
                        if(role === "admin"){
                            navigate('/home/deleted_product')
                        }else{
                            alert('UnAuthorization!')
                        }
                    } } style={{marginRight:"-1200px", fontSize:"25px"}}><FontAwesomeIcon icon={faTrashCan}/></button>
                </div>
                <input className={style.input} onChange={(e) => setState(e.target.value)} placeholder='Enter Search'></input>
                <table className={style.table}>
                <tr>
                <th className={style.th2}>ID</th>
                <th className={style.th2}>Name</th>
                <th className={style.th3}>Price</th>
                <th className={style.th4}>Image</th>
                <th className={style.th3}>Count</th>
                <th className={style.th5}>Category</th>
                <th className={style.th5}>Action</th>
                </tr>
                {isState && userData?.map((data) => (
                  <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{formatCash(data.price)}</td>
                    <td><img style={{width:"150px"}} src={data.photos[0]} alt='image'></img></td>
                    <td>{data.count}</td>
                    <td>{data.category}</td>
                    <td>
                        <button onClick={() => {
                            if(role === "admin"){
                              navigate(`/home/edit/${data._id}`)  
                            }else {
                                alert('UnAuthorization')
                            }
                        } } 
                        style={{backgroundColor:"#22ca80", color:"white"}}>Edit</button>
                        <button onClick={() =>  {
                                            if(confirm("are you suer?")){

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/delete-product', {
                                            method: "POST",
                                            headers: {
                                                "Content-Type" : "application/json",
                                                "Authorization": "Bearer " + token
                                            },
                                            body: JSON.stringify({id: data._id})
                                        }).then(res => {
                                            if(res.ok){
                                                alert('Deleted!')
                                                window.location.reload();
                                            }else{
                                                alert('UnAuthorization')
                                            }
                                        }) 
                                            }
                                    }} 
                         style={{backgroundColor:"red", color:"white", marginLeft:"5px"}}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!isState && Products?.map((data) => (
                  <tr key={data._id}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{formatCash(data.price)}</td>
                    <td><img style={{width:"150px"}} src={data.photos[0]} alt='image'></img></td>
                    <td>{data.category}</td>
                    <td>
                        <button onClick={() => {
                            if(role === "admin"){
                              navigate(`/home/edit/${data._id}`)  
                            }else {
                                alert('UnAuthorization')
                            }
                        }}
                        style={{backgroundColor:"#22ca80", color:"white"}}>Edit</button>
                        <button onClick={() =>  {
                                            if(confirm("are you suer?")){

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/delete-product', {
                                            method: "POST",
                                            headers: {
                                                "Content-Type" : "application/json"
                                            },
                                            body: JSON.stringify({id: data._id})
                                        }).then(res => {
                                            if(res.ok){
                                                alert('Deleted!')
                                                window.location.reload();
                                            }else{
                                                alert('UnAuthorization')
                                            }
                                        }) 
                                            }
                                    }} 
                         style={{backgroundColor:"red", color:"white", marginLeft:"5px"}}>Delete</button>
                    </td>
                  </tr>
                ))}
    
            </table>
        </>
    )
}
