import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Venta } from 'src/models/venta.model';

export const useVentasStore = defineStore('ventas', () => {

  const pedido = ref([])
  const metodosDePage = ref<{ label: string, value: number }[]>([])
  const ventas = ref<Venta[]>([])



  const createPedido = async (data: any) => {
    const newPedido = await api.post('/ventas', data)
    return newPedido
  }

  const getAllMetodosDePage = async () => {
    const result = await api.get<{ label: string, value: number }[]>('/metodo-pago')
    if (!result.data) console.log('getCategoriasLabelValue error: ', result);
    metodosDePage.value = result.data
  }

  const getAllVentas = async() =>  {
    const result = await api.get('/ventas')
    if (!result.data) console.log('getAllVentas error: ', result);
    ventas.value = result.data
    return result.data
  }


  return { pedido, metodosDePage, createPedido, getAllMetodosDePage, getAllVentas }
})
