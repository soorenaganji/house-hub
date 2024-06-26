import "./globals.css";
import Layout from "./components/layout/Layout";

import { Toaster } from "react-hot-toast";
import SessionProvider from "./providers/SessionProvider";

export const metadata = {
  title: "HouseHub",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {" "}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      
      <SessionProvider>
        <body className="min-h-screen" >
          <Layout>
            <Toaster position="top-center" />
            {children}
          </Layout>
        </body>
      </SessionProvider>
    </html>
  );
}
