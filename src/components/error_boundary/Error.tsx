import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }: { message?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h1>
      <p className="text-gray-600 mb-6">
        {message || "An unexpected error occurred. Please try again later."}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
