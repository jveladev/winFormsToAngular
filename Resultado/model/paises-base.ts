import { GenericBean } from "@jnum/jnum-core";

/**
 * PaisesBase
 * @extends {GenericBean}
 */
export class PaisesBase extends GenericBean {
  comboLabel: string = "";
  idEntidad!: number;
  nombre!: string;
  codigo!: string;
  digito!: string;
  comunitario!: string;
  activo!: boolean;
  asimiladoAComunitario!: boolean;
} 