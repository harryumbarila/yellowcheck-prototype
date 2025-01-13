import React from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }: { Component: any; pageProps: any; router: any }) => {
  // Lista de rutas sin Layout (como Login)
  const noLayoutRoutes = ["/login"];

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
