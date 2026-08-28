import { useAuthContext } from "@/contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import usePost from "@/hooks/useSendRequest";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyUrl = "http://localhost:5000/api/khalti/verify";
  const verifyReq = usePost(verifyUrl);
  const [status, setStatus] = useState("Verifying your payment...");
  const hasVerified = useRef(false);

  useEffect(() => {
    const req = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;
      const pidx = searchParams.get("pidx");
      if (!pidx) {
        setStatus("Invalid payment request. Missing transaction id.");
        return;
      }

      try {
        const { data, error } = await verifyReq({ pidx });
        if (data.success) setStatus("Payment verified successfully.");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    req();
  }, [searchParams, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Payment Status</h2>

        <div className="text-green-600">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="font-medium">{status}</p>
          <p className="text-sm text-gray-500 mt-2">{status}</p>
        </div>

        <div className="text-gray-600">
          {status === "Verifying your payment..." && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          )}
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerify;
