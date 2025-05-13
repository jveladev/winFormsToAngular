using System;
using System.Data;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using IPublica.IU.Win.Base;
using IPublica.IU.Win.Base.TrueDBGrid;
using IPublica.Neg.Base;
using IPublica.Neg.Gen.General;

namespace IPublica.IU.Win.Gen.General
{
	/// <summary>
	/// Formulario de municipios.
	/// </summary>
	[System.ComponentModel.DesignerCategory("Designer")]
	public partial class FrmMunicipios : FormBase
	{
		/// <summary>
		/// Indica el modo de selección:
		/// 1.- Gestión Entidades-Organizaciones
		/// 2.- Mantenimiento de Territorio
		/// </summary>
		private int tpAccionSeleccion;		
		
		/// <summary>
		/// Indica si la entidad tiene municipios o no
		/// </summary>
		public bool bEntidadSinMunicipios;
		private int	 mintIdEntidad;
		private DSBase mdsData;
		private DataView mdvGrid;
		private IMunicipio mPMunicipio;
		/// <summary>
		/// Constructor del formulario
		/// </summary>
		/// <param name="tpEstiloVentana">Tipo de formulario</param>
		public FrmMunicipios(TipoFormEstilo tpEstiloVentana):base(tpEstiloVentana)
		{
			InitializeComponent();		
			tpAccionSeleccion = (int) TipoSeleccion.Territorio;		
		}

		private bool PermisosBotones()
		{
			bool bPermiso = ControlUser.GetAccesoObjeto(base.NombreObjeto);
			if (bPermiso)
			{			
				if (FormEstilo==TipoFormEstilo.Grid_Seleccion)
				{
					btnSeleccionar.Visible=true;
				}
				if (base.GetPermisoConsultar || base.GetPermisoListar)
				{				
					btnAnadir.Visible = false;
					btnEliminar.Visible = false;
					btnModificar.Text = RComun.Instance.GetString("BotonVer");
				}
			}			
			return bPermiso;
		}
		/// <summary>
		/// Este método se invoca cuando se cierra un form de edicción para actualizar
		/// el grid
		/// <param name="data">Control que lo llama</param>		
		/// </summary>	
		public override void NotifyParent(DSBase data)
		{
			try
			{
				Columna []filtrosAplicados = GetControlFiltros(xpGroupBoxFiltro).GetLastFiltros();
				//Sólamente recargamos la fila si se había realizado anteriormente una búsqueda
				if(filtrosAplicados!=null && filtrosAplicados.Length>0)
				{
					int numReg=EnlazarGrid(mPMunicipio.Busca(GetControlFiltros(xpGroupBoxFiltro).GetLastFiltros(data.Tabla.FilaActual.ClavePrimaria)),false);
					GetControlGrid().SeleccionarFilaActiva(this.gridMunicipios ,data.Tabla.FilaActual);
					gridMunicipios.Focus();
				}
				else
				{
					EnlazarGrid(data, false);
				}
			}
			catch(Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}
		}
		/// <summary>
		/// Inicializa el formulario
		/// </summary>
		/// <param name="parametrosBusca"></param>
		/// <param name="cargar"></param>
		/// <returns></returns>
		public override int IniciarFormulario(FiltroVal []parametrosBusca, bool cargar)
		{
			int intNumFilas=0;
			try
			{
				// Extración de idEntidad de los parámetros			
				for (int i=0;i<parametrosBusca[0].ColumnasFiltro.Length;i++)
				{
					if (parametrosBusca[0].ColumnasFiltro[i].Nombre == "IdEntidad")
					{
						mintIdEntidad= Int32.Parse(parametrosBusca[0].ColumnasFiltro[i].Valor.ToString());
					}
				}				
				
				ctrlProvincia1.IdEntidad.Text = mintIdEntidad.ToString();
				base.NombreObjeto = "GenMunicipio";
				if (PermisosBotones())
				{
					mPMunicipio=(IMunicipio)Factoria.GetObject(typeof(IMunicipio));				
					CrearFiltros();
					GetControlFiltros(xpGroupBoxFiltro).SetParametros(parametrosBusca);
					this.GetControlGrid().SetConfigGrid(this.gridMunicipios, this.btnAnadir, this.btnModificar, this.btnEliminar);
					
					//Si sólo llega un filtro, es porque sólo se le pasa el identificador de entidad
					//y no se consideran filtros suficientes para cargarlo inicialmente
					//Por tanto, para hacer la búsqueda se precisa más de un filtro
					if (cargar && GetControlFiltros(xpGroupBoxFiltro).GetFiltros().Length >1)
					{
						intNumFilas=Buscar(xpGroupBoxFiltro);
						xpGroupBox2.TabIndex=0;
						xpGroupBoxFiltro.TabIndex=1;
					}
					else					
						ActualizarBotones();
					
					base.IniciarFormulario(parametrosBusca,cargar);
				}
			}
			catch (Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}

			//Si se llama desde el Mantenimiento de Entidades y no hay municipios obtenidos
			//se indica a través de la variable bEntidadSinMunicipios para que muestre un mensaje
			if ((tpAccionSeleccion == (int)TipoSeleccion.GestionEntidades) && (intNumFilas==0))
			{
				bEntidadSinMunicipios = true;
			}
			else
			{
				bEntidadSinMunicipios = false;				
			}

			return intNumFilas;
		}


