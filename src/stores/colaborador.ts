import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Colaborador } from 'src/models/colaboradores.model';

export const useCounterStore = defineStore('counter', () => {
  const colaboradores = ref<Colaborador[]>([]);

  return { colaboradores };
});
