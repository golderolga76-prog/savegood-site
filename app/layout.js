import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'SaveGood — Travel & Useful Services for Ukrainians in Europe',
  description:
    'Flights, hotels, travel services, official EU information and useful resources for Ukrainians in Europe.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
