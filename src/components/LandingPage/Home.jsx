import React from "react";
import NavigationBar from "./NavigationBar";
import SiteFooter from "./SiteFooter";

export default function Home({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
      <SiteFooter />
    </div>
  );
}
