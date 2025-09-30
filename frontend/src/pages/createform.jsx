import { useState } from "react";
import NavbarAdmin from "../components/navbarAdmin";
import InputPlace from "../components/inputPlace";
import Footer from "../components/footer";

function CreateForm(){
    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([...questions, { text: "", type: "text" }]);
    };

    const updateQuestion = (index, newText) => {
        const updated = [...questions];
        updated[index].text = newText;
        setQuestions(updated);
    };

    const updateQuestionType = (index, newType) => {
        const updated = [...questions];
        updated[index].type = newType;
        // Initialize options array when switching to MCQ
        if (newType === "mcq" && !Array.isArray(updated[index].options)) {
            updated[index].options = [""];
        }
        setQuestions(updated);
    };

    const addMcqOption = (index) => {
        const updated = [...questions];
        if (!Array.isArray(updated[index].options)) {
            updated[index].options = [""];
        } else {
            updated[index].options = [...updated[index].options, ""];
        }
        setQuestions(updated);
    };

    const updateMcqOption = (qIndex, optionIndex, value) => {
        const updated = [...questions];
        if (!Array.isArray(updated[qIndex].options)) return;
        const opts = [...updated[qIndex].options];
        opts[optionIndex] = value;
        updated[qIndex].options = opts;
        setQuestions(updated);
    };

    const removeMcqOption = (qIndex, optionIndex) => {
        const updated = [...questions];
        if (!Array.isArray(updated[qIndex].options)) return;
        updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== optionIndex);
        // Ensure at least one option remains editable
        if (updated[qIndex].options.length === 0) {
            updated[qIndex].options = [""];
        }
        setQuestions(updated);
    };

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    return(
        <div className="min-h-screen w-full flex flex-col items-center">
            <NavbarAdmin></NavbarAdmin>
            <div className="mt-24 w-full max-w-6xl px-6">
                <h2 className="text-3xl font-bold pb-4">Create Form</h2>
                <div className="bg-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold">Add Questions</h3>
                        <button onClick={addQuestion} className="text-lg font-bold px-3 py-1 rounded-md bg-black text-white">+
                        </button>
                    </div>
                    <div className="space-y-3">
                        {questions.length === 0 && (
                            <InputPlace placeholder="question" value="" onChange={()=>{}} />
                        )}
                        {questions.map((q, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-3">
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
                                    <div className="flex-1">
                                        <InputPlace
                                            placeholder="question"
                                            value={q.text}
                                            onChange={(e) => updateQuestion(idx, e.target.value)}
                                            type={q.type === 'mcq' ? 'text' : q.type}
                                        />
                                    </div>
                                    <button onClick={() => deleteQuestion(idx)} className="px-3 py-2 rounded-md bg-white hover:text-red-500 text-black">Delete</button>
                                </div>

                                {q.type === 'mcq' && (
                                    <div className="ml-0 sm:ml-28">
                                        <div className="space-y-2">
                                            {(q.options || [""]).map((opt, oIdx) => (
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateForm