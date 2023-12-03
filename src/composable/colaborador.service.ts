import { api } from 'src/boot/axios';
import {
  Colaborador,
  ColaboradorUpdate,
  ColaboradorInsert,
} from 'src/models/colaboradores.model';

export const getColaboradores = async () => {
  const Colaborador = await api.get<Colaborador[]>('/colaboradores');
  return Colaborador.data;
};

export const EliminarCol = async (id: number) => {
  const Colaborador = await api.delete<Colaborador[]>(`/colaboradores/${id}`);
  return Colaborador.data;
};

export const EditCol = async (id: number, dato: ColaboradorUpdate) => {
  const Colaborador = await api.put<Colaborador[]>(
    `/colaboradores/${id}`,
    dato
  );
  return Colaborador.data;
};

export const createColaborador = async (colaborador: ColaboradorInsert) => {
  const result = await api.post<Colaborador>('/colaboradores', colaborador);
  return result.data;
};
