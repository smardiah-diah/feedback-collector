import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm() {
  const [rating, setRating] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const code = localStorage.getItem("unique_code");
    if (!code) {
      navigate("/");
    }
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Oops! Please let us know how your experience was.");
      return;
    }

    if (selectedTags.length === 0) {
      setError("Don't forget to tell us what stood out the most!");
      return;
    }

    const name = localStorage.getItem("user_name");
    const code = localStorage.getItem("unique_code");

    setSubmitting(true);

    const { data, error: insertError } = await supabase.from("feedbacks").insert([
      {
        sentiment: rating,
        topic: selectedTags.join(", "),
        comment: message,
        name: name,
        unique_code: code,
      },
    ]);

    if (insertError) {
      setError("Sorry, we couldn’t save your feedback. Please try again shortly.");
      console.error(insertError);
    } else {
      const { error: updateError } = await supabase
        .from("unique_codes")
        .update({ is_used: true, created_at: new Date().toISOString() })
        .eq("code", code);

      if (updateError) {
        console.error("Failed to update is_used:", updateError);
      } else {
        console.log("Unique code marked as used successfully.");
      }

      localStorage.removeItem("unique_code");
      localStorage.removeItem("user_name");

      navigate("/thank-you");
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Give Your Feedback
      </h1>

      {/* Rating */}
      <div>
        <p className="font-medium mb-2">
          How was your experience? <span className="text-red-500">*</span>
        </p>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setRating("Good")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition ${
              rating === "Good"
                ? "bg-green-100 border-green-500"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">😊</span>
            <span>Good</span>
          </button>
          <button
            type="button"
            onClick={() => setRating("Bad")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition ${
              rating === "Bad"
                ? "bg-red-100 border-red-500"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">😡</span>
            <span>Bad</span>
          </button>
        </div>
      </div>

      {/* Tags */}
      {rating && (
        <div>
          <p className="font-medium mb-2">
            {rating === "Good" ? "What did you like?" : "What can we improve?"}
            <span className="text-red-500"> *</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {(rating === "Good"
              ? ["UI", "Features", "Ease of Use", "Support"]
              : ["UI", "Performance", "Bugs", "Support", "Other"]
            ).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-4 py-1 rounded-full text-sm border transition ${
                  selectedTags.includes(tag)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block font-medium mb-1" htmlFor="message">
          Additional comments <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <textarea
          id="message"
          rows="4"
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
