import RegisterForm from "../components/demo/register.demo";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold absolute top-5 left-1/2 transform -translate-x-1/2 text-black-600">Archer's Survival</h1>
      <div className="p-8 bg-white rounded-lg shadow-md backdrop-blur-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
