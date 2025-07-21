"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CodeInput() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("unique_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (!data || data.is_used) {
      setError("Invalid or already used code.");
      return;
    }

    // simpan ke sessionStorage (agar bisa diakses di feedback form)
    sessionStorage.setItem("feedback_code", code.toUpperCase());
    router.push("/feedback-form");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-semibold mb-4">Enter Your Unique Code</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border px-4 py-2 w-full rounded"
        placeholder="Enter your 6-digit code"
        required
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </form>
  );
}
