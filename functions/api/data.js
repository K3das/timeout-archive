
export async function onRequest(context) {
    const {
        data
    } = context;

    return new Response(JSON.stringify({ data: data.memes }), {
        headers: { "Content-Type": "application/json;charset=UTF-8", "Cache-Control": "max-age=1200" },
    });
}
