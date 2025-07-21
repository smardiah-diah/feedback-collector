"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function FeedbackForm() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({ name: "", topic: "", comment: "", sentiment: "neutral" });
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedCode = sessionStorage.getItem("feedback_code");
    if (!storedCode) router.push("/");
    setCode(storedCode);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("feedbacks").insert([{ ...form, code }]);
    await supabase.from("unique_codes").update({ is_used: true }).eq("code", code);

    sessionStorage.removeItem("feedback_code");
    router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Submit Feedback</h1>

      <input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <select name="topic" onChange={handleChange} className="w-full border px-4 py-2 rounded">
        <option value="">Select Topic</option>
        <option value="Design">Design</option>
        <option value="Usability">Usability</option>
        <option value="Performance">Performance</option>
      </select>

      <textarea
        name="comment"
        placeholder="Your comment"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        rows={4}
        required
      />

      <div className="space-x-4">
        <label><input type="radio" name="sentiment" value="positive" onChange={handleChange} /> 👍 Positive</label>
        <label><input type="radio" name="sentiment" value="neutral" onChange={handleChange} defaultChecked /> 😐 Neutral</label>
        <label><input type="radio" name="sentiment" value="negative" onChange={handleChange} /> 👎 Negative</label>
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
        Submit Feedback
      </button>
    </form>
  );
}
