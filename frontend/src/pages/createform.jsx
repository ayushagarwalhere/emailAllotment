import React, { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../components/navbarAdmin";

const CreateForm = () => {
  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", type: "TEXT", required: true, options: [""] },
  ]);

  // Add new question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "TEXT", required: true, options: [""] }]);
  };

  // Remove question
  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  // Add option
  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  // Remove option
  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options.splice(oIndex, 1);
    setQuestions(updated);
  };

  // Handle changes
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // Submit form
  const handleSubmit = async () => {
    const payload = {
      formName,
      questions: questions.map((q) => ({
        question: q.question,
        type: q.type,
        required: q.required,
        options: q.options.filter((opt) => opt !== ""),
      })),
    };

    try {
      const res = await axios.post("http://localhost:5000/admin/forms", payload);
      alert("Form created successfully!");
      setFormName("");
      console.log(res);
      setQuestions([{ question: "", type: "TEXT", required: true, options: [""] }]);
    } catch (err) {
      console.error(err);
      alert("Error creating form");
    }
  };

  return (
    <>
      <NavbarAdmin/>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-20">
        <h2 className="text-2xl font-bold mb-4">Create Form</h2>

        <input
          type="text"
          placeholder="Form Name"
          value={formName}
          required
          onChange={(e) => setFormName(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border border-gray-200 rounded p-4 mb-4">
            <div className="flex items-center mb-3">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                required
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeQuestion(qIndex)}
                className="ml-3 text-white bg-red-600 p-2 rounded-md font-semibold"
              >
                Remove
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Type:</span>
                <select
                  value={q.type}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIndex].type = e.target.value;
                    if (e.target.value !== "MULTIPLE_CHOICE") updated[qIndex].options = [""];
                    setQuestions(updated);
                  }}
                  className="border border-gray-300 rounded p-1"
                >
                  <option value="TEXT">Text</option>
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                </select>
              </label>

              <label className="flex items-center space-x-2">
                <span className="text-gray-700">Required:</span>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[qIndex].required = e.target.checked;
                    setQuestions(updated);
                  }}
                  className="h-4 w-4"
                />
              </label>
            </div>

            {q.type === "MULTIPLE_CHOICE" && (
              <div className="pl-4">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-2 space-x-2">
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={opt}
                      required
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="ml-3 text-white bg-red-600 p-2 rounded-md font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addOption(qIndex)}
                  className="text-blue-500 hover:text-blue-700 font-semibold mt-1"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            onClick={addQuestion}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            + Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Create Form
          </button>
          
        </div>
      </div>  
    </>

  );
};

export default CreateForm;
