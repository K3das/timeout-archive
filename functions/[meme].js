const videoTypes = ['avi', 'flv', 'mov', 'mp4', 'mpg', 'webm', 'mkv']
const audioTypes = ['mp3', 'wav', 'ogg', 'opus']
const imageTypes = ['jpg', 'jpeg', 'png', 'gif']

const baseURL = "https://timeout.nyc3.cdn.digitaloceanspaces.com/memes/"

export async function onRequest(context) {
    const {
        params,
        data,
        next
    } = context;

    let n = await next()
    if(!n.headers.get("Content-Type")?.includes("text/html")) {
        return n
    }

    const meme = data.memes.find(o => o.shortname === params.meme)
    if (!meme) {
        return new Response(n.body, {status: 404, statusText: "Not found", headers: n.headers})
    }

    let meta = ""
    meta += `<meta property="og:title" content="${meme.name}">`
    meta += `<meta property="og:site_name" content="timeout.yarn.network">`
    meta += `<meta property="og:url" content="https://timeout.yarn.network/${meme.shortname}">`
    meta += `<meta property="og:description" content="${Math.round(meme.size/1048.576)/1000} MB | ${meme.hash}">`

    let embedType
    if(videoTypes.includes(meme.format)) {
        embedType = "video"
    } else if(audioTypes.includes(meme.format)) {
        embedType = "audio"
    } else if(imageTypes.includes(meme.format)) {
        embedType = "image"
        meta += `<meta name="twitter:card" content="summary_large_image">`
    }

    if(embedType) {
        meta += `<meta property="og:type" content="${embedType}">`
        meta += `<meta property="og:${embedType}" content="${baseURL}${meme.name}">`
    }

    const newBody = (await n.text()).replace("<!--#meta-->", meta).replace("<title></title>", `<title>${meme.name} ~ timeout.yarn.network</title>`)
    return new Response(newBody, n)
}
