// @ts-check
import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // User-site repo (trevorwattles.github.io), so no `base` is needed.
  // When the custom domain is set up: change this to "https://<domain>"
  // and add public/CNAME containing the domain (§13.3).
  site: "https://trevorwattles.github.io",
  output: "static",
});
