export type Direcciones = {
  id: number;
  calle: string;
  numero_calle: number;
  numero_departamento: number;
  comuna_id: number;
};

export type Comunas = {
  value:number;
  label:string;
}

export type Provincias ={
  id_provincia:number;
  nombre:string;
  region_id:number;
}
export type DireccionesClienteResult = {
  Clientes_id: number;
  Direcciones_id: number;
}

export type Regiones ={
  id_region:number;
  nombre:string;
  ordinal:string;

}
export type ComunasList=Comunas;
export type ProvinciasList=Provincias;
export type RegionesList=Regiones;

export type DireccionesCreateResult = Pick<Direcciones, 'id'>;

export type DireccionesCreate = Omit<Direcciones, 'id'>;

export type DireccionesDelete = DireccionesCreateResult;

export type DireccionesUpdate = DireccionesCreateResult;
