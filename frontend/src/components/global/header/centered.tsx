"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeaderLogo, createHeaderClassName, HeaderProps, ensureAbsoluteUrl } from "./shared";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Centered({
  title,
  logo,
  navigationItems = [],
  ctaButtons = [],
  dropdownCTALabel,
  dropdownCTAUrl = "/contact",
}: HeaderProps) {
  const [scrolled] = useState(false);
  
  // Site name
  const siteName = title;
  // Dropdown CTA label
  const ctaLabel = dropdownCTALabel || "Book a call today";
  
  const headerClasses = createHeaderClassName("centered", scrolled);

  return (
    <header className={headerClasses}>
      <div className="container px-4 md:px-2 mx-auto min-h-20 flex items-center gap-4 flex-row lg:grid lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => {
                const navTitle = item.title;
                return (
                  <NavigationMenuItem key={item._key}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Button variant="ghost" asChild>
                          <Link href={ensureAbsoluteUrl(item.href)}>
                            {navTitle}
                          </Link>
                        </Button>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-sm">
                          {navTitle}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base">
                                  {navTitle}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {item.description}
                                </p>
                              </div>
                              <Button size="sm" className="mt-10" asChild>
                                <Link href={ensureAbsoluteUrl(dropdownCTAUrl)}>
                                  {ctaLabel}
                                </Link>
                              </Button>
                            </div>
                            <div className="flex flex-col text-sm h-full justify-end">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink
                                  href={ensureAbsoluteUrl(subItem.href)}
                                  key={subItem._key}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span>
                                    {subItem.title}
                                  </span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex lg:justify-center">
          <HeaderLogo logo={logo} title={siteName} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-end w-full gap-4 items-center">
          <div className="hidden lg:flex gap-4">
            {ctaButtons.map((button) => (
              <Button
                key={button._key}
                variant={button.variant || "default"}
                asChild
              >
                <Link href={ensureAbsoluteUrl(button.url)}>
                  {button.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
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
                      <Link href={ensureAbsoluteUrl(button.url)}>
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
