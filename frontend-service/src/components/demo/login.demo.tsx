import { Dialog, DialogContent } from '../ui/login';
import { cn } from "@/lib/utils";

export default function LoginDemo() {
  return (
    <Dialog>
      <DialogContent className="space-y-3">
        <h3 className="text-lg font-semibold text-center">Login</h3>
        
        <form className="space-y-3">
          {[
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' }
          ].map((field) => (
            <div key={field.id}>
              <label 
                htmlFor={field.id} 
                className="block text-sm mb-1"
              >
                {field.label}
              </label>
              <input
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
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-gray-600 mt-3">
          Don't have an account?{' '}
          <a href="/register" className="text-primary hover:underline">
            Register here
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}