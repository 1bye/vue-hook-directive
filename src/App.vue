<template>
    <label>
        <div v-hook:click.expand.toggle="'1'">Click</div>
    </label>

<!--    {{ $hook('expand') }}-->

<!--    <div v-if="$hook('expand')" style="background: red; width: 100px; height: 100px"></div>-->
</template>

<script setup lang="ts">
// import {useHook} from 'vue-hook-directive';
//
// const hook = useHook();
//
// type Hooks = 'popup'
//
// hook.hook<Hooks>('popup', (data) => {
//     console.log(data)
// })
//
// hook.hook<Hooks>('s', (data) => {
//     console.log(data)
// })
</script>

<style scoped>

</style>
