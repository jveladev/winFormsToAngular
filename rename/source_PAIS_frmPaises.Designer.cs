using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Collections;

namespace IPublica.IU.Win.Gen.General
{
	public partial class FrmPaises
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmPaises));
            this.xpGroupBox2 = new IASoft.XPControls.XpGroupBox();
            this.btnAnadir = new IASoft.XPControls.XpButton();
            this.btnEliminar = new IASoft.XPControls.XpButton();
            this.btnModificar = new IASoft.XPControls.XpButton();
            this.gridPaises = new C1.Win.C1TrueDBGrid.C1TrueDBGrid();
            this.btnCerrar = new IASoft.XPControls.XpButton();
            this.btnSeleccionar = new IASoft.XPControls.XpButton();
            this.localizationFilter1 = new IASoft.Localization.LocalizationFilter();
            this.xpGroupBoxFiltro = new IASoft.XPControls.XpGroupBox();
            this.chkActivos = new System.Windows.Forms.CheckBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.xpGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridPaises)).BeginInit();
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
            this.xpGroupBox2.Controls.Add(this.gridPaises);
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
            // gridPaises
            // 
            this.gridPaises.AllowDelete = true;
            this.gridPaises.AllowFilter = false;
            this.gridPaises.AllowRowSizing = C1.Win.C1TrueDBGrid.RowSizingEnum.IndividualRows;
            this.gridPaises.AllowUpdate = false;
            this.gridPaises.AlternatingRows = true;
            this.gridPaises.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.gridPaises.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.gridPaises.CaptionHeight = 17;
            this.gridPaises.ExtendRightColumn = true;
            this.gridPaises.ForeColor = System.Drawing.Color.Black;
            this.gridPaises.GroupByCaption = "Drag a column header here to group by that column";
            this.gridPaises.Images.Add(((System.Drawing.Image)(resources.GetObject("gridPaises.Images"))));
            resources.ApplyResources(this.gridPaises, "gridPaises");
            this.gridPaises.MarqueeStyle = C1.Win.C1TrueDBGrid.MarqueeEnum.HighlightRow;
            this.gridPaises.MultiSelect = C1.Win.C1TrueDBGrid.MultiSelectEnum.None;
            this.gridPaises.Name = "gridPaises";
            this.gridPaises.PreviewInfo.AllowSizing = ((bool)(resources.GetObject("gridPaises.PreviewInfo.AllowSizing")));
            this.gridPaises.PreviewInfo.Caption = resources.GetString("gridPaises.PreviewInfo.Caption");
            this.gridPaises.PreviewInfo.Location = new System.Drawing.Point(0, 0);
            this.gridPaises.PreviewInfo.Size = new System.Drawing.Size(0, 0);
            this.gridPaises.PreviewInfo.ToolBars = ((bool)(resources.GetObject("gridPaises.PreviewInfo.ToolBars")));
            this.gridPaises.PreviewInfo.UIStrings.Content = ((string[])(resources.GetObject("gridPaises.PreviewInfo.UIStrings.Content")));
            this.gridPaises.PreviewInfo.ZoomFactor = 75D;
            this.gridPaises.PrintInfo.MaxRowHeight = ((int)(resources.GetObject("gridPaises.PrintInfo.MaxRowHeight")));
            this.gridPaises.PrintInfo.MeasurementDevice = C1.Win.C1TrueDBGrid.PrintInfo.MeasurementDeviceEnum.Screen;
            this.gridPaises.PrintInfo.MeasurementPrinterName = null;
            this.gridPaises.PrintInfo.OneFormPerPage = ((bool)(resources.GetObject("gridPaises.PrintInfo.OneFormPerPage")));
            this.gridPaises.PrintInfo.OwnerDrawPageFooter = ((bool)(resources.GetObject("gridPaises.PrintInfo.OwnerDrawPageFooter")));
            this.gridPaises.PrintInfo.OwnerDrawPageHeader = ((bool)(resources.GetObject("gridPaises.PrintInfo.OwnerDrawPageHeader")));
            this.gridPaises.PrintInfo.PageFooter = resources.GetString("gridPaises.PrintInfo.PageFooter");
            this.gridPaises.PrintInfo.PageFooterHeight = ((int)(resources.GetObject("gridPaises.PrintInfo.PageFooterHeight")));
            this.gridPaises.PrintInfo.PageHeader = resources.GetString("gridPaises.PrintInfo.PageHeader");
            this.gridPaises.PrintInfo.PageHeaderHeight = ((int)(resources.GetObject("gridPaises.PrintInfo.PageHeaderHeight")));
            this.gridPaises.PrintInfo.PrintHorizontalSplits = ((bool)(resources.GetObject("gridPaises.PrintInfo.PrintHorizontalSplits")));
            this.gridPaises.PrintInfo.ProgressCaption = resources.GetString("gridPaises.PrintInfo.ProgressCaption");
            this.gridPaises.PrintInfo.RepeatColumnFooters = ((bool)(resources.GetObject("gridPaises.PrintInfo.RepeatColumnFooters")));
            this.gridPaises.PrintInfo.RepeatColumnHeaders = ((bool)(resources.GetObject("gridPaises.PrintInfo.RepeatColumnHeaders")));
            this.gridPaises.PrintInfo.RepeatGridHeader = ((bool)(resources.GetObject("gridPaises.PrintInfo.RepeatGridHeader")));
            this.gridPaises.PrintInfo.RepeatSplitHeaders = ((bool)(resources.GetObject("gridPaises.PrintInfo.RepeatSplitHeaders")));
            this.gridPaises.PrintInfo.ShowOptionsDialog = ((bool)(resources.GetObject("gridPaises.PrintInfo.ShowOptionsDialog")));
            this.gridPaises.PrintInfo.ShowProgressForm = ((bool)(resources.GetObject("gridPaises.PrintInfo.ShowProgressForm")));
            this.gridPaises.PrintInfo.ShowSelection = ((bool)(resources.GetObject("gridPaises.PrintInfo.ShowSelection")));
            this.gridPaises.PrintInfo.UseGridColors = ((bool)(resources.GetObject("gridPaises.PrintInfo.UseGridColors")));
            this.gridPaises.RecordSelectors = false;
            this.gridPaises.RowHeight = 15;
            this.gridPaises.TabIndex = 0;
            this.gridPaises.UseCompatibleTextRendering = false;
            this.gridPaises.PropBag = resources.GetString("gridPaises.PropBag");
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
            this.chkActivos.TabIndex = 7;
            // 
            // txtNombre
            // 
            this.txtNombre.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            resources.ApplyResources(this.txtNombre, "txtNombre");
            this.txtNombre.Name = "txtNombre";
            this.txtNombre.TabIndex = 4;
            // 
            // lblNombre
            // 
            this.lblNombre.CausesValidation = false;
            resources.ApplyResources(this.lblNombre, "lblNombre");
            this.lblNombre.Name = "lblNombre";
            this.lblNombre.TabIndex = 3;
            // 
            // FrmPaises
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.CancelButton = this.btnCerrar;
            this.ClientSize = new System.Drawing.Size(492, 418);
            this.Controls.Add(this.xpGroupBox2);
            this.Controls.Add(this.xpGroupBoxFiltro);
            this.Controls.Add(this.btnSeleccionar);
            this.Controls.Add(this.btnCerrar);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            resources.ApplyResources(this, "$this");
            this.MinimumSize = new System.Drawing.Size(500, 300);
            this.Name = "FrmPaises";
            this.PalabraClaveAyuda = "D2H_Pa_ses_Consulados_ComunidadesAut_nomas_Provincias_MunicipiosyLocalidades_";
            this.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            this.xpGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.btnAnadir)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnEliminar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.btnModificar)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.gridPaises)).EndInit();
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
		private C1.Win.C1TrueDBGrid.C1TrueDBGrid gridPaises;
		private IASoft.Localization.LocalizationFilter localizationFilter1;
		private IASoft.XPControls.XpGroupBox xpGroupBoxFiltro;
		private System.Windows.Forms.TextBox txtNombre;
		private System.Windows.Forms.Label lblNombre;
		private CheckBox chkActivos;
		private System.ComponentModel.Container components = null;

	}
}
