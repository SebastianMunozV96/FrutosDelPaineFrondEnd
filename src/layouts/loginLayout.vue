<template>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-img
          src="../../public/img/inicioSesion.jpg"
          style="max-width: 300px; height: 150px;"
        >
         <template>
          <div class="absolute-bottom text-subtitle1 text-center">
           <q-form @submit="inicioSesion">
            <q-input
            type="text"
            v-model="user"
            label="Ingrese usuario"
             />
             <q-input
             type="password"
             v-model="password"
             label="Ingrese pcontraseña"
             />
           </q-form>
          </div>
         </template>
        </q-img>
      </div>
    </div>
</template>




<script setup lang="ts">
import { ref } from 'vue';

const user = ref<string>();
const password = ref<string>();

const inicioSesion= () => {

  console.log('inicio sesion')
}






</script>
