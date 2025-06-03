// src/pages/PaymentPage.tsx
import { useState } from "react";
import CheckoutPage from "../components/ui/paymentCheckout";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserInfo from '../components/demo/userNickname.demo';
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51RR2CT4TYZHa4UATRgwTz4lMsAHyNBcpYVgYUgn7z4Px1n8ik7aGLGrDm6m53b646RbBtkgBLDIcIBLwh9pDuggH00CiVdRG46');

const AMOUNT_OPTIONS = [
  { value: 9.99, label: "$9.99", coins: "1000 coins" },
  { value: 19.99, label: "$19.99", coins: "2500 coins" },
  { value: 49.99, label: "$49.99", coins: "7000 coins" },
  { value: 99.99, label: "$99.99", coins: "15000 coins" },
];

export default function PaymentPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (selectedAmount === null) {
    return (
      <div className="relative min-h-screen bg-background text-foreground flex flex-col">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center pt-8 lg:pt-12 text-primary px-4">
          Choose your package
        </h1>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 lg:py-12">
          <main className="w-full max-w-2xl mx-auto p-8 lg:p-10 text-center">
            <div className="mb-8 lg:mb-10">
              <UserInfo />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {AMOUNT_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="border rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer bg-card"
                  onClick={() => setSelectedAmount(option.value)}
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {option.label}
                  </div>
                  <div className="text-lg text-gray-600">
                    {option.coins}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full max-w-xs py-3 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              onClick={handleGoBack}
            >
              ← Back to Main Menu
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center pt-8 lg:pt-12 text-primary px-4">
        Complete your purchase
      </h1>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 lg:py-12">
        <main className="w-full max-w-2xl mx-auto p-8 lg:p-10 text-center border rounded-md bg-card">
          <div className="mb-8 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-primary">Payment details:</h2>
            <UserInfo />
            <h3 className="text-xl lg:text-2xl mt-4">
              Amount:
              <span className="font-bold text-primary"> ${selectedAmount}</span>
            </h3>
            <button
              className="mt-4 text-sm text-gray-600 hover:text-primary cursor-pointer"
              onClick={() => setSelectedAmount(null)}
            >
              ← Change package
            </button>
          </div>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(selectedAmount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={selectedAmount} />
          </Elements>
        </main>
      </div>
    </div>
  );
}