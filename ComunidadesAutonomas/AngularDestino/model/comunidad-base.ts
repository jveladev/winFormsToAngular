import { GenericBean } from "@jnum/jnum-core";
        
        
        
        
        

/**
 * ComunidadBase
 * @extends {GenericBean}
 */
export class ComunidadBase extends GenericBean {
  comboLabel:string="";
  idEntidad!: number;
  idComunidad!: number;
  codigo!: string;
  nombre!: string;
  organo!: string;
}