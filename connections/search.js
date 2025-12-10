import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function searchTool({ q }) {
  if (!q) throw new Error("q missing");

  const html = await fetch("https://duckduckgo.com/?q=" + encodeURIComponent(q)).then(r => r.text());
  const $ = cheerio.load(html);

  let results = [];
  $("a.result__a").each((i, el) => {
    results.push({
      title: $(el).text(),
      link: $(el).attr("href")
    });
  });

  return results.slice(0, 5);
}
