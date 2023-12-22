import { RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from './AuthGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [isAuthenticatedGuard], // antes de pasar a la ruta principal verifica token en localStorage, sino redirige a login
    name: '',
    children: [
      { path: 'index', component: () => import('pages/IndexPage.vue') },
      {
        path: '/clientes',
        name: 'clientes',
        component: () => import('pages/clientesPages.vue'),
      },
      {
        path: '/pedidos',
        name: 'pedidos',

        component: () => import('pages/pedidoPage.vue'),
        // children: [
        //   {
        //     path: '/crearPedido',
        //     name: 'crearPedido',
        //     component: () => import('../pages/crearPedidoPages.vue'),
        //   },
        // ],
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
        path: '/colaboradores',
        name: 'colaboradores',
        component: () => import('pages/colaboradorPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/loginLayout.vue'),
    name: 'loginLayout',
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue') }
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
