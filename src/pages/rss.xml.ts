import { getCollection } from "astro:content";

export async function GET({ site }) {
  const posts = await getCollection("posts", (p) => !p.data.draft);

  const items = posts
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .slice(0, 50)
    .map((p) => {
      return `
<item>
  <title><![CDATA[${p.data.title}]]></title>
  <link>${site}/blog/${p.slug}</link>
  <guid>${site}/blog/${p.slug}</guid>
  <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
  <description><![CDATA[${p.data.description}]]></description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>hide-cat-cat</title>
  <link>${site}</link>
  <description>hide-cat-cat blog</description>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
