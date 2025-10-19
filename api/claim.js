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
            shortMessage: "Craig's heartfelt message",
            fullMessage: `Dearest Chandrika,

First and foremost, I want to sincerely apologize for the mistakes we've made and the pain we've caused you. I understand that my actions and words have hurt you deeply, and for that, I am truly sorry.

I take full responsibility for my part in this situation. I realize now that I was thoughtless and inconsiderate, and I deeply regret the impact my behavior has had on you. You deserved so much better from me.

As we reflect on this past year together, I want you to know that despite the mistakes, the memories we've created together have been some of the most meaningful in my life. You are an incredible person with a beautiful heart, and I'm grateful to have had the opportunity to know you.

I hope that in time, you can find it in your heart to forgive us. I'm committed to learning from this experience and becoming a better person - not just for you, but for myself as well.

I hope you have a wonderful birthday, and I wish you nothing but happiness, success, and love in the year ahead.

With sincere apologies and warm birthday wishes,
Craig\``
        },
        simbisaiApology: {
            shortMessage: "Message from Simby (fatso)",
            fullMessage: `Dear Chandrika,

I wanted to reach out again — not with drama, but with honesty (and maybe a little laughter too). I know I've hurt you in more ways than I'd like to admit, and I'm sorry for it — truly.

Looking back at everything — the chaos, the jokes, the teasing — I can still hear you calling me \"Putin\" or \"fatso,\" and I can't even be mad. Those moments somehow became a weirdly special part of our story. You had that way of roasting me while still making me laugh, even when I deserved it.

But beyond the jokes, I know I broke your trust. I didn't treat your care with the respect it deserved. And for that, I take full responsibility. You were genuine with me — patient, kind, way more forgiving than I ever earned.

This past year taught me things about friendship, loyalty, and the cost of taking people for granted. I can't undo what's been done, but I want you to know I've been reflecting — growing, even — trying to become someone who doesn't repeat the same mistakes.

And since it's your birthday, I hope the world gives you back all the good you've poured into it — the laughter, the love, the light. You deserve nothing less.

With a mix of guilt, gratitude, and a smile I can't quite hide,
Simbisai\``
        }
    };

    return response.status(200).json({
        ok: true,
        content: giftContent,
        openedAt: new Date().toISOString()
    });
}