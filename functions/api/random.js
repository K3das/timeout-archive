
export async function onRequest(context) {
    const {
        request,
        data,
    } = context;

    const index = Math.floor(Math.random() * data.memes.length);
    const { searchParams } = new URL(request.url)

    if(searchParams.get("redirect")) {
        return new Response(`oop going to /${data.memes[index].shortname}` ,{
            status: 302,
            headers: {
                "Location": `/${data.memes[index].shortname}`
            }
        })
    }

    return new Response(JSON.stringify({
        data: searchParams.get("short") ? data.memes[index].shortname : data.memes[index]
    }), {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
}
