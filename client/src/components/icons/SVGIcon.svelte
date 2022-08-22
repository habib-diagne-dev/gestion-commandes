<script>
    export let fill = "white";
    export let d = "";
    export let width = 25
    export let height = 25
    export let viewBox = "0 0 26 26"
</script>

<!--------------------------------------------->

<svg
    aria-hidden="true"
    role="img"
    class="icon"
    {width}
    {height}
    {viewBox}
>
    <path {fill} {d} />
</svg>

<!--------------------------------------------->
<style>
    .icon {
        position: relative;
        display: inline-block;
        background-color: transparent;
    }
</style>
