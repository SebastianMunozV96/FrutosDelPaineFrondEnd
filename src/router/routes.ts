import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/clientes',
        component: () => import('../pages/clientesPages.vue'),
      },
      { path: '/pedidos', component: () => import('../pages/pedidoPage.vue') },
      {
        path: '/productos',
        component: () => import('../pages/productosPage.vue'),
      },
      {
        path: '/proveedores',
        component: () => import('../pages/proveedorPage.vue'),
      },
      {
        path: '/usuarios',
        component: () => import('../pages/usuariosPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
