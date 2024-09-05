import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/category/:id', name: 'Category', component: Category },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
