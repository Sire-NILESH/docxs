import "../styles/globals.css";
import { AppProps } from "next/app";
import "@material-tailwind/react/tailwind.css";
import Head from "next/head";

function MyApp(AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <AppProps.Component {...AppProps.pageProps} />
    </>
  );
}

export default MyApp;
