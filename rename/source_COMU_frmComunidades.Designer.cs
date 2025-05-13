using System;
using System.Windows.Forms;
using System.Drawing;
using System.ComponentModel;
using System.Collections;

namespace IPublica.IU.Win.Gen.General
{
	public partial class FrmComunidades
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmComunidades));
            this.xpGroupBox2 = new IASoft.XPControls.XpGroupBox();
            this.btnAnadir = new IASoft.XPControls.XpButton();
            this.btnEliminar = new IASoft.XPControls.XpButton();
            this.btnModificar = new IASoft.XPControls.XpButton();
            this.gridComunidades = new C1.Win.C1TrueDBGrid.C1TrueDBGrid();
            this.btnCerrar = new IASoft.XPControls.XpButton();
            this.btnSeleccionar = new IASoft.XPControls.XpButton();
            this.localizationFilter1 = new IASoft.Localization.LocalizationFilter();
            this.xpGroupBoxFiltro = new IASoft.XPControls.XpGroupBox();
            this.txtNombre = new System.Windows.Forms.TextBox();
            this.lblNombre = new System.Windows.Forms.Label();
            this.xpGroupBox2.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gridComunidades)).BeginInit();
            this.xpGroupBoxFiltro.SuspendLayout();
            this.SuspendLayout();
            // 
            // xpGroupBox2
            // 
            this.xpGroupBox2.Controls.Add(this.btnAnadir);
            this.xpGroupBox2.Controls.Add(this.btnEliminar);
            this.xpGroupBox2.Controls.Add(this.btnModificar);
            this.xpGroupBox2.Controls.Add(this.gridComunidades);
            this.xpGroupBox2.Dock = System.Windows.Forms.DockStyle.Fill;
            resources.ApplyResources(this.xpGroupBox2, "xpGroupBox2");
            this.xpGroupBox2.Name = "xpGroupBox2";
            this.xpGroupBox2.TabIndex = 0;
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
            // gridComunidades
            // 
            this.gridComunidades.AllowDelete = true;
            this.gridComunidades.AllowFilter = false;
            this.gridComunidades.AllowRowSizing = C1.Win.C1TrueDBGrid.RowSizingEnum.IndividualRows;
            this.gridComunidades.AllowUpdate = false;
            this.gridComunidades.AlternatingRows = true;
            this.gridComunidades.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)
                        | System.Windows.Forms.AnchorStyles.Left)
                        | System.Windows.Forms.AnchorStyles.Right)));
            this.gridComunidades.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.gridComunidades.CaptionHeight = 17;
            this.gridComunidades.ExtendRightColumn = true;
            this.gridComunidades.ForeColor = System.Drawing.Color.Black;
            this.gridComunidades.GroupByCaption = "Drag a column header here to group by that column";
            this.gridComunidades.Images.Add(((System.Drawing.Image)(resources.GetObject("gridComunidades.Images"))));
            resources.ApplyResources(this.gridComunidades, "gridComunidades");
            this.gridComunidades.MarqueeStyle = C1.Win.C1TrueDBGrid.MarqueeEnum.HighlightRow;
            this.gridComunidades.MultiSelect = C1.Win.C1TrueDBGrid.MultiSelectEnum.None;
            this.gridComunidades.Name = "gridComunidades";
            this.gridComunidades.PreviewInfo.Location = ((System.Drawing.Point)(resources.GetObject("gridComunidades.PreviewInfo.Location")));
            this.gridComunidades.PreviewInfo.Size = ((System.Drawing.Size)(resources.GetObject("gridComunidades.PreviewInfo.Size")));
            this.gridComunidades.PreviewInfo.ZoomFactor = ((double)(resources.GetObject("gridComunidades.PreviewInfo.ZoomFactor")));
            this.gridComunidades.PrintInfo.PageSettings = ((System.Drawing.Printing.PageSettings)(resources.GetObject("gridComunidades.PrintInfo.PageSettings")));
            this.gridComunidades.RecordSelectors = false;
            this.gridComunidades.RowHeight = 15;
            this.gridComunidades.TabIndex = 0;
            // 
            // btnCerrar
            // 
            this.btnCerrar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCerrar.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            resources.ApplyResources(this.btnCerrar, "btnCerrar");
            this.btnCerrar.Name = "btnCerrar";
            this.btnCerrar.TabIndex = 2;
            this.btnCerrar.Click += new System.EventHandler(this.btnCerrar_Click);
            // 
            // btnSeleccionar
            // 
            this.btnSeleccionar.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSeleccionar.DialogResult = System.Windows.Forms.DialogResult.OK;
            resources.ApplyResources(this.btnSeleccionar, "btnSeleccionar");
            this.btnSeleccionar.Name = "btnSeleccionar";
            this.btnSeleccionar.TabIndex = 1;
            this.btnSeleccionar.Visible = false;
            // 
            // xpGroupBoxFiltro
            // 
            this.xpGroupBoxFiltro.Controls.Add(this.txtNombre);
            this.xpGroupBoxFiltro.Controls.Add(this.lblNombre);
            this.xpGroupBoxFiltro.Dock = System.Windows.Forms.DockStyle.Top;
            resources.ApplyResources(this.xpGroupBoxFiltro, "xpGroupBoxFiltro");
            this.xpGroupBoxFiltro.Name = "xpGroupBoxFiltro";
            this.xpGroupBoxFiltro.TabIndex = 4;
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
            // FrmComunidades
            // 
            this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
            this.CancelButton = this.btnCerrar;
            this.ClientSize = new System.Drawing.Size(492, 373);
            this.Controls.Add(this.xpGroupBox2);
            this.Controls.Add(this.btnSeleccionar);
            this.Controls.Add(this.btnCerrar);
            this.Controls.Add(this.xpGroupBoxFiltro);
            this.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MinimumSize = new System.Drawing.Size(500, 300);
            this.Name = "FrmComunidades";
            this.Padding = new System.Windows.Forms.Padding(14, 12, 14, 44);
            this.PalabraClaveAyuda = "D2H_Pa_ses_Consulados_ComunidadesAut_nomas_Provincias_MunicipiosyLocalidades_";
            this.RightToLeft = System.Windows.Forms.RightToLeft.No;
            resources.ApplyResources(this, "$this");
            this.Enter += new System.EventHandler(this.xpGroupBox2_Enter);
            this.xpGroupBox2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.gridComunidades)).EndInit();
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
		private C1.Win.C1TrueDBGrid.C1TrueDBGrid gridComunidades;
		private IASoft.Localization.LocalizationFilter localizationFilter1;
		private IASoft.XPControls.XpGroupBox xpGroupBoxFiltro;
		private System.Windows.Forms.TextBox txtNombre;
		private System.Windows.Forms.Label lblNombre;
		private System.ComponentModel.Container components = null;

	}
}
