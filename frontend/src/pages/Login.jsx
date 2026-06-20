import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input } from "../components/ui";

function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">

          <div className="text-center">

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Sign in to continue to GuestFlow
            </p>

          </div>

          <form className="mt-8 space-y-5">

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <Button className="w-full">
              Sign In
            </Button>

          </form>

          <div className="mt-8 rounded-xl bg-blue-50 dark:bg-slate-700 p-4">

            <p className="font-semibold text-blue-700 dark:text-blue-300">
              Demo Credentials
            </p>

            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              Email: admin@guestflow.com
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Password: admin123
            </p>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Login;