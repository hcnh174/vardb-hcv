/*global Ext, vardb */
Ext.define('Ext.ux.vardb.search.QueryForm',
{
	extend: 'Ext.form.FormPanel',
	collapsible: true,
	labelWidth: 80,
	//autoWidth: true,
	//height: 72,
	//autoHeight: true,
	border: true,
	frame: true,
	padding: 5,
	
	initComponent:function()
	{
		var self=this;
		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			formBind: true,
			scope: this,
			handler: this.submitHandler
		};

		var filterField=
		{
			xtype: 'textfield',
			fieldLabel: 'Query',			
			name: 'query',
			value: this.query,
			width: 650,
			listeners:
			{
				specialkey: function(field,e)
				{
					if (e.getKey()===e.ENTER)
						{self.submitHandler();}
				}
			}
		};
		
		var queryfieldset=
		{
			layout: 'column',
			//anchor: '100%',
			//height: 46,
			items:
			[
				{
					layout: 'form',
					labelWidth: 40,
					bodyStyle: 'padding-right: '+this.padding+'px',
					items: [filterField]
				},
				{
					layout: 'form',
					items: [submitButton]
				}
			]
		};
		
		var config=
		{ 
			initialConfig: {standardSubmit: true},
			items: [queryfieldset]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	submitHandler:function()
	{
		this.getForm().getEl().dom.action=vardb.webapp+'/search/sequences.html';
		this.getForm().getEl().dom.method='post';
		this.getForm().submit();
	}
});