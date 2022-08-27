
export async function onRequest(context) {
    const {
        params,
        data,
    } = context;

    const meme = data.memes.find(o => o.shortname === params.meme);
    if (meme) {
        return new Response(JSON.stringify({ data: meme }), {
            headers: { "Content-Type": "application/json;charset=UTF-8", "Cache-Control": "max-age=1200" },
        });
    } else {
        return new Response(JSON.stringify({ error: "Meme not found" }), {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            status: 404
        });
    }
}
