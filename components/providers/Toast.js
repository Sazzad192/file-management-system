import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      toastOptions={{
        className: "",
        duration: 3000,
        style: {
          border: "1px solid #ddd",
          padding: "8px",
          color: "#333",
        },
      }}
      containerStyle={{
        zIndex: 999999,
      }}
    />
  );
}