// src/components/FeedbackCard.jsx
import React from "react";

const FeedbackCard = ({ name, topic, comment, sentiment }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm mb-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            sentiment === "Good"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {sentiment}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1">
        <strong>Topic:</strong> {topic}
      </p>
      <p className="text-gray-700 text-sm">{comment}</p>
    </div>
  );
};

export default FeedbackCard;
