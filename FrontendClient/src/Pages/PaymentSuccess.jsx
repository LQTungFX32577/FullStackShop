import {  useParams } from "react-router-dom";
import { useFetch } from "../Hook/Fetch"

export function PaymentSuccess() {
    const { userId } = useParams();
    const Data = useFetch('http://localhost:3100/user/bill/'+ userId)
    return (
        <>
            <div>
                <h1>PAYMENT SUCCESSFULLY</h1>
                
                {Data?.order.map((data,index) => (
                    <>
                        <p key={index}>{data}</p>
                        <button onClick={() => {
                             fetch('http://localhost:3100/user/inovation/'+ userId, {
                                method: "POST",
                                headers: {
                                    "Content-Type":"application/json"
                                },
                                body: JSON.stringify({order: data})
                            })
                        }}>Download your Bill</button>
                    </>
                ))}
                        <button onClick={() => window.location.href=`http://localhost:3100/user/invoice/${userId}`} >bill</button>
            </div>
        </>
    )
}