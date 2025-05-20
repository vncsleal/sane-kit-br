import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { client } from "@/sanity/client";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { ThemeToggle } from "@/components/global/ThemeToggle";
import type { Footer as SanityFooter, Header as SanityHeader } from "@/sanity/types";
// Import the PostHogProvider
import { PostHogProvider } from "@/components/PostHogProvider";
// Import the GoogleAnalytics component
import { GoogleAnalytics } from "@/components/global/GoogleAnalytics";
import { CookieConsent } from "@/components/global/CookieConsent";
// Import the CookieConsent component

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sane Kit",
	description: "A Sanity + Next.js starter kit",
};

async function getGlobals(): Promise<{
	header: SanityHeader | null;
	footer: SanityFooter | null;
}> {
	const [header, footer] = await Promise.all([
		client.fetch<SanityHeader | null>(`*[_type == "header"][0]`),
		client.fetch<SanityFooter | null>(`*[_type == "footer"][0]`),
	]);
	return { header, footer };
}


export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { header, footer } = await getGlobals();

	return (
		<html suppressHydrationWarning>
			<head>
				{/* Google Analytics */}
				<GoogleAnalytics />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
				<PostHogProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
							{header && <Header {...header} />}
							<div className="mt-20">{children}</div>
							{footer && <Footer {...footer} />}
							<div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
								<ThemeToggle />
							</div>
							<Toaster position="top-center" />
							<CookieConsent />
					</ThemeProvider>
				</PostHogProvider>
			</body>
		</html>
	);
}