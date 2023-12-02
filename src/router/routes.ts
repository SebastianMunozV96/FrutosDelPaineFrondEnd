import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/clientes',
        name: 'clientes',
        component: () => import('pages/clientesPages.vue'),
      },
      {
        path: '/pedidos',
        name: 'pedidos',
        component: () => import('pages/pedidoPage.vue')
      },
      {
        path: '/crear-pedido',
        name: 'crearPedido',
        component: () => import('../pages/crearPedidoPages.vue')
      },
      {
        path: '/productos',
        name: 'productos',
        component: () => import('pages/productosPage.vue'),
      },
      {
        path: '/proveedores',
        name: 'proveedores',
        component: () => import('pages/proveedorPage.vue'),
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        component: () => import('pages/usuariosPage.vue'),
      },
    ],


  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/loginLayout.vue')

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
