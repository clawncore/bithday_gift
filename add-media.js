// Script to help add media items to the birthday gift application
// Run this script to generate the code needed to add new media items

const mediaItems = [
    {
        id: "7",
        type: "image",
        url: "/memories/your-image.jpg",
        caption: "Your caption here",
        date: "Month Year",
        note: "Your memory or note here"
    },
    {
        id: "8",
        type: "video",
        url: "/memories/your-video.mp4",
        caption: "Your caption here",
        date: "Month Year",
        note: "Your memory or note here"
    }
];

// Function to generate the TypeScript code for server/storage.ts
function generateServerCode(items) {
    console.log("Add these items to the media array in server/storage.ts:\n");
    console.log(JSON.stringify(items, null, 2));
}

// Function to generate the JavaScript code for api/claim.js
function generateAPICode(items) {
    console.log("\n\nAdd these items to the media array in api/claim.js:\n");
    console.log(JSON.stringify(items, null, 2));
}

// Generate code for both files
generateServerCode(mediaItems);
generateAPICode(mediaItems);

console.log("\n\nInstructions:");
console.log("1. Copy the items to the media array in server/storage.ts");
console.log("2. Copy the items to the media array in api/claim.js");
console.log("3. Place your media files in client/public/memories/");
console.log("4. Run npm run build to rebuild the application");