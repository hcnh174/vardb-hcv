/*global Ext, vardb */
Ext.define('Ext.ux.vardb.search.Search',
{
	extend: 'Ext.tab.Panel',
	title: 'Search',
	query: '',
	plain: true,
	activeTab: 0,
	width: 800,
	deferredRender: true,
	layoutOnTabChange: true,

	initComponent:function()
	{		
		var basic=new Ext.ux.vardb.search.BasicForm({query: this.query});
		var advanced=new Ext.ux.vardb.search.AdvancedForm({});
		var batchlookup=new Ext.ux.vardb.search.BatchLookupForm({});
		
		var config=
		{
			defaults: {autoHeight: true},
			items:
			[
				basic,
				advanced,
				batchlookup
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	}
});

Ext.ux.vardb.search.BasicForm = Ext.extend(Ext.form.FormPanel,
{
	title: 'Basic',
	collapsible: true,
	labelWidth: 80,
	autoWidth: true,
	border: true,
	frame: true,
	padding: 5,
	controlWidth: 200,

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
			width: 550,
			qtipText: 'Enter one or more keywords, optionally included a field prefix (e.g., disease=malaria)',
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
			anchor: '100%',
			items:
			[
				{
					layout: 'form',
					labelWidth: 40,
					bodyStyle: 'padding-right: '+this.padding+'px',
					items: [filterField]
				},
				{
					items: [submitButton]
				}
			]
		};
		
		var resetButton=
		{
			xtype: 'button',
			text: 'Reset',
			formBind: true,
			scope: this,
			handler: this.resetHandler
		};

		var descriptionField=
		{
			xtype: "box",
			autoEl:
			{
				tag: 'div',
				children:
				[{
					tag: 'div',
					style: 'margin:0 0 10px 0',
					html: 'Enter one or more keywords, optionally including a field prefix (e.g., disease=malaria).'
				}]
			}
		};
		
		var config=
		{ 
			initialConfig: {standardSubmit: true},
			items:
			[
				descriptionField,
				queryfieldset
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	submitHandler:function()
	{
		this.getForm().getEl().dom.action=vardb.webapp+'/search/sequences.html';
		this.getForm().getEl().dom.method='post';
		this.getForm().submit();
		return;
	}
});

Ext.define('Ext.ux.vardb.search.AdvancedForm',
{
	extend: 'Ext.form.FormPanel',
	title: 'Advanced',
	autoWidth: true,
	autoHeight: true,
	frame: true,
	padding: 5,
	numconditions: 1,

	initComponent:function()
	{
		var self=this;
		this.numrows=0;		

		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			formBind: true,
			scope: this,
			handler: this.submitHandler
		};
		
		var addConditionButton=
		{
			xtype: 'button',
			text: 'Add condition',
			style: 'margin-right: '+this.padding+'px',
			formBind: true,
			scope: this,
			handler: this.addCondition
		};

		var filterField=
		{
			xtype: 'textfield',
			fieldLabel: 'Query',			
			name: 'query',
			value: this.query,
			width: 600,
			qtipText: 'Enter one or more keywords, optionally included a field prefix (e.g., disease=malaria)',
			listeners:
			{
				specialkey: function(field,e)
				{
					if (e.getKey()===e.ENTER)
						{self.submitHandler();}
				}
			}
		};
		
		var resetButton=
		{
			xtype: 'button',
			text: 'Reset',
			formBind: true,
			scope: this,
			handler: this.resetHandler
		};

		var descriptionField=
		{
			xtype: "box",
			autoEl:
			{
				tag: 'div',
				children:
				[{
					tag: 'div',
					style: 'margin:0 0 10px 0',
					html: 'Select a field, operator, and value to add a term, or click "Add condition" to add another condition.'
				}]
			}
		};
		
		var hiddenField=
		{
			xtype: 'hidden',
			name: 'query'
		};
		
		var fieldset=new Ext.form.FieldSet(
		{
			title: 'Conditions',
			collapsible: true,
			items: []
		});
		
		var config=
		{ 
			initialConfig: {standardSubmit: true},
			items:
			[
				hiddenField,
				descriptionField,
				fieldset,
				{
					layout: 'column',
					items: [addConditionButton,submitButton]
				}				
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
		this.fieldset=fieldset;
		
		var items=[], index;
		for (index=0;index<this.numconditions;index++)
		{
			this.addRow();
		}
		this.doLayout();
	},
	
	submitHandler:function()
	{
		var conditions=[];
		var rownum, field, operator, value;		
		for (rownum=1;rownum<=this.numrows;rownum++)
		{
			field=this.getForm().findField('field'+rownum).getValue().trim();
			operator=this.getForm().findField('operator'+rownum).getValue();
			value=this.getForm().findField('value'+rownum).getValue().trim();
			if (field==='' || value==='')
				{continue;}
			if (value.indexOf(' ')!==-1)
				{value='"'+value+'"';}
			conditions.push(field+operator+value);
		}
		if (conditions.length===0)
		{
			Ext.MessageBox.alert('Alert','Please select a field and value for one or more conditions');
			return;
		}
		var query=conditions.join(' AND ');
		//alert(query);
		this.getForm().findField('query').setValue(query);		
		this.getForm().getEl().dom.action=vardb.webapp+'/search/sequences.html';
		this.getForm().getEl().dom.method='post';
		this.getForm().submit();
		return;
	},
	
	addCondition:function()
	{
		this.addRow();
		this.doLayout();
	},
	
	addRow:function()
	{
		this.numrows++;
		var fieldCombo=new Ext.ux.vardb.FieldCombo({name: 'field'+this.numrows, fieldLabel: 'Condition '+this.numrows});
		var valueCombo=new Ext.ux.vardb.UniqueValuesCombo({name: 'value'+this.numrows});
		
		fieldCombo.on('select',function(field,record,index)
		{
			valueCombo.setField(record.data.value);
		});
		
		var operatorField=new Ext.ux.vardb.SelectList(
		{
			data: [['=','='],['!=','!=']],
			name: 'operator'+this.numrows,
			hideLabel: true,
			value: '=',
			width: 35
		});
		
		var row=
		{
			xtype: 'panel',
			layout: 'column',
			items:
			[
				{
					layout: 'form',
					labelWidth: 70,
					bodyStyle: 'padding-right: '+this.padding+'px',
					items: fieldCombo
				},
				{
					bodyStyle: 'padding-right: '+this.padding+'px',
					items: operatorField							
				},
				{
					layout: 'form',
					items: valueCombo
				}
			]
		};
		this.fieldset.add(row);
	}
});

Ext.define('Ext.ux.vardb.search.BatchLookupForm',
{
	extend: 'Ext.form.FormPanel',
	title: 'Batch lookup',
	collapsible: true,
	labelWidth: 80,
	autoWidth: true,
	border: true,
	frame: true,
	padding: 5,
	//hideMode: 'offsets',

	initComponent:function()
	{
		var self=this;
		var accessionsField=
		{
			xtype: 'textarea',
			fieldLabel: 'Accessions',
			name: 'accessions',
			width: 400,
			height: 200,
			allowBlank: false
		};
		
		var submitButton=
		{
			xtype: 'button',
			text: 'Submit',
			formBind: true,
			scope: this,
			handler: this.submitHandler
		};
		
		var columnset=
		{
			layout: 'column',
			anchor: '100%',
			items:
			[
				{
					layout: 'form',
					labelWidth: 40,
					bodyStyle: 'padding-right: '+this.padding+'px',
					items: [accessionsField]
				},
				{
					items: [submitButton]
				}
			]
		};

		var descriptionField=
		{
			xtype: "box",
			autoEl:
			{
				tag: 'div',
				children:
				[{
					tag: 'div',
					style: 'margin:0 0 10px 0',
					html: 'Search for a list of accessions. Enter one per line'
				}]
			}
		};
		
		var config=
		{
			labelAlign: 'top',
			bodyStyle: 'padding: 5px 5px 0',
			defaults: {labelWidth: 70},
			initialConfig: {standardSubmit: true},
			items:
			[
				descriptionField,
				columnset
			]
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	submitHandler:function()
	{
		this.getForm().getEl().dom.action=vardb.webapp+'/search/batchlookup.html';
		this.getForm().getEl().dom.method='post';
		this.getForm().submit();
		return;
	}
});