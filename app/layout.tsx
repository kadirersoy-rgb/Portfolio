import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>

        {/* Curseur personnalisé */}
        <CustomCursor />

        {/* Contenu du site */}
        {children}

        </body>
    </html>
  );
}
