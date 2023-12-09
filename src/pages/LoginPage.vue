<template>
  <q-page>
    <div class="bg-pa-mb">
      <q-parallax class="" src="../../public/img/inicioSesion.jpg">
        <q-card
          class="bg-grey-4 p-center absolute-center q-pa-md"
          style="
            background: radial-gradient(circle, #35ff3556 0%, #2c880177 100%);
            max-width: 500px;
            max-width: 500px;
          "
        >
          <q-card-section class="columns">
            <q-input v-model="username" label="Usuario" />

            <q-input
              class="q-my-md"
              v-model="password"
              label="Contraseña"
              type="password"
            />
            <div class="row justify-center">
              <q-btn
                class=""
                @click="login"
                color="secondary"
                label="Iniciar Sesión"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-parallax>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsuariosID, getTipoUsusario } from '../composable/usuario.service';

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
