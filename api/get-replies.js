// API endpoint to get replies - Vercel compatible version
// Avoiding complex imports that might cause issues in serverless environment
export default async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // For now, return empty replies array
        // In a production environment, you would connect to your database
        return response.status(200).json({
            ok: true,
            replies: []
        });
    } catch (error) {
        console.error("Error fetching replies:", error);
        return response.status(500).json({ 
            ok: false,
            error: "Failed to fetch replies",
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
        });
    }
}