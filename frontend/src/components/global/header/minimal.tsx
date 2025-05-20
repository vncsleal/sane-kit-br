"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeaderLogo, createHeaderClassName, HeaderProps, ensureAbsoluteUrl } from "./shared";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Minimal({
  title,
  logo,
  navigationItems = [],
  ctaButtons = [],
}: HeaderProps) {
  const [scrolled] = useState(false);
  
  // Site name
  const siteName = title;
  
  const headerClasses = createHeaderClassName("minimal", scrolled);

  return (
    <header className={headerClasses}>
      <div className="container px-4 md:px-2 mx-auto min-h-20 flex items-center justify-between">
        {/* LOGO SECTION */}
        <div className="flex justify-start">
          <HeaderLogo logo={logo} title={siteName} />
        </div>

        {/* RIGHT SECTION - only the hamburger menu for mobile */}
        <div className="flex justify-end items-center">
          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px] px-4 sm:px-6">
              <SheetHeader>
                <SheetTitle>
                  <HeaderLogo logo={logo} title={siteName} className="max-h-8" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 py-6">
                {navigationItems.map((item) => (
                  <div key={item._key} className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={ensureAbsoluteUrl(item.href)}
                        className="text-lg font-medium hover:text-primary flex justify-between items-center"
                      >
                        <span>
                          {item.title}
                        </span>
                        <MoveRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ) : (
                      <>
                        <p className="text-lg font-medium">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-muted-foreground text-sm pb-1">
                            {item.description}
                          </p>
                        )}
                      </>
                    )}
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem._key}
                        href={ensureAbsoluteUrl(subItem.href)}
                        className="ml-3 flex justify-between items-center py-1 text-muted-foreground hover:text-foreground"
                      >
                        <span>
                          {subItem.title}
                        </span>
                        <MoveRight className="w-3.5 h-3.5" />
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="mt-6 flex flex-col gap-3 border-t pt-6">
                  {ctaButtons.map((button) => (
                    <Button
                      key={button._key}
                      variant={button.variant || "default"}
                      asChild
                      className="w-full"
                    >
                      <Link href={ensureAbsoluteUrl(button.url)} >
                        {button.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
