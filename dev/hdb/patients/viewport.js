/*global Ext, nelson, hdb, alert */
nelson.hdb.patients.Viewport=Ext.extend(Ext.Viewport,
{
	title: 'Results',
	frame: true,
	autoWidth: true,
	layout: 'border',	

	initComponent:function()
	{		
		var grid=new nelson.hdb.patients.Grid(
		{
			counts: this.counts,
			attributes: this.attributes,
			region: 'center'
		});
		
		var queryform=new nelson.hdb.patients.QueryForm(
		{
			query: this.query,
			onSubmit: function(query)
			{
				grid.store.baseParams.query=query;
				grid.store.reload();
			}
		});
		
		var filterform=new nelson.hdb.patients.FilterForm(
		{
			counts: this.counts,
			region: 'east',
			collapsible: true,
			width: 220,			
			onFilter: function(filter)
			{
				alert(filter);
				grid.store.baseParams.filter=filter;
				grid.store.reload();
			}
		});
		
		var header=
		{
			xtype: 'panel',
			region: 'north',
			height: 100,//58,//100,
			items:
			[
				{html: '<div id="explorer-header"><h1>Hepatitis patients</h1></div>', height: 30, border: false},
				new nelson.hdb.patients.Toolbar(),
				queryform
			]
		};
		
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
		nelson.hdb.patients.Viewport.superclass.initComponent.apply(this, arguments);
	}		
});
