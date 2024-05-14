import Providers from '@/components/Providers';
import "./globals.css";

export const metadata ={
  title: "Corvus Crow Nest",
  description: "Education Edition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
