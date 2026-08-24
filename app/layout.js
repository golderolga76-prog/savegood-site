import './globals.css';

export const metadata = {
  title: 'SaveGood — Find. Compare. Save.',
  description: 'Search flights, hotels, deals, weather and useful products in one place.'
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
      </head>
      <body>{children}</body>
    </html>
  );
}
