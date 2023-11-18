

export type Proveedor = {
  id: number;
  rut: number | null;
  giro: number | null;
  nombre: string | null;
  telefono: number | null;
  correo: string | null;
  pagina_web: string | null;
  Direcciones_id: number;
}

export type insertProveedor = Omit<Proveedor,'id'>
