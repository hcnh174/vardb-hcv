/*global Ext, nelson */
(nelson.hdb.patients.ColumnBuilder=function()
{	
return {
		
	//r: nelson.hdb.patients.Renderer,
	//t: nelson.hdb.patients.Constants.tooltips,
	
	createColumn:function(defaults,overrides)
	{
		overrides=overrides || {};
		// apply basic defaults
		Ext.applyIf(defaults,
		{
			sortable: true,
			header: defaults.dataIndex
			//hidden: true
		});
		// apply any overrides
		Ext.applyIf(defaults, overrides);
		return defaults;
	},
	
	createBooleanColumn:function(defaults,overrides)
	{
		Ext.applyIf(defaults,
		{
			xtype: 'booleancolumn',
			trueText: '有',
			falseText: '',
			width: 50			
		});
		return this.createColumn(defaults,overrides);
	},
	
	patientIdColumn:function(overrides)
	{
		return this.createColumn({width: 80, dataIndex: '患者No', hidden: false}, overrides); 
	},
	patientNameColumn:function(overrides)
	{
		return this.createColumn({width: 80, dataIndex: '氏名', hidden: false}, overrides);
	},
	patientFuriganaColumn:function(overrides)
	{
		return this.createColumn({width: 80, dataIndex: '氏名カナ', hidden: false}, overrides);
	},
	patientBirthdateColumn:function(overrides)
	{
		return this.createColumn({xtype: 'datecolumn', width: 80, dataIndex: '生年月日', hidden: false, format: 'm/d/Y'}, overrides);
	},
	patientSexColumn:function(overrides)
	{
		return this.createColumn({width: 80, dataIndex: '性別', hidden: false}, overrides);
	},
	patientMaidenColumn:function(overrides)
	{
		return this.createColumn({width: 80, dataIndex: '旧姓', hidden: false}, overrides);
	}
};
}());