import { faArrowRotateBack, faPaperPlane, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import style from './LiveChat.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  useEffect, useRef, useState } from 'react';
import { useFetch } from '../../../../FrontendClient/src/Hook/Fetch';
import { io } from 'socket.io-client';

export function LiveChat() {
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState();
    const user = JSON.parse(localStorage.getItem("userData"));
    const userId = user?.userId
    const chatvalue = useRef();
    const [room, setRoom] = useState();
    const socket = useRef()
    const roomChat = useFetch('https://fullstackshop-twinst.onrender.com/admin/chatRoom');
    const chatBox = useRef();
    const [roomData, setRoomData] = useState();

    useEffect(() => {
        socket.current = io("https://fullstackshop-twinst.onrender.com")
        socket.current.on('sendDataServer', dataGot => {
        console.log(dataGot)
        setId(dataGot.data.id);
        setRoom(dataGot.data.room);
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
        chatvalue.current.value ='';
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
        
    }
    const renderMess =  mess.map((m, index) => (
        <p 
            key={index} 
            className={m.id === id ? style.adminChat : style.ortherChat }
        >
          {m.content}
        </p>
    ))
    console.log(roomData);
    const oldMess = roomData?.map(data => (
        <p 
            key={data.userId} 
            className={data.userId === userId ? style.adminChat : style.ortherChat }
        >
          {data.message}
        </p>
    ))
    return (
        <>
            <body className={style.container}>
                <span style={{color:"gray"}}>
                    <h1>Chat</h1>
                    <h4>Apps / Chat</h4>
                </span>
                <div className={style.content}>
                     <div className={style.left}>
                        <input placeholder='search contact'></input>
                        <button onClick={() => window.location.reload()} style={{width:"fit-content", marginTop:"10px"}}><FontAwesomeIcon icon={faArrowRotateBack}/>Refresh</button>
                        {roomChat && roomChat.map(data => (
                            <h2 onClick={() => {
                                fetch('https://fullstackshop-twinst.onrender.com/admin/Room', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type":"application/json"
                                    },
                                    body: JSON.stringify({room: data.Room})
                                }).then(res => res.json()).then(data => setRoomData(data))
                            }} 
                            key={data.userId}><FontAwesomeIcon icon={faUserFriends}/>Room:{data.Room}-ID:{data.userId}</h2>
                        ))}
                     </div>
                     <div className={style.right}>
                             <div ref={chatBox} className={style.chatBox}>
                             {oldMess && oldMess}
                             {renderMess}
                             </div>
                            <form onSubmit={sendMess} className={style.form}>
                                <input ref={chatvalue} onChange={(e) => setMessage(e.target.value)} placeholder='type a message'></input>
                                <button type='submit'><FontAwesomeIcon style={{textAlign:"center" }} icon={faPaperPlane}/></button>
                            </form>
                     </div>
                </div>
            </body>
        </>
    )
}
