import React from "react";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  // Lista de rutas sin Layout (como Login)
  const noLayoutRoutes: string[] = ["/login"];

  // Determinar si la página actual necesita el Layout
  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  return isNoLayoutRoute ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
