"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Providers({ children, session }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // defaultOptions: {
        //   queries: {
        //     suspense: true,
        //   }
        // }
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
      ;
    </QueryClientProvider>
  );
}

export default Providers;
