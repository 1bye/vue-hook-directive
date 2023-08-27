import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {vueDirective} from '../plugin';

const app = createApp(App);

app.use(vueDirective, {
    prefix: 'flow:'
});

app.mount('#app')
