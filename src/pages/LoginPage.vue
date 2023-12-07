<template>
  <q-page class="login-page">
    <div class="login-container">
      <q-input v-model="username" label="Usuario" />
      <q-input v-model="password" label="Contraseña" type="password" />
      <q-btn @click="login" label="Iniciar Sesión" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted} from 'vue';
import { getUsuariosID } from '../composable/usuario.service';

const username = ref();
const password = ref();

const login = () => {


  
  const getUser = (id: number) => {
    getUsuariosID(id)
      .then((response) => {
        const userLogin = response;
        console.log('user existente', userLogin);
      })
      .catch((error) => console.log('error al obtener el usuario', error));
  };

  onMounted(async () => {
    getUser;
  });

  getUser(0);

  username: username.value;
  passsword: password.value;
};
</script>
