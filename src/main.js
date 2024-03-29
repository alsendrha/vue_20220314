import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/index';

import stores from './stores/index';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';

// npm i --save socket.io => 백엔드
// npm i --save socket.io-client@4.4.1 => 프론트엔드

import io from 'socket.io-client';

// 소켓 설정
const socket = io("/", {tramsports:['websocket'], path:'/socket'});

const app =createApp(App);
// 컴포넌트에서 사용가능하도록 설정
app.config.globalProperties.$socket = socket; 
app.use(routes)
app.use(stores)
app.use(ElementPlus)
app.mount('#app');
