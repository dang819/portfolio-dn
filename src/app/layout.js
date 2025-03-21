import './globals.css';

export const metadata = {
  title: 'ID Badge',
  description: 'ID Badge with effects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}