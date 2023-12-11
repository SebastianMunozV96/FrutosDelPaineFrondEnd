import { defineStore } from 'pinia';
import {
  TipoUsuario,
  Usuario,
  UsuarioInsert,
  UsuarioUpdate,
  tipoUsuarioCreate,
  tipoUsuarioUpdate,
} from 'src/models/usuarios.model';
import { computed, ref } from 'vue';
import { api } from 'src/boot/axios';

export const useUsuarioStore = defineStore('counter', () => {
  const usuarios = ref<Usuario[]>([]);

  const countUsuarios = computed(() => usuarios.value.length);

  async function getUsuarios() {
    const { data } = await api.get<Usuario[]>('/usuarios');
    usuarios.value = data;
  }
  async function crearUsuario(
    usuario: UsuarioInsert
  ): Promise<{ id: number; pass_encrypt: string; ultimo_login: string }> {
    const result = await api.post<{
      id: number;
      pass_encrypt: string;
      ultimo_login: string;
    }>('/usuarios', usuario);
    if (!result.data) console.log('createUser', result.status);
    getUsuarios();
    return result.data;
  }

  async function updateUsuario(
    id: number,
    usuario: UsuarioUpdate
  ): Promise<{ id: number }> {
    const result = await api.put<{ id: number }>(`/usuarios/${id}`, usuario);
    if (!result.data) console.log('updateUsuario Error', result);
    return result.data;
  }

  async function deleteUsuario(id: number): Promise<{ id: number }> {
    const result = await api.delete<{ id: number }>(`/usuarios/${id}`);
    if (!result.data) console.log('deleteUser Error:', result);
    return result.data;
  }

  //-----------------------------------------------------------------------------//
  //------Tipo Usuario ----------------------------------------------------------//
  const tipoUsuario = ref<TipoUsuario[]>([]);

  const countTipoUusario = computed(() => tipoUsuario.value.length);

  async function getTipoUsuario() {
    const { data } = await api.get<TipoUsuario[]>('/usuarios');
    tipoUsuario.value = data;
  }

  async function crearTipoUsuario(
    tipoUsuario: tipoUsuarioCreate
  ): Promise<{ id: number; tipo_usuario: string }> {
    const result = await api.post<{ id: number; tipo_usuario: string }>(
      '/tipo-usuario',
      tipoUsuario
    );
    if (!result.data) console.log('crearTipoUsuario error', result.status);
    getTipoUsuario();
    return result.data;
  }

  async function updateTipoUsuario(
    id: number,
    dato: tipoUsuarioUpdate
  ): Promise<{ id: number; tipo_usuario: string }> {
    const result = await api.put<TipoUsuario>(`/tipo-usuario/${id}`, dato);
    if (!result.data) console.log('updateTipoUsuario error', result);
    getTipoUsuario();
    return result.data;
  }

  async function deleteTipoUsuario(id: number): Promise<{ id: number }> {
    const result = await api.delete<{ id: number }>(`/tipo-usuario/${id}`);
    if (!result.data) console.log('deleteTipoUusaior Error: ', result);
    return result.data;
  }

  return {
    usuarios,
    countUsuarios,
    getUsuarios,
    crearUsuario,
    updateUsuario,
    deleteUsuario,
    //--tipoUsuario---//
    tipoUsuario,
    countTipoUusario,
    getTipoUsuario,
    crearTipoUsuario,
    updateTipoUsuario,
    deleteTipoUsuario,
  };
});
