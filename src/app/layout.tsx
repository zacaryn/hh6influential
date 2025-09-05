import type { Metadata } from "next";
import Script from 'next/script';
import { BUSINESS_NAME, BRAND_TAGLINE, OPEN_GRAPH_DEFAULT_IMAGE, websiteSchema, orgSchema } from '@/lib/seo';
import { Geist, Geist_Mono } from "next/font/google";
import LayoutContent from '@/components/LayoutContent';
import QuickMessageWidget from '@/components/QuickMessageWidget';
import SpeechBubble from '@/components/SpeechBubble';
import "./globals.css";
import "../styles/App.css";
import "../styles/Header.css";
import "../styles/Footer.css";
import "../styles/Home.css";
import "../styles/About.css";
import "../styles/Services.css";
import "../styles/Portfolio.css";
import "../styles/Contact.css";
import "../styles/Terms.css";
import "../styles/NotFound.css";
import "../styles/Admin.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND_TAGLINE} | ${BUSINESS_NAME}`,
  description: "Custom websites, SEO, and growth-focused strategy.",
  icons: {
    icon: [
      { url: '/assets/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/assets/images/favicon.ico' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: `${BRAND_TAGLINE} | ${BUSINESS_NAME}`,
    description: "Custom websites, SEO, and growth-focused strategy.",
    images: [OPEN_GRAPH_DEFAULT_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="ld-website" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }} />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W41NJHQCSQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configure GA4 with enhanced settings
            gtag('config', 'G-W41NJHQCSQ', {
              // Enhanced measurement settings
              send_page_view: true,
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              
              // Custom parameters
              custom_map: {
                'custom_parameter_1': 'form_interactions',
                'custom_parameter_2': 'service_page_views'
              },
              
              // Enhanced ecommerce (ready for future use)
              enhanced_ecommerce: true,
              
              // Privacy settings
              anonymize_ip: false,
              cookie_flags: 'SameSite=None;Secure'
            });
            
            // Track page view with additional data
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname,
              content_group1: 'Website',
              content_group2: 'HH6 Influential'
            });
            
            // Track Core Web Vitals
            if ('web-vitals' in window) {
              // This will be available when web-vitals library is added
              console.log('Web Vitals tracking ready');
            }
            
            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', () => {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                gtag('event', 'scroll', {
                  event_category: 'engagement',
                  event_label: scrollPercent + '%',
                  value: scrollPercent
                });
              }
            });
            
            // Track time on page
            let startTime = Date.now();
            window.addEventListener('beforeunload', () => {
              const timeOnPage = Date.now() - startTime;
              gtag('event', 'timing_complete', {
                name: 'time_on_page',
                value: Math.round(timeOnPage / 1000)
              });
            });
          `}
        </Script>
        <LayoutContent>
          {children}
        </LayoutContent>
        <QuickMessageWidget />
        <SpeechBubble />
      </body>
    </html>
  );
}