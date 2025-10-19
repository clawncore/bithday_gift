# How to Add More Media to the Timeline

This document explains how to add more pictures and videos to the timeline section of the birthday gift application.

## Current Implementation

The timeline is implemented in the [MediaGallery](file:///c:/xampp/htdocs/src/HappyBirthdayReel/client/src/components/MediaGallery.tsx#L10-L177) component, which displays media items in a sideways Google Photos-like timeline format. The media items alternate between left and right positions as you scroll down.

## How to Add More Media Items

### Option 1: Add to Server Storage (for development/testing)

1. Open `server/storage.ts`
2. Find the `media` array in the `initializeSampleToken` function
3. Add new media items to the array following this format:

```typescript
{
  id: "unique-id", // Use a unique string ID
  type: "image" or "video", // Specify the media type
  url: "/path/to/your/media/file", // Path to your media file in the public directory
  caption: "A short title for the media",
  date: "When this was taken",
  note: "A longer description or memory associated with this media"
}
```

Example for an image:
```typescript
{
  id: "7",
  type: "image",
  url: "/memories/beach-day.jpg",
  caption: "Beach day fun",
  date: "July 2024",
  note: "That day we built the most epic sandcastle"
}
```

Example for a video:
```typescript
{
  id: "8",
  type: "video",
  url: "/memories/birthday-party.mp4",
  caption: "Birthday celebration",
  date: "August 2024",
  note: "Your surprise birthday party - you should have seen your face!"
}
```

### Option 2: Add to API Endpoint (for production/static deployment)

1. Open `api/claim.js`
2. Find the `media` array in the `giftContent` object
3. Add new media items following the same format as above

## Media File Placement

Place your media files in the `client/public` directory. You can create subdirectories to organize them:

```
client/
  public/
    memories/
      beach-day.jpg
      birthday-party.mp4
      camping-trip.mp4
    special-moments/
      graduation.jpg
      wedding.jpg
```

Then reference them with URLs like:
- `/memories/beach-day.jpg`
- `/memories/birthday-party.mp4`

## Best Practices

1. **File Size**: Optimize images and videos for web use to ensure fast loading
2. **Dimensions**: Use consistent aspect ratios for a better visual experience
3. **IDs**: Always use unique IDs for each media item
4. **Captions**: Keep captions short and descriptive
5. **Dates**: Use consistent date formatting
6. **Notes**: Use notes to share the story behind each memory

## Supported Media Types

- Images: JPG, PNG, GIF, WEBP
- Videos: MP4, WEBM, OGV

## Testing Your Changes

1. After adding media items, rebuild the application:
   ```
   npm run build
   ```

2. Start the development server to test:
   ```
   npm run dev
   ```

3. Navigate to the gift page and scroll down to see your new media items in the timeline

## Example Media Items

Here's a complete example of how to add multiple media items:

```typescript
{
  id: "7",
  type: "image",
  url: "/memories/sunset-beach.jpg",
  caption: "Sunset at the beach",
  date: "June 15, 2024",
  note: "The perfect end to our summer vacation"
},
{
  id: "8",
  type: "video",
  url: "/memories/dance-party.mp4",
  caption: "Dance party",
  date: "July 4, 2024",
  note: "When you taught me that new dance move"
},
{
  id: "9",
  type: "image",
  url: "/memories/coffee-date.jpg",
  caption: "Coffee shop date",
  date: "August 22, 2024",
  note: "Trying that new cafe downtown"
}
```

The timeline will automatically:
- Alternate the position of each item (left/right)
- Add smooth scroll-based animations
- Provide a lightbox view when items are clicked
- Work responsively on mobile and desktop devices

Enjoy adding your memories to the timeline!