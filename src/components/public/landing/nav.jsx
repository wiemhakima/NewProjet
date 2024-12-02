import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import log from "../../../assets/img/log.svg";

const Nav = () => {
  const [dark, setDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const userName = userEmail ? userEmail.split("@")[0] : "Utilisateur";

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!userEmail) {
      navigate("/"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [userEmail, navigate]);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 shadow-md bg-white dark:bg-gray-900 duration-500">
      <nav className="flex w-full max-w-[85rem] mx-auto items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={log} alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Innova
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Skills
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <a
            href="/Landing"
            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Accueil
          </a>
          <a
            href="/Tests/Tests"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
           Tests
          </a>
          <a
            href="/certif"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Certificats
          </a>
          <a
            href="/profil"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 font-medium"
          >
            Portfolio
          </a>
        </div>

        {/* Profile and Dark Mode Section */}
        <div className="relative flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={darkModeHandler} className="text-gray-800 dark:text-gray-300 hover:text-blue-500">
            {dark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold uppercase">
                {userName.charAt(0)}
              </div>
              <span className="text-gray-800 dark:text-gray-300 font-medium">{userName}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-white" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20">
                <a
                  href="/Score"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                >
                  Score
                </a>
                <a
                  href="/Settings"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Paramètres
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
