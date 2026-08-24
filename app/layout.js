import './globals.css';

export const metadata = {
  title: 'SaveGood — Find. Compare. Save.',
  description: 'Search flights, hotels, deals, weather and useful products in one place.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
