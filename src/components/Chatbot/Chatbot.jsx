import React, { useState } from 'react';
import chatbot from "../../assets/chatbot.png";
import close from "../../assets/close.png";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi there! How can I help you today?' }
    ]);
    const [inputText, setInputText] = useState('');

    // Toggle chatbot visibility
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // Handle user message submission
    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message to chat history
        const userMessage = { sender: 'user', text: inputText };
        setMessages([...messages, userMessage]);

        // Clear input field
        setInputText('');

        // Simulate bot response
        setTimeout(() => {
            const botMessage = { sender: 'bot', text: `Here's a simulated answer to: "${inputText}"` };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4">
            {isOpen ? (
                <div className="w-86 h-screen bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-blue-500 text-white font-semibold text-lg px-4 py-2 flex justify-between items-center rounded-t-lg">
                        Chatbot Assistant
                        <button onClick={toggleChatbot}>
                            <img className="h-6 w-6" src={close} alt="Close Chat" />
                        </button>
                    </div>

                    {/* Messages Section */}
                    <div className="p-4 flex-grow overflow-y-auto space-y-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} 
                                    p-3 rounded-lg max-w-xs`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div className="flex items-center p-2 border-t border-gray-300">
                        <input
                            type="text"
                            className="flex-grow p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none"
                            placeholder="Type your message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center cursor-pointer p-3 bg-blue-500 text-white rounded-full shadow-lg"
                    onClick={toggleChatbot}
                >
                    <img className="h-8 w-8" src={chatbot} alt="Chatbot Icon" />
                    <span className="ml-2">Chat with Bot</span>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
