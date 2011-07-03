/*global Ext, vardb */
Ext.define('Ext.ux.vardb.search.Results',
{
	extend: 'Ext.Viewport',
	title: 'Results',
	frame: true,
	autoWidth: true,
	//height: 800,
	layout: 'border',	

	initComponent:function()
	{
		var queryform=new Ext.ux.vardb.search.QueryForm({query: this.query});

		var header=
		{
			xtype: 'panel',
			region: 'north',
			height: 128, //100,//55, //30
			items:
			[
				{html: '<div id="explorer-header"><h1>varDB Search Results</h1></div>', height: 30, border: false},
				new Ext.ux.vardb.search.Toolbar(),
				queryform
			]
		};
		
		var grid=new Ext.ux.vardb.search.Grid(
		{
			list_id: this.list_id,
			pagesize: this.pagesize,
			counts: this.counts,
			region: 'center'
		});
		
		var filterform=new Ext.ux.vardb.FilterForm(
		{
			list_id: this.list_id,
			counts: this.counts,
			region: 'west',
			collapsible: true,
			width: 220,			
			onFilter: function(filter)
			{
				grid.store.baseParams.filter=filter;
				grid.store.reload();
			}
		});
		
		var config=
		{
			defaults: {split: true},
			items:
			[
				header,
				filterform,
				grid
			]
		};
			
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	}
});
