
<script setup>
</script>

<template>
    <div class="grid">
        <div class="left side">
            <slot name="left"></slot>
        </div>
        <div class="right side">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100%;
}

.side {
    height: 100%
}

.left {
    background-color: rgb(0, 0, 70);
}

.right {
    background-color: rgb(70, 0, 0);
}
</style>