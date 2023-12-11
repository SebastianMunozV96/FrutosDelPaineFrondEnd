import { api } from 'src/boot/axios';
import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  Colaborador,
  ColaboradorInsert,
  ColaboradorWhitoutDireccion,
  ColaboradorUpdate,
} from 'src/models/colaboradores.model';

export const useColaboradorStore = defineStore('counter', () => {
  const colaboradores = ref<Colaborador[]>([]);

  const countColaborador = computed(() => colaboradores.value.length);

  async function getColaborador() {
    const { data } = await api.get<Colaborador[]>('/colaboradores');
    colaboradores.value = data;
  }
  // avanza csm
  async function crearColaborador(
    colaborador: ColaboradorInsert
  ): Promise<{ id: number; nombre: string; correo: string }> {
    const result = await api.post<{
      id: number;
      nombre: string;
      correo: string;
    }>('/colaboradores', colaborador);
    if (!result.data) console.log('crearColaborador error: ', result.status);
    getColaborador();
    return result.data;
  }

  async function updateColaborador(
    id: number,
    colaborador: ColaboradorUpdate
  ): Promise<ColaboradorWhitoutDireccion> {
    const result = await api.put<ColaboradorWhitoutDireccion>(
      `/colaboradores/${id}`,
      colaborador
    );
    if (!result.data) console.log('updateColaborador Error: ', result);
    getColaborador();
    return result.data;
  }

  async function deleteColaborador(id: number): Promise<{ id: number }> {
    const result = await api.delete<{ id: number }>(`/colaboradores/${id}`);
    if (!result.data) console.log('deleteColaborador: ', result);
    return result.data;
  }

  return {
    colaboradores,
    countColaborador,
    getColaborador,
    crearColaborador,
    updateColaborador,
    deleteColaborador,
  };
});
