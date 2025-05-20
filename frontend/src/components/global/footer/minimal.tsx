"use client";

import type { Footer } from "@/sanity/types";
import { LogoOrSiteTitle, Copyright, LegalLinks } from "./shared";

type MinimalFooterProps = Footer;

export default function MinimalFooter({
  title,
  logo,
  legalLinks = [],
}: MinimalFooterProps) {
  return (
    <footer className="w-full py-8 bg-foreground text-background">
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <LogoOrSiteTitle logo={logo} title={title} className="font-semibold text-lg" />

          {/* Legal links in a row */}
          <LegalLinks links={legalLinks} variant="minimal" />

          {/* Copyright */}
          <div className="flex items-center gap-4">
            <Copyright siteTitle={title} />
          </div>
        </div>
      </div>
    </footer>
  );
}
