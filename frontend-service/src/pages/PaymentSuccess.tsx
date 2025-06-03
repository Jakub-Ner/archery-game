// src/pages/PaymentSuccess.tsx
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PLAYER_SERVICE_URL } from '../consts';
import { getCoinsForAmount } from '../lib/coinsMapping'; // Adjust the import path as needed

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const amount = searchParams.get('amount') || '0';
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/menu');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer
    return () => clearInterval(timer);
  }, [navigate]);

useEffect(() => {
  const addCoinsToUser = async () => {
    const userId = localStorage.getItem("userId");
    const coins = getCoinsForAmount(parseFloat(amount));
    
    try {
      await fetch(`${PLAYER_SERVICE_URL}/users/${userId}/add-coins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ coins })
      });
    } catch (error) {
      console.error('Failed to add coins:', error);
    }
  };

  addCoinsToUser();
}, [amount]);

  const handleGoToMenu = () => {
  navigate('/menu', { state: { refresh: true } });
};

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center pt-8 lg:pt-12 text-primary px-4">
        Payment Complete
      </h1>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 lg:py-12">
        <main className="w-full max-w-2xl mx-auto p-8 lg:p-10 text-center border rounded-md bg-card">
          <div className="mb-8 lg:mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-primary">Thank you!</h2>
            <h3 className="text-xl lg:text-2xl mb-6">You successfully topped up</h3>
            
            <div className="bg-primary text-primary-foreground p-4 lg:p-6 rounded-md mt-6 text-3xl lg:text-4xl font-bold">
              ${amount}
            </div>
            
            <div className="mt-8">
              <p className="text-lg lg:text-xl mb-6">
                Returning to menu in <span className="font-bold text-primary">{countdown}</span> seconds...
              </p>
              
              <button 
                onClick={handleGoToMenu}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-bold hover:bg-primary/90 transition-colors text-lg"
              >
                Go to Menu Now
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}