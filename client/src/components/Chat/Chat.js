import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Conversation from '../conversation/Conversation'
import Message from '../message/message'
import "./chat.css"
import { BsArrowLeft } from "react-icons/bs";
import {io} from "socket.io-client"
import { ChatState } from '../../context/ChatProvider'
import Headers from './Headers'

function Chat() {
  const {auth} = useSelector((state) => ({...state}))
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalmessages, setArrivalMessages] = useState(null);
  const {notification, setNotification} = ChatState();
  const socket = useRef()
  const scrollRef = useRef();

  useEffect(() =>{
    socket.current = io("ws://localhost:8900");
  },[])

  useEffect(() => {
    socket.current.emit("addUser", auth.user._id)
    socket.current.on("getUsers", users =>{
      console.log('Socket Id and User Id', users)
    })
  },[auth])


  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/getconversation/${auth.user._id}`)
        console.log('Conversations',res.data)
        setConversation(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversation()
  }, [auth.user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/getmessage/${currentChat?._id}`)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  },[currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: auth.user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    const receiverId = currentChat.members.find(member => member !== auth.user._id)
    console.log('receiverId', receiverId)

    socket.current.emit("sendMessage", {
      senderId: auth.user._id,
      receiverId,
      text: newMessage 
    })


    try {
      const res = await axios.post("/newmessage", message)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(notification, '----------------')

  useEffect(() =>{
   socket.current.on("getMessage", data => {
    setArrivalMessages({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    })
    if(!notification.includes(data)){
      setNotification([data], ...notification)
    }
   }) 
  },[])

  useEffect(() =>{
    arrivalmessages && currentChat?.members.includes(arrivalmessages.sender) &&
    setMessages((prev) => [...prev, arrivalmessages])
  },[arrivalmessages, currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  console.log('messages',messages)

  return (
    <div style={{
        height: "100vh",
        maxWidth: "1068px",
        margin: 'auto',
    }}>
      <div className='messenger'>
        <div className='ChatMenu'>
          <div className='chatMenuWrapper'>
            <span className='MenuText'>Users List</span>
            {conversation.map(c => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={auth.user}/>
              </div>
            ))}
          </div>
        </div>
        <div className='ChatBox'>
          <div className='chatBoxWrapper'>
            {
              currentChat ?
              
            <>
            <Headers currentChat={currentChat} currentUser={auth.user._id} />
            <div className='chatBoxTop'>
                {
                  messages.map(m => (
                    <div key={m._id} ref={scrollRef}>
                      <Message key={m._id} messages={m} own={m.sender === auth.user._id } />
                    </div>
                  ))
                }
                </div><div className='chatBoxBottom'>
                    <textarea 
                      className='chatMessageInput' 
                      onChange={(e) => setNewMessage(e.target.value)} 
                      value={newMessage} 
                      placeholder='write something...'></textarea>
                    <button 
                      className='chatSubmitButton'
                      onClick={handleSubmit}
                      >Send</button>
                  </div></> :
                    <span className='noConversationText'><BsArrowLeft/> Open a conversation to start a chat</span>
                  }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat