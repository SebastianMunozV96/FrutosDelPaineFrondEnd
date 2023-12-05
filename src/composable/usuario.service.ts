import { api } from 'src/boot/axios';
import {
  Usuario,
  UsuarioInsert,
  UsuarioUpdate,
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
