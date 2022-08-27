<style lang="scss">
    video {
        max-height: 80vh;
        max-width: 100%;
        min-width: 100%;
    }

    audio { min-width: 100%; }

    video:focus, audio:focus { outline: none; }

    img {
        object-fit: cover;
        height: 80vmin;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<script context="module">
    export async function load({ params, stuff }) {

        const meme = stuff.memes.find(o => o.shortname === params.meme);
        if(!meme) {
            return {
                status: 404,
                error: new Error(`not found :(`)
            };
        }
        return { status: 200, props: { meme } }
    }
</script>

<script>
    import { prettyTime } from "$lib/Utils.js";

    const videoTypes = ['avi', 'flv', 'mov', 'mp4', 'mpg', 'webm', 'mkv']
    const audioTypes = ['mp3', 'wav', 'ogg', 'opus']
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif']

    const baseURL = "https://timeout.nyc3.cdn.digitaloceanspaces.com/memes/"

    export let meme;
</script>

<svelte:head>
    <title>{meme.name} ~ timeout.yarn.network</title>
</svelte:head>

<h3 class="sub"><a href="{baseURL}{meme.name}"><code>{meme.name}</code></a></h3>
{#if videoTypes.includes(meme.format)}
    <video src="{baseURL}{meme.name}" controls="1" autoplay="1" autofocus="1"></video>
    <p>video not playing? try downloading <a href="{baseURL}{meme.name}">here</a></p>
{:else if audioTypes.includes(meme.format)}
    <audio src="{baseURL}{meme.name}" controls="1" autoplay="1" autofocus="1"></audio>
    <p>audio not playing? try downloading <a href="{baseURL}{meme.name}">here</a></p>
{:else if imageTypes.includes(meme.format)}
    <a href="{baseURL}{meme.name}"><img src="{baseURL}{meme.name}" alt="meme"/></a>
    <p>image not loading? try downloading <a href="{baseURL}{meme.name}">here</a></p>
{:else}
    <h3>no preview available</h3>
{/if}

<h2>info</h2>
<ul class="pretty">
    <li><strong>uploaded</strong>: <code>{prettyTime(meme.time*1000)}</code></li>
    <li><strong>size</strong>: <code>{Math.round(meme.size/1048.576)/1000} MB</code></li>
    <li><strong>md5</strong>: <code>{meme.hash}</code></li>
</ul>