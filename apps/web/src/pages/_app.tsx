import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../server/src/router";

export const trpc = createReactQueryHooks<AppRouter>();

import type { AppProps } from "next/app";
import type { FC } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      // trpcが動いているserverのエンドポイント
      url: "http://localhost:3001/trpc",
      headers() {
        return {
          // authorizationをheaderに付与する
          authorization: "Bearer authorization-token",
        };
      },
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionOptions={{ key: "mantine", prepend: false }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
