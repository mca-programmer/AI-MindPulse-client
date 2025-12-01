import { motion } from "framer-motion";
import { Brain, LogIn, UserPlus, Sparkles, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.6, ease: "easeOut" },
};
const Register = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 -z-10 h-96 w-[80rem] rounded-full bg-gradient-to-r from-indigo-600/30 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />

      <section className="mx-auto max-w-6xl px-6 py-20 text-white">
        <motion.div
          {...fadeUp}
          className="mx-auto mb-6 w-fit rounded-full border border-white/10 bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 px-4 py-1.5 text-sm text-black/90 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-2 ">
            <Sparkles className="h-4 w-4 bg " />
            <span>Manage AI models in minutes</span>
          </div>
        </motion.div>

        <motion.h1
          {...fadeUp}
          className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl "
        >
          <span className="text-sky-500">Get Started with{" "}</span>
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            AI MindPulse
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed  text-sky-400/50"
        >
          Centralize, version, and monitor your AI models with a clean,
          intuitive dashboard. Register or log in to begin tracking performance,
          deployments, and updates.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <NavLink to="/register">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-900/30 ring-1 ring-inset ring-white/10 transition-transform hover:scale-[1.02] hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label="Create an account"
            >
              <UserPlus className="h-5 w-5" />
              Create an account
            </button>
          </NavLink>

          <NavLink to="/login">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-400/50 px-5 py-3 text-base font-semibold text-white backdrop-blur ring-1 ring-white/20 transition-transform hover:scale-[1.02] hover:bg-sky-400/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              aria-label="Log in"
            >
              <LogIn className="h-5 w-5" />
              Log in
            </button>
          </NavLink>
        </motion.div>
      </section>
    </div>
  );
};

export default Register;
