import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {vueDirective} from '../lib';
// import {vueDirective} from 'vue-hook-directive';

const app = createApp(App);

app.use(vueDirective, {
    prefix: 'flow:'
});

app.mount('#app')
