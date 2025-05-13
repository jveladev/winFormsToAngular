using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Collections;

namespace IPublica.IU.Win.Gen.General
{
	public partial class FrmMunicipios
	{
        /// <summary>
        /// Limpiar los recursos que se estén utilizando.
        /// </summary>
        protected override void Dispose(bool disposing)
		{
			if( disposing )
			{
				if(components != null)
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		private void InitializeComponent()
		{
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmMunicipios));
            this.xpGroupBox2 = new IASoft.XPControls.XpGroupBox();
            this.btnAnadir = new IASoft.XPControls.XpButton();
            this.btnEliminar = new IASoft.XPControls.XpButton();
            this.btnModificar = new IASoft.XPControls.XpButton();
            this.gridMunicipios = new C1.Win.C1TrueDBGrid.C1TrueDBGrid();
            this.btnCerrar = new IASoft.XPControls.XpButton();
            this.btnSeleccionar = new IASoft.XPControls.XpButton();
            this.xpGroupBoxFiltro = new IASoft.XPControls.XpGroupBox();
            this.chkActivos = new System.Windows.Forms.CheckBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.localizationFilter1 = new IASoft.Localization.LocalizationFilter();
            this.ctrlProvincia1 = new IPublica.IU.Win.Gen.Controles.CtrlProvincia();
            this.xpGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridMunicipios)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnCerrar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnSeleccionar)).BeginInit();
            this.xpGroupBoxFiltro.SuspendLayout();
            this.SuspendLayout();
            // 
            // xpGroupBox2
            // 
            this.xpGroupBox2.ApplyOldStyle = true;
            this.xpGroupBox2.Controls.Add(this.btnAnadir);
            this.xpGroupBox2.Controls.Add(this.btnEliminar);
            this.xpGroupBox2.Controls.Add(this.btnModificar);
            this.xpGroupBox2.Controls.Add(this.gridMunicipios);
            this.xpGroupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            resources.ApplyResources(this.xpGroupBox2, "xpGroupBox2");
            this.xpGroupBox2.Margin = new System.Windows.Forms.Padding(10);
            this.xpGroupBox2.Name = "xpGroupBox2";
            this.xpGroupBox2.TabIndex = 1;
            this.xpGroupBox2.TabStop = false;
            this.xpGroupBox2.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            // 
            // btnAnadir
            // 
            this.btnAnadir.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnAnadir.ApplyOldStyle = true;
            this.btnAnadir.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnAnadir.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnAnadir.ForeColor = System.Drawing.Color.Black;
            this.btnAnadir.IsDebug = false;
            resources.ApplyResources(this.btnAnadir, "btnAnadir");
            this.btnAnadir.Name = "btnAnadir";
            this.btnAnadir.TabIndex = 1;
            this.btnAnadir.ThemeName = "Interpublica";
            this.btnAnadir.UseVisualStyleBackColor = true;
            this.btnAnadir.Click += new System.EventHandler(this.btnAnadir_Click);
            // 
            // btnEliminar
            // 
            this.btnEliminar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnEliminar.ApplyOldStyle = true;
            this.btnEliminar.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnEliminar.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnEliminar.ForeColor = System.Drawing.Color.Black;
            this.btnEliminar.IsDebug = false;
            resources.ApplyResources(this.btnEliminar, "btnEliminar");
            this.btnEliminar.Name = "btnEliminar";
            this.btnEliminar.TabIndex = 2;
            this.btnEliminar.ThemeName = "Interpublica";
            this.btnEliminar.UseVisualStyleBackColor = true;
            this.btnEliminar.Click += new System.EventHandler(this.btnEliminar_Click);
            // 
            // btnModificar
            // 
            this.btnModificar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnModificar.ApplyOldStyle = true;
            this.btnModificar.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnModificar.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnModificar.ForeColor = System.Drawing.Color.Black;
            this.btnModificar.IsDebug = false;
            resources.ApplyResources(this.btnModificar, "btnModificar");
            this.btnModificar.Name = "btnModificar";
            this.btnModificar.TabIndex = 3;
            this.btnModificar.ThemeName = "Interpublica";
            this.btnModificar.UseVisualStyleBackColor = true;
            this.btnModificar.Click += new System.EventHandler(this.btnModificar_Click);
            // 
            // gridMunicipios
            // 
            this.gridMunicipios.AllowDelete = true;
            this.gridMunicipios.AllowFilter = false;
            this.gridMunicipios.AllowRowSizing = C1.Win.C1TrueDBGrid.RowSizingEnum.IndividualRows;
            this.gridMunicipios.AllowUpdate = false;
            this.gridMunicipios.AlternatingRows = true;
            this.gridMunicipios.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.gridMunicipios.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.gridMunicipios.CaptionHeight = 17;
            this.gridMunicipios.ExtendRightColumn = true;
            this.gridMunicipios.ForeColor = System.Drawing.Color.Black;
            this.gridMunicipios.GroupByCaption = "Drag a column header here to group by that column";
            this.gridMunicipios.Images.Add(((System.Drawing.Image)(resources.GetObject("gridMunicipios.Images"))));
            resources.ApplyResources(this.gridMunicipios, "gridMunicipios");
            this.gridMunicipios.MarqueeStyle = C1.Win.C1TrueDBGrid.MarqueeEnum.HighlightRow;
            this.gridMunicipios.MultiSelect = C1.Win.C1TrueDBGrid.MultiSelectEnum.None;
            this.gridMunicipios.Name = "gridMunicipios";
            this.gridMunicipios.PreviewInfo.Location = new System.Drawing.Point(0, 0);
            this.gridMunicipios.PreviewInfo.Size = new System.Drawing.Size(0, 0);
            this.gridMunicipios.PreviewInfo.ZoomFactor = 75D;
            this.gridMunicipios.PrintInfo.MeasurementDevice = C1.Win.C1TrueDBGrid.PrintInfo.MeasurementDeviceEnum.Screen;
            this.gridMunicipios.PrintInfo.MeasurementPrinterName = null;
            this.gridMunicipios.RecordSelectors = false;
            this.gridMunicipios.RowHeight = 15;
            this.gridMunicipios.TabIndex = 0;
            this.gridMunicipios.UseCompatibleTextRendering = false;
            this.gridMunicipios.Click += new System.EventHandler(this.gridMunicipios_Click);
            this.gridMunicipios.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            this.gridMunicipios.PropBag = resources.GetString("gridMunicipios.PropBag");
            // 
            // btnCerrar
            // 
            this.btnCerrar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCerrar.ApplyOldStyle = true;
            this.btnCerrar.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.btnCerrar.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnCerrar.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnCerrar.IsDebug = false;
            resources.ApplyResources(this.btnCerrar, "btnCerrar");
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.TabIndex = 3;
            this.btnCerrar.ThemeName = "Interpublica";
            this.btnCerrar.UseVisualStyleBackColor = true;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // btnSeleccionar
            // 
            this.btnSeleccionar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSeleccionar.ApplyOldStyle = true;
            this.btnSeleccionar.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnSeleccionar.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnSeleccionar.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnSeleccionar.IsDebug = false;
            resources.ApplyResources(this.btnSeleccionar, "btnSeleccionar");
            this.btnSeleccionar.Name = "btnSeleccionar";
            this.btnSeleccionar.TabIndex = 2;
            this.btnSeleccionar.ThemeName = "Interpublica";
            this.btnSeleccionar.UseVisualStyleBackColor = true;
            this.btnSeleccionar.Visible = false;
            // 
            // xpGroupBoxFiltro
            // 
            this.xpGroupBoxFiltro.ApplyOldStyle = true;
            this.xpGroupBoxFiltro.Controls.Add(this.chkActivos);
            this.xpGroupBoxFiltro.Controls.Add(this.ctrlProvincia1);
            this.xpGroupBoxFiltro.Controls.Add(this.txtNombre);
            this.xpGroupBoxFiltro.Controls.Add(this.lblNombre);
            this.xpGroupBoxFiltro.Dock = System.Windows.Forms.DockStyle.Top;
            resources.ApplyResources(this.xpGroupBoxFiltro, "xpGroupBoxFiltro");
            this.xpGroupBoxFiltro.Margin = new System.Windows.Forms.Padding(10);
            this.xpGroupBoxFiltro.Name = "xpGroupBoxFiltro";
            this.xpGroupBoxFiltro.TabIndex = 0;
            this.xpGroupBoxFiltro.TabStop = false;
            // 
            // chkActivos
            // 
            this.chkActivos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            resources.ApplyResources(this.chkActivos, "chkActivos");
            this.chkActivos.Name = "chkActivos";
            this.chkActivos.TabIndex = 8;
            // 
            // txtNombre
            // 
            this.txtNombre.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            resources.ApplyResources(this.txtNombre, "txtNombre");
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.TabIndex = 2;
            // 
            // lblNombre
            // 
            this.lblNombre.CausesValidation = false;
            resources.ApplyResources(this.lblNombre, "lblNombre");
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.TabIndex = 1;
            // 
            // ctrlProvincia1
            // 
            this.ctrlProvincia1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ctrlProvincia1.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            resources.ApplyResources(this.ctrlProvincia1, "ctrlProvincia1");
            this.ctrlProvincia1.Name = "ctrlProvincia1";
            this.ctrlProvincia1.ReadOnly = false;
            this.ctrlProvincia1.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.ctrlProvincia1.TabIndex = 0;
            this.ctrlProvincia1.TextoAuditoria = null;
            // 
            // FrmMunicipios
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.CancelButton = this.btnCerrar;
            this.ClientSize = new System.Drawing.Size(492, 443);
            this.Controls.Add(this.xpGroupBox2);
            this.Controls.Add(this.xpGroupBoxFiltro);
            this.Controls.Add(this.btnSeleccionar);
            this.Controls.Add(this.btnCerrar);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MinimumSize = new System.Drawing.Size(500, 400);
            this.Name = "FrmMunicipios";
            this.PalabraClaveAyuda = "D2H_Pa_ses_Consulados_ComunidadesAut_nomas_Provincias_MunicipiosyLocalidades_";
            this.RightToLeft = System.Windows.Forms.RightToLeft.No;
            resources.ApplyResources(this, "$this");
            this.Load += new System.EventHandler(this.FrmMunicipios_Load);
            this.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            this.xpGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridMunicipios)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnCerrar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnSeleccionar)).EndInit();
            this.xpGroupBoxFiltro.ResumeLayout(false);
            this.xpGroupBoxFiltro.PerformLayout();
            this.ResumeLayout(false);

		}
		#endregion

		private IASoft.XPControls.XpGroupBox xpGroupBox2;
		private IASoft.XPControls.XpButton btnAnadir;
		private IASoft.XPControls.XpButton btnEliminar;
		private IASoft.XPControls.XpButton btnModificar;
		private IASoft.XPControls.XpButton btnCerrar;
		private IASoft.XPControls.XpButton btnSeleccionar;
		private C1.Win.C1TrueDBGrid.C1TrueDBGrid gridMunicipios;
		private IASoft.XPControls.XpGroupBox xpGroupBoxFiltro;
		private IASoft.Localization.LocalizationFilter localizationFilter1;
		private System.Windows.Forms.TextBox txtNombre;
		private System.Windows.Forms.Label lblNombre;
		private IPublica.IU.Win.Gen.Controles.CtrlProvincia ctrlProvincia1;
		private CheckBox chkActivos;
		private System.ComponentModel.Container components = null;

	}
}
