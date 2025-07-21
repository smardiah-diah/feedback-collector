import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FeedbackTable from "../components/FeedbackTable";
import { supabase } from "../lib/supabaseClient";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    async function fetchFeedbacks() {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedbacks:", error);
      } else {
        setFeedbacks(data);
      }
    }

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard" />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">
            Good % (Chart Placeholder)
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            Bad % (Chart Placeholder)
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Feedback List</h2>
          <div className="bg-white p-4 rounded-xl shadow">
            <FeedbackTable data={feedbacks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
