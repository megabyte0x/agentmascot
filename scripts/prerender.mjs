import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const serverBundle = path.join(root, ".prerender/entry-server.js");

try {
  const { render } = await import(`${pathToFileURL(serverBundle).href}?v=${Date.now()}`);
  const markup = render();
  const outputPath = path.join(root, "dist/index.html");
  const html = await readFile(outputPath, "utf8");
  const rendered = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  if (rendered === html) throw new Error("Could not find the root element in dist/index.html");
  await writeFile(outputPath, rendered);
} finally {
  await rm(path.join(root, ".prerender"), { recursive: true, force: true });
}
