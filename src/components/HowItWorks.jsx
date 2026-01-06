import FadeIn from "./FadeIn";
import { Search, FileText, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";



const steps = [
  {
    step: "01",
    title: "Search or Browse",
    description:
      "Find resources by category or use our smart search to discover services based on your specific needs.",
    icon: Search,
    color: "blue",
  },
  {
    step: "02",
    title: "Get Details",
    description:
      "View complete information including locations, hours, eligibility requirements, and contact information.",
    icon: FileText,
    color: "purple",
  },
  {
    step: "03",
    title: "Take Action",
    description:
      "Call directly, visit in person, or apply online. We make it easy to connect with the help you need.",
    icon: Phone,
    color: "green",
  },
];

const colorMap = {
  blue: {
    step: "text-blue-600 bg-blue-100",
    icon: "bg-blue-100 text-blue-600",
    line: "bg-blue-200",
  },
  purple: {
    step: "text-purple-600 bg-purple-100",
    icon: "bg-purple-100 text-purple-600",
    line: "bg-purple-200",
  },
  green: {
    step: "text-green-600 bg-green-100",
    icon: "bg-green-100 text-green-600",
    line: "bg-green-200",
  },
};

export default function HowItWorks() {
  const navigate = useNavigate();


  return (
    <section className="py-24 px-4 md:px-16 bg-white">
      {/* Tag */}
      <div className="flex justify-center mb-6">
        <div className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-semibold">
          Simple & Easy
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
        How It Works
      </h2>

      <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
        Getting help shouldn't be complicated. We've made it simple in just three steps.
      </p>

      {/* Steps */}
      <div className="relative max-w-4xl mx-auto mb-20">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];

            return (
              <FadeIn key={idx} delay={idx * 120}>
                <div className="relative flex gap-6">
                  {/* Left column (step + icon) */}
                  <div className="flex flex-col items-center gap-4">
                    {/* STEP badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${colors.step}`}>
                      STEP {step.step}
                    </div>

                    {/* Icon squircle */}
                    <div className={`w-12 h-12 flex items-center justify-center rounded-[16px] ${colors.icon}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-xl bg-slate-50 border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* CTA Card inside How It Works (same width as steps) */}
      <FadeIn delay={400}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-sky-900 via-sky-900/95 to-sky-950 backdrop-blur-xl border border-white/10 shadow-lg p-12 text-center text-white flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-sky-100/90 leading-relaxed">
              Thousands of Louisville residents have already found the help they needed.
              You're just a search away.
            </p>
           <button
              onClick={() => {
                navigate("/resources")
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-yellow-900 font-semibold rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-xl"
            >
              Start Searching Now
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
