/*global Ext, nelson, hdb */
nelson.hdb.patients.Toolbar = Ext.extend(Ext.Toolbar,
{
	height: 25,

	initComponent:function()
	{
		var config=
		{
			items:
			[
				'<a href="'+hdb.webapp+'/homepage.html" class="explorer-toolbar">Homepage</a>','-',
				'->',
				'<a href="'+hdb.webapp+'/logout.html" class="explorer-toolbar">'+'Logout'+'</a>'
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.hdb.patients.Toolbar.superclass.initComponent.apply(this, arguments);
	}
});

