export interface SupportRequest {
  id: number;
  usuarioId: number;
  asunto: string;
  mensaje: string;
  fechaEnvio: string;
  estado: string; // ABIERTO, CERRADO, etc.
}
