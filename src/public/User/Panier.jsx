import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate

const Panier = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();  // Utilisez useNavigate pour la redirection

  useEffect(() => {
    // Récupérer les articles du panier depuis le localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-blue-800 dark:text-white text-center mb-16">
          Votre Panier
        </h2>
        {cartItems.length === 0 ? (
          <div className="text-center text-lg text-gray-600 dark:text-gray-400">
            Votre panier est vide.
          </div>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg mr-4" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-orange-500">{item.discountedPrice} DT</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate('/')} // Redirige l'utilisateur vers la page d'accueil
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Continuer vos achats
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Panier;
