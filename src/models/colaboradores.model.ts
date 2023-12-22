export type Colaborador = {
  id: number;
  nombres: string | null;
  apellidos: string | null;
  correo: string | null;
  celular: string | null;
  direccion_id: number;
};

export type ColaboradorWhitoutDireccion = Omit<Colaborador, 'direccion_id'>;

export type ColaboradorInsert = Omit<Colaborador, 'id'>;

export type ColaboradorUpdate = Partial<Colaborador>;

export type ColaboradorDelete = Colaborador;