		private void CrearFiltros()
		{
			GetControlFiltros(xpGroupBoxFiltro).Init();
			GetControlFiltros(xpGroupBoxFiltro).AddFilter(ctrlProvincia1.IdProvincia,"IdProvincia",ctrlProvincia1.lblProvincia);
			GetControlFiltros(xpGroupBoxFiltro).AddFilter(txtNombre,"Nombre",lblNombre);
            GetControlFiltros(xpGroupBoxFiltro).AddFilter(chkActivos, "MostrarNoActivos", chkActivos);
		}

		private int EnlazarGrid(DSBase datos, bool BorrarDatos)
		{
			if (mdsData == null)
			{
				mdsData=datos;
				mdvGrid=mdsData.Tabla.DefaultView;
				this.GetControlGrid().ActualizaGrid(this.gridMunicipios  ,mdvGrid);
			}
			else
			{
				if (BorrarDatos)
				{
					mdsData.Clear();
				}

				mdsData.Combinar(datos);
			}
			ActualizarBotones();
			return mdvGrid.Count;
		}

		/// <summary>
		/// Llama al metodo buscar de persintencia y el resultado lo introduce en el grid.
		/// </summary>
		/// <param name="contenedor"></param>
		/// <returns></returns>
		public override int Buscar(Control contenedor)
		{	
			this.Cursor=Cursors.WaitCursor;
			int numReg=EnlazarGrid(mPMunicipio.Busca(GetControlFiltros(contenedor).GetFiltros()),true);
			gridMunicipios.Focus();
			this.Cursor=Cursors.Default;
			return numReg;
		}

		private void ActualizarBotones()
		{
			if (GetControlGrid().FilaSeleccionada(gridMunicipios)==null)
			{
				btnEliminar.Enabled=false;
				btnModificar.Enabled=false;
				btnSeleccionar.Enabled=false;
			}
			else
			{
				btnEliminar.Enabled=true;
				btnModificar.Enabled=true;
				btnSeleccionar.Enabled=true;
			}
		}

		private void btnEliminar_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnEliminar)) return;
			if (GetControlExcepciones().MostrarExcepcion(new Excepcion("PreguntaEliminarGenerico",RComun.Instance,TipoExcepcion.Pregunta))==DialogResult.OK)
			{
				try
				{
                    Application.DoEvents();
					mPMunicipio.Borra(GetControlGrid().ClavePrimariaSeleccionada(gridMunicipios));
					gridMunicipios.Delete();
					ActualizarBotones();
					gridMunicipios.Focus();
				}
				catch(Excepcion ex)
				{
					this.GetControlExcepciones().MostrarExcepcion(ex);
				}
			}
		}

		private void btnModificar_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnModificar)) return;
			try
			{
				DSMunicipio dsMunicipio=mPMunicipio.Carga(GetControlGrid().ClavePrimariaSeleccionada(gridMunicipios));
				FrmMunicipioEdit FrmMunicipioEdit= new FrmMunicipioEdit(dsMunicipio);
				FrmMunicipioEdit.FormAccion=TipoFormAccion.Modificacion;
				AbrirFormulario(FrmMunicipioEdit);
				
			}
			catch(Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}
		}
		

		private void btnAnadir_Click(object sender, System.EventArgs e)
		{

			if (!PermitirClick(btnAnadir)) return;
			DSMunicipio dsMunicipio=new DSMunicipio();
			Columna[] claveprimaria = new Columna[]{new Columna("IdEntidad", this.mintIdEntidad)};
			dsMunicipio.GenMunicipio.AgregarNueva(claveprimaria);
			
			if (ctrlProvincia1.IdProvincia.Text != null && ctrlProvincia1.IdProvincia.Text != "")			
			{
				
				dsMunicipio.GenMunicipio.FilaActual.IdProvincia = Int32.Parse(ctrlProvincia1.IdProvincia.Text);
				dsMunicipio.GenMunicipio.FilaActual.Provincia= ctrlProvincia1.NomProvincia.Text;
				
			}
			FrmMunicipioEdit FrmMunicipioEdit=new FrmMunicipioEdit(dsMunicipio);
			FrmMunicipioEdit.FormAccion=TipoFormAccion.Alta;
			AbrirFormulario(FrmMunicipioEdit);
			
		}

	
		
		private void xpGroupBox2_Enter(object sender, System.EventArgs e)
		{
			if (FormEstilo==TipoFormEstilo.Grid_Seleccion)
			{
				this.AcceptButton=btnSeleccionar;
			}
			else
			{
				this.AcceptButton=btnModificar;
			}
		}

		/// <summary>
		/// Devuelve el dataRow seleccionado		
		/// Puede ser que provenga de una búsqueda
		/// </summary>		
		/// <returns>El dataRow seleccionado</returns>	
		
		public override DRBase[] ElementosSeleccionados()
		{
			return GetControlGrid().FilasSeleccionadas(gridMunicipios);
		}

		private void btnCerrar_Click(object sender, System.EventArgs e)
		{
			Close();
		}

		private void gridMunicipios_Click(object sender, System.EventArgs e)
		{
		
		}

	
		private void FrmMunicipios_Load(object sender, System.EventArgs e)
		{
		
		}

		#region Enumerados propios
		/// <summary>
		/// Este enumerado indica los posibles modos de selección del formulario
		/// </summary>
		public enum TipoSeleccion
		{
			/// <summary>
			/// Entidades
			/// </summary>
			GestionEntidades=1,
			/// <summary>
			/// Territorio
			/// </summary>
			Territorio=2
		}
		#endregion
	}
}
