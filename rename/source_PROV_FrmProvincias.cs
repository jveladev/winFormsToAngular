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
	/// Formulario de provincias
	/// </summary>
	[System.ComponentModel.DesignerCategory("Designer")]
	public partial class FrmProvincias : FormBase
	{		
		private DSBase mdsData;
		private DataView mdvGrid;
		private IProvincia mPProvincia; 
		private int		   mintIdEntidad;
		/// <summary>
		/// Constructor del formulario
		/// </summary>
		/// <param name="tpEstiloVentana">Tipo de formulario</param>
		public FrmProvincias(TipoFormEstilo tpEstiloVentana):base(tpEstiloVentana)
		{
			InitializeComponent();
		}
	
		private bool PermisosBotones()
		{
			bool bPermiso = ControlUser.GetAccesoObjeto(base.NombreObjeto);
			if (bPermiso)
			{			
				if (FormEstilo==TipoFormEstilo.Grid_Seleccion)
				{
					btnSeleccionar.Visible=true;
					xpGroupBox2.TabIndex=0;					
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
					int numReg=EnlazarGrid(mPProvincia.Busca(GetControlFiltros(xpGroupBoxFiltro).GetLastFiltros(data.Tabla.FilaActual.ClavePrimaria)),false);
					GetControlGrid().SeleccionarFilaActiva(this.gridProvincias ,data.Tabla.FilaActual);
					gridProvincias.Focus();
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
						mintIdEntidad = Int32.Parse(parametrosBusca[0].ColumnasFiltro[i].Valor.ToString());
					}
				}
				base.NombreObjeto = "GenProvincia";
				if (PermisosBotones())
				{
					mPProvincia=(IProvincia)Factoria.GetObject(typeof(IProvincia));
					CrearFiltros();
					GetControlFiltros(xpGroupBoxFiltro).SetParametros(parametrosBusca);
					this.GetControlGrid().SetConfigGrid(this.gridProvincias,this.btnAnadir, this.btnModificar, this.btnEliminar);
					if (cargar)
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
			return intNumFilas;
		}

		private void CrearFiltros()
		{
			GetControlFiltros(xpGroupBoxFiltro).Init();						
			GetControlFiltros(xpGroupBoxFiltro).AddFilter(txtNombre ,"Nombre",lblNombre);
		}

		/// <summary>
		/// Realiza una búsqueda en cliente
		/// </summary>
		/// <param name="contenedor"></param>
		/// <returns></returns>
		public override int Buscar(Control contenedor)
		{				
			this.Cursor=Cursors.WaitCursor;
			int intNumFilas= EnlazarGrid(mPProvincia.Busca(GetControlFiltros(contenedor).GetFiltros()),true);
			gridProvincias.Focus();
			this.Cursor=Cursors.Default;
			return intNumFilas;			
		}

		private int EnlazarGrid(DSBase datos, bool BorrarDatos)
		{
			if (mdsData == null)
			{
				mdsData=datos;
				mdvGrid=mdsData.Tabla.DefaultView;
				this.GetControlGrid().ActualizaGrid(this.gridProvincias ,mdvGrid);
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

		private void ActualizarBotones()
		{
			if (GetControlGrid().FilaSeleccionada(gridProvincias)==null)
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
					mPProvincia.Borra(GetControlGrid().ClavePrimariaSeleccionada(gridProvincias));
					gridProvincias.Delete();
					gridProvincias.Focus();
					ActualizarBotones();
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
				DSProvincia dsProvincia=mPProvincia.Carga(GetControlGrid().ClavePrimariaSeleccionada(gridProvincias));
				FrmProvinciaEdit frmProvinciaEdit= new FrmProvinciaEdit(dsProvincia);
				frmProvinciaEdit.FormAccion=TipoFormAccion.Modificacion;
				AbrirFormulario(frmProvinciaEdit);
			}
			catch(Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}
		}
		

		private void btnAnadir_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnAnadir)) return;
			DSProvincia dsProvincia=new DSProvincia();

			Columna[] claveprimaria = new Columna[]{new Columna("IdEntidad", this.mintIdEntidad)};
			
			dsProvincia.GenProvincia.AgregarNueva(claveprimaria);
			FrmProvinciaEdit frmProvinciaEdit=new FrmProvinciaEdit(dsProvincia);
			frmProvinciaEdit.FormAccion=TipoFormAccion.Alta;
			AbrirFormulario(frmProvinciaEdit);
			
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
			return GetControlGrid().FilasSeleccionadas(gridProvincias);
		}

		private void btnCerrar_Click(object sender, System.EventArgs e)
		{
			this.Close();
		}

		private void btnSeleccionar_Click(object sender, System.EventArgs e)
		{
		
		}

		

		

		

	}
}
