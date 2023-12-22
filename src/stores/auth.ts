import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { authApi } from 'src/boot/axios';
import { computed, ref } from 'vue';

interface Usuario {
  usuario:UsuarioData,
  rol: string
}

interface UsuarioData{
  correo: string
}
interface DataReturn {
  user: Usuario,
  token: string
}

interface Message {
  ok: boolean,
  message: any
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
    console.log("signInUser: ", user)
    try {
      const { data } = await authApi.post<DataReturn>('/login', {
        correo,
        pass_encrypt: password,
      });
      const { user, token } = data;
      console.log('Stores Auth -> signInUser: ', token !== null);
      if (token) {

        localStorage.setItem('token', token);
        localStorage.setItem('username', user.usuario.correo);
        localStorage.setItem('rol', user.rol);

        idToken.value = token;
        username.value = user.usuario.correo;
        rol.value = user.rol;
        console.log('token ? : ', getToken.value !== null);
        return { ok: true, message: 'iniciando sesión' };
      }
    } catch (error) {
      console.log('signInUser error: ', error);
      return { ok: false, message: error };
    }
  }

  async function checkAuthentication() {
    const atoken = await getToken.value;
    console.log('Stores Auth -> checkAuthentication() atoken: ', atoken !== null);
    if (atoken) {
      return { ok: true, message: 'Si hay Token' };
    } else {
      logout();
      return { ok: false, message: 'No hay token' };
    }
  }

  function logout() {
    idToken.value = '';
    username.value = '';
    rol.value = '';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('rol');

    console.log('logout');
  }

  return {
    idToken,
    username,
    rol,
    getToken,
    getUserName,
    getRol,
    signInUser,
    checkAuthentication,
    logout
  }
})
