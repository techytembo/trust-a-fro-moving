import fs from "node:fs";
import path from "node:path";
import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites root-relative links ("/css/...", "/#services") under PATH_PREFIX,
  // so the same templates work locally ("/") and on GitHub Pages ("/trust-a-fro-moving/").
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addFilter("stars", (n) => "★".repeat(Number(n) || 0));
  eleventyConfig.addFilter("telHref", (s) => "tel:" + String(s || "").replace(/[^0-9+]/g, ""));
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  // **text** becomes <strong>text</strong>; everything else is HTML-escaped
  eleventyConfig.addFilter("bold", (s) =>
    String(s || "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  );
  // "/images/hero.webp" -> "/images/hero-800.webp 800w, ..." from sibling files named <name>-<width>.<ext>.
  // Images uploaded through the editor have no variants and get an empty srcset.
  eleventyConfig.addFilter("srcset", (src) => {
    if (!src) return "";
    const { dir, name, ext } = path.posix.parse(src);
    const folder = path.join("src", dir);
    if (!fs.existsSync(folder)) return "";
    const re = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-(\\d+)${ext.replace(".", "\\.")}$`);
    return fs.readdirSync(folder)
      .map((f) => f.match(re))
      .filter(Boolean)
      .sort((a, b) => a[1] - b[1])
      .map((m) => `${dir}/${m[0]} ${m[1]}w`)
      .join(", ");
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
