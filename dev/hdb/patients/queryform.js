/*global Ext, nelson, hdb */
nelson.hdb.patients.QueryForm = Ext.extend(Ext.form.FormPanel,
{
	collapsible: false,
	labelWidth: 80,
	autoWidth: true,
	border: true,
	frame: true,
	padding: 5,
	query: '',

	initComponent:function()
	{
		var self=this;
		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			width: 100,
			formBind: true,
			scope: this,
			handler: this.submitHandler
		};
	
		var filterField=
		{
			xtype: 'textfield',
			//fieldLabel: '<span qtip="query text">Query</span>',
			labelWidth: 40,
			name: 'query',
			value: this.query,
			//width: 650,
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
			xtype: 'compositefield',
			fieldLabel: 'Query',
			labelWidth: 40,
			defaults: {flex: 1},
			items: [filterField, submitButton]
		};
		
		var config=
		{
			items:[queryfieldset]
		};
			
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.hdb.patients.QueryForm.superclass.initComponent.apply(this, arguments);
	},
	
	submitHandler:function()
	{
		var query=this.getForm().findField('query').getValue();
		if (this.onSubmit)
			{this.onSubmit(query);}
	}
});