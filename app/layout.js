export const metadata = {
  title: "DOI Stats Card API",
  description: "API service for generating DOI statistics cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
