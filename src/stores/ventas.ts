import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useVentasStore = defineStore('ventas', () => {

  const pedido = ref([])
  const metodosDePage = ref<{ label: string, value: number }[]>([])



  const createPedido = async (data: any) => {
    const newPedido = await api.post('/pedidos', data)
    return newPedido
  }

  const getAllMetodosDePage = async () => {
    const result = await api.get<{ label: string, value: number }[]>('/metodo-pago')
    if (!result.data) console.log('getCategoriasLabelValue error: ', result);
    metodosDePage.value = result.data
  }


  return { pedido, metodosDePage, createPedido, getAllMetodosDePage }
})
