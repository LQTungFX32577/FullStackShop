import {  NavLink, useRouteLoaderData, useSearchParams } from "react-router-dom"
import ProductList from "../Components/ProductList";
import style from "./ShopPage.module.css";


function ShopPage() {
    const data = useRouteLoaderData('root');
    const [id] = useSearchParams()
    const category = id.get('categories');
    const ProductsData = data.filter(data => {
       return data.category === category
    })
    return (
        <>
            <div className={style.container}>
                <h1>SHOP</h1>
                <div className={style.content}>
                   <nav className={style.nav}>
                        <h1>CATEGORIES</h1>
                        <p className={style.title}>APPLE</p>
                        <NavLink  to="/shop?categories=all"  end>ALL</NavLink>
                        <h2>IPHONE & MAC</h2>
                        <NavLink to="/shop?categories=iphone">Iphone</NavLink>
                        <NavLink to="/shop?categories=ipad" >Ipad</NavLink>
                        <NavLink  to="/shop?categories=macbook" >MacBook</NavLink>
                        <h2>WireLess</h2>
                        <NavLink  to="/shop?categories=airpod" >AirPods</NavLink>
                        <NavLink  to="/shop?categories=watch" >Watch</NavLink>
                        <h2>Others</h2>
                        <NavLink  to="/shop?categories=mouse" >Mouse</NavLink>
                        <NavLink  to="/shop?categories=keyboard" >KeyBoard</NavLink>
                        <NavLink  to="/shop?categories=other" >Others</NavLink>
                   </nav>
                     
                    <ProductList Data={category == "all" ? data : ProductsData}/>
                </div>
            </div>
        </>
    )
}
export default ShopPage
