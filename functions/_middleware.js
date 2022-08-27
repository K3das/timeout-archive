const dataUrl = "https://timeout.nyc3.digitaloceanspaces.com/memes/_data.json"

const addData = async ({ next, data, waitUntil }) => {
    const cacheKey = new Request(dataUrl)
    const cache = caches.default

    let response = await cache.match(cacheKey)
    let parsed;
    if (!response) {
        response = await fetch(dataUrl)
        response = new Response(response.body)

        response.headers.append("Cache-Control", "s-maxage=600")

        waitUntil(cache.put(cacheKey, response.clone()))
    } else {
        console.log(`Cache hit for: ${dataUrl}.`);
    }

    data.memes = parsed ? parsed : await response.json()
    return await next()
}

const errorHandler = async ({ next }) => {
    try {
        return await next()
    } catch (err) {
        return new Response(JSON.stringify({ error: `Internal error: ${err.message}\n${err.stack}` }), {
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            status: 500
        });
    }
}

export const onRequest = [
    addData,
    errorHandler
]