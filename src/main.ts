import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { setupAntd } from '@/common/setup/ant-design-vue';

import Card from '@/components/common/crad.vue'
import ModuleHeader from '@/components/common/moduleHeader.vue'

import '@/css/common.css'

const app = createApp(App)

app.use(router).component('card', Card).component('module-header', ModuleHeader)

setupAntd(app);

app.mount('#app')