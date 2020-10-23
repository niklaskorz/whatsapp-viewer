import "normalize.css";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";
import "../styles/globals.css";

interface Props<T> {
  Component: React.ComponentType<T>;
  pageProps: T;
}

export default function App<T>({
  Component,
  pageProps,
}: Props<T>): React.ReactNode {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
