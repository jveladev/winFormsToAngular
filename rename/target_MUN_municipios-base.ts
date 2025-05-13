import { GenericBean } from "@jnum/jnum-core";
        
        
        
        
        
import { Provincia } from '../../../../customized/territorio/provincia/model/provincia';
        
        
        
        
        
        
        
        
        
        
        

/**
 * MunicipiosBase
 * @extends {GenericBean}
 */
export class MunicipiosBase extends GenericBean {
  comboLabel:string="";
  idEntidad!: number;
  codigoDipu!: string;
  idProvincia!: number;
  idMunicipio!: number;
  provincia!: string;
  provinciaRef!: Provincia | null;
  nombre!: string;
  codigo!: string;
  codigoINE!: string;
  nombreCorto!: string;
  codigoAEAT!: string;
  nombre50!: string;
  digito!: number;
  activo!: boolean;
  mostrarNoActivos!: boolean;
  municipio!: string;
}