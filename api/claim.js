// Simple API endpoint for claiming the gift
// Avoiding complex imports that might cause issues in serverless environment
export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Sample gift content with actual media files
        const giftContent = {
            recipientName: "Chandrika",
            media: [
                {
                    id: "1",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.50_c7282973.jpg",
                    caption: "Our first adventure",
                    date: "March 2024",
                    note: "The beginning of our amazing journey"
                },
                {
                    id: "2",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.52_4374e524.jpg",
                    caption: "Summer movie nights",
                    date: "June 2024",
                    note: "Cozy evenings with our favorite films"
                },
                {
                    id: "3",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.52_6a60b8e5.jpg",
                    caption: "Autumn coffee dates",
                    date: "October 2024",
                    note: "Warm conversations over warm drinks"
                },
                {
                    id: "4",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.56_77ddb625.jpg",
                    caption: "Winter celebrations",
                    date: "December 2024",
                    note: "Holiday memories we'll always treasure"
                },
                {
                    id: "5",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.56_b6bf33e8.jpg",
                    caption: "Special moments",
                    date: "Various times",
                    note: "The little things that made us smile"
                },
                {
                    id: "6",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.57_791dd6bb.jpg",
                    caption: "Friendship goals",
                    date: "Throughout the year",
                    note: "Celebrating our bond"
                },
                {
                    id: "7",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.58_6a2848df.jpg",
                    caption: "New memories",
                    date: "Recent times",
                    note: "Creating new adventures together"
                },
                {
                    id: "8",
                    type: "image",
                    url: "/memories/WhatsApp Image 2025-10-20 at 08.59.59_6a3a43cb.jpg",
                    caption: "Unforgettable times",
                    date: "Special moments",
                    note: "Memories that will last forever"
                }
            ],
            craigApology: {
                shortMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig",
                fullMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig"
            },
            simbisaiApology: {
                shortMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby",
                fullMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby"
            }
        };

        return response.status(200).json({
            ok: true,
            content: giftContent,
            openedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error processing claim:", error);
        return response.status(500).json({
            ok: false,
            error: "Internal server error",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}