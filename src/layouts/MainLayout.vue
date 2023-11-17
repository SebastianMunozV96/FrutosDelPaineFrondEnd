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

        <div></div>
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
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Pedido',

    link: '',
  },
  {
    title: 'Proveedor',
    icon: 'local_shipping',
    link: '',
  },
  {
    title: 'Clientes',
    link: 'clientes',
    icon: 'person',
  },
  {
    title: 'Productos',
    link: '',
  },
  {
    title: 'Usuarios',
    link: '',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
