import { useState } from "react";
import NithNav from "../components/nithnav";

function FAQs(){
    const faqs = [
        {
            q: "What is the purpose of this email allotment system?",
            a: "It streamlines collecting student details and assigning institute email IDs efficiently.",
        },
        {
            q: "How long does the verification process take?",
            a: "Typically 24–72 hours. Peak times may take a bit longer.",
        },
        {
            q: "What should I do if my request is declined?",
            a: "Review the reason in your dashboard, update the details, and resubmit.",
        },
        {
            q: "Can I change my institute email ID later?",
            a: "Changes are rare and require admin approval; submit a formal request if necessary.",
        },
        {
            q: "Who should I contact if I face issues during application?",
            a: "Reach out to the IT Helpdesk or your department coordinator for assistance.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(-1);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return(
        <div>
            <NithNav></NithNav>
            <div className="min-h-screen w-full bg-white flex items-start justify-center py-10 sm:py-14">
                <div className="w-full max-w-4xl px-4">
                    <div className="text-center mb-8 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold">FAQs</h1>
                        <div className="mx-auto mt-2 h-1 w-16 bg-black rounded"></div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((item, idx) => (
                            <div key={idx} className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-4 px-5 py-4 text-left"
                                >
                                    <span className="text-2xl font-semibold select-none">
                                        {openIndex === idx ? "−" : "+"}
                                    </span>
                                    <span className="text-lg sm:text-xl font-medium">
                                        {item.q}
                                    </span>
                                </button>

                                {openIndex === idx && (
                                    <div className="px-5 pb-5 bg-white text-gray-700">
                                        <p>{item.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQs