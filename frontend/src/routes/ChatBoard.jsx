import MainSideBar from "../components/sidebar/MainSideBar";
import { useState, useEffect, useRef } from "react";

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
            const newMessages = [...messages, text];
            setMessages(newMessages);
            setText('');
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex h-screen">
            <MainSideBar name="Markus Jabar" email="abj@gmail.com" />
            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Communication Board</h1>

                <div className="flex-grow overflow-y-auto p-4" style={{ height: '90vh' }}>
                    <ul className="flex flex-col space-y-4">
                        {messages.map((m, index) => (
                            <li key={index} className="bg-green-300 max-w-3xl p-2 rounded-xl self-end whitespace-pre-wrap">{m}</li>
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
                        className="px-2 w-3/5 rounded-lg bg-slate-300"
                    />
                    <button onClick={handleClick} className="px-4 py-2 ml-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
