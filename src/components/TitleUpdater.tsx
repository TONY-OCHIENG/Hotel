// TitleUpdater.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/confrence": "Confrence",
  "/dining": "Dining",
  "/amenities": "Amenities",
  "/gallery": "Gallery",
};

export default function TitleUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const title = titles[pathname] ?? "Not Found";
    document.title = `${title} | My Site`;
  }, [pathname]);

  return null;
}