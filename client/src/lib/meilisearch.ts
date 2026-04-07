// lib/meilisearch.ts
import { MeiliSearch } from "meilisearch";

export const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://127.0.0.1:7700",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || "",
});
