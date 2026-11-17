// @ts-check
import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Custom domain on a user-site repo, served from the root, so no `base`.
  // The domain itself is set in the repo's Pages settings (Actions deploys
  // ignore CNAME files); public/CNAME is kept to match it.
  site: "https://trevorwattles.com",
  output: "static",
});
