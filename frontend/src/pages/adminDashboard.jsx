import { useState } from "react";

export default function AdminDashboard() {
  // Mock stats data
  const stats = { students: 120, forms: 15, pending: 34, verified: 86 };

  // Mock submissions data
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      student: "Ayush Agarwal",
      form: "Scholarship Form",
      data: "{score: 92}",
      status: "pending",
    },
    {
      id: 2,
      student: "Riya Sharma",
      form: "Hostel Form",
      data: "{room: B-23}",
      status: "pending",
    },
    {
      id: 3,
      student: "Arjun Mehta",
      form: "Library Access",
      data: "{books: 5}",
      status: "pending",
    },
  ]);

  // Handle verify/reject
  const handleAction = (id, action) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: action } : s))
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Stats */}
      <div className="w-64 bg-white shadow-lg p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>

        <div className="bg-gray-50 border rounded-lg p-4 shadow">
          Students: {stats.students}
        </div>
        <div className="bg-gray-50 border rounded-lg p-4 shadow">
          Forms Created: {stats.forms}
        </div>
        <div className="bg-gray-50 border rounded-lg p-4 shadow">
          Pending: {stats.pending}
        </div>
        <div className="bg-gray-50 border rounded-lg p-4 shadow">
          Verified: {stats.verified}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Pending Submissions</h1>

        <div className="grid gap-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="bg-white border rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{s.student}</p>
                <p className="text-sm text-gray-600">Form: {s.form}</p>
                <p className="text-sm text-gray-600">Data: {s.data}</p>
                <p className="text-sm text-gray-600">Status: {s.status}</p>
              </div>
              {s.status === "pending" && (
                <div className="space-x-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => handleAction(s.id, "verified")}
                  >
                    Verify
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleAction(s.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
