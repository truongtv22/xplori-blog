import "../src/assets/css/line.css";
import "../src/assets/css/icons.css";
import "../styles/globals.css";
import "../src/assets/scss/index.scss";
import "animate.css/animate.min.css";
import "aos/dist/aos.css";

import ProgressBar from "@badrap/bar-of-progress";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementLocale } from "@stripe/stripe-js";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect } from "react";
import AOS from "aos";

import { appWithTranslation } from "next-i18next";
import nextI18nConfig from '../next-i18next.config';

const queryClient = new QueryClient();
const progress = new ProgressBar({
  size: 2,
  color: "#CF0A0A",
  className: "bar-of-progress",
  delay: 10,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as any;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  return (
    <>
      <Elements key={locale} stripe={stripePromise} options={{ locale }}>
        <QueryClientProvider client={queryClient}>
          <Hydrate>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </Elements>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
