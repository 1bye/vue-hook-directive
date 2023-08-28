# Vue Hook Directive
The **Vue Hook Directive** is a powerful Vue plugin 
that seamlessly integrates features from the [hookable](https://www.npmjs.com/package/hookable) library into Vue directives and composables, enabling you to harness the full potential of hooks within your Vue applications.

## Installation
You can easily install the Vue Hook Directive using your preferred package manager:

Using npm:
```bash
npm install vue-hook-directive
```
Using yarn:
```bash
yarn add vue-hook-directive
```
Using pnpm:
```bash
pnpm add vue-hook-directive
```

## Why Choose This Library?
There are several compelling reasons to utilize this library in your Vue projects:

1. **Cross-Component Hooks**: You can utilize hooks across different components effortlessly. For instance:

```vue
<!-- MyFirstComponent.vue -->
<template>
  <button v-hook:click.expand>Click on me</button>
</template>
```

1. **Flexible Hook Names**: Hooks can be assigned names to enable fine-grained control. 
   If a hook name isn't specified, the default hook name will be the associated event name (e.g., 'click' for a click event).

2. **Dynamic Hook Usage**: Hooks can be accessed dynamically using the `$hook` function and a specific hook name:

```vue
<!-- MySecondComponent.vue -->
<template>
  <div class="card" v-if="$hook('expand')">Showed</div>
</template>
```


## Plugin Functionality

### Composable Usage

The Vue Hook Directive offers a composable API:

```ts
import { useHook } from 'vue-hook-directive';

const { hook, callHook } = useHook();

hook('expand', (data) => {
    console.log(data || true);
});
```

### Global Function `$hook`
You can utilize the global `$hook` function to integrate hooks into various Vue directives:

```vue

<template>
  {{ $hook('hook_name') }}
  <!--  Can be used as  -->
  <div v-if="$hook('hook_name')"></div>
  <div v-show="$hook('hook_name')"></div>
  <!--  And etc all build in vue hooks...  -->
  <div v-for="hook in $hook('hook_name')"></div>

  <!--  Also $hook have options -->
  <!--  Clears hook result after 1000ms -->
  {{ $hook('hook_name', {clear: 1000}) }}

  <!--  Clears hook result after 1000ms, and set default value 'something' -->
  {{ $hook('hook_name', {clear: 1000, default: 'something'}) }}

  <!--  Just set default value instead of null -->
  {{ $hook('hook_name', {default: 'something'}) }}
</template>
```

Directive usage, `v-hook:event_name.hook_name="value""`

```vue
<template>
<!--  Simple usage  -->
   <button v-hook:click.expand>Click to expand</button>
<!--  Usage with value  -->
   <button v-hook:click.expand="'any value, object and etc...'">Click to expand</button>
<!--   Usage with .toggle  -->
   <button v-hook:click.expand.toggle>Click to expand</button>
<!--   .toggle toggles boolean value (true - false)  -->
   <div v-if="$hook('expand')">
      Toggle view
   </div>
<!--   Usage with several hooks name  -->
   <button v-hook:click.expand.expand2.expand3.etc>Click to expand</button>
<!--   with .toggle-->
   <button v-hook:click.expand.expand2.expand3.toggle>Click to expand</button>
</template>
```

## Usage

### Basic Usage
To incorporate the Vue Hook Directive into your application:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { vueDirective } from 'vue-hook-directive';

const app = createApp(App);

app.use(vueDirective, {});

app.mount('#app');
```

### Usage with Options
You can customize the behavior of the Vue Hook Directive by passing options:
```ts
app.use(vueDirective, {
    prefix: '', // Adds a prefix before hooks
    listeners: ['your-custom-listener'] // Add your custom listeners for v-hook directive
});
```

### Usage with Nuxt
In a Nuxt application, you can follow these steps:
1. Create a file named `VueHookDirective.js` within the `/plugins` directory in your Nuxt app.
2. In `VueHookDirective.js`, import and apply the Vue Hook Directive:


```ts
import { vueDirective } from 'vue-hook-directive';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vueDirective);
    
    // or with options
    
    nuxtApp.vueApp.use(vueDirective, {
        prefix: '', // Adds a prefix before hooks
        listeners: ['your-custom-listener'] // Add your custom listeners for v-hook directive
    });
});
```

By following these steps, you can seamlessly integrate the Vue Hook Directive into your Nuxt project.

Harness the power of hooks and enhance your Vue applications with the Vue Hook Directive!