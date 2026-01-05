import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Phone,
  Globe,
  Clock,
  Users,
  Star,
  ExternalLink,
} from "lucide-react";

export default function ResourceModal({ resource, open, onClose }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!resource) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-br from-sky-900 to-sky-700 text-white p-6 rounded-t-3xl z-10 flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">{resource.name}</h2>
                {resource.category && (
                  <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm mb-2">
                    {resource.category}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              {resource.description && (
                <div>
                  <h3 className="text-xl font-bold text-sky-900 mb-2">About</h3>
                  <p className="text-gray-700">{resource.description}</p>
                </div>
              )}

              {/* ───────── Contact Card (full width) ───────── */}
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col gap-2">
                <h3 className="font-bold text-sky-900 mb-2">Contact</h3>
                {resource.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-sky-900" />
                    <a href={`tel:${resource.phone}`} className="text-sky-900 font-medium">
                      {resource.phone}
                    </a>
                  </div>
                )}
                {resource.email && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-900" />
                    <span className="text-sky-900 font-medium">{resource.email}</span>
                  </div>
                )}
                {resource.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-900" />
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-900 font-medium flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                {resource.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-900" />
                    <span className="text-sky-900 font-medium">{resource.address}</span>
                  </div>
                )}
              </div>

              {/* ───────── Hours + Eligibility Row ───────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.hours && (
                  <div className="bg-blue-50 p-4 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-sky-900" />
                      <span className="font-semibold">Hours</span>
                    </div>
                    <p className="text-gray-700">{resource.hours}</p>
                    <p className="text-gray-700">{resource.appointment}</p>
                  </div>
                )}
                {resource.eligibility && (
                  <div className="bg-blue-50 p-4 rounded-lg flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-sky-900" />
                      <span className="font-semibold">Eligibility</span>
                    </div>
                    <p className="text-gray-700">{resource.eligibility}</p>
                  </div>
                )}
              </div>

              {/* ───────── Services Offered ───────── */}
              {resource.services && resource.services.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-sky-900 mb-2">Services Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.services.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────── Accessibility ───────── */}
              {resource.accessibility && (
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="font-bold text-sky-900 mb-2">Accessibility</h3>
                  <p className="text-gray-700">{resource.accessibility}</p>
                </div>
              )}

              {/* ───────── Rating ───────── */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-sky-900 mb-2">Rate This Resource</h3>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)}>
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment (optional)"
                  className="w-full border rounded-lg p-2"
                />
                <button
                  className="mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-sky-900 to-sky-500 text-white hover:from-sky-800 hover:to-sky-400"
                  onClick={() =>
                    alert(`Submitted rating: ${rating}, comment: ${comment}`)
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
