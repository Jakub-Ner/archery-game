import LoginForm from "../components/demo/login.demo";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="p-8 bg-white rounded-lg shadow-md backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}