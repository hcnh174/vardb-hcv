/*global Ext, vardb */
Ext.define('Ext.ux.vardb.search.Toolbar',
{
	extend: 'Ext.Toolbar',
	height: 25,

	initComponent:function()
	{
		var controller=this.controller;
		
		var config=
		{
			items:
			[
				'<a href="'+vardb.webapp+'/homepage.html" class="explorer-toolbar" target="_blank">varDB homepage</a>','-',
				'<a href="#" onclick="Ext.ux.vardb.Cart.quickCart()" class="explorer-toolbar">QuickCart</a>','-',
				'<a href="'+vardb.webapp+'/explorer.html" class="explorer-toolbar" target="_blank">Explorer</a>',
				'->',
				'<a href="'+vardb.webapp+'/user.html" class="explorer-toolbar" target="_blank">'+'User home'+'</a>'//this.controller.userdetails.name
			 ]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	}
});

