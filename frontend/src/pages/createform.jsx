import { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../components/navbarAdmin";
import InputPlace from "../components/inputPlace";
import Footer from "../components/footer";

function CreateForm() {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState(""); // Optional: Form title
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ➤ Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", type: "text", required: false, options: [] }
    ]);
  };

  const updateQuestion = (index, newText) => {
    const updated = [...questions];
    updated[index].text = newText;
    setQuestions(updated);
  };

  const updateQuestionType = (index, newType) => {
    const updated = [...questions];
    updated[index].type = newType;
    if (newType === "mcq" && !Array.isArray(updated[index].options)) {
      updated[index].options = [""];
    }
    setQuestions(updated);
  };

  const toggleRequired = (index) => {
    const updated = [...questions];
    updated[index].required = !updated[index].required;
    setQuestions(updated);
  };

  const addMcqOption = (index) => {
    const updated = [...questions];
    if (!Array.isArray(updated[index].options)) updated[index].options = [""];
    else updated[index].options.push("");
    setQuestions(updated);
  };

  const updateMcqOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    if (!Array.isArray(updated[qIndex].options)) return;
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const removeMcqOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (!Array.isArray(updated[qIndex].options)) return;
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
    if (updated[qIndex].options.length === 0) updated[qIndex].options = [""];
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // ➤ Submit form via Axios
  const handleSubmit = async () => {
    if (!formTitle.trim()) {
      setMessage("Form title is required");
      return;
    }
    if (questions.length === 0) {
      setMessage("Add at least one question");
      return;
    }

    const payload = {
      title: formTitle,
      questions: questions.map((q) => ({
        question: q.text,
        type: q.type,
        required: q.required,
        options:
          q.type === "mcq"
            ? { create: q.options.filter((o) => o.trim() !== "").map((opt) => ({ option: opt })) }
            : undefined
      }))
    };

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/createForm", payload);
      setMessage("Form created successfully!");
      setFormTitle("");
      setQuestions([]);
      console.log("Response:", res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Network or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center">
        <NavbarAdmin />
        <div className="mt-24 w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold pb-4">Create Form</h2>

          <div className="bg-gray-200 rounded-lg p-6 space-y-4">
            {/* Form Title */}
            <input
              type="text"
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-400"
            />

            {/* Add Question Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Add Questions</h3>
              <button
                onClick={addQuestion}
                className="text-lg font-bold px-3 py-1 rounded-md bg-black text-white"
              >
                +
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {/* Question Type Selector */}
                    <select
                      value={q.type}
                      onChange={(e) => updateQuestionType(idx, e.target.value)}
                      className="px-3 py-2 rounded-md bg-white text-black border border-gray-300"
                    >
                      <option value="text">Text</option>
                      <option value="mcq">MCQ</option>
                      <option value="number">Number</option>
                      <option value="email">Email</option>
                    </select>

                    {/* Question Text Input (always text) */}
                    <div className="flex-1">
                      <InputPlace
                        placeholder="question"
                        value={q.text}
                        onChange={(e) => updateQuestion(idx, e.target.value)}
                        type="text"
                      />
                    </div>

                    {/* Required Checkbox */}
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={() => toggleRequired(idx)}
                      />
                      Required
                    </label>

                    {/* Delete Question Button */}
                    <button
                      onClick={() => deleteQuestion(idx)}
                      className="px-3 py-2 rounded-md bg-white hover:text-red-500 text-black"
                    >
                      Delete
                    </button>
                  </div>

                  {/* MCQ Options */}
                  {q.type === "mcq" && (
                    <div className="ml-0 sm:ml-28 space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2">
                          <InputPlace
                            placeholder={`Option ${oIdx + 1}`}
                            value={opt}
                            onChange={(e) => updateMcqOption(idx, oIdx, e.target.value)}
                          />
                          <button
                            onClick={() => removeMcqOption(idx, oIdx)}
                            className="px-2 py-1 rounded-md bg-white text-black border hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addMcqOption(idx)}
                        className="px-3 py-1 rounded-md bg-black text-white"
                      >
                        + Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message */}
            {message && <p className="text-red-500">{message}</p>}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md"
            >
              {loading ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateForm;
