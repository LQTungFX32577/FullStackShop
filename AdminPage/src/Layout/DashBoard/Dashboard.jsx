import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Dashboard.module.css'
import { faDollar, faFile, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import  formatCash  from '../../../../FrontendClient/src/UI/TranslateMoney.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
   
   const [page, setPage] = useState(1);
   const navigate = useNavigate();
   const[transaction,setTransaction] = useState();
   const Data = useFetch('http://localhost:3100/admin/dashboard');
   
   const userClients = Data?.user.length;
   const Order = Data?.order.length;
   
   let totalArr = [];
   totalArr.push(Data?.order.map(data => {
    return data.totalPrice
   }))
   const arr = totalArr.splice(0,1);
   console.log(totalArr);

   let totalPrice = arr[0]?.reduce((x,y) => x+y); 
   
   const EPM = (totalPrice/12).toFixed(0);
   useEffect(() => {
    fetch(`http://localhost:3100/admin/transaction/${page}`)
    .then(response => response.json())
    .then(data => setTransaction(data))
    .catch(err => console.log(err)
    )
},[page])
    function increase() {
        setPage(page + 1);  
    }
    function decrease() {
        setPage(page - 1);
    }

    return (
        <div className={style.content}>
            <h3>Dashboard</h3>
            <span className={style.span}>
                <nav style={{boxShadow:" 1px 3px 5px 3px #edf2f9;"}}>
                    <div>
                        <h2>{userClients}</h2>
                        <p style={{color:"gray", fontWeight:"500"}}>CLIENTS</p>
                    </div>
                    <FontAwesomeIcon style={{color:"gray", marginRight:"10px"}} icon={faUserPlus}/>
                </nav>
                <nav style={{backgroundColor:"#ffff", boxShadow:" 1px 3px 5px 3px ##edf2f9"}}>
                    <div>
                        <h2 style={{marginLeft:"20px"}}>{formatCash(EPM)}VND</h2>
                        <p style={{color:"gray", fontWeight:"500"}}>EARNING</p>
                    </div>
                    <FontAwesomeIcon style={{color:"gray", marginRight:"10px"}} icon={faDollar}/>
                </nav>
                <nav style={{backgroundColor:"#ffff", boxShadow:" 1px 3px 5px 3px ##edf2f9;"}}>
                    <div>
                        <h2>{Order}</h2>
                        <p style={{color:"gray", fontWeight:"500"}}>ORDERS</p>
                    </div>
                    <FontAwesomeIcon style={{color:"gray", marginRight:"10px"}} icon={faFile}/>
                </nav>
            </span>
            <div className={style.botContent}>
                <h3>history</h3>
                <span style={{display:"flex", justifyContent:"end", marginBottom:"30px", marginRight:"120px", gap:"1px"}}>
                    {page>1 &&<button onClick={decrease} className={style.buttont}>Previous</button>}
                    <input style={{width: "20px", textAlign:"center", borderRadius:"5px"}} value={page}/>
                {page<10 &&<button onClick={increase} className={style.buttont}>Next</button>}
                </span>
                <table className={style.table}>
                    <tr>
                        <th style={{width: "15%"}}>ID User</th>
                        <th style={{width: "5%"}}>Name</th>
                        <th style={{width: "10%"}}>Phone</th>
                        <th style={{width: "25%"}}>Address</th>
                        <th style={{width: "10%"}}>Total</th>
                        <th style={{width: "10%"}}>Status</th>
                        <th style={{width: "20%"}}>Product</th>
                        <th style={{width: "5%"}}>Detail</th>
                    </tr>
                     {transaction && transaction.map(data => (
                        <tr key={data._id}>
                            <td>{data.user.userId}</td>
                            <td>{data.user.fullName}</td>
                            <td>{data.user.phone}</td>
                            <td>{data.user.address}</td>
                            <td>{formatCash(data.totalPrice)}</td>
                            <td>{data.status}</td>
                            {data.orders.map(data => (
                              <tr key={data._id}>
                                <td>{data.item.name}</td>
                              </tr>
                            ))}
                            <td><button onClick={() => navigate(`/home/${data._id}`)} className={style.button}>Detail</button></td>
                        </tr>
                     ))}
            </table>
            </div>
            <div className={style.body}></div>
        </div>
    )
}