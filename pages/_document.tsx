import {Html, Head, Main, NextScript} from "next/document";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

export default function Document() {
    const { i18n } = useTranslation('common', { bindI18n: 'languageChanged loaded' });
  
    useEffect(() => {
      i18n.reloadResources(i18n.resolvedLanguage, 'common');
    }, []);

    return (
        <Html>
            <Head />
            <body>
            <Main/>
            <NextScript />
            <div id='portal'></div>
            </body>
        </Html>
    )
}