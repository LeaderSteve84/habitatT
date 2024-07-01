import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5174");

export default function ChatBoard() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleClick();
        }
    }

    function handleClick() {
        if (text !== '') {
            const newMessage = { text, sender: 'me' };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setText('');
            socket.emit("send_message", { text });
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("Received message: ", data); // Debugging line
            const newMessage = { text: data.text, sender: 'other' };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    return (
        <div className="flex flex-col h-full w-full bg-acent30">
            <h1 className="text-center bg-primary110 text-acent30 w-full p-4">Communication Board</h1>

            <div className="flex-grow overflow-y-auto p-4" style={{ height: '90vh' }}>
                <ul className="flex flex-col space-y-4">
                    {messages.map((m, index) => (
                        <li
                            key={index}
                            className={`max-w-max p-2 rounded-xl whitespace-pre-wrap self-${m.sender === 'me' ? 'end bg-green-300' : 'start bg-blue-600'}`}
                        >
                            {m.text}
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>

            <div className="px-2 flex justify-center items-center" style={{ height: '10vh' }}>
                <textarea
                    value={text}
                    placeholder="Type a message"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="px-2 w-3/5 rounded-lg bg-primary110 text-acent30"
                />
                <button onClick={handleClick} className="px-4 py-2 ml-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                    Send
                </button>
            </div>
        </div>
    );
}
