import { Link, NavLink } from "react-router-dom"
import style from "./NavigateBar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowDown, faArrowUp, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { authAction } from "../UI/AuthRedux"
import { useEffect, useState } from "react"

const cartIcon = <FontAwesomeIcon icon={faCartShopping} />
const loginIcon = <FontAwesomeIcon icon={faUser} />


function NavigateBar() {
    const [nav, setNav] = useState(false);
    const ProductData = useSelector(state => state.cart.productItem);
    const Product = JSON.parse(localStorage.getItem("Cart"));
    const [item, setItem]=useState();
    const authen = useSelector(state => state.authentication.authentication);
    const dispatch = useDispatch();
    const CurrentUser = JSON.parse(localStorage.getItem("userData"));
    function NavBarVigate() {
        setNav(!nav);
    }
    if(CurrentUser){
         dispatch(authAction.login())
    }
    useEffect(() => {
        setItem(Product);
    },[ProductData])
    return (
        <>
            <header className={style.header}>
                <nav>
                    <ul className={style.list}>
                    <li style={{color: "orange", marginTop:"20px"}}>
                        <NavLink to="/" className={({isActive}) => isActive ?  style.active : undefined } end>
                             Home
                        </NavLink>
                    </li>
                    <li style={{marginTop:"20px"}}>
                        <NavLink to='shop' className={({isActive}) => isActive ?  style.active : undefined }>
                            Shop
                        </NavLink>
                    </li>

                    <h1>TwinsT</h1>

                    <li className={style.tooltipCart}  style={{color: "gray" ,marginTop:"20px"}}>

                        <NavLink to='cart' data-c-tooltip="Cart" className={({isActive}) => isActive ?  style.active : undefined }>
                            {item && item.length}{cartIcon}
                        </NavLink>
                    </li>
                    <li className={style.tooltipLogin} style={{color: "gray" ,marginTop:"20px"}}>
                        <NavLink to={'/login?mode=signup'} data-c-tooltip="Login" className={({isActive}) => isActive ?  style.active : undefined }>
                            {loginIcon}
                        </NavLink>
                       {authen && 
                       <span className={style.span}>
                        <nav>
                        <p>Hello {CurrentUser?.name}</p>
                        <FontAwesomeIcon onClick={NavBarVigate} style={{position:"absolute", right:"310px",top:"80px", cursor:"pointer"}} icon={!nav ? faArrowDown : faArrowUp}/>
                        </nav>
                        {nav &&
                            <div className={style.choice}>
                                <Link onClick={()=>{if(confirm("Log Out ?")){dispatch(authAction.logout())}}} to="/">Log Out</Link>
                                <Link to="history">History</Link>
                                <a href="http://localhost:5174/" target="_blanc">Admin</a>
                            </div> 
                        }
                       </span>}
                    </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default NavigateBar