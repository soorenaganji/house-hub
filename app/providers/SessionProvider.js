"use client";

import { SessionProvider as Provider } from "next-auth/react";

const SessionProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
