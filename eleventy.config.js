export default function (eleventyConfig) {
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

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
  };
}
