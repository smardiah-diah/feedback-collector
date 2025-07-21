// src/pages/ThankYou.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="text-center p-6 bg-white rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-gray-600 text-lg">Your feedback has been submitted successfully.</p>
        </div>
        </div>
    );
}