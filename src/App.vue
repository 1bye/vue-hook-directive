<template>
    <label>
        <div v-hook:click.expand.toggle="true">Click</div>
    </label>

    {{ $hook('expand', {default: false}) }}

    <div v-if="$hook('expand')" style="background: red; width: 100px; height: 100px"></div>
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
