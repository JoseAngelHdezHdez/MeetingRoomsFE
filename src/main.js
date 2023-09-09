import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'
import router from './router'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const pinia = createPinia();
const app = createApp(App)

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.mount('#app')