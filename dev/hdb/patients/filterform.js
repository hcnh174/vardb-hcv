/*global Ext, nelson, hdb */
nelson.hdb.patients.FilterForm = Ext.extend(nelson.hdb.patients.AbstractFilterForm,
{
	title: 'Filter',
	labelAlign: 'top',
	autoScroll: true,
	
	initComponent:function()
	{
		var self=this;	
		var controls=this.createControls(this.counts);
		var config=
		{ 
			initialConfig: {standardSubmit: true},
			items: controls
		};
			
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.hdb.patients.FilterForm.superclass.initComponent.apply(this, arguments);
	},

	createControls:function()
	{
		var controls=nelson.hdb.patients.FilterForm.superclass.createControls.apply(this, arguments);
		
		function addControl(control)
		{
			if (control)
				{controls.push(control);}
		}
		
		addControl(this.createMultiSelect('genotype','Genotypes',this.getCountData('Genotype')));
		addControl(this.createMultiSelect('性別','性別',this.getCountData('性別')));
		addControl(this.createMultiSelect('病院','病院',this.getCountData('病院')));
		addControl(this.createMultiSelect('医師','医師',this.getCountData('医師')));
		addControl(this.createDateControl('投与開始日','投与開始日'));
		addControl(this.createDateControl('投与終了日','投与終了日'));

		return controls;
	},
	
	createFilter:function()
	{
		var list=[];
		this.createMultiFilter(list,'genotype');
		this.createMultiFilter(list,'性別');
		this.createMultiFilter(list,'病院');
		this.createMultiFilter(list,'医師');
		this.createTreatmentDateFilter(list);
		var filter=list.join(' AND ');
		return filter;
	},
	
	createTreatmentDateFilter:function(list)
	{
		var date, dateformat='Ymd';
		var startdatefield=this.getForm().findField('投与開始日');
		if (startdatefield && startdatefield.getValue()!=='')
		{
			date=startdatefield.getValue();
			this.addFilter(list,'after="'+date.format(dateformat)+'"');
		}
		var enddatefield=this.getForm().findField('投与終了日');
		if (enddatefield && enddatefield.getValue()!=='')
		{
			date=enddatefield.getValue();
			this.addFilter(list,'before="'+date.format(dateformat)+'"');
		}
	}
});
