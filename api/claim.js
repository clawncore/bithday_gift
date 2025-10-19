// Simple API endpoint for claiming the gift
export default function handler(request, response) {
    // For demo purposes, we'll return a simple response
    // In a real implementation, you would connect to your database or storage

    if (request.query.word !== 'panda') {
        return response.status(400).json({
            ok: false,
            reason: 'invalid'
        });
    }

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
            }
        ],
        craigApology: {
            shortMessage: "Craig's heartfelt message",
            fullMessage: "Dear Chandrika, I want to sincerely apologize for the mistakes we've made..."
        },
        simbisaiApology: {
            shortMessage: "Message from Simby",
            fullMessage: "Dear Chandrika, I wanted to reach out again with honesty..."
        }
    };

    return response.status(200).json({
        ok: true,
        content: giftContent,
        openedAt: new Date().toISOString()
    });
}