/*global Ext, vardb */
Ext.define('Ext.ux.vardb.UniqueValuesCombo',
{
	extend: 'Ext.form.ComboBox',
	name: 'value',
	valueField: 'value',
	displayField: 'display',
	hideLabel: true,
	minChars: 0,
	typeAhead: true,
	typeAheadDelay: 500,
	queryDelay: 500,
	loadingText: 'Searching...',
	width: 250,
	listWidth: 300,
	emptyText: 'Value',
	resizable: true,
	//disabled: true,
		
	initComponent:function()
	{
		var store = new Ext.data.Store(
		{
			url: vardb.webapp+'/search/ajax/unique.json',
			reader: new Ext.data.JsonReader(
			{
				root: 'values',
				totalProperty: 'totalCount',
				idProperty: 'value'
			},
			[
				{name: 'value', mapping: 'value'},
				{name: 'numsequences', mapping: 'numsequences', type: 'int'},
				{name: 'display', mapping: 'display'}
			]),
			baseParams: {limit:100, field:'', query:''}
		});
	
		var config=
		{ 
			store: store
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	setField:function(field)
	{
		this.store.baseParams.field=field;
		this.store.reload();
		this.enable();
	}
});