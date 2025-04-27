import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>{children}</SessionProvider>;
    </NextThemesProvider>
  );
}
