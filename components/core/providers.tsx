import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
