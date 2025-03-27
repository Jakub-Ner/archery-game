import RegisterForm from "../components/demo/register.demo";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="p-8 bg-white rounded-lg shadow-md backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
