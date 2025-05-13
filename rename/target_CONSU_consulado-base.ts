import { GenericBean } from "@jnum/jnum-core";
import { Paises } from '../../../../customized/territorio/paises/model/paises';
        
        
        
        
        
        
        
        
        
import { Entidad } from '../../../../customized/administracion/entidad/model/entidad';
        

/**
 * ConsuladoBase
 * @extends {GenericBean}
 */
export class ConsuladoBase extends GenericBean {
  comboLabel:string="";
  paisref!: Paises | null;
  codPais!: string;
  nombrePais!: string;
  idPais!: number;
  idConsulado!: number;
  codigo!: string;
  nombre!: string;
  activo!: boolean;
  consuladosNoActivos!: boolean;
  idEntidad!: Entidad | null;
}