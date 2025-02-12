"use client";
import React, { useEffect } from "react";
import { themeChange } from "theme-change";

export default function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    themeChange(false);
  }, []);

  return <div>{children}</div>;
}
