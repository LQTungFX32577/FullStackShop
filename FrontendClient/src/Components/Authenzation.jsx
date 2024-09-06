/* eslint-disable react-refresh/only-export-components */
import style from "./Authenzation.module.css";
import {  Link, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../UI/AuthRedux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";




function Authenzation() {
    const isAuthen = useSelector(state => state.authentication.authentication)
    const room = Math.floor(Math.random() * 100);
    const dispatch = useDispatch();
    const [ mode ] = useSearchParams();
    const [hide, setHide] = useState(true);
    const isLogin = mode.get('mode') === "login";
    const navigate = useNavigate();
    
    function showPass() {
        setHide(!hide);
    }

    function Login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData);
            if(!isLogin){
                fetch('http://localhost:3100/user/signup', {
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(userData)
                }).then(res => {
                    if(res.status === 500) {
                        alert('E-mail already used!')
                    }else { 
                        const success = window.confirm('SignUp Success! go to logIn?');
                        if(success) {
                            navigate("?mode=login")
                            toast.success("success!");
                        }
                        return res.json()
                    }
                })
            }
            else {
                console.log(userData);
                
                fetch('http://localhost:3100/user/login', {
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(userData)
                }).then(res => {
                    if(res.status === 500) {
                        toast.warning('incorrect E-mail or Password')
                    }else { 
                        dispatch(authAction.login())
                        toast("Log in!");
                        navigate("/"); 
                        return res.json()
                    }
                }).then(data => {
                    localStorage.setItem('userData', JSON.stringify(data))
                    localStorage.setItem('room', room)
                })  
        }        
               
    }
        
    return (
        <>
            <div className={style.container}>
                <form onSubmit={Login} className={style.content}>
                     <p>{isLogin ?  "Sign in" : "Sign Up"}</p>
                     {!isLogin && <input type="text" placeholder="Full Name" name="name" required></input>}
                     <input  type="email" placeholder="Email" name="email" required></input>
                     <input type={hide ? "password" : "text"} placeholder="Password" name="password" required minLength={6}></input>
                     <i style={{cursor: "pointer", width:"10px", marginLeft:"300px"}} onClick={showPass}><FontAwesomeIcon icon={hide ? faEyeSlash : faEye}/></i>
                     {!isLogin && <input  placeholder="Phone" name="phone" type="text"></input>}
                     {!isLogin  && <input  placeholder="your code" name="status" type={hide ? "password":"text"}></input>}
                     <button type="submit">{isLogin? "Sign In" : "Sign Up"}</button>
                    {!isAuthen && <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? "Create an account ?" : "Log In ? "}</Link>}
                </form>
            </div>
        </>
    )
}
export default Authenzation