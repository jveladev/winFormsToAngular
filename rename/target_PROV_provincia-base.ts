import { GenericBean } from "@jnum/jnum-core";
        
        
        
        
import { Comunidad } from '../../../../customized/territorio/comunidad/model/comunidad';
        
        
        
        

/**
 * ProvinciaBase
 * @extends {GenericBean}
 */
export class ProvinciaBase extends GenericBean {
  comboLabel:string="";
  idProvincia!: number;
  idEntidad!: number;
  idComunidad!: number;
  comunidad!: string;
  comunidadRef!: Comunidad | null;
  codigo!: string;
  nombre!: string;
  nombreCorto!: string;
}