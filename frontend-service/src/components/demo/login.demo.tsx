import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from '../ui/login';
import { cn } from "@/lib/utils";
import { AUTH_SERVICE_URL } from "@/consts";
import { decodeToken } from "@/lib/auth";

export default function LoginDemo() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("W zalogowaniu");
    try {
      const response = await fetch(`${AUTH_SERVICE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const { access_token } = await response.json();
      localStorage.setItem("access_token", access_token);

      const decoded = decodeToken(access_token);
      const userId = decoded.user_id;
      localStorage.setItem("userId", userId.toString());

      // Przekierowanie do np. dashboardu gracza
      navigate(`/menu`);
    } catch (err) {
      console.error(err);
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  return (
      <Dialog>
        <DialogContent className="space-y-3">
          <h3 className="text-lg font-semibold text-center">Login</h3>

          <form className="space-y-3" onSubmit={handleLogin} autoComplete="off">
            <div>
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                  placeholder="Email"
                  required
                  autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                  placeholder="Password"
                  required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                className={cn(
                    "w-full py-2 px-4",
                    "bg-primary hover:bg-primary/90 text-white",
                    "text-sm font-medium",
                    "rounded transition-colors"
                )}
            >
              Sign In
            </button>
          </form>

          <p className="text-xs text-center text-gray-600 mt-3">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Register here
            </a>
          </p>
        </DialogContent>
      </Dialog>
  );
}