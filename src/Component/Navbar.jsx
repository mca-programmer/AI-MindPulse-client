import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AunthContext } from "../Auth/AuthProvider";
import useTheme from "../hooks/UseTheme";
import AiLogo from '../assets/ai logo.png'; // logo import

export default function Navbar() {
  const { user, handleSignOut } = useContext(AunthContext);
  const [open, setOpen] = React.useState(false);
  const { theme, toggleTheme, isDarkMode } = useTheme();
  console.log(user);
  function signOut() {
    handleSignOut()
      .then(() => alert("successfull"))
      .catch(() => alert("fail"));
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/add-model", label: "Add Model" },
    { href: "/models", label: "All Model" },
    { href: "/purchase", label: "My Purchases" },
    { href: "/mymodals", label: "My Modal" },
  ];

  const LinkItems = (
    <>
      {links.map((l) => (
        <li key={l.href}>
          <NavLink
            to={l.href}
            className="relative px-3 py-2 font-medium rounded-btn brand-underline"
          >
            <span className="text-soft hover:text-white transition-colors">
              {l.label}
            </span>
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--brand-primary)] via-sky-400/60 to-[var(--brand-secondary)]" />
      <div className="navbar glass border-b border-[var(--border)]">
        {/* Left: Logo */}
        <div className="navbar-start">
          <NavLink
            to="/"
            className="btn btn-ghost text-xl font-extrabold tracking-tight hover:scale-[1.05] transition-transform"
            aria-label="AI MindPulse home"
          >
            <span className="inline-flex items-center gap-2">
              {/* AI Logo Image */}
              <img
                src={AiLogo} // logo import
                alt="AI Logo"
                className="w-8 h-8 object-contain"
              />

              {/* MindPulse Name */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 font-extrabold">
                Ai-MindPulse
              </span>
            </span>
          </NavLink>
        </div>

        {/* Middle */}
        <nav className="navbar-center hidden lg:flex" aria-label="Primary">
          <ul className="menu menu-horizontal gap-1 px-1">{LinkItems}</ul>
        </nav>

        {/* Right */}
        <div className="navbar-end gap-2">
          {/* Soft action */}
          <button
            id="theme"
            type="button"
            className="btn btn-soft rounded-full"
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            aria-pressed={isDarkMode}
            onClick={toggleTheme}
            title={`Toggle ${theme} theme`}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0 2.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 12 20.5Zm7.78-1.22a.75.75 0 0 1 1.06 1.06l-.71.7a.75.75 0 0 1-1.06-1.06l.71-.7ZM3.93 4.64A.75.75 0 0 1 5 3.58l.7.71A.75.75 0 0 1 4.64 5.35l-.71-.7Zm14.13.71a.75.75 0 0 1 0-1.06l.71-.71a.75.75 0 0 1 1.06 1.06l-.71.71a.75.75 0 0 1-1.06 0ZM3.5 12a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1A.75.75 0 0 1 3.5 12Zm18 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75ZM4.64 18.65a.75.75 0 0 1 1.06 0l.71.7a.75.75 0 0 1-1.06 1.06l-.71-.7a.75.75 0 0 1 0-1.06Zm3.18-14.91a.75.75 0 0 1-.75-.75v-1a.75.75 0 0 1 1.5 0v1a.75.75 0 0 1-.75.75Zm0 15.72a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Zm12.48-12.47a.75.75 0 0 1 1.06-1.06l.71.71a.75.75 0 0 1-1.06 1.06l-.71-.71Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="M21.752 15.002a9.718 9.718 0 0 1-4.094 1.876c-5.186 1.21-9.955-3.56-8.744-8.744A9.72 9.72 0 0 1 10.79 4.04a.75.75 0 0 0-.672-1.125A10.998 10.998 0 1 0 22.877 13.88a.75.75 0 0 0-1.125-.672Z"
                />
              </svg>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                aria-label="Open profile menu"
              >
                <div className="w-10 rounded-full ring ring-[var(--border)]">
                  <img alt="User avatar" src={user.photoURL} />
                  0-?00
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content glass rounded-box w-64"
              >
                <li className="menu-title text-soft">Signed in</li>
                <li className="px-3 pb-1 text-sm">{user.displayName}</li>
                <li className="px-3 pb-1 text-xs text-soft">{user.email}</li>
                <li>
                  <div className="divider my-1" />
                </li>
                <li>
                  <NavLink to="/purchase" className="justify-between">
                    Purchase Page<span className="badge chip">Click</span>
                  </NavLink>
                  <NavLink to="/models" className="justify-between">
                    Purchase Page<span className="badge chip">My Models</span>
                  </NavLink>
                </li>
                <li>
                  <button onClick={signOut} className="btn btn-soft mt-1">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-brand rounded-full normal-case shadow-md hover:shadow-lg"
            >
              Login
            </NavLink>
          )}

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button
              aria-label="Toggle menu"
              className={`btn btn-ghost btn-circle transition-transform ${
                open ? "rotate-90" : ""
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 5.25A.75.75 0 0 1 4.5 4.5h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 7.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-[64px] z-50 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-3 rounded-2xl glass">
          <ul className="menu p-3">{LinkItems}</ul>
          <div className="px-3 pb-3">
            <NavLink to="/login" className="btn btn-brand w-full rounded-xl">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
