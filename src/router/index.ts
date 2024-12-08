import { createRouter, createWebHistory } from 'vue-router'
import  Dashboard from "../pages/Dashboard.vue"
import ProductsPage from '../pages/ProductsPage.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/product', name: 'product', component: ProductsPage },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
