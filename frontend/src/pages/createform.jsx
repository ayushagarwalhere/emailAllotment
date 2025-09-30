import { useState } from "react";
import axios from "axios";
import NavbarAdmin from "../components/navbarAdmin";
import InputPlace from "../components/inputPlace";
import Footer from "../components/footer";

function CreateForm() {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState("");

  const addLocalQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", required: false, options: [], id: null }]);
  };

  const handleQuestionBlur = async (index) => {
    const q = questions[index];
    try {
      if (!q.id) {
        // New question → create it
        const res = await axios.post("/addQuestion", {
          formId: formTitle, // or your formId
          question: q.text,
          type: q.type,
          required: q.required,
          options: q.options.map(opt => ({ option: opt }))
        });
        const updated = [...questions];
        updated[index].id = res.data.id; // store questionId
        setQuestions(updated);
      } else {
        // Existing question → update it
        await axios.put(`/editQuestion/${q.id}`, {
          question: q.text,
          type: q.type,
          required: q.required,
          options: q.options.map(opt => ({ option: opt }))
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuestionText = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const updateQuestionType = (index, type) => {
    const updated = [...questions];
    updated[index].type = type;
    if (type === "mcq" && !Array.isArray(updated[index].options)) updated[index].options = [""];
    setQuestions(updated);
  };

  const toggleRequired = (index) => {
    const updated = [...questions];
    updated[index].required = !updated[index].required;
    setQuestions(updated);
  };

  const addMcqOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const updateMcqOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const removeMcqOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(updated);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center">
        <NavbarAdmin />
        <div className="mt-24 w-full max-w-6xl px-6">
          <h2 className="text-3xl font-bold pb-4">Create Form</h2>

          <div className="bg-gray-200 rounded-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Form Title / ID"
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-400"
            />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-semibold">Add Questions</h3>
              <button
                onClick={addLocalQuestion}
                className="text-lg font-bold px-3 py-1 rounded-md bg-black text-white"
              >
                +
              </button>
            </div>

            {questions.map((q, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-3">
                  <select
                    value={q.type}
                    onChange={e => updateQuestionType(idx, e.target.value)}
                    className="px-3 py-2 rounded-md bg-white text-black border border-gray-300"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="mcq">MCQ</option>
                  </select>

                  <div className="flex-1">
                    <InputPlace
                      placeholder="question"
                      value={q.text}
                      onChange={e => updateQuestionText(idx, e.target.value)}
                      onBlur={() => handleQuestionBlur(idx)}
                      type="text"
                    />
                  </div>

                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={() => toggleRequired(idx)}
                      onBlur={() => handleQuestionBlur(idx)}
                    />
                    Required
                  </label>
                </div>

                {q.type === "mcq" && (
                  <div className="ml-0 sm:ml-28 space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <InputPlace
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt}
                          onChange={e => updateMcqOption(idx, oIdx, e.target.value)}
                          onBlur={() => handleQuestionBlur(idx)}
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateForm;
