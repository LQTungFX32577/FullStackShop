import style from './Product.module.css';
import  formatCash  from '../../../../FrontendClient/src/UI/TranslateMoney.js';
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import { useState } from 'react';

export function RestoreProduct() {

    const user = JSON.parse(localStorage.getItem('userData'));
    const token = user?.token
    const userData = useFetch('https://fullstackshop-twinst.onrender.com/admin//product-trash');
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
                    <h1 className={style.h1}>Deleted Product</h1>
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
                        <button onClick={() =>  {

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/product-restore', {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type" : "application/json",
                                                "Authorization": "Bearer " + token
                                            },
                                            body: JSON.stringify({id: data._id})
                                        }) 
                                            window.location.reload();
                                    }}  
                        style={{backgroundColor:"#22ca80", color:"white"}}>Restore</button>
                        <button onClick={() =>  {
                                            if(confirm("are you suer?")){

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/delete-product-force', {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type" : "application/json",
                                                "Authorization": "Bearer " + token
                                            },
                                            body: JSON.stringify({id: data._id})
                                        })
                                            window.location.reload();
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
                        <button onClick={() =>  {

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/product-restore', {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type" : "application/json",
                                                "Authorization": "Bearer " + token
                                            },
                                            body: JSON.stringify({id: data._id})
                                        }) 
                                            window.location.reload();
                                    }}  
                        style={{backgroundColor:"#22ca80", color:"white"}}>Restore</button>
                        <button onClick={() =>  {
                                            if(confirm("are you suer?")){

                                            fetch('https://fullstackshop-twinst.onrender.com/admin/delete-product-force', {
                                            method: "DELETE",
                                            headers: {
                                                "Content-Type" : "application/json",
                                                "Authorization": "Bearer " + token
                                            },
                                            body: JSON.stringify({id: data._id})
                                        }) 
                                            window.location.reload();
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
