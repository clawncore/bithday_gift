// Simple API endpoint for claiming the gift
export default function handler(request, response) {
    // Always return the gift content, regardless of secret word

    // Sample gift content
    const giftContent = {
        recipientName: "Chandrika",
        media: [
            {
                id: "1",
                type: "image",
                url: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=800&q=80",
                caption: "Spring adventures",
                date: "March 2024",
                note: "Exploring new places together"
            },
            {
                id: "2",
                type: "image",
                url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80",
                caption: "Summer movie nights",
                date: "June 2024",
                note: "Cozy evenings with our favorite films"
            },
            {
                id: "3",
                type: "image",
                url: "https://images.unsplash.com/photo-1543332143-4e8c27e3256a?w=800&q=80",
                caption: "Autumn coffee dates",
                date: "October 2024",
                note: "Warm conversations over warm drinks"
            },
            {
                id: "4",
                type: "image",
                url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
                caption: "Winter celebrations",
                date: "December 2024",
                note: "Holiday memories we'll always treasure"
            },
            {
                id: "5",
                type: "image",
                url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
                caption: "Special moments",
                date: "Various times",
                note: "The little things that made us smile"
            },
            {
                id: "6",
                type: "image",
                url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                caption: "Friendship goals",
                date: "Throughout the year",
                note: "Celebrating our bond"
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
}