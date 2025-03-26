import { Dialog, DialogContent } from '../ui/login';

export default function LoginDemo() {
  return (
    <Dialog>
      <DialogContent>
        <h3 className="text-center text-xl font-semibold mb-4">Login</h3>
        <label htmlFor="login_info" className="block">
          Enter your email address and password if you already have an account. Otherwise, register.
        </label>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="Type your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Type your password"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>

        <div className="text-right mt-4">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 underline">
              Register here.
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
