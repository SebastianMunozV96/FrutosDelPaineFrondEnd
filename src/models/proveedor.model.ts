export type Proveedor = {
  id: number;
  rut: number | null;
  giro: number | null;
  nombre: string | null;
  telefono: number | null;
  correo: string | null;
  pagina_web: string | null;
  Direccion_id: number;
  Direcciones: {
    id: number;
    calle: string;
    numero_calle: number;
    numero_departamento: number | null;
    Comunas_id: number;
    Comunas: {
      id_comuna: number;
      comuna: string;
      provincia_id: number;
      Provincias: {
        id_provincia: number;
        nombre: string;
        region_id: number;
        Regiones: {
          id_region: number;
          nombre: string;
          ordinal: string;
        };
      };
    };
  };
};

export type ProveedorInsert = Omit<Proveedor, 'id'>;
