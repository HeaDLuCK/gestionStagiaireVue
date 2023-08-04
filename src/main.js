import './assets/style.css'
import VueEcharts from 'vue-echarts'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { unstyled: true, theme: "tailwind" });
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('v-chart', VueEcharts)
app.mount('#app')
