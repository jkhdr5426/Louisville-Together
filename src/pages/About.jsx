import { motion } from "framer-motion";

const team = [
  { name: "Edward Kim", role: "Founder & CEO", bio: "Passionate about connecting the community.", img: "https://via.placeholder.com/150" },
  { name: "Jane Doe", role: "Operations Lead", bio: "Ensuring smooth day-to-day operations.", img: "https://via.placeholder.com/150" },
  { name: "John Smith", role: "Community Outreach", bio: "Building strong local partnerships.", img: "https://via.placeholder.com/150" },
];

const stats = [
  { number: "1000+", label: "Residents Served" },
  { number: "50+", label: "Resources Available" },
  { number: "2025", label: "Active since" },
];

export default function AboutUs() {
  return (
    <div className="relative bg-white overflow-hidden">
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-sky-800 to-sky-600 transform -skew-y-6 origin-top-left"></div>
          <img
            src="https://via.placeholder.com/1200x600"
            alt="Community"
            className="absolute w-full h-full object-cover opacity-30 transform -skew-y-6 origin-top-left"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            Helping Louisville’s community discover, connect, and thrive with local resources.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4 md:px-16 bg-slate-50">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            We exist to make it simple for residents to find the resources they need. Whether it's housing, food, healthcare, or family services, our goal is to connect people with help quickly and efficiently.
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-4 md:px-16 bg-white relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Story
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            From humble beginnings to a thriving community initiative, here’s how we got here.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          

          {/* Section 1 */}
          <div className="bg-slate-50 rounded-3xl shadow-lg p-8 flex flex-col items-start">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">The Beginning</h3>
            <p className="text-gray-600">
              Many Louisville residents struggle financially and need access to health and education resources, but don't know where to find them.  
              <b> Resources exist—but they're scattered</b> across multiple websites, phone books, and word-of-mouth recommendations.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-50 rounded-3xl shadow-lg p-8 flex flex-col items-start">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Growth & Collaboration</h3>
            <p className="text-gray-600">
              We have compiled local organizations and service providers, <b>expanding our reach and impact across Louisville.</b> Our resource hub has resources ranging from food assistance to legal defense, contributing to its richness, diversity, and flexibility for our residents. 
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-50 rounded-3xl shadow-lg p-8 flex flex-col items-start">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Today & Beyond</h3>
            <p className="text-gray-600">
              Many residents benefit from our platform every month, and we continue to innovate to help more people. We continue growing <b>greater connections to our city</b> to reach more residents in need.
            </p>
          </div>
        </div>
      </section>


      <section className="py-24 px-4 md:px-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Our Mission Progress
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Making a difference in the Louisville community, one connection at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="relative bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg rotate-12"></div>

          <div className="text-5xl font-extrabold text-blue-600 mb-4">50+</div>
          <h3 className="text-xl font-semibold mb-2">Resources Available</h3>
          <p className="text-gray-500">
            Abundance of verified resources to help residents find the support they need.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition">
          <div className="absolute -top-9 left-1/2 -translate-x-2/3 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg -rotate-12"></div>

          <div className="text-5xl font-extrabold text-purple-600 mb-4">10+</div>
          <h3 className="text-xl font-semibold mb-2">Resource Categories</h3>
          <p className="text-gray-500">
            Wide variety of ways our resources can fufill your specific necessities.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-600 rounded-lg rotate-6"></div>

          <div className="text-5xl font-extrabold text-green-600 mb-4">2025</div>
          <h3 className="text-xl font-semibold mb-2">First Year Established</h3>
          <p className="text-gray-500">
            Connecting thousands of residents to the services and resources they need every month.
          </p>
        </div>
      </div>
    </section>


      <section className="py-16 px-4 md:px-16 bg-gradient-to-r from-sky-800 to-sky-600 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Join Us in Making a Difference
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-8 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Whether volunteering, partnering, or donating, your support helps us connect more residents with the resources they need.
        </motion.p>
        <a href="mailto:coderman09@gmail.com" target="_blank" rel="noopener noreferrer">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-8 py-4 font-bold rounded-full bg-yellow-400 text-sky-900 shadow-lg hover:scale-105 transition-transform"
          >
            Get Involved
          </motion.button>
        </a>
      </section>
    </div>
  );
}
