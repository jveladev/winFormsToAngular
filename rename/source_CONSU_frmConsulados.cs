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
	/// Formulario de Consulados
	/// </summary>
	[System.ComponentModel.DesignerCategory("Designer")]
	public partial class FrmConsulados : FormBase
	{
		private DSBase mdsData;
		private DataView mdvGrid;
		private IConsulado mPConsulado; 
		private int	mintIdEntidad;
		/// <summary>
		/// Constructor del formulario
		/// </summary>
		/// <param name="tpEstiloVentana">Tipo de formulario</param>
		public FrmConsulados(TipoFormEstilo tpEstiloVentana):base(tpEstiloVentana)
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
				base.NombreObjeto = "GenConsulado";
				if (PermisosBotones())
				{
					mPConsulado=(IConsulado)Factoria.GetObject(typeof(IConsulado));
					
					CrearFiltros();
					GetControlFiltros(xpGroupBoxFiltro).SetParametros(parametrosBusca);
					this.GetControlGrid().SetConfigGrid(this.gridConsulados, this.btnAnadir, this.btnModificar, this.btnEliminar);
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
			GetControlFiltros(xpGroupBoxFiltro).AddFilter(txtIdPais ,"IdPais",lblPais);
            GetControlFiltros(xpGroupBoxFiltro).AddFilter(chkActivos, "ConsuladosNoActivos", chkActivos);
		}

		private int EnlazarGrid(DSBase datos, bool BorrarDatos)
		{
			if (mdsData == null)
			{
				mdsData=datos;
				mdvGrid=mdsData.Tabla.DefaultView;
				this.GetControlGrid().ActualizaGrid(this.gridConsulados ,mdvGrid);
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
			if (GetControlGrid().FilaSeleccionada(gridConsulados)==null)
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
					mPConsulado.Borra(GetControlGrid().ClavePrimariaSeleccionada(gridConsulados));
					gridConsulados.Delete();
					ActualizarBotones();
					gridConsulados.Focus();					
				}
				catch(Excepcion ex)
				{
					this.GetControlExcepciones().MostrarExcepcion(ex);
				}
			}
		}


		/// <summary>
		/// Realiza una búsqueda en cliente
		/// </summary>
		/// <param name="contenedor"></param>
		/// <returns></returns>
		public override int Buscar(Control contenedor)
		{				
			this.Cursor=Cursors.WaitCursor;
			int intNumFilas= EnlazarGrid(mPConsulado.Busca(GetControlFiltros(contenedor).GetFiltros()),true);
			gridConsulados.Focus();
			this.Cursor=Cursors.Default;
			return intNumFilas;			
		}

		private void btnModificar_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnModificar)) return;
			try
			{
				DSConsulado dsConsulado=mPConsulado.Carga(GetControlGrid().ClavePrimariaSeleccionada(gridConsulados));
				FrmConsuladoEdit frmConsuladoEdit= new FrmConsuladoEdit(dsConsulado);
				frmConsuladoEdit.FormAccion=TipoFormAccion.Modificacion;
				AbrirFormulario(frmConsuladoEdit);
			}
			catch(Excepcion ex)
			{
				this.GetControlExcepciones().MostrarExcepcion(ex);
			}
		}
		

		private void btnAnadir_Click(object sender, System.EventArgs e)
		{
			if (!PermitirClick(btnAnadir)) return;
			DSConsulado dsConsulado=new DSConsulado();
		
			Columna[] claveprimaria = new Columna[]{new Columna("IdEntidad", this.mintIdEntidad)};
			
			dsConsulado.GenConsulado.AgregarNueva(claveprimaria);

			//Si existe un país establecido en el filtro se pasa en el alta
			if (txtIdPais.Text != null && txtIdPais.Text != "")			
			{				
                //Busco si el pais esta de alta
                IPais pPais = (IPais)Factoria.GetObject(typeof(IPais));
                DSBase dsPaises = pPais.Busca(new Columna[] { new Columna("IdEntidad", ControlUser.IdEntidad), new Columna("IdPais", Int32.Parse(txtIdPais.Text)), new Columna("MostrarNoActivos", 1) });
                if ((bool)dsPaises.Tabla.Rows[0]["Activo"])
                {
                    dsConsulado.GenConsulado.FilaActual.IdPais = Int32.Parse(txtIdPais.Text);
                    dsConsulado.GenConsulado.FilaActual.Pais = txtNomPais.Text;
                    dsConsulado.GenConsulado.FilaActual.CodPais = txtPais.Text;
                }
			}

			FrmConsuladoEdit frmConsuladoEdit=new FrmConsuladoEdit(dsConsulado);
			frmConsuladoEdit.FormAccion=TipoFormAccion.Alta;
			AbrirFormulario(frmConsuladoEdit);
			
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
					int numReg=EnlazarGrid(mPConsulado.Busca(GetControlFiltros(xpGroupBoxFiltro).GetLastFiltros(data.Tabla.FilaActual.ClavePrimaria)),false);
					GetControlGrid().SeleccionarFilaActiva(this.gridConsulados ,data.Tabla.FilaActual);
					gridConsulados.Focus();
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
			return GetControlGrid().FilasSeleccionadas(gridConsulados);
		}

		private void btnCerrar_Click(object sender, System.EventArgs e)
		{
			this.Close();
		}		

		private void txtPais_Validating(object sender, System.ComponentModel.CancelEventArgs e)
		{
			if (txtPais.Modified)
			{
				if (txtPais.Text.Trim().Length==0) 
				{
					txtIdPais.Text="";
					txtPais.Text="";
					txtNomPais.Text="";
				}
				else
				{
					FrmPaises  frmPaises = new FrmPaises (TipoFormEstilo.Grid_Seleccion);

					FiltroVal [] filtros= new FiltroVal[]{new FiltroVal(new Columna("IdEntidad",mintIdEntidad),false),
															 new FiltroVal(new Columna("Codigo",txtPais.Text),false),
                                                             new FiltroVal(new Columna("MostrarNoActivos",true),false)};
                
					DRBase dr= AbrirFormularioSeleccion(frmPaises,filtros,false);
					if (dr!=null)
					{
                        txtIdPais.Text = dr["IdPais"].ToString();
						txtPais.Text = (string)dr["Codigo"];
						txtNomPais.Text=(string)dr["Nombre"];
						txtPais.Modified=false;
					}
					else
					{
						txtIdPais.Text = "";
						txtPais.Text = "";
						txtNomPais.Text = "";
						e.Cancel = true;
					}
				}
			}				
		}
		private void txtIdPais_Validating(object sender, System.ComponentModel.CancelEventArgs e)
		{
			if (!txtIdPais.Modified)
			{
				if (txtIdPais.Text.Trim().Length==0) 
				{
					txtIdPais.Text="";
					txtPais.Text="";
					txtNomPais.Text="";
				}
				else
				{
					FrmPaises  frmPaises = new FrmPaises (TipoFormEstilo.Grid_Seleccion);

					FiltroVal [] filtros = new FiltroVal[]{new FiltroVal(new Columna("IdEntidad",mintIdEntidad),false),
													new FiltroVal(new Columna("IdPais",txtIdPais.Text),false),
                                                    new FiltroVal(new Columna("MostrarNoActivos",true),false)};
								
					DRBase dr=AbrirFormularioSeleccion(frmPaises,filtros,false);
					if (dr!=null)
					{
						txtIdPais.Text = dr["IdPais"].ToString();
						txtPais.Text = (string)dr["Codigo"];
						txtNomPais.Text=(string)dr["Nombre"];
						txtPais.Modified=false;
					}
					else
					{
						txtIdPais.Text = "";
						txtPais.Text = "";
						txtNomPais.Text = "";
						if(e!=null)
							e.Cancel = true;
					}
				}
			}				
		}


		private void txtPais_KeyUp(object sender, System.Windows.Forms.KeyEventArgs e)
		{
			if(e.KeyData==Keys.F4)
			{
				btnBuscaPais.PerformClick();
			}
		}
		private void txtNomPais_Validating(object sender, System.ComponentModel.CancelEventArgs e)
		{
			if (txtNomPais.Modified)
			{
				if (txtNomPais.Text.Trim().Length==0) 
				{
					txtIdPais.Text="";
					txtPais.Text="";
					txtNomPais.Text="";
				}
				else
				{
					FrmPaises  frmPaises = new FrmPaises (TipoFormEstilo.Grid_Seleccion);

					FiltroVal [] filtros= new FiltroVal[]{new FiltroVal(new Columna("IdEntidad", mintIdEntidad),false),
															 new FiltroVal(new Columna("Nombre",txtNomPais.Text),false),
                                                             new FiltroVal(new Columna("MostrarNoActivos",true),false)};

					DRBase dr= AbrirFormularioSeleccion(frmPaises,filtros,false);
					if (dr!=null)
					{
						txtIdPais.Text = dr["IdPais"].ToString();
						txtPais.Text = (string)dr["Codigo"];
						txtNomPais.Text=(string)dr["Nombre"];
						txtNomPais.Modified=false;
					}
					else
					{
						txtIdPais.Text="";
						txtPais.Text = "";
						txtNomPais.Text = "";
						txtNomPais.Focus();
						e.Cancel = true;
					}
				}
			}			
		}

		private void txtNomPais_KeyUp(object sender, System.Windows.Forms.KeyEventArgs e)
		{
			if(e.KeyData==Keys.F4)
			{
				btnBuscaPais.PerformClick();
			}
		}

		private void btnBuscaPais_Click(object sender, System.EventArgs e)
		{
			FrmPaises  frmPaises = new FrmPaises (TipoFormEstilo.Grid_Seleccion);

			FiltroVal []filtros=new FiltroVal[]{new FiltroVal(new Columna("IdEntidad", mintIdEntidad),false)};

			DRBase dr= AbrirFormularioSeleccion(frmPaises,filtros,true);
			if (dr!=null)
			{
				txtIdPais.Text=dr["IdPais"].ToString();
				txtPais.Text=(string)dr["Codigo"];
				txtNomPais.Text=(string)dr["Nombre"];
			}
		}

		private void txtPais_KeyPress(object sender, System.Windows.Forms.KeyPressEventArgs e)
		{
			char c = e.KeyChar;
			if ((!char.IsDigit(c))&&(!char.IsControl(c)))
			{
				e.Handled=true;
			}
		}

		private void txtIdPais_TextChanged(object sender, System.EventArgs e)
		{
			if (txtIdPais.Text.Equals(""))
			{
				txtPais.Text="";
				txtNomPais.Text="";
			}
			else
				txtIdPais_Validating(null,null);
		}
		

	}
}
