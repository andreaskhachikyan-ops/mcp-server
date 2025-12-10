import fetch from "node-fetch";

export default async function wikipediaTool({ query }) {
  if (!query) throw new Error("query is required");

  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(query);
  const res = await fetch(url);
  const json = await res.json();

  return {
    title: json.title,
    summary: json.extract,
    url: json.content_urls?.desktop?.page
  };
}
