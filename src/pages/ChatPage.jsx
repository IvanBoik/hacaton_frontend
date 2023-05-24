import React from 'react';
import logo from "../img/logo.svg";
import search from "../img/search.svg";
import {NavLink} from "react-router-dom";
import managerAva from "../img/managerAva.svg";
import clientAva from "../img/clientAva.svg";
import send from "../img/send-message.svg";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react'
import ChatController from "../api/ChatController";

const from = prompt("from");
const to = prompt("to");



const ChatPage = () => {

    const chatList = [
        {title: "Поддержка", preview: "Иван Иванович, вам...", date: "вчера", isActive: true},
        {title: "Кредит", preview: "Иван Иванович, вам...", date: "7 апреля", isActive: false},
        {title: "Финансирование", preview: "Иван Иванович, вам...", date: "среда", isActive: false}
    ];

    const [messages, setMessages] = React.useState([
        {text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", date: "8:00", isUser: false},
        {text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", date: "8:01", isUser: true},
        {text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", date: "8:10", isUser: false},
        {text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", date: "8:10", isUser: false},
        {text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", date: "8:10", isUser: false},
    ]);

    let messageText = "";
    let stompClient;

    const onPrivateMessage = (payload) => {
        console.log(payload);
        console.log(payload.body);
        const date = new Date();

        let res = {
            text: payload.body,
            isUser: false,
            date: `${date.getHours()}:${date.getMinutes()}`,
            from: from,
            to: to,
            chatId: 1
        };
        console.log("get");
        console.log(res);
        setMessages([...messages, res]);
    }

    const onConnected = () => {
        stompClient.subscribe("/user/" + from + "/queue/messages", onPrivateMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({id: from},onConnected, onError);
        console.log("connect");
    }

    connect();

    const sendPrivateValue=()=>{
        if (stompClient) {
            let res = {
                text: "messageText",
                date: new Date(),
                from: from,
                to: to,
                chatId: 1
            };
            stompClient.send("/app/chat", {}, JSON.stringify(res));
            setMessages([...messages, res]);
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="chat-page">
            <header className="chat-page-header">
                <img src={logo} alt="" className="chat-page-header-logo"/>
                <div className="chat-page-header-links">
                    <NavLink className="chat-page-header-link">Главная</NavLink>
                    <NavLink className="chat-page-header-link">Профиль</NavLink>
                    <NavLink className="chat-page-header-link">Чаты</NavLink>
                </div>
                <NavLink className="chat-page-header-exit">Выйти</NavLink>
            </header>
            <main className="chat-page-main">
                <div className="chat-page-left-side">
                    <h2 className="chat-page-left-side-title">Сообщения</h2>
                    <ul className="chat-page-chat-list">
                        {chatList.map(x =>
                            <li className={x.isActive ? "chat-page-chat-item-active" : "chat-page-chat-item"}>
                                <div className="chat-page-chat-item-left-side">
                                    <h3 className="chat-page-chat-item-title">{x.title}</h3>
                                    <p className="chat-page-chat-item-preview">{x.preview}</p>
                                </div>
                                <p className="chat-page-chat-item-date">{x.date}</p>
                            </li>)}
                    </ul>
                </div>
                <div className="chat-page-right-side">
                    <div className="chat-page-right-side-header">
                        <p className="chat-page-right-side-header-title">Поддержка</p>
                        <img src={search} alt="" className="chat-page-right-side-header-img"/>
                    </div>
                    <div className="chat-page-right-side-main">
                        <ul className="chat-page-right-side-messages">
                            {messages.map(x =>
                            <li className={x.isUser ? "chat-page-right-side-user-message" : "chat-page-right-side-manager-message"}>
                                <img src={x.isUser ? clientAva : managerAva} alt="" className="chat-page-right-side-message-avatar"/>
                                <div className="chat-page-right-side-message-content-block">
                                    <p className="chat-page-right-side-message-text">{x.text}</p>
                                    <p className="chat-page-right-side-message-time">{x.date}</p>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                    <div className="chat-page-right-side-input-block">
                        <textarea className="chat-page-right-side-input" placeholder="Написать сообщение..."
                                  onChange={(event) => messageText = event.target.value} />
                        <button className="chat-page-right-side-send-message-button"
                                onClick={(event) => {
                                    sendPrivateValue(event);
                                    document.querySelector(".chat-page-right-side-messages").scrollIntoView({ behavior: 'smooth' });
                                }}>
                            <img src={send} alt="" className="chat-page-right-side-send-message-img"/>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;