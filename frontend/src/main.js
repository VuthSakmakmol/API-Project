import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'; // Ensure Tailwind CSS is included
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(faPhone, faEnvelope, faMapMarkerAlt, faFacebook, faTelegram, faLinkedin);


const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);
app.mount('#app');
