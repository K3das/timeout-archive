<style lang="scss">
    @use "../lib/Colors" as colors;

    .key {
      background: colors.$bg;
      color: colors.$light-gray;
      border: 1px solid colors.$light-gray;
      border-radius: 1px;
      text-align: center;
      padding: 0.5mm 1.3mm;
    }
</style>

<script>
    import { prettyTime } from "$lib/Utils.js";

    import { page } from "$app/stores";
</script>

<svelte:head>
    <title>({$page.stuff.memes.length}) timeout.yarn.network</title>
</svelte:head>

<h4>📣 this site is now in an archived state, so it wont be receiving any updates - <a href="https://timeout.nyc3.cdn.digitaloceanspaces.com/final-smollest.mp4">&lt;3 (45MB)</a></h4>
<p>
    a strange collection of shitposts stolen from various discord servers
    <br>use the <code class="key">r</code> key to get a random meme
</p>


<ul class="pretty">
    {#each $page.stuff.memes as meme}
        <li>
           <strong><a class="w" href="{meme.shortname}">{meme.shortname}</a></strong> - <em class="sub">{prettyTime(meme.time*1000)}</em>
        </li>
    {/each}
</ul>