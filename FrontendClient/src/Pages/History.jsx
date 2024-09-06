import style from './History.module.css';
import { useFetch } from "../Hook/Fetch";
import formatCash from "../UI/TranslateMoney";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

function HistoryPage() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData.userId;
    const history = useFetch('https://fullstackshop-twinst.onrender.com/user/history');
    const order = history?.filter(data => {
        return data.user.userId === userId;
    })
    console.log(order);
    
    return (
        <>
             <div className={style.container}>
                <header className={style.header}>
                        <h1>HISTORY</h1>
                        <span className={style.span}>
                            <p>HISTORY</p>
                        </span>
                </header>
                <table className={style.table}>
                    <tr>
                        <th style={{width: "15%"}}>ID User</th>
                        <th style={{width: "10%"}}>Name</th>
                        <th style={{width: "10%"}}>Phone</th>
                        <th style={{width: "20%"}}>Address</th>
                        <th style={{width: "10%"}}>Total</th>
                        <th style={{width: "10%"}}>Status</th>
                        <th style={{width: "15%"}}>Product</th>
                        <th style={{width: "10%"}}>Detail</th>
                    </tr>
                     {order && order.map(historyData => (
                        <tr key={historyData._id}>
                            <td>{historyData.user.userId}</td>
                            <td>{historyData.user.fullName}</td>
                            <td>{historyData.user.phone}</td>
                            <td>{historyData.user.address}</td>
                            <td>{formatCash(historyData.totalPrice)}</td>
                            <td>{historyData.status}</td>
                            {historyData.orders.map(data => (
                              <tr key={data._id}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{textAlign:"center"}}>{data.item.name}</td>
                              </tr>
                            ))}
                            <td><button onClick={() => navigate(`/history/${historyData._id}`)}>Detail <FontAwesomeIcon icon={faArrowCircleRight}/></button></td>
                        </tr>
                     ))}
            </table>
            </div>
        </>
    )
}
export default HistoryPage
