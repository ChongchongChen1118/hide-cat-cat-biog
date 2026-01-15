import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("posts", (p) => !p.data.draft);

  const items = posts.map((p) => ({
    slug: p.slug,
    title: p.data.title,
    description: p.data.description,
    date: p.data.date,
    tags: p.data.tags ?? [],
  }));

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
