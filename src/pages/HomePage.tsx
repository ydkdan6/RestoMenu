import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTableStore } from "../stores/tableStore";
import { QrCode } from "lucide-react";
import QRCodeWithLogo from "./QrCodeLogo";

// Helper function to generate an 11-digit random token
const generateRandomToken = (): string => {
  return Math.floor(10000000000 + Math.random() * 90000000000).toString();
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const tableNumber = useTableStore((state) => state.tableNumber);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");

  const logoutSession = () => {
    setIsActive(false); // Mark the session as inactive
    localStorage.removeItem("qr_token"); // Clear token
    localStorage.removeItem("qr_expiry"); // Clear expiry
  };

  useEffect(() => {
    const initializeSession = () => {
      const existingToken = localStorage.getItem("qr_token");
      const expiry = localStorage.getItem("qr_expiry");

      if (existingToken && expiry && Date.now() < parseInt(expiry)) {
        // Token is still valid; continue session
        const sessionUrl = `https://example.com/order?token=${existingToken}`;
        setUrl(sessionUrl);
        setTimeout(() => {
          logoutSession();
        }, parseInt(expiry) - Date.now());
      } else {
        // Generate a new token and session
        const newToken = generateRandomToken();
        const newExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Save the new token and expiry
        localStorage.setItem("qr_token", newToken);
        localStorage.setItem("qr_expiry", newExpiry.toString());

        // Update the URL
        const sessionUrl = `https://example.com/order?token=${newToken}`;
        setUrl(sessionUrl);
        console.log("New session URL:", sessionUrl);

        setTimeout(() => {
          logoutSession();
        }, 10 * 60 * 1000); // Expire session after 10 minutes
      }
    };

    initializeSession(); // Initialize session on component mount
  }, []);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Session Expired</h1>
        <p className="mt-4">Please rescan the QR code to access the menu.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to Our Restaurant
          </h1>

          {url && (
            <div className="text-center">
              <QRCodeWithLogo url={url} logoSrc="/path-to-logo.png" />
              <p className="text-gray-600 mt-4">Scan this QR code to order.</p>
            </div>
          )}

          {tableNumber ? (
            <div className="text-center mt-6">
              <p className="text-lg mb-4">You are at Table {tableNumber}</p>
              <button
                onClick={() => {
                  if (url) {
                    window.location.href = url; // Redirect to URL
                  } else {
                    alert("Invalid session. Please rescan the QR code.");
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                View Menu
              </button>
            </div>
          ) : (
            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">
                Please scan your table's QR code to begin ordering
              </p>
              <button
                onClick={() => navigate("/qr")}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mx-auto"
              >
                <QrCode className="w-5 h-5" />
                Scan QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
