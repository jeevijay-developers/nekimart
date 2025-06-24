import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Fetch general metadata from backend API
    const setting = await SettingServices.getStoreSeoSetting();

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={ "logo/logo.png"} />
          <meta
            property="og:title"
            content={
              setting?.meta_title || "ocentury - clothing Store "
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description || ""
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={setting?.meta_url || "https://www.ocentury.in"}
          />
          <meta
            property="og:image"
            content={setting?.meta_img || "/HomePage.png"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
