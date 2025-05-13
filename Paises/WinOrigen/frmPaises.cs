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
	/// Formulario de países.
	/// </summary>
	[System.ComponentModel.DesignerCategory("Designer")]
	public partial class FrmPaises : FormBase
	{
		private DSBase mdsData;
		private DataView mdvGrid;
		private int	mintIdEntidad;
		private IPais mPPais;
		/// <summary>
		/// Constructor del formulario
		/// </summary>
		/// <param name="tpEstiloVentana">Tipo de formulario</param>
		public FrmPaises(TipoFormEstilo tpEstiloVentana):base(tpEstiloVentana)
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
					xpGroupBoxFiltro.TabIndex=1;
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
				base.NombreObjeto = "GenPais";
				if (PermisosBotones())
				{
					mPPais=(IPais)Factoria.GetObject(typeof(IPais));	
					CrearFiltros();
					GetControlFiltros(xpGroupBoxFiltro).SetParametros(parametrosBusca);
					this.GetControlGrid().SetConfigGrid(this.gridPaises, this.btnAnadir, this.btnModificar, this.btnEliminar);
					this.GetControlGrid().CargarComboBooleano(gridPaises.Columns["Comunitario"],C1.Win.C1TrueDBGrid.PresentationEnum.CheckBox);
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
            GetControlFiltros(xpGroupBoxFiltro).AddFilter(chkActivos, "MostrarNoActivos", chkActivos);
		}

		private int EnlazarGrid(DSBase datos, bool BorrarDatos)
		{
			if (mdsData == null)
			{
                mdsData=datos;
				mdvGrid=mdsData.Tabla.DefaultView;
				this.GetControlGrid().ActualizaGrid(this.gridPaises,mdvGrid);
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
		/// Llama al metodo buscar de persistencia y el resultado lo introduce en el grid.
		/// </summary>
		/// <param name="contenedor"></param>
		/// <returns></returns>
		public override int Buscar(Control contenedor)
		{				
			this.Cursor=Cursors.WaitCursor;
			int intNumFilas= EnlazarGrid(mPPais.Busca(GetControlFiltros(contenedor).GetFiltros()),true);
			gridPaises.Focus();
			this.Cursor=Cursors.Default;
			return intNumFilas;			
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
					int numReg=EnlazarGrid(mPPais.Busca(GetControlFiltros(xpGroupBoxFiltro).GetLastFiltros(data.Tabla.FilaActual.ClavePrimaria)),false);
					GetControlGrid().SeleccionarFilaActiva(this.gridPaises ,data.Tabla.FilaActual);
					gridPaises.Focus();
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
		

		private void ActualizarBotones()
		{
			if (GetControlGrid().FilaSeleccionada(gridPaises)==null)
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
					mPPais.Borra(GetControlGrid().ClavePrimariaSeleccionada(gridPaises));
					gridPaises.Delete();
					ActualizarBotones();
					gridPaises.Focus();
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
				
				DSPais dsPais=mPPais.Carga(GetControlGrid().ClavePrimariaSeleccionada(gridPaises));
				FrmPaisEdit frmPaisEdit= new FrmPaisEdit(dsPais);
				frmPaisEdit.FormAccion=TipoFormAccion.Modificacion;
				AbrirFormulario(frmPaisEdit);
				
			}
			catch(Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}
		}
		
		private void btnAnadir_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnAnadir)) return;
			DSPais dsPais=new DSPais();
			Columna[] claveprimaria = new Columna[]{new Columna("IdEntidad", this.mintIdEntidad)};
			
			dsPais.GenPais.AgregarNueva(claveprimaria);
			
			FrmPaisEdit frmPaisEdit=new FrmPaisEdit(dsPais);
			frmPaisEdit.FormAccion=TipoFormAccion.Alta;
			AbrirFormulario(frmPaisEdit);
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
			return GetControlGrid().FilasSeleccionadas(gridPaises);
		}

		private void btnCerrar_Click(object sender, System.EventArgs e)
		{
			this.Close();
		}

		/// <summary>
		/// Metodo sobrecargado para devolver al FormBase el nombre completo del tipo de dataset al que vamos a asociar los ficheros
		/// </summary>
		/// <returns>Nombre completo del tipo de dataset al que vamos a asociar los ficheros</returns>
		public override string ObtenerDSUtilizado()
		{
			return "IPublica.IU.Win.Gen.General.DSPais";
		}

		/// <summary>
		/// Metodo sobrecargado para devolver al FormBase la clave del dataset a la que asociar los ficheros
		/// </summary>
		/// <returns>Clave del dataset a la que asociar los ficheros</returns>
		public override string ObtenerClaveDSUtilizado()
		{
			string strClave="";
			Columna []colClave= GetControlGrid().ClavePrimariaSeleccionada(gridPaises);
			foreach(Columna col in colClave)
				strClave+=col.Valor+",";
			strClave = strClave.Substring(0,strClave.Length-1);
			
			return strClave;
		}
	}
}
