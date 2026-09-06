declare module "tailwindcss/lib/util/flattenColorPalette" {
  const flattenColorPalette: (colors: unknown) => unknown;
  export = flattenColorPalette;
}

declare module "github-markdown-css/github-markdown.css" {
  const styles: { ["markdown-body"]: string };
}
