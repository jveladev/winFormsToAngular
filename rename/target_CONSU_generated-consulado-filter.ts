import { GenericFilter } from "@jnum/jnum-core";
import { Paises } from '../../../../customized/territorio/paises/model/paises';
        
        
        
        
        
        
        
        
        
import { Entidad } from '../../../../customized/administracion/entidad/model/entidad';
        

/**
 * Filtro generado de la entidad Consulado
 */
export class GeneratedConsuladoFilter extends GenericFilter {
  paisrefeq!:                 Paises
| null;
  codigoPaisPropeq!: string;
  codPaiseq!:             string
| null;
  nombrePaiseq!:             string
| null;
  idConsuladoeq!:             number
| null;
  codigoeq!:             string
| null;
  nombreeq!:             string
| null;
  activoeq!:             boolean
| null;
  consuladosNoActivoseq!:             boolean
| null;
  idEntidadeq!:             Entidad
| null;
}