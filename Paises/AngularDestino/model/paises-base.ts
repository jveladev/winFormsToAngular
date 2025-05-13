import { GenericBean } from "@jnum/jnum-core";
        
        
        
        
        
        
        
        
        

/**
 * PaisesBase
 * @extends {GenericBean}
 */
export class PaisesBase extends GenericBean {
  comboLabel:string="";
  idEntidad!: number;
  idPais!: number;
  codigo!: string;
  nombre!: string;
  comunitario!: boolean;
  digito!: number;
  activo!: boolean;
  asimiladoAComunitario!: boolean;
  mostrarNoActivos!: boolean;
}