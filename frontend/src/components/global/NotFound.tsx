"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
	title: string;
	message: string;
	linkHref: string;
	linkText: string;
}

export default function NotFound({
	title,
	message,
	linkHref,
	linkText,
}: NotFoundProps) {
	return (
		<div className="container mx-auto px-4 md:px-6 py-24 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
			<h1 className="text-4xl font-bold tracking-tight mb-4">
				{title || "Página não encontrada"}
			</h1>
			<p className="text-xl text-muted-foreground mb-8">{message || "Desculpe, não conseguimos encontrar a página que você está procurando."}</p>
			<Button asChild>
				<Link href={linkHref || "/"}>{linkText || "Voltar à página inicial"}</Link>
			</Button>
		</div>
	);
}
