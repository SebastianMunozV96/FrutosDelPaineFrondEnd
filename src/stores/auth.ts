import { defineStore } from 'pinia';
import { authApi } from 'src/boot/axios';
import { computed, ref } from 'vue';

interface Usuario {
  correo: string,
  rol: string
}

interface DataReturn {
  usuario: Usuario,
  token: string

}

export const useAuthStore = defineStore('auth', () => {

  // states
  const idToken = ref<string>('')
  const username = ref<string>('')
  const rol = ref<string>('')

  // getters
  const getToken = computed(() => idToken.value || localStorage.getItem('token'))
  const getUserName = computed(() => username.value || localStorage.getItem('usuario'))
  const getRol = computed(() => rol.value || localStorage.getItem('rol'))

  //actions
  async function signInUser(user: { correo: string, password: string }) {
    const { correo, password } = user;

    try {
      const { data } = await authApi.post<DataReturn>('/login', {
        correo,
        password,
      });
      const { usuario, token } = data;
      console.log('Stores Auth -> signInUser: ', token !== null);
      if (token) {

        localStorage.setItem('OToken', token);
        localStorage.setItem('username', usuario.correo);
        localStorage.setItem('rol', usuario.rol);

        idToken.value = token;
        username.value = usuario.correo;
        rol.value = usuario.rol;
        console.log('token ? : ', getToken.value !== null);
        return { ok: true };
      }
    } catch (error) {
      console.log('signInUser error: ', error);
      return { ok: false, message: error };
    }
  }

  return { idToken, username, rol, getToken, getUserName, getRol, signInUser }
})
