import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/public/landing/nav";

const ProfilePage = () => {
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
    const userName = userEmail ? userEmail.split("@")[0] : "Utilisateur";
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userEmail) {
            navigate("/"); 
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

    const handleCV = () => {
        navigate("/user/CreateCV");
    };

    const handleScore = () => {
        navigate("/user/score");
    };

    return (
        <div className={`profile-page ${dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}>
            <Nav />
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
                <header className="flex items-center justify-between pb-6 border-b">
                    <div className="flex items-center space-x-6">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Avatar utilisateur"
                            className="w-24 h-24 rounded-full shadow-md"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{userName}</h1>
                            <p className="text-gray-500">{userEmail}</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleCV}
                            className="px-4 py-2 rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            CV
                        </button>
                        <button
                            onClick={handleScore}
                            className="px-4 py-2 rounded-md shadow-md bg-green-500 text-white hover:bg-green-600"
                        >
                            Score
                        </button>
                    </div>
                </header>

                <section className="mt-6 space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-xl font-semibold">À propos de moi</h2>
                        <p className="mt-2">
                            Bienvenue, <strong>{userName}</strong>! Vous pouvez gérer votre compte depuis cette page.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfilePage;
