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

  const fullAddress = [
    resource.address,
    resource.city,
    resource.state,
    resource.zip_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full
                       max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-br
                            from-sky-900 to-sky-700 text-white
                            p-6 rounded-t-3xl z-10 flex
                            justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {resource.name}
                </h2>
                <span className="inline-block bg-yellow-500
                                 text-white px-3 py-1 rounded-full text-sm">
                  {resource.category.replaceAll("_", " ")}
                </span>
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
              {/* About */}
              <div>
                <h3 className="text-xl font-bold text-sky-900 mb-2">
                  About
                </h3>
                <p className="text-gray-700">
                  {resource.description}
                </p>
              </div>

              {/* Contact */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h3 className="font-bold text-sky-900">Contact</h3>

                {resource.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-sky-900" />
                    <a href={`tel:${resource.phone}`}>
                      {resource.phone}
                    </a>
                  </div>
                )}

                {resource.email && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-900" />
                    {resource.email}
                  </div>
                )}

                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sky-900"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Website
                  </a>
                )}

                {fullAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-900" />
                    {fullAddress}
                  </div>
                )}
              </div>

              {/* Hours & Eligibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.hours && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 font-semibold">
                      <Clock className="w-5 h-5" />
                      Hours
                    </div>
                    <p>{resource.hours}</p>
                    <p>
                      {resource.accepts_walk_ins
                        ? "Walk-ins accepted"
                        : "Appointments required"}
                    </p>
                  </div>
                )}

                {resource.eligibility && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 font-semibold">
                      <Users className="w-5 h-5" />
                      Eligibility
                    </div>
                    <p>{resource.eligibility}</p>
                  </div>
                )}
              </div>

              {/* Services */}
              {resource.services_offered?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-sky-900 mb-2">
                    Services Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.services_offered.map((s, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-800
                                   text-sm px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility */}
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-bold text-sky-900">
                  Accessibility
                </h3>
                <p>
                  {resource.wheelchair_accessible
                    ? "Wheelchair accessible"
                    : "Accessibility information not available"}
                </p>
              </div>

              {/* Languages */}
              {resource.languages_spoken?.length > 0 && (
                <div>
                  <h3 className="font-bold text-sky-900">
                    Languages Spoken
                  </h3>
                  <p>{resource.languages_spoken.join(", ")}</p>
                </div>
              )}

              {/* Rating */}
              <div>
                <h3 className="font-bold text-sky-900 mb-2">
                  Rate This Resource
                </h3>
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
                  className="w-full border rounded-lg p-2"
                  placeholder="Leave a comment (optional)"
                />

                <button
                  className="mt-2 px-4 py-2 rounded-md
                             bg-gradient-to-r from-sky-900 to-sky-500
                             text-white"
                  onClick={() =>
                    alert(`Submitted rating: ${rating}\n${comment}`)
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
