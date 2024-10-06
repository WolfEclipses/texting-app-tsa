import Providers from '@/components/Providers';
import './globals.css';

export const metadata = {
  title: 'Corvus Crow Nest',
  description: 'Education Edition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Dark mode script
                const darkMode = localStorage.getItem('darkMode');
                if (darkMode === 'true') {
                  document.documentElement.classList.add('dark');
                }

                // Accent color script
                const accentColor = localStorage.getItem('accentColor');
                if (accentColor) {
                  document.documentElement.style.setProperty('--accent-color', JSON.parse(accentColor));
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}