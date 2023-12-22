export type Proveedor = {
  id: number;
  rut: number | null;
  giro: number | null;
  nombre: string | null;
  telefono: number | null;
  correo: string | null;
  pagina_web: string | null;
  Direccion_id: number;
};

export type ProveedorInsert = Omit<Proveedor, 'id'>;

export type ProveedorDelete = Proveedor;

export type ProveedorUpdate = Partial<Proveedor>;
