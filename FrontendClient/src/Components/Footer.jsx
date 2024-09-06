import style from "./Footer.module.css"

function Footer() {
    return (
        <>
            <div className={style.container}>
                 <div>
                    <h2>CUSTOMERS SERVICE</h2>
                    <p>Help & Contact Us</p>
                    <p>Returns & Refunds</p>
                    <p>Online Stored</p>
                    <p>Terms & Conditions</p>
                 </div>
                 <div>
                    <h2>COMPANY</h2>
                    <p>What We Do</p>
                    <p>Available Services</p>
                    <p>Latest Posts</p>
                    <p>FAQs</p>
                 </div>
                 <div>
                    <h2>SOCIAL MEDIA</h2>
                    <p>Twitter</p>
                    <p>FaceBook</p>
                    <p>Instagram</p>
                    <p>Pinterest</p>
                 </div>
            </div>
        </>
    )
}
export default Footer