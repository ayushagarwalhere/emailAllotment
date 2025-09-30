import { useState } from "react";

function FaqSection() {
  const faqs = [
    {
      q: "What is the purpose of this email allotment system?",
      a: "It helps collect details and assign institute email IDs efficiently.",
    },
    {
      q: "How long does the verification process take?",
      a: "Usually 24–72 hours, depending on volume.",
    },
    {
      q: "What should I do if my request is declined?",
      a: "Check the reason, correct the details, and resubmit your form.",
    },
    {
      q: "Can I change my institute email ID later?",
      a: "Rarely allowed and needs admin approval via a formal request.",
    },
    {
      q: "Who should I contact if I face issues during application?",
      a: "Contact the IT Helpdesk or your department coordinator.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  const toggle = (index) =>
    setOpenIndex((prev) => (prev === index ? -1 : index));

  return (
    <footer className="w-full bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">FAQs</h2>
          <div className="mx-auto mt-2 h-1 w-16 bg-white/80 rounded"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="rounded-md border border-white/10 shadow-sm overflow-hidden bg-gray-800/60"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-800 transition-colors"
              >
                <span className="text-2xl font-semibold select-none">
                  {openIndex === idx ? "−" : "+"}
                </span>
                <span className="text-lg sm:text-xl font-medium">{item.q}</span>
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-gray-200">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default FaqSection;
