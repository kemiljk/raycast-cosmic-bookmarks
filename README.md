# Cosmic Bookmarks

Read, visit and save Bookmarks to and from Cosmic

## Getting started

In order to get started you'll need a [Cosmic account](https://app.cosmicjs.com/signup). If you already ahve one, you can create a new Bucket for your Bookmarks or modify this code locally to fetch and handle your Cosmic data to suit your needs.

## API keys

To get access to your Cosmic Bucket securely, you can provide your Bucket slug, and your read and write keys. This allows the extension to access your Bucket content and write back to it. You'll need to provie them both in order to save from your clipboard into your Bucket.
![Raycast Settings](https://share.cleanshot.com/cPwlgKCP)
![Cosmic API keys](https://share.cleanshot.com/56WGkXc2)

## Content model

You'll need a specific content model to use the extension as it stands. In order to get the most out of this extension, you can copy the below content model structure inside of a new Object Type. You'll need to call the Object Type 'Bookmarks' in order for the fetching to validate correctly.

**Object Type model**
![Cosmic Object Type model](https://share.cleanshot.com/ZnFkGtgj)

```json
{
  "object_types": [
    {
      "title": "Bookmarks",
      "slug": "bookmarks",
      "singular": "Bookmark",
      "metafields": [
        {
          "children": null,
          "type": "text",
          "title": "snippet",
          "key": "snippet",
          "id": "snippet-metafield-id",
          "value": ""
        },
        {
          "children": null,
          "type": "text",
          "title": "url",
          "key": "url",
          "id": "url-metafield-id",
          "value": ""
        },
        {
          "children": null,
          "type": "switch",
          "title": "read",
          "key": "read",
          "id": "read-metafield-id",
          "value": false,
          "options": "true,false"
        }
      ],
      "options": {
        "slug_field": 1,
        "content_editor": 0
      }
    }
  ]
}
```
