/*global Ext, hcv */
Ext.define('hcv.popups.TermPopup',
{
	extend: 'Ext.window.Window',
	layout: 'fit',
	width: 400,
	height: 250,
	plain: true,
	title: 'Definition',
	
	initComponent:function()
	{
		var self=this;
		var config=
		{
			items: Ext.create('Ext.tab.Panel',
			{
				activeTab: 0,
				deferredRender: false,
				border: false,
				items:
				[
					{
						title: this.term.term,
						html: this.term.definition,
						autoScroll: true
					}
				]
			}),
			buttons:
			[
				{
					text: 'Close',
					handler: function(){self.hide();}
				}
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		hcv.popups.TermPopup.superclass.initComponent.apply(this, arguments);
		this.show();
	}
});
