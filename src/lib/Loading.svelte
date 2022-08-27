<script>
    import {onDestroy} from "svelte";
    let frame = 0;
    const interval = setInterval(() => {
        if(frame !== 3) {
            frame++
        } else {
            frame = 0
        }
    }, 500)
    onDestroy(() => clearInterval(interval));
</script>

loading{".".repeat(frame)}