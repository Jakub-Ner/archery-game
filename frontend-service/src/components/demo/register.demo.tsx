import { Dialog, DialogContent } from '../ui/login';

export default function RegisterDemo() {
  return (
    <Dialog>
      <DialogContent>
        <h3 className="text-center text-xl font-semibold mb-4">Register</h3>
        <label htmlFor="register_info" className="block">
          Create a new account by entering nickname, your email and password below.
        </label>
        <form className="space-y-4">
          <div>
            <label htmlFor="nickname" className="block">Nickname</label>
            <input
              type="email"
              id="nickname"
              className="w-full p-2 border rounded"
              placeholder="Type your nickname"
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirm_password" className="block">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              className="w-full p-2 border rounded"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
            Register
          </button>
        </form>

        <div className="text-right mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <a href="/" className="text-blue-500 underline">
              Login here.
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}