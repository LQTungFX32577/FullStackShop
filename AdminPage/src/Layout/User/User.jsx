import style from './user.module.css'
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
export function User() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const token = user?.token
    const userData = useFetch('http://localhost:3100/admin/dashboard');
    console.log(userData);
    
    return (
        <>
                <h1 className={style.h1}>All User</h1>
                <table className={style.table}>
                <tr>
                <th>#</th>
                <th className={style.th2}>ID</th>
                <th className={style.th2}>UserName</th>
                <th className={style.th3}>Email</th>
                <th className={style.th4}>Phone</th>
                <th className={style.th5}>Roll</th>
                <th className={style.th5}>Action</th>
                </tr>
                {userData && userData?.user.map((data,index) => (
                  <tr key={data._id}>
                    <td>{index+1}</td>
                    <td>{data._id}</td>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.role}</td>
                    <td>{data.role ==="customer"  && <button  onClick={() =>  {
                                            if(confirm("are you suer?")){

                                            fetch('http://localhost:3100/admin/update-user', {
                                              method: "POST",
                                              headers: {
                                                  "Content-Type" : "application/json",
                                                  "Authorization": "Bearer " + token
                                              },
                                              body: JSON.stringify({id: data._id})
                                            }).then(res => {
                                                        if(res.ok) {
                                                            alert('Updated!')
                                                            window.location.reload();
                                                        }else{
                                                            alert('UnAUthorization')
                                                        }
                                                    }) 
                                            }
                                           }} className={style.th9}>Update</button>}</td>
                  </tr>
                ))}
    
            </table>
        </>
    )
}