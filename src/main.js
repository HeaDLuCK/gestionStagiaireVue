import './assets/style.css'
import VueEcharts from 'vue-echarts'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import "primevue/resources/themes/lara-light-blue/theme.css";


const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.component('Toast', Toast);
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('v-chart', VueEcharts)
app.mount('#app')
