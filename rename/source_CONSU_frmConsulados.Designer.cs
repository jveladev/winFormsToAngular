using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Collections;

namespace IPublica.IU.Win.Gen.General
{
	public partial class FrmConsulados
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmConsulados));
            this.xpGroupBox2 = new IASoft.XPControls.XpGroupBox();
            this.btnAnadir = new IASoft.XPControls.XpButton();
            this.btnEliminar = new IASoft.XPControls.XpButton();
            this.btnModificar = new IASoft.XPControls.XpButton();
            this.gridConsulados = new C1.Win.C1TrueDBGrid.C1TrueDBGrid();
            this.btnCerrar = new IASoft.XPControls.XpButton();
            this.btnSeleccionar = new IASoft.XPControls.XpButton();
            this.localizationFilter1 = new IASoft.Localization.LocalizationFilter();
            this.xpGroupBoxFiltro = new IASoft.XPControls.XpGroupBox();
            this.chkActivos = new System.Windows.Forms.CheckBox();
            this.btnBuscaPais = new IASoft.XPControls.XpButton();
            this.lblPais = new System.Windows.Forms.Label();
            this.txtNomPais = new System.Windows.Forms.TextBox();
            this.txtPais = new System.Windows.Forms.TextBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.txtIdPais = new System.Windows.Forms.TextBox();
            this.xpGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridConsulados)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnCerrar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnSeleccionar)).BeginInit();
            this.xpGroupBoxFiltro.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnBuscaPais)).BeginInit();
            this.SuspendLayout();
            // 
            // xpGroupBox2
            // 
            this.xpGroupBox2.ApplyOldStyle = true;
            this.xpGroupBox2.Controls.Add(this.btnAnadir);
            this.xpGroupBox2.Controls.Add(this.btnEliminar);
            this.xpGroupBox2.Controls.Add(this.btnModificar);
            this.xpGroupBox2.Controls.Add(this.gridConsulados);
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
            // gridConsulados
            // 
            this.gridConsulados.AllowDelete = true;
            this.gridConsulados.AllowFilter = false;
            this.gridConsulados.AllowRowSizing = C1.Win.C1TrueDBGrid.RowSizingEnum.IndividualRows;
            this.gridConsulados.AllowUpdate = false;
            this.gridConsulados.AlternatingRows = true;
            this.gridConsulados.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.gridConsulados.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.gridConsulados.CaptionHeight = 17;
            this.gridConsulados.ExtendRightColumn = true;
            this.gridConsulados.ForeColor = System.Drawing.Color.Black;
            this.gridConsulados.GroupByCaption = "Drag a column header here to group by that column";
            this.gridConsulados.Images.Add(((System.Drawing.Image)(resources.GetObject("gridConsulados.Images"))));
            resources.ApplyResources(this.gridConsulados, "gridConsulados");
            this.gridConsulados.MarqueeStyle = C1.Win.C1TrueDBGrid.MarqueeEnum.HighlightRow;
            this.gridConsulados.MultiSelect = C1.Win.C1TrueDBGrid.MultiSelectEnum.None;
            this.gridConsulados.Name = "gridConsulados";
            this.gridConsulados.PreviewInfo.AllowSizing = ((bool)(resources.GetObject("gridConsulados.PreviewInfo.AllowSizing")));
            this.gridConsulados.PreviewInfo.Caption = resources.GetString("gridConsulados.PreviewInfo.Caption");
            this.gridConsulados.PreviewInfo.Location = new System.Drawing.Point(0, 0);
            this.gridConsulados.PreviewInfo.Size = new System.Drawing.Size(0, 0);
            this.gridConsulados.PreviewInfo.ToolBars = ((bool)(resources.GetObject("gridConsulados.PreviewInfo.ToolBars")));
            this.gridConsulados.PreviewInfo.UIStrings.Content = ((string[])(resources.GetObject("gridConsulados.PreviewInfo.UIStrings.Content")));
            this.gridConsulados.PreviewInfo.ZoomFactor = 75D;
            this.gridConsulados.PrintInfo.MaxRowHeight = ((int)(resources.GetObject("gridConsulados.PrintInfo.MaxRowHeight")));
            this.gridConsulados.PrintInfo.MeasurementDevice = C1.Win.C1TrueDBGrid.PrintInfo.MeasurementDeviceEnum.Screen;
            this.gridConsulados.PrintInfo.MeasurementPrinterName = null;
            this.gridConsulados.PrintInfo.OneFormPerPage = ((bool)(resources.GetObject("gridConsulados.PrintInfo.OneFormPerPage")));
            this.gridConsulados.PrintInfo.OwnerDrawPageFooter = ((bool)(resources.GetObject("gridConsulados.PrintInfo.OwnerDrawPageFooter")));
            this.gridConsulados.PrintInfo.OwnerDrawPageHeader = ((bool)(resources.GetObject("gridConsulados.PrintInfo.OwnerDrawPageHeader")));
            this.gridConsulados.PrintInfo.PageFooter = resources.GetString("gridConsulados.PrintInfo.PageFooter");
            this.gridConsulados.PrintInfo.PageFooterHeight = ((int)(resources.GetObject("gridConsulados.PrintInfo.PageFooterHeight")));
            this.gridConsulados.PrintInfo.PageHeader = resources.GetString("gridConsulados.PrintInfo.PageHeader");
            this.gridConsulados.PrintInfo.PageHeaderHeight = ((int)(resources.GetObject("gridConsulados.PrintInfo.PageHeaderHeight")));
            this.gridConsulados.PrintInfo.PrintHorizontalSplits = ((bool)(resources.GetObject("gridConsulados.PrintInfo.PrintHorizontalSplits")));
            this.gridConsulados.PrintInfo.ProgressCaption = resources.GetString("gridConsulados.PrintInfo.ProgressCaption");
            this.gridConsulados.PrintInfo.RepeatColumnFooters = ((bool)(resources.GetObject("gridConsulados.PrintInfo.RepeatColumnFooters")));
            this.gridConsulados.PrintInfo.RepeatColumnHeaders = ((bool)(resources.GetObject("gridConsulados.PrintInfo.RepeatColumnHeaders")));
            this.gridConsulados.PrintInfo.RepeatGridHeader = ((bool)(resources.GetObject("gridConsulados.PrintInfo.RepeatGridHeader")));
            this.gridConsulados.PrintInfo.RepeatSplitHeaders = ((bool)(resources.GetObject("gridConsulados.PrintInfo.RepeatSplitHeaders")));
            this.gridConsulados.PrintInfo.ShowOptionsDialog = ((bool)(resources.GetObject("gridConsulados.PrintInfo.ShowOptionsDialog")));
            this.gridConsulados.PrintInfo.ShowProgressForm = ((bool)(resources.GetObject("gridConsulados.PrintInfo.ShowProgressForm")));
            this.gridConsulados.PrintInfo.ShowSelection = ((bool)(resources.GetObject("gridConsulados.PrintInfo.ShowSelection")));
            this.gridConsulados.PrintInfo.UseGridColors = ((bool)(resources.GetObject("gridConsulados.PrintInfo.UseGridColors")));
            this.gridConsulados.RecordSelectors = false;
            this.gridConsulados.RowHeight = 15;
            this.gridConsulados.TabIndex = 0;
            this.gridConsulados.UseCompatibleTextRendering = false;
            this.gridConsulados.PropBag = resources.GetString("gridConsulados.PropBag");
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
            this.xpGroupBoxFiltro.Controls.Add(this.btnBuscaPais);
            this.xpGroupBoxFiltro.Controls.Add(this.lblPais);
            this.xpGroupBoxFiltro.Controls.Add(this.txtNomPais);
            this.xpGroupBoxFiltro.Controls.Add(this.txtPais);
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
            this.chkActivos.AutoSize = true;
            this.chkActivos.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            resources.ApplyResources(this.chkActivos, "chkActivos");
            this.chkActivos.Name = "chkActivos";
            this.chkActivos.TabIndex = 8;
            // 
            // btnBuscaPais
            // 
            this.btnBuscaPais.ApplyOldStyle = true;
            this.btnBuscaPais.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(236)))), ((int)(((byte)(236)))), ((int)(((byte)(236)))));
            this.btnBuscaPais.DisabledForeColor = System.Drawing.Color.Empty;
            this.btnBuscaPais.EnabledForeColor = System.Drawing.Color.Empty;
            this.btnBuscaPais.ForeColor = System.Drawing.Color.Black;
            this.btnBuscaPais.Image = ((System.Drawing.Image)(resources.GetObject("btnBuscaPais.Image")));
            this.btnBuscaPais.ImeMode = System.Windows.Forms.ImeMode.NoControl;
            this.btnBuscaPais.IsDebug = false;
            resources.ApplyResources(this.btnBuscaPais, "btnBuscaPais");
            this.btnBuscaPais.Name = "btnBuscaPais";
            this.btnBuscaPais.TabIndex = 3;
            this.btnBuscaPais.TabStop = false;
            this.btnBuscaPais.ThemeName = "Interpublica";
            this.btnBuscaPais.UseVisualStyleBackColor = false;
            this.btnBuscaPais.Click += new System.EventHandler(this.btnBuscaPais_Click);
            // 
            // lblPais
            // 
            resources.ApplyResources(this.lblPais, "lblPais");
            this.lblPais.Name = "lblPais";
            this.lblPais.TabIndex = 0;
            // 
            // txtNomPais
            // 
            this.txtNomPais.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            resources.ApplyResources(this.txtNomPais, "txtNomPais");
            this.txtNomPais.MaxLength = 250;
            this.txtNomPais.Name = "txtNomPais";
            this.txtNomPais.TabIndex = 2;
            this.txtNomPais.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtNomPais_KeyUp);
            this.txtNomPais.Validating += new System.ComponentModel.CancelEventHandler(this.txtNomPais_Validating);
            // 
            // txtPais
            // 
            this.txtPais.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            resources.ApplyResources(this.txtPais, "txtPais");
            this.txtPais.MaxLength = 3;
            this.txtPais.Name = "txtPais";
            this.txtPais.TabIndex = 1;
            this.txtPais.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtPais_KeyPress);
            this.txtPais.KeyUp += new System.Windows.Forms.KeyEventHandler(this.txtPais_KeyUp);
            this.txtPais.Validating += new System.ComponentModel.CancelEventHandler(this.txtPais_Validating);
            // 
            // txtNombre
            // 
            this.txtNombre.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            resources.ApplyResources(this.txtNombre, "txtNombre");
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.TabIndex = 5;
            // 
            // lblNombre
            // 
            this.lblNombre.CausesValidation = false;
            resources.ApplyResources(this.lblNombre, "lblNombre");
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.TabIndex = 4;
            // 
            // txtIdPais
            // 
            resources.ApplyResources(this.txtIdPais, "txtIdPais");
            this.txtIdPais.Name = "txtIdPais";
            this.txtIdPais.TabIndex = 0;
            this.txtIdPais.TextChanged += new System.EventHandler(this.txtIdPais_TextChanged);
            this.txtIdPais.Validating += new System.ComponentModel.CancelEventHandler(this.txtIdPais_Validating);
            // 
            // FrmConsulados
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.CancelButton = this.btnCerrar;
            this.ClientSize = new System.Drawing.Size(550, 392);
            this.Controls.Add(this.xpGroupBox2);
            this.Controls.Add(this.btnSeleccionar);
            this.Controls.Add(this.btnCerrar);
            this.Controls.Add(this.xpGroupBoxFiltro);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            resources.ApplyResources(this, "$this");
            this.MinimumSize = new System.Drawing.Size(558, 419);
            this.Name = "FrmConsulados";
            this.PalabraClaveAyuda = "D2H_Pa_ses_Consulados_ComunidadesAut_nomas_Provincias_MunicipiosyLocalidades_";
            this.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            this.xpGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridConsulados)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnCerrar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnSeleccionar)).EndInit();
            this.xpGroupBoxFiltro.ResumeLayout(false);
            this.xpGroupBoxFiltro.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnBuscaPais)).EndInit();
            this.ResumeLayout(false);

		}
		#endregion

		private IASoft.XPControls.XpGroupBox xpGroupBox2;
		private IASoft.XPControls.XpButton btnAnadir;
		private IASoft.XPControls.XpButton btnEliminar;
		private IASoft.XPControls.XpButton btnModificar;
		private IASoft.XPControls.XpButton btnCerrar;
		private IASoft.XPControls.XpButton btnSeleccionar;
		private IASoft.Localization.LocalizationFilter localizationFilter1;
		private System.Windows.Forms.TextBox txtIdPais;
		private IASoft.XPControls.XpGroupBox xpGroupBoxFiltro;
		private System.Windows.Forms.TextBox txtNombre;
		private System.Windows.Forms.Label lblNombre;
		private C1.Win.C1TrueDBGrid.C1TrueDBGrid gridConsulados;
		private IASoft.XPControls.XpButton btnBuscaPais;
		private System.Windows.Forms.Label lblPais;
		private System.Windows.Forms.TextBox txtNomPais;
		private System.Windows.Forms.TextBox txtPais;
		private CheckBox chkActivos;
		private System.ComponentModel.Container components = null;

	}
}
