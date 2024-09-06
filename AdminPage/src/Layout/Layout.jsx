import { Outlet } from "react-router-dom";
import { Nav } from "./Navigation/Nav";
import style from './Layout.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Layout() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token
    const navigate = useNavigate();
    useEffect(() => {
        if(!token) {
           navigate('/')
           window.location.reload();
        }
        fetch('http://localhost:3100/admin/auth', {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => {
            if(res.status !== 201){
                alert('unAuthor!')
                window.location.href = "http://localhost:5173"
                console.log('data')
            }else {
                return res.json()
            }
        })
    },[])
    
    return (
        <>
            <body className={style.content}>
            <span>
                <Nav/>
            </span>
            <span>
                <Outlet/>
            </span>
            </body>
        </>
    )
}