import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://savegood.store'),
  title: 'SaveGood — Travel & Useful Services for Ukrainians in Europe',
  description:
    'Flights, hotels, travel services, official EU information and useful resources for Ukrainians in Europe.',
  alternates: {
    canonical: 'https://savegood.store/',
  },
  openGraph: {
    title: 'SaveGood — Useful Services for Ukrainians in Europe',
    description:
      'Flights, hotels, official EU information, useful online services and AI tools in one place.',
    url: 'https://savegood.store/',
    siteName: 'SaveGood',
    type: 'website',
    images: [
      {
        url: '/api/og/savegood',
        width: 1200,
        height: 630,
        alt: 'SaveGood — savegood.store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveGood — Useful Services for Ukrainians in Europe',
    description:
      'Flights, hotels, official EU information, useful online services and AI tools in one place.',
    images: ['/api/og/savegood'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
    <meta name="monetag" content="4770140e8e69c804715245b155eaa84f"/>
    <script
  dangerouslySetInnerHTML={{
    __html: `(function(s){s.dataset.zone='11748735';s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
  }}
/>
    <script
  dangerouslySetInnerHTML={{
    __html: `(function(s){s.dataset.zone='11748704';s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
  }}
/>
    <meta name='impact-site-verification' value='a433a143-8881-4c1f-9905-6d7acc21ef46'/>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.setAttribute("data-cmp-ab","2");
                script.src = "https://emrldtp.com/NTY2MDg4.js?t=566088";
                document.head.appendChild(script);
              })();
            `,
          }}
        />
       <meta name="mitgo-verification" content="1de1ac96-38ec-46eb-9cd2-c9cf7e84ae34" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
