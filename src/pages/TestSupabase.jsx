// src/pages/TestSupabase.jsx
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const TestSupabase = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('feedbacks')  // ganti sesuai nama tabel kamu
        .select('*')
        .limit(1)

      if (error) {
        console.error("❌ Error:", error)
        setError(error)
      } else {
        console.log("✅ Supabase connected! Sample data:", data)
        setData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Test Supabase Connection</h2>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <pre className="text-sm mt-2 bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default TestSupabase
