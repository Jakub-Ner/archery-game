import { Dialog, DialogContent } from "../ui/register";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AUTH_SERVICE_URL } from "@/consts";
import { useNavigate } from "react-router-dom";

export default function RegisterDemo() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${AUTH_SERVICE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.detail || "Registration failed.");
        return;
      }

      const data = await res.json();
      console.log("Registered user ID:", data.user_id);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
      <Dialog>
        <DialogContent className="space-y-3">
          <h3 className="text-lg font-semibold text-center">Register</h3>

          {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            {[
              { id: "nickname", label: "Nickname", type: "text" },
              { id: "email", label: "Email", type: "email" },
              { id: "password", label: "Password", type: "password" },
              {
                id: "confirm_password",
                label: "Confirm Password",
                type: "password",
              },
            ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm mb-1">
                    {field.label}
                  </label>
                  <input
                      name={field.id}
                      type={field.type}
                      id={field.id}
                      className="w-full p-2 text-sm border rounded"
                      placeholder={field.label}
                      required
                  />
                </div>
            ))}

            <button
                type="submit"
                className={cn(
                    "w-full py-2 px-4",
                    "bg-primary hover:bg-primary/90 text-white",
                    "text-sm font-medium",
                    "rounded transition-colors"
                )}
            >
              Register
            </button>
          </form>

          <p className="text-xs text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <a href="/" className="text-primary hover:underline">
              Login here
            </a>
          </p>
        </DialogContent>
      </Dialog>
  );
}