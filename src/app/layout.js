import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles.module.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Finance Manager",
  description: "A simple personal finance manager",
};

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
