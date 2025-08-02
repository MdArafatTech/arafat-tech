import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "../assets/logo.png"; // Replace with your own image

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-16 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-orange-600">
            Welcome to Arafat-Tech LTD
          </h1>
          <p className="text-lg mb-6 leading-relaxed">
            Empowering businesses and individuals with innovative digital solutions.
            We provide billing systems, e-commerce tools, smart automation, and
            enterprise-grade services.
          </p>
          <p className="text-lg mb-6 leading-relaxed">Our Services</p>
          <div>
          <Link
            to="/aboutus"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition"
          >
             About Us
          </Link>

          </div>
        </motion.div>

        <motion.img
          src={heroImg}
          alt="Arafat-Tech LTD"
          className="lg:w-1/2 max-h-[400px] object-contain"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-24 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
          Why Choose Arafat-Tech?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Custom Billing Systems",
              desc: "Smart, fast, and scalable billing solutions tailored for your business.",
            },
            {
              title: "Secure & Modern Tech",
              desc: "We use the latest technologies to ensure speed, security, and scalability.",
            },
            {
              title: "Dedicated Support",
              desc: "Our support team is available 24/7 to help you succeed.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 border rounded-xl shadow-sm bg-yellow-50 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-orange-500 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-700">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center px-6 lg:px-24 py-16 bg-orange-100">
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6 text-orange-700"
        >
          Ready to level up your business?
        </motion.h2>
        <Link
          to="/contact"
          className="bg-orange-500 text-white px-8 py-3 rounded-xl shadow hover:bg-orange-600 transition"
        >
          Get In Touch
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
