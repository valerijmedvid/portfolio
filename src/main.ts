import { createApp } from 'vue'
// Self-hosted variable fonts (no render-blocking request to Google Fonts)
import '@fontsource-variable/work-sans'
import '@fontsource-variable/jetbrains-mono'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
