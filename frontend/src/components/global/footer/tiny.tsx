"use client";

import type { Footer } from "@/sanity/types";
import { LogoOrSiteTitle, Copyright, LegalLinks } from "./shared";

type TinyFooterProps = Footer;

export default function TinyFooter({
  title,
  logo,
  legalLinks = [],
}: TinyFooterProps) {
  return (
    <footer className="w-full py-6 bg-background border-t">
      <div className="container mx-auto ">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <LogoOrSiteTitle logo={logo} title={title} className="font-medium" />

          {/* Legal links in a row */}
          <LegalLinks links={legalLinks} variant="tiny" />

          {/* Copyright */}
          <div className="flex items-center gap-4">
            <Copyright siteTitle={title} />
          </div>
        </div>
      </div>
    </footer>
  );
}
