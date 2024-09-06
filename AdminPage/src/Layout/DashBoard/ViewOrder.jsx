import { useParams } from "react-router-dom";
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import style from './ViewOrder.module.css';
import  formatCash  from '../../../../FrontendClient/src/UI/TranslateMoney.js';

export function ViewOrder() {

    const { orderId } = useParams();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token  
    const Detail = useFetch('https://fullstackshop-twinst.onrender.com/user/history/'+ orderId)
    const user = Detail?.user;
    const item = Detail?.orders;
    return (
        <>
             <div className={style.container}>
                <div className={style.inforData}>
                    <h2>INFORMATION ORDER</h2>
                    <p>ID User: {user?.userId}</p>
                    <p>FullName: {user?.fullName}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Address: {user?.address}</p>
                    <p>Total: {formatCash(Detail?.totalPrice)}VND</p>
                </div>
                <table className={style.table}>
                    <tr>
                        <th style={{width:"20"}}>ID Product</th>
                        <th  style={{width:"20"}}>Image</th>
                        <th  style={{width:"20"}}>Name</th>
                        <th  style={{width:"10"}}>Price</th>
                        <th  style={{width:"10"}}>Quantity</th>
                        <th style={{width:"10"}}>Action</th>
                    </tr>
                    {item?.map(data => (
                        <tr className={style.product} key={data._id}>
                            <td>{data.item._id}</td>
                            <td><img style={{width:"150px"}} src={data.item.photos[0]} alt='image'></img></td>
                            <td>{data.item.name}</td>
                            <td>{data.item.price}</td>
                            <td>{data.quantity}</td>
                            <td>
                                <button onClick={() => {
                                                    fetch('https://fullstackshop-twinst.onrender.com/admin/count',{
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type":"application/json",
                                                            "Authorization":"Bearer " + token
                                                        },
                                                        body: JSON.stringify({number: data.quantity, name: data.item.name})
                                                    }).then(res => {
                                                        if(res.ok) {
                                                            alert('Updated!')
                                                        }else{
                                                            alert('UnAUthorization')
                                                        }
                                                    })
                                            }} 
                                style={{color:"red"}}>Update Count</button>
                            </td>
                        </tr>
                    ))}
            </table>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                <button onClick={() => {
                        fetch('https://fullstackshop-twinst.onrender.com/admin/status/'+ orderId ,{
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "Authorization":"Bearer " + token
                            },
                            body: JSON.stringify({status: "shipping"})
                        }).then(res => {
                            if(res.ok) {
                                alert('Status Updated!')
                            }else{
                                alert('UnAUthorization')
                            }
                        })
                }} 
                style={{color:"orange"}}>Shipping</button>
                <button  onClick={() => {
                        fetch('https://fullstackshop-twinst.onrender.com/admin/status/'+ orderId ,{
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "Authorization":"Bearer " + token
                            },
                            body: JSON.stringify({status: "completed"})
                        }).then(res => {
                            if(res.ok) {
                                alert('Status Updated!')
                            }else{
                                alert('UnAUthorization')
                            }
                        })
                }} 
                style={{color:"green"}}>Completed</button>
                <button  onClick={() => {
                        fetch('https://fullstackshop-twinst.onrender.com/admin/status/'+ orderId ,{
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json",
                                "Authorization":"Bearer " + token
                            },
                            body: JSON.stringify({status: "canceled"})
                        }).then(res => {
                            if(res.ok) {
                                alert('Status Updated!')
                            }else{
                                alert('UnAUthorization')
                            }
                        })
                }} 
                style={{color:"red"}}>Canceled</button>
            </div>
            </div>
        </>
    )
}
