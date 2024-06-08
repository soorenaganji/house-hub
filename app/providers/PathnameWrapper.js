// components/ClientWrapper.js
"use client";
import { usePathname } from "next/navigation";
import Layout from "../components/layout/Layout";

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();
  return (
    <Layout pathname={pathname}>
      {children}
    </Layout>
  );
};

export default ClientWrapper;
