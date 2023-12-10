import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {
  DireccionesCreateResult,
  DireccionesCreate,
  Direcciones,
  Comunas,
  Provincias,
  Regiones,
  DireccionesClienteResult,
  DireccionesColaboradorResult,
} from 'src/models/Direcciones.model';

export const useCounterStore = defineStore('counter', () => {
  const direcciones = ref<Direcciones[]>([])
  const comunas = ref<Comunas[]>([])
  const provincias = ref<Provincias[]>([])
  const regiones = ref<Regiones[]>([])



  const getDirecciones = async () => {
    const result = await api.get<Direcciones[]>('/direcciones');
    if (!result.data) console.log('getDirecciones error: ', result)
    direcciones.value = result.data
  };

  const createDireccion = async (direccion: DireccionesCreate) => {
    const result = await api.post<DireccionesCreateResult>('/direcciones', direccion);
    if (!result.data) console.log('createDireccion error: ', result)
    getDirecciones()
  };

  // comunas provincias y regiones
  const getComunas = async () => {
    const result = await api.get<Comunas[]>('/comunas/');
    if (!result.data) console.log('getComunas error: ', result)
    comunas.value = result.data
  };

  const getProvinciasID = async (id: number) => {
    const idProvincia = provincias.value.filter((provincia) => provincia.id_provincia === id)
    return idProvincia;
  };

  const getRegionesID = async (id: number) => {
    const idRegiones = regiones.value.filter((region) => region.id_region === id )
    return idRegiones;
  };

  const getRegiones = async () => {
    const result = await api.get<Regiones[]>('/regiones');
    if (!result.data) console.log('createDireccion error: ', result)
    regiones.value = result.data
  };

   // many to many
   const createDireccionCliente = async (dato: DireccionesClienteResult) => {
    const direccionDeCliente = await api.post<DireccionesClienteResult>(
      '/direcciones/direcciones-de-clientes',
      dato
    );
    return direccionDeCliente;
    // TODO: nose que chucha
  };

  const createDireccionesColaborador = async ( dato: DireccionesColaboradorResult ) => {
    const direccionDeColaborador = await api.post<DireccionesColaboradorResult>('/direcciones/direcciones-de-colaboradores', dato  );
    return direccionDeColaborador;
  };


  return {
    direcciones,
    comunas,
    provincias,
    regiones,
    getDirecciones,
    createDireccion,
    getComunas,
    createDireccionCliente,
    createDireccionesColaborador,
    getProvinciasID,
    getRegionesID,
    getRegiones,


  }
});
