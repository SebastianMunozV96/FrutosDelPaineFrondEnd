import { api } from 'src/boot/axios';
import {
  Usuario,
  UsuarioInsert,
  UsuarioUpdate,
  TipoUsuario,
  tipoUsuarioCreate,
  tipoUsuarioUpdate,
} from 'src/models/usuarios.model';

export const getUsuarios = async () => {
  const usuarios = await api.get<Usuario[]>('/usuarios');
  return usuarios.data;
};

export const getUsuariosID = async (id: number) => {
  const usuario = await api.get<Usuario[]>(`/usuarios/${id}`);
  return usuario.data;
};

export const createUsuario = async (usuario: UsuarioInsert) => {
  const result = await api.post<Usuario>('/usuarios', usuario);
  return result.data;
};

export const editarUsuario = async (id: number, dato: UsuarioUpdate) => {
  const result = await api.put<Usuario[]>(`/usuarios/${id}`, dato);
  return result.data;
};

export const eliminarUsuario = async (id: number) => {
  const result = await api.delete<{ id: number }>(`/usuarios/${id}`);
  return result.data;
};

//------------------------------------------------------------------------//
//------- Services de Tipo de Usuario -------------------------------------//

export const getTipoUsusario = async () => {
  const tipoUsuarios = await api.get<TipoUsuario[]>('/tipo-usuario');
  return tipoUsuarios.data;
};

export const updateTipoUsuario = async (
  id: number,
  dato: tipoUsuarioUpdate
) => {
  const tipoUsario = await api.put<TipoUsuario[]>(`/tipo-usuario/${id}`, dato);
  return tipoUsario.data;
};

export const deleteTipoUsuario = async (id: number) => {
  const tipoUsuario = await api.delete<{ id: number }>(`/tipo-usuario/${id}`);
  return tipoUsuario.data;
};

export const createTipoUsuario = async (tipoUsuario: tipoUsuarioCreate) => {
  const tipoUsuarios = await api.post<TipoUsuario>(
    '/tipo-usuario',
    tipoUsuario
  );
  return tipoUsuarios.data;
};
