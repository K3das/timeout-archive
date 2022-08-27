export async function onRequest(context) {
    const {
        params,
        data,
        next
    } = context;
    const n = await next()

    let meta = ""
    meta += `<meta property="og:title" content="timeout.yarn.network">`
    meta += `<meta property="og:url" content="https://timeout.yarn.network/">`
    meta += `<meta property="og:description" content="[ARCHIVE] a strange collection of shitposts stolen from various discord servers">`

    const newBody = (await n.text()).replace("<!--#meta-->", meta).replace("<title></title>", `<title>(${data.memes.length}) timeout.yarn.network</title>`)
    return new Response(newBody, n)
}
