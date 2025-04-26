import LoginForm from "../components/demo/login.demo";
import { cn } from "@/lib/utils";

export default function Login() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className={cn(
        "text-3xl sm:text-4xl md:text-5xl",
        "font-bold text-center text-primary",
        "fixed top-6 sm:top-8 left-0 right-0 z-10",
        "px-4"
      )}>
        Archer's Survival
      </h1>

      <div className={cn(
        "w-full max-w-md", // Taka sama szerokość
        "bg-white rounded-lg shadow-md", // Identyczne cienie
        "p-6 mt-28", // Takie same paddingi
        "relative z-20"
      )}>
        <LoginForm />
      </div>
    </div>
  );
}