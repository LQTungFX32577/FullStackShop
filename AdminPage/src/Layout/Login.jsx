import style from './Login.module.css'
import {  useNavigate } from "react-router-dom"
export function Login() {

const navigate = useNavigate();

  function checkValid(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    fetch('https://fullstackshop-twinst.onrender.com/user/login', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(userData)
    }).then(res => {
        if(res.status === 500) {
            alert('incorrect E-mail or Password')
        }else { 
            alert("Log in!");
            navigate("/home"); 
            return res.json()
        }
    }).then(data => {
        localStorage.setItem('userData', JSON.stringify(data))
        window.location.reload();
    })  
  }
    return (
        <>
            <div className={style.container}>
           <nav>
               <h3>TwinsT Website (Admin Page)</h3>
           </nav>
            <form onSubmit={checkValid}>
                <h1>Sign In</h1>
                <input type='email'  placeholder="Email" name="email" required></input>
                <input type="password"  placeholder="Password" name="password" required></input>
                <button type="submit"  className={style.buttonF}>Login</button>
            </form>
        </div>
        </>
    )
}
