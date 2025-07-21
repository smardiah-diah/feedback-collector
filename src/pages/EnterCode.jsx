import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const EnterCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code) {
      setError("Oops! You forgot to enter your code.");
      return;
    }

    const trimmedCode = code.trim().toUpperCase();

    setLoading(true);

    try {
      const { data, error: supaError } = await supabase
        .from("unique_codes")
        .select("*");

      if (supaError) {
        console.error("Supabase Error:", supaError.message);
        setError("Failed to fetch data from the server.");
        return;
      }

      const matchByCode = data.find(
        (row) => row.code.toUpperCase() === trimmedCode
        );

        if (!matchByCode) {
        setError("The code you entered is invalid. Please check and try again.");
        return;
        }

        if (matchByCode.is_used) {
        setError("This code has already been used. Please use a different one.");
        return;
        }


      // Save to localStorage for feedback page
      localStorage.setItem("unique_code", trimmedCode);
      localStorage.setItem("user_name", matchByCode.name);
      console.log("Code:", trimmedCode, "Name:", matchByCode.name);
      navigate("/form/feedback");

    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter Your Unique Code</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Example: 123ABC"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-xl text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnterCode;
