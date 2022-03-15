import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/index';

import stores from './stores/index';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

createApp(App)
    .use(routes)
    .use(stores)
    .use(ElementPlus)
    .mount('#app');
