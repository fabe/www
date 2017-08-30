import Document, { Head, Main, NextScript } from 'next/document';
import config from '~/config';
import flush from 'styled-modules/server';
import ServiceWorker from './service-worker';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    return {
      ...renderPage(),
      styles: flush(),
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>
            {config.app.name}
          </title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />

          <link
            rel="icon"
            type="image/png"
            href="/static/icons/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/icons/favicon-16x16.png"
            sizes="16x16"
          />

          <link
            rel="image_src"
            type="image/jpg"
            href={`${config.app.publicUrl}/static/facebook.jpg`}
          />

          <meta name="theme-color" content="#333333" />

          <meta
            property="og:image:url"
            content={`${config.app.publicUrl}/static/facebook.jpg`}
          />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:url" content={config.app.publicUrl} />
          <meta property="og:image:height" content="1052" />
          <meta property="og:image:height" content="550" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@fschultz_" />
          <meta
            name="twitter:image"
            content={`${config.app.publicUrl}/static/twitter.jpg`}
          />
          <meta
            name="twitter:summary_large_image"
            content={`${config.app.publicUrl}/static/facebook.jpg`}
          />

          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <ServiceWorker />
        </body>
      </html>
    );
  }
}
