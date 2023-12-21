<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> </q-toolbar-title>

        <q-chip color="orange" text-color="white" :icon="iconRol">
          {{ authStore.username }}
        </q-chip>
        <q-btn flat round dense icon="logout" @click="logOut()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu Principal </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { EssentialLinkProps } from 'src/components/models';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const route = useRouter()

const iconRol = authStore.rol == "admin" ? "admin_panel_settings" : "person";

const logOut = () => {
  authStore.logout()
  route.push({name: 'login'})
}

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Pedido',
    icon: 'shopping_cart_checkout',
    link: 'pedidos',
  },
  {
    title: 'Proveedor',
    icon: 'local_shipping',
    link: 'proveedores',
  },
  {
    title: 'Clientes',
    link: 'clientes',
    icon: 'person',
  },
  {
    title: 'Productos',
    icon: 'agriculture',
    link: 'productos',
  },
  {
    title: 'Colaboradores',
    icon: 'group',
    link: 'colaboradores',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
