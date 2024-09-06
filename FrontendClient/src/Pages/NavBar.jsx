import { Outlet } from "react-router-dom";
import NavigateBar from "../Components/NavigateBar";
import Footer from "../Components/Footer";
import { Provider } from "react-redux";
import style from "./NavBar.module.css"
import { store } from "../UI";
import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {   faArrowUp,faUserCheck,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { io } from 'socket.io-client';
import { useEffect } from "react";


function NavBar() {
    const room = localStorage.getItem('room');
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState();
    const chatvalue = useRef();
    const chatBox = useRef()
    const socket = useRef()
    const user = JSON.parse(localStorage.getItem("userData"));
    const userName = user?.name;
    const userId = user?.userId
    const [popup, setPopup] = useState(false);

    function showPopup() {
        if(popup){
            setPopup(false)
        }else{
            setPopup(true)
        }
    }
    useEffect(() => {
        socket.current = io("https://fullstackshop-twinst.onrender.com")
        socket.current.on('sendDataServer', dataGot => {
        console.log(dataGot)
        setId(dataGot.data.id);
        setMess(oldMsgs => [...oldMsgs, dataGot.data])
      })
      return () => {
        socket.current.disconnect();
      };
        
      },[])
     
    
    function sendMess(e) {
        e.preventDefault();
        if(message !== null) {
            const msg = {
              content: message, 
              id: userId,
              room: room
            }
            socket.current.emit('sendDataClient', msg)
        }
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
        chatvalue.current.value ='';
        
    }
    const renderMess =  mess.map((m, index) => (
        <p 
            key={index} 
            className={m.id === id ? style.adminChat : style.ortherContent  }
        >
          {m.content}
        </p>
    ))
    function JoinRoom() {
       socket.current.emit('roomData',{room: room, userId: userId} )
    }
    function exitRoom() {
       socket.current.emit('exit',{room: room, userId: userId} )
    }
    return ( 
        <>
            <Provider store={store}>

                <NavigateBar/>

                <div style={{ marginTop: "100px"}}>
                    <Outlet/>
                </div>
                {popup && <div className={style.popup}>
                    <div style={{display:"flex", justifyContent:"space-between ", alignItems:"center"}}>
                        <h3><FontAwesomeIcon icon={faUserCheck}/> Support Live Chat</h3>
                        <button onClick={JoinRoom} style={{height:"fit-content"}}>Join Room</button>
                        <button onClick={exitRoom} style={{height:"fit-content"}}>End Coversation</button>
                    </div>
                    <div ref={chatBox}  className={style.chatContent}>
                    <p className={style.ortherContent} style={{width:"60%"}}>Hello {userName}! Welcome to our Shop, Can We Help Something ?</p>
                        {renderMess}
                    </div>
                    <form onSubmit={sendMess} className={style.send}>
                        <input ref={chatvalue}  onChange={(e) => setMessage(e.target.value)}  type="text" placeholder="Messenger..."></input>
                        <button type="submit"><FontAwesomeIcon icon={faPaperPlane}/></button>
                    </form>
                </div>}
                <div className={style.scroll}>
                    <button onClick={() => window.scrollTo({top:0, behavior:"smooth"})}><FontAwesomeIcon icon={faArrowUp} style={{marginLeft: "-5px", fontSize: "20px", color:"orange"}}/></button>
                </div>
                <div className={style.content}>    
                    <button onClick={showPopup}><img className={style.img} src="../../public/pngwing.com.png" alt="icon"/></button>
                </div>
                <div style={{marginLeft: "0", backgroundColor: "black"}}>
                    <Footer/>
                </div>

            </Provider>
            
        </>
    )
}
export default NavBar
