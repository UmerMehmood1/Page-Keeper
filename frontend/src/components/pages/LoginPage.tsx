import { Link } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";

export function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl mt-48  flex items-center justify-center bg-white">
      <div className="max-w-4xl w-full  flex flex-col md:flex-row  shadow-lg rounded-lg   ">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome Back, Book Lover!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 my-2">
            Sign in to explore our vast collection and keep your bookshelf
            growing.
          </p>
          <LoginForm />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Dont have an account ?{" "}
            <Link
              to="/signup"
              className="text-[#5D4B8C] hover:text-[#5D4B8C]/80 font-semibold"
            >
              Create an account here
            </Link>
          </p>
        </div>

        {/* Right Section: Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-[#5D4B8C]">
          <img
            src="https://static.live.templately.com/woocommerce/2023/03/6072e019-bookplace-bannerbg.png"
            alt="Reading Illustration"
            className="h-96 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
