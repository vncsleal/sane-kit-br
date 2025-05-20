"use client";

import { Header as SanityHeader } from "@/sanity/types";
import HeaderComponent from "./header/index";

type HeaderProps = SanityHeader;

export default function Header(props: HeaderProps) {
  return <HeaderComponent {...props} />;
}
