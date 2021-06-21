<script lang="ts">
    let name: string = "world";
</script>

<main>
    <h1>Hello {name}!</h1>
    <input type="text" bind:value={name}/>
</main>

<style>
    main {
        text-align: center;
        font-family: "Segoe UI", sans-serif;
    }
</style>
