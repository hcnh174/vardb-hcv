/*global Ext */
Ext.define('hcv.view.BrowseByCategory',
{
	extend: 'Ext.form.FormPanel',
	labelWidth: 100,
	frame: false,
	title: 'Browse by category',
	bodyStyle: 'padding:5px 5px 0',
	width: '95%',
	iconCls: 'icon-chart_organisation',
	
	initComponent:function()
	{	
		this.ntsequenceCount = new Ext.toolbar.TextItem('DNA sequences: '+this.data.statistics.ntsequences);
		this.aasequenceCount = new Ext.toolbar.TextItem('Protein sequences: '+this.data.statistics.aasequences);
	
		/*
		var statusbar=new Ext.Toolbar({
			items:
			[
				'->',
				this.ntsequenceCount,
				' ',
				this.aasequenceCount
			 ]
		});
		*/
		var config=
		{
			defaults: {width: 350},
			dockedItems:
			[
				{
			        xtype: 'toolbar',
			        dock: 'bottom',
			        items:
			        [
						[
							'->',
							this.ntsequenceCount,
							' ',
							this.aasequenceCount
						]
			        ]
			    }
			],
			//bbar: statusbar,
			items:
			[
				this.comboList(this.data.families,'Gene families','family'),
				this.comboList(this.data.pathogens,'Pathogens','pathogen'),
				this.comboList(this.data.diseases,'Diseases','disease')
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
		
		this.on('afterrender',function()
		{
			this.ntsequenceCount.addClass('custom-status-text-panel');
			this.aasequenceCount.addClass('custom-status-text-panel');
		},this);
	},
	
	comboList:function(data, fieldLabel, type)
	{
		Ext.define('Category', {
		    extend: 'Ext.data.Model',
		    fields: [
				{type: 'string', name: 'identifier'},
				{type: 'string', name: 'name'}
		    ]
		});
		
		// The data store holding the states
		var store = new Ext.data.Store({
		    model: 'Category',
		    data: data
		});
		
		// Simple ComboBox using the data store
		var combo = new Ext.form.ComboBox({
		    valueField: 'identifier',
			displayField: 'name',
			width: 500,
			labelWidth: 100,
		    fieldLabel: fieldLabel,
		    emptyText: (data.length-1)+' '+fieldLabel.toLowerCase(),
		    store: store,
		    queryMode: 'local',
		    typeAhead: true,
		    onSelect: function(record)
			{
				if (type==='family')
				{
					if (record.data.identifier==='families')
						{utils.gotoUrl('/families.html');}
					else {utils.gotoUrl('/families/'+record.data.identifier+'.html');}
				}
				else if (type==='pathogen')
				{
					if (record.data.identifier==='pathogens')
						{utils.gotoUrl('/pathogens.html');}	
					else {utils.gotoUrl('/pathogens/'+record.data.identifier+'.html');}
				}
				else if (type==='disease')
				{
					if (record.data.identifier==='diseases')
						{utils.gotoUrl('/diseases.html');}	
					else{utils.gotoUrl('/diseases/'+record.data.identifier+'.html');}
				}
			}
		});
		return combo;
	}	
});
