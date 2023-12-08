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

export const getDirecciones = async () => {
  const direcciones = await api.get<Direcciones>('/direcciones');
  return direcciones.data;
};

export const createDireccion = async (direccion: DireccionesCreate) => {
  const result = api.post<DireccionesCreateResult>('/direcciones', direccion);
  return result;
};

export const getComunas = async () => {
  const comunas = await api.get<Comunas[]>('/comunas/');
  return comunas.data;
};

export const createDireccionCliente = async (
  dato: DireccionesClienteResult
) => {
  const direccionDeCliente = await api.post<DireccionesClienteResult>(
    '/direcciones/direcciones-de-clientes',
    dato
  );
  return direccionDeCliente;
};

export const createDireccionesColaborador = async (
  dato: DireccionesColaboradorResult
) => {
  const direccionDeColaborador = await api.post<DireccionesColaboradorResult>(
    '/direcciones/direcciones-de-colaboradores',
    dato
  );
  return direccionDeColaborador;
};

export const getProvinciasID = async (id: number) => {
  const idProvincia = await api.get<Provincias[]>(
    `/comunas/:idProvincia/${id}`
  );
  return idProvincia;
};

export const getRegionesID = async (id: number) => {
  const idRegiones = await api.get<Regiones>(`/provincias/:idRegion${id}`);
  return idRegiones;
};

export const getRegiones = async () => {
  const Regiones = await api.get<Regiones>('/regiones');
  return Regiones;
};
