import { NavLink } from "react-router-dom";
import style from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBox, faMessage,  faPlusSquare, faSignOut, faTable,  faUser } from '@fortawesome/free-solid-svg-icons'
export function Nav() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const role = user.role
    return (
        <>
            <div className={style.content}>
                <h2>TwinsT Manager Page</h2>
                <NavLink to='/home' className={({isActive}) => isActive ?  style.active : undefined } end><FontAwesomeIcon icon={faTable}/> DashBoard</NavLink>
                <NavLink to='/home/user' className={({isActive}) => isActive ?  style.active : undefined }><FontAwesomeIcon icon={faUser}/> User</NavLink>
                <NavLink to='/home/product' className={({isActive}) => isActive ?  style.active : undefined }><FontAwesomeIcon icon={faBox}/> Product</NavLink>
                {role ==="admin" && <NavLink to='/home/add_product' className={({isActive}) => isActive ?  style.active : undefined }><FontAwesomeIcon icon={faPlusSquare}/> AddProduct</NavLink>}
                <NavLink to='/home/live_chat' className={({isActive}) => isActive ?  style.active : undefined }><FontAwesomeIcon icon={faMessage}/> LiveChat</NavLink>
                <button onClick={() => {localStorage.removeItem('userData'); window.location.href="http://localhost:5173"}} style={{textAlign:"left", width:"30%"}}><FontAwesomeIcon icon={faSignOut}/></button>
            </div>
        </>
    )
}