import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../style/root.css';
import ogImage from '../../public/logospecial.png'
import Header from '../components/Header'
import Footer from '../components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Matthijs Holland | Artist",
  description: "Portfolio of Berlin-based artist Matthijs Holland.",
  openGraph: {
    title: "Matthijs Holland | Artist",
    description: "Portfolio of Berlin-based artist Matthijs Holland.",
    images: ogImage ? [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height
      },
    ] : [],
  }
};

{/* <meta name="description" content="Portfolio of Berlin-based artist Matthijs Holland." />
<meta name="keywords" content="art portfolio, photography, contemporary artist, Matthijs Holland, Berlin, dolls, figurines" />
<meta property="og:title" content="Matthijs Holland" />
<meta property="og:description" content="Portfolio of Berlin-based artist Matthijs Holland." />
<meta property="og:image" content="%PUBLIC_URL%/logospecial.png" /> */}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
