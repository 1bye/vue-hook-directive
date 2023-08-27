<template>
    <label>
        <div v-hook:click.popup="{name: 'something'}">Click</div>
    </label>

    <div style="background: red; width: 100px; height: 100px" v-hook:mousemove.s="'s'"></div>
</template>

<script setup lang="ts">
import {useHook} from "../plugin";

const hook = useHook();

type Hooks = 'popup'

hook.hook<Hooks>('popup', (data) => {
    console.log(data)
})

hook.hook<Hooks>('s', (data) => {
    console.log(data)
})
</script>

<style scoped>

</style>
