import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
    { path: '/shop', name: 'shop', component: () => import('./pages/CatalogPage.vue') },
    { path: '/search', name: 'search', component: () => import('./pages/CatalogPage.vue') },
    { path: '/category/:path+', name: 'category', component: () => import('./pages/CatalogPage.vue') },
    { path: '/tag/:slug', name: 'tag', component: () => import('./pages/CatalogPage.vue') },
    { path: '/brand/:slug', name: 'brand', component: () => import('./pages/CatalogPage.vue') },
    { path: '/brands', name: 'brands', component: () => import('./pages/BrandsPage.vue') },
    { path: '/categories', name: 'categories', component: () => import('./pages/CategoriesPage.vue') },
    { path: '/product/:slug', name: 'product', component: () => import('./pages/ProductPage.vue') },
    { path: '/cart', name: 'cart', component: () => import('./pages/CartPage.vue') },
    { path: '/wishlist', name: 'wishlist', component: () => import('./pages/WishlistPage.vue') },
    { path: '/account', name: 'account', component: () => import('./pages/AccountPage.vue') },
    { path: '/stores', name: 'stores', component: () => import('./pages/InfoPage.vue'), meta: { slug: 'stores' } },
    { path: '/blog', name: 'blog', component: () => import('./pages/InfoPage.vue'), meta: { slug: 'blog' } },
    { path: '/page/:slug', name: 'page', component: () => import('./pages/InfoPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue') },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})
