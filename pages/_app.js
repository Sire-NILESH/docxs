import "@material-tailwind/react/tailwind.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "next-auth/client";

function MyApp(AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <Provider session={AppProps.pageProps.session}>
        <AppProps.Component {...AppProps.pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;

{
  /* <SessionProvider session={AppProps.session}>
        <AppProps.Component {...AppProps.pageProps} />
      </SessionProvider> */
}
