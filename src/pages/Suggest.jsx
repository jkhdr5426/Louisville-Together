// File: src/pages/Suggest.jsx
import { useState } from "react";
import { CATEGORY_CONFIG } from "../utils/categoryConfig";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Suggest() {
  const [form, setForm] = useState({
    resourceName: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    additionalNotes: "",
    yourName: "",
    yourEmail: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    { value: "", label: "Select a category..." },
    ...Object.entries(CATEGORY_CONFIG).map(([key, config]) => ({
      value: key,
      label: config.label,
    })),
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const res = await fetch("/api/submit-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Suggestion sent! Thank you.");
        setSubmitted(true);
        setForm({
          resourceName: "",
          category: "",
          description: "",
          address: "",
          phone: "",
          website: "",
          additionalNotes: "",
          yourName: "",
          yourEmail: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus(`❌ Error: ${data.message || "Failed to submit"} `);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-sky-900/95 text-white pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Suggest a Resource</h1>
          <p className="text-lg text-sky-100 mb-10">
            Know of a community resource that should be listed here? Help us grow Louisville's directory by submitting it below.
          </p>
        </div>
      </section>

      <section className="-mt-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto my-20 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Fill out form", desc: "Provide basic details about the resource." },
              { title: "We review it", desc: "Our team verifies information and eligibility." },
              { title: "Gets added", desc: "Once approved, the resource appears in the directory." },
            ].map((step, i) => (
              <div key={step.title} className="bg-white shadow rounded-lg p-6 flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            {submitted ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Thanks — your suggestion was received.</h2>
                <p className="text-slate-600 mb-6">Check your spam folder or inbox for a confirmation email. We’ll review the submission and contact you if we need more details.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStatus("");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-sky-900/95 text-white font-semibold"
                >
                  Submit another suggestion
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="resourceName" className="block text-sm font-medium text-slate-700">Resource Name *</label>
                    <input
                      id="resourceName"
                      name="resourceName"
                      required
                      value={form.resourceName}
                      onChange={handleChange}
                      placeholder="e.g., Wayside Christian Mission"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category *</label>
                    <select
                      name="category"
                      required
                      value={form.category}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {categoryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the services this resource provides, who it serves, and any other helpful details..."
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
                    <input
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g., 432 E Jefferson St, Louisville, KY 40202"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(502) 555-0000"
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-slate-700">Website</label>
                    <input
                      id="website"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-slate-700">Additional Notes</label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={form.additionalNotes}
                      onChange={handleChange}
                      placeholder="Any other helpful information about eligibility, hours, languages spoken, etc."
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="md:col-span-2 border-t pt-4">
                    <h4 className="text-sm font-semibold text-slate-800">
                      Your Information <span className="text-sm font-normal text-slate-500">(optional)</span>
                    </h4>
                    <p className="text-xs text-slate-500 mb-3">We may reach out if we need more details. Your information will not be shared publicly.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="yourName" className="block text-sm font-medium text-slate-700">Your Name</label>
                        <input
                          id="yourName"
                          name="yourName"
                          value={form.yourName}
                          onChange={handleChange}
                          placeholder="First Last"
                          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="yourEmail" className="block text-sm font-medium text-slate-700">Your Email</label>
                        <input
                          id="yourEmail"
                          name="yourEmail"
                          type="email"
                          value={form.yourEmail}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-right mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-4 py-3 rounded-md font-semibold
                                text-white bg-gradient-to-r from-sky-900/95 to-sky-500/75
                                hover:from-sky-800/95 hover:to-sky-400/75
                                transform transition hover:scale-105 hover:shadow-xl
                                flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                      {loading ? "Sending…" : "Submit Resource Suggestion"}
                    </button>
                  </div>

                  {status && (
                    <div className="md:col-span-2">
                      <p className="text-center">{status}</p>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}