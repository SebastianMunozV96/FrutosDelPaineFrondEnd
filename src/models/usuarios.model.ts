export type Usuario = {
  id: number;
  pass_encrypt: string | null;
  ultimo_login: string | null;
  Tipo_Usuario_id: number;
  Colaboradores_id: number;
};


export type UsuarioInsert = Omit<Usuario, 'id'>;

export type UsuarioDelete = Usuario;

export type UsuarioUpdate = Usuario;

//------------------------------------------------------------//
//------    Tabla Tipo Usuario      -------------------------//

export type TipoUsuario = {
  id: number;
  tipo_usuario: string;
};

export type tipoUsuarioCreate = Omit<TipoUsuario, 'id'>;

export type tipoUsuarioUpdate = TipoUsuario;

export type tipoUsuarioDelete = TipoUsuario;
