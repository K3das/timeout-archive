<style lang="scss" global>
    @use "../lib/Colors" as colors;
    @import "../lib/Global";

    .nav > li {
      display: inline;
      color: colors.$even-lighter-gray;
      font-size: 1.7em;
    }
</style>

<script context="module">
    const dataUrl = "/api/data"

    export async function load({ fetch }) {
        const res = await fetch(dataUrl)

        if (res.ok) {
            let memes = (await res.json()).data
            return { stuff: { memes }, props: { memes } }
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${dataUrl}`)
        };
    }
</script>

<script>
    import {goto} from "$app/navigation";
    import Loading from "$lib/Loading.svelte";

    let holding = false

    export let memes;

    function newMeme() {
        if(holding) return
        holding = true
        const index = Math.floor(Math.random() * memes.length);
        goto(`/${memes[index].shortname}`)
        setTimeout(() => holding = false, 300)
    }

    function handleKeydown({ keyCode }) {
        if(keyCode === 82) {
            newMeme()
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<ul class="nav">
    <li><a href="/"><span><strong>timeout.yarn.network</strong></span></a></li>
    <li style="float:right"><span class="sub"><em>
        {#if memes}
            <a on:click|preventDefault={newMeme} href="/api/random?redirect=1" title="tip: press r to get a new meme">random meme</a>
        {:else}
            <Loading />
        {/if}
    </em></span></li>
</ul>
<hr />
<slot></slot>
<p class="sub"><code>@kedas:matrix.org</code> ~ <a href="mailto:mail@yarn.network">mail@yarn.network</a></p>