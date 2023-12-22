<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref<string>('');
const password = ref<string>('');

const message = ref<string>('');

const onSubmit = async () => {
  const loginForm = {
    correo: username.value,
    password: password.value,
  };
  const result = await authStore.signInUser(loginForm);
  console.log("result login: ", result)
  if (result!.ok) {
    message.value = 'inicio exitoso!'
    router.push({ name: 'main' });
  } else {
    message.value = 'No existe usuario!';
  }
};
</script>

<template>
  <q-page class="background-image">
    <q-card class="bg-grey-4 p-center absolute-center q-pa-md">
      <q-card-section class="column items-center">
        <p class="text-h4 col">Inicio de sesion</p>
        <p class="text-h5 col">Frutos del Paine</p>
      </q-card-section>
      <q-card-section class="columns">
        <q-input
          type="email"
          v-model="username"
          label="Correo Usuario"
          :rules="[
            (val) => !!val || 'Ingrese un correo',
            (val) => /.+@.+\..+/.test(val) || 'Correo no Valido',
          ]"
        >
          <template #before>
            <q-icon name="mail" />
          </template>
        </q-input>

        <q-input
          class="q-my-md"
          v-model="password"
          label="Contraseña"
          type="password"
          @keyup.enter="onSubmit"
          :rules="[
            (val) => !!val || 'Ingrese password',
            (val) => val.length >= 8 || 'debe ser mayor o igual a 8 caracteres',
          ]"
        >
          <template #before>
            <q-icon name="key" />
          </template>
        </q-input>
        <div v-if="message" class="row justify-center q-my-md">
          <div class="text-caption text-red">{{ message }}</div>
        </div>
        <div class="row justify-center">
          <q-btn @click="onSubmit" color="secondary" label="Iniciar Sesión" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.background-image {
  background-image: url('../../public/img/inicioSesion.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
