import { useParams } from 'react-router-dom';
import style from './HistoryDetail.module.css';
import { useFetch } from "../Hook/Fetch";
import formatCash from "../UI/TranslateMoney";

function HistoryDetailPage() {
    const { detail } = useParams();
    
    const Detail = useFetch('https://fullstackshop-twinst.onrender.com/user/history/'+ detail)
    const user = Detail?.user;
    const item = Detail?.orders;
    return (
        <>
             <div className={style.container}>
                <header className={style.header}>
                        <h1>HISTORY DETAIL</h1>
                        <span className={style.span}>
                            <p>Detail</p>
                        </span>
                </header>
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
                        <th  style={{width:"30"}}>Image</th>
                        <th  style={{width:"30"}}>Name</th>
                        <th  style={{width:"10"}}>Price</th>
                        <th  style={{width:"10"}}>Quantity</th>
                    </tr>
                    {item?.map(data => (
                        <tr className={style.product} key={data._id}>
                            <td>{data.item._id}</td>
                            <td><img style={{width:"150px"}} src={data.item.photos[0]} alt='image'></img></td>
                            <td>{data.item.name}</td>
                            <td>{data.item.price}</td>
                            <td>{data.quantity}</td>
                        </tr>
                    ))}
            </table>
            </div>
        </>
    )
}
export default HistoryDetailPage
