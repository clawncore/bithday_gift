// Simple API endpoint for claiming the gift
// Avoiding complex imports that might cause issues in serverless environment
export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Sample gift content with actual media files
        const giftContent = {
            recipientName: "Jane Doe",
            craigApology: {
                shortMessage: "Dearest Jane Doe, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, John Doe",
                fullMessage: "Dearest Jane Doe, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, John Doe"
            },
            simbisaiApology: {
                shortMessage: "Happy Birthday Jane Doe! Hope you have an amazing day! Cheers, Jane Doe",
                fullMessage: "Happy Birthday Jane Doe! Hope you have an amazing day! Cheers, Jane Doe"
            },
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