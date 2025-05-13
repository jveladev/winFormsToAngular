using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Collections;

namespace IPublica.IU.Win.Gen.General
{
	public partial class FrmProvincias
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmProvincias));
            this.xpGroupBox2 = new IASoft.XPControls.XpGroupBox();
            this.btnAnadir = new IASoft.XPControls.XpButton();
            this.btnEliminar = new IASoft.XPControls.XpButton();
            this.btnModificar = new IASoft.XPControls.XpButton();
            this.gridProvincias = new C1.Win.C1TrueDBGrid.C1TrueDBGrid();
            this.btnCerrar = new IASoft.XPControls.XpButton();
            this.btnSeleccionar = new IASoft.XPControls.XpButton();
            this.localizationFilter1 = new IASoft.Localization.LocalizationFilter();
            this.xpGroupBoxFiltro = new IASoft.XPControls.XpGroupBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.xpGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gridProvincias)).BeginInit();
            this.xpGroupBoxFiltro.SuspendLayout();
            this.SuspendLayout();
            // 
            // xpGroupBox2
            // 
            this.xpGroupBox2.Controls.Add(this.btnAnadir);
            this.xpGroupBox2.Controls.Add(this.btnEliminar);
            this.xpGroupBox2.Controls.Add(this.btnModificar);
            this.xpGroupBox2.Controls.Add(this.gridProvincias);
            this.xpGroupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            resources.ApplyResources(this.xpGroupBox2, "xpGroupBox2");
            this.xpGroupBox2.Name = "xpGroupBox2";
            this.xpGroupBox2.TabIndex = 1;
            this.xpGroupBox2.TabStop = false;
            this.xpGroupBox2.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            // 
            // btnAnadir
            // 
            this.btnAnadir.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnAnadir.ForeColor = System.Drawing.Color.Black;
            resources.ApplyResources(this.btnAnadir, "btnAnadir");
            this.btnAnadir.Name = "btnAnadir";
            this.btnAnadir.TabIndex = 1;
            this.btnAnadir.Click += new System.EventHandler(this.btnAnadir_Click);
            // 
            // btnEliminar
            // 
            this.btnEliminar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnEliminar.ForeColor = System.Drawing.Color.Black;
            resources.ApplyResources(this.btnEliminar, "btnEliminar");
            this.btnEliminar.Name = "btnEliminar";
            this.btnEliminar.TabIndex = 2;
            this.btnEliminar.Click += new System.EventHandler(this.btnEliminar_Click);
            // 
            // btnModificar
            // 
            this.btnModificar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnModificar.ForeColor = System.Drawing.Color.Black;
            resources.ApplyResources(this.btnModificar, "btnModificar");
            this.btnModificar.Name = "btnModificar";
            this.btnModificar.TabIndex = 3;
            this.btnModificar.Click += new System.EventHandler(this.btnModificar_Click);
            // 
            // gridProvincias
            // 
            this.gridProvincias.AllowDelete = true;
            this.gridProvincias.AllowFilter = false;
            this.gridProvincias.AllowRowSizing = C1.Win.C1TrueDBGrid.RowSizingEnum.IndividualRows;
            this.gridProvincias.AllowUpdate = false;
            this.gridProvincias.AlternatingRows = true;
            this.gridProvincias.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
                        | System.Windows.Forms.AnchorStyles.Left)
                        | System.Windows.Forms.AnchorStyles.Right)));
            this.gridProvincias.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.gridProvincias.CaptionHeight = 17;
            this.gridProvincias.ExtendRightColumn = true;
            this.gridProvincias.ForeColor = System.Drawing.Color.Black;
            this.gridProvincias.GroupByCaption = "Drag a column header here to group by that column";
            this.gridProvincias.Images.Add(((System.Drawing.Image)(resources.GetObject("gridProvincias.Images"))));
            resources.ApplyResources(this.gridProvincias, "gridProvincias");
            this.gridProvincias.MarqueeStyle = C1.Win.C1TrueDBGrid.MarqueeEnum.HighlightRow;
            this.gridProvincias.MultiSelect = C1.Win.C1TrueDBGrid.MultiSelectEnum.None;
            this.gridProvincias.Name = "gridProvincias";
            this.gridProvincias.PreviewInfo.Location = ((System.Drawing.Point)(resources.GetObject("gridProvincias.PreviewInfo.Location")));
            this.gridProvincias.PreviewInfo.Size = ((System.Drawing.Size)(resources.GetObject("gridProvincias.PreviewInfo.Size")));
            this.gridProvincias.PreviewInfo.ZoomFactor = ((double)(resources.GetObject("gridProvincias.PreviewInfo.ZoomFactor")));
            this.gridProvincias.PrintInfo.PageSettings = ((System.Drawing.Printing.PageSettings)(resources.GetObject("gridProvincias.PrintInfo.PageSettings")));
            this.gridProvincias.RecordSelectors = false;
            this.gridProvincias.RowHeight = 15;
            this.gridProvincias.TabIndex = 0;
            // 
            // btnCerrar
            // 
            this.btnCerrar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCerrar.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            resources.ApplyResources(this.btnCerrar, "btnCerrar");
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.TabIndex = 3;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // btnSeleccionar
            // 
            this.btnSeleccionar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSeleccionar.DialogResult = System.Windows.Forms.DialogResult.OK;
            resources.ApplyResources(this.btnSeleccionar, "btnSeleccionar");
            this.btnSeleccionar.Name = "btnSeleccionar";
            this.btnSeleccionar.TabIndex = 2;
            this.btnSeleccionar.Visible = false;
            this.btnSeleccionar.Click += new System.EventHandler(this.btnSeleccionar_Click);
            // 
            // xpGroupBoxFiltro
            // 
            this.xpGroupBoxFiltro.Controls.Add(this.txtNombre);
            this.xpGroupBoxFiltro.Controls.Add(this.lblNombre);
            this.xpGroupBoxFiltro.Dock = System.Windows.Forms.DockStyle.Top;
            resources.ApplyResources(this.xpGroupBoxFiltro, "xpGroupBoxFiltro");
            this.xpGroupBoxFiltro.Name = "xpGroupBoxFiltro";
            this.xpGroupBoxFiltro.TabIndex = 0;
            this.xpGroupBoxFiltro.TabStop = false;
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
            // FrmProvincias
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.CancelButton = this.btnCerrar;
            this.ClientSize = new System.Drawing.Size(492, 438);
            this.Controls.Add(this.xpGroupBox2);
            this.Controls.Add(this.xpGroupBoxFiltro);
            this.Controls.Add(this.btnSeleccionar);
            this.Controls.Add(this.btnCerrar);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MinimumSize = new System.Drawing.Size(500, 300);
            this.Name = "FrmProvincias";
            this.Padding = new System.Windows.Forms.Padding(14, 12, 14, 44);
            this.PalabraClaveAyuda = "D2H_Pa_ses_Consulados_ComunidadesAut_nomas_Provincias_MunicipiosyLocalidades_";
            this.RightToLeft = System.Windows.Forms.RightToLeft.No;
            resources.ApplyResources(this, "$this");
            this.xpGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.gridProvincias)).EndInit();
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
		private C1.Win.C1TrueDBGrid.C1TrueDBGrid gridProvincias;
		private IASoft.Localization.LocalizationFilter localizationFilter1;
		private IASoft.XPControls.XpGroupBox xpGroupBoxFiltro;
		private System.Windows.Forms.TextBox txtNombre;
		private System.Windows.Forms.Label lblNombre;
		private System.ComponentModel.Container components = null;

	}
}
