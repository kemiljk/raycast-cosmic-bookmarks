import { getPreferenceValues, Clipboard } from "@raycast/api";
import { createBucketClient } from "@cosmicjs/sdk";
import { load } from "cheerio";
import fetch from "node-fetch";

interface Preferences {
  bucketSlug: string;
  readKey: string;
  writeKey: string;
}

export default async function Command() {
  const { bucketSlug, readKey, writeKey } = getPreferenceValues<Preferences>();

  try {
    const url = (await Clipboard.readText())?.trim();
    if (!url) {
      console.error("Clipboard does not contain a URL");
      return;
    }
    const data = await fetch(url);
    if (!data) return null; // add this line to check if data is undefined
    const html = await data.text();
    const $ = load(html);

    const metaTitle = $('meta[name="title"]');
    const metaDescription = $('meta[name="description"]');
    const pageTitle = $("title");

    const title = metaTitle.attr("content") || pageTitle.text();
    const description = metaDescription.attr("content") || "";
    const extractedUrl = data.url;

    console.log(title, description, extractedUrl);

    await addBookmark(bucketSlug, readKey, writeKey, title ?? "", description ?? "", extractedUrl ?? "");
    return {
      title,
      description,
      url: extractedUrl,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addBookmark(
  bucketSlug: string,
  readKey: string,
  writeKey: string,
  title: string,
  snippet: string,
  url: string
) {
  const cosmic = createBucketClient({
    bucketSlug: bucketSlug,
    readKey: readKey,
    writeKey: writeKey,
  });

  try {
    const create = await cosmic.objects.insertOne({
      type: "bookmarks",
      title: title,
      metadata: {
        snippet: snippet,
        url: url,
        read: false,
      },
    });
    const data = await create.object;
    console.log(data);
    Clipboard.clear();
  } catch (err) {
    console.error("Error:", err);
  }
}
