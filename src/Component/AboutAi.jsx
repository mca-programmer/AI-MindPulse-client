import React from "react";
import { motion } from "framer-motion";

const AboutAi = () => {
  return (
    <div className="hero bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 text-white min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Animated Image */}
        <motion.img
          src="https://edure.in/wp-content/uploads/2025/02/ai-tools.webp"
          alt="AI illustration"
          className="max-w-sm rounded-2xl shadow-2xl ring-4 ring-indigo-500/30 hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Animated Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-4">
            About AI Models!
          </h1>

          <p className="py-6 text-lg leading-relaxed text-gray-200">
            An <span className="font-semibold text-cyan-300">AI model</span> is a program or mathematical structure trained 
            to recognize patterns, make decisions, or generate outputs based on data. 
            It’s essentially the “brain” behind artificial intelligence systems.
          </p>

          <p className="text-lg leading-relaxed text-gray-200">
            AI models are built through a process called <span className="font-semibold text-purple-300">training</span>, 
            where they learn from large datasets — such as images, text, or numerical data — 
            to identify relationships and patterns. Once trained, they can apply this knowledge 
            to new, unseen data.
          </p>

          {/* Subtle glowing accent */}
          <motion.div
            className="mt-8 h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutAi;
