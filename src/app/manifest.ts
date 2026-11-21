import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Volcadrone",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#060807",
    theme_color: "#63c936",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
