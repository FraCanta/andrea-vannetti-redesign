import Script from "next/script";

const TAG_ID = "GT-5TJZGKMH";

export function GoogleTag() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
          wait_for_update: 500
        });
        try {
          if (localStorage.getItem('cookie_consent') === 'accepted') {
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          }
        } catch (e) {}
        gtag('js', new Date());
        gtag('config', '${TAG_ID}');
      `}</Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
