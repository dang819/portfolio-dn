import './globals.css';

export const metadata = {
  title: 'DN - Portfolio',
  description: 'Personal portfolio with past experiences and skills section',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}