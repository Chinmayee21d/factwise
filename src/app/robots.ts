import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cgi-bin/", "/header-demo"],
      },
    ],
    sitemap: "https://factwise.io/sitemap.xml",
    host: "https://factwise.io",
  };
}
