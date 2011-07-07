/*global Ext, vardb */
Ext.define('Ext.ux.vardb.search.Grid',
{
	extend: 'Ext.ux.vardb.LiveSequenceGrid',
	region: 'center',
	layout: 'fit',
	stripeRows: true,	
	bufferSize: 90, //90
	nearLimit: 30, // 30
	
	initComponent:function()
	{		
		this.toolbaritems=
		[
			'<b>Search results</b>','-',
			this.createCartMenu(),'-',
			this.createTagMenu(),'-',
			this.createDownloadMenu(),'-',
			this.createSummaryMenu(),'-',
			this.createSortMenu(),'-'
		];
		
		var config=
		{
		};		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	}
});
