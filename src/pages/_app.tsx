import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { makeServer } from "../server/miraje";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
