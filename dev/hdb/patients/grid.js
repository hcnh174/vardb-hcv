/*global Ext, nelson, hdb, utils, HdbDirect, alert */
nelson.hdb.patients.Grid = Ext.extend(nelson.extjs.Grid,
{
	stripeRows: true,
	loadMask: true,
	loaded: false,
	pagesize: 20,
	
	initComponent:function()
	{	
		var self=this;

		var reader=new Ext.data.JsonReader();
		
		var store = new Ext.data.JsonStore(
		{
			url: hdb.webapp+'/patients.json',
			remoteSort: true,
			reader: reader,
			sortInfo: {field: 'dbno', direction: 'ASC'},
			baseParams: {query: '', filter: '', columns: 'patient:DBno,patient:性別'}
		});
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});

		var tbar=new Ext.PagingToolbar(
		{
			plugins:
			[
				new Ext.ux.Andrie.pPageSize({variations: [5,10,20,30,50,100]})
				//new Ext.ux.SlidingPager() //new Ext.ux.ProgressBarPager()
			],
			pageSize: this.pagesize,
			//prependButtons: true,
			store: store,
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: 'No items to display',
			items:
			[
				'-',
				this.createSelectMenu(),
				this.createPatientMenu(),
				this.createSortMenu(),
				this.createTagMenu(),
				this.createSelectColumnsMenu()
			]
		});	
		
		var r=nelson.hdb.patients.Renderer;
		var columns=
		[
			sm,
			{header: 'Patient', width: 100, sortable: true, dataIndex: 'tag_identifier'}
		];
		
		var config=
		{
			viewConfig: {forceFit:true},
			sm: sm,
			store: store,
			columns: columns,
			tbar: tbar
		};
		store.load({params: {start: 0, limit: this.pagesize}});	
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		nelson.hdb.patients.Grid.superclass.initComponent.apply(this, arguments);
		
		//store.on('load', function(){});		

		store.on('metachange', function(store, meta)
		{
			//alert('on metachange');
			
			var columns=
			[
				sm,
				{header: 'Patient', width: 100, sortable: true, dataIndex: 'tag_identifier'}
			];
		
			var index, field;
			for (index=0;index<meta.fields.length;index++)
			{
				field=meta.fields[index];
				columns.push({header: field.name, sortable: true, dataIndex: field.name, tooltip: field.description});
			}
			self.getColumnModel().setConfig(columns);
			//self.getView().refresh();
		});
		
		/*
		store.on('metachange', function(store, meta)
		{
			//alert('on metachange');
			var index, field;
			//if (!self.loaded)
			{
				for (index=0;index<meta.fields.length;index++)
				{
					field=meta.fields[index];
					self.addColumn({header: field.name, sortable: true, dataIndex: field.name, tooltip: field.description});
				}
				delete store.reader.ef;
				store.reader.buildExtractors();
				//self.loaded=true;				
			}
		});
		*/
	},
	
	updateColumns:function(cols)
	{
		this.store.baseParams.columns=cols;
		this.store.reload();
	},
	
	createPatientMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Patients',
			menu:
			{
				items:
				[
					{
						text: 'Add patient',
						handler: function()
						{
							HdbDirect.addPatient(function(provider, response)
							{
								alert('added patient: '+response.result);
							});
						}
					},
					{
						text: 'Delete patient',
						handler: function()
						{
							var patient_id=self.getSelectedId();
							HdbDirect.deletePatient(patient_id,function(provider, response)
							{
								alert('deleted patient: '+response.result);
							});
						}
					}
				]
			}
		};
		return menu;
	},
	
	createTagMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Tags',
			menu:
			{
				items:
				[
					{
						text: 'Tag patients',
						handler: function()
						{
							var dialog=new nelson.tags.ApplyTagDialog(
							{
								grid: self,
								callback: function(tag){self.store.reload();}
							});
						}
					},
					{
						text: 'Un-tag patients',
						handler: function()
						{
							var dialog=nelson.tags.Tags.untagItems(self,function(){
								self.reloadTable();
							});
						}
					},
					'-',
					{
						text:' Tag cloud',
						scope: self,
						handler: function(){nelson.tags.Tags.createTagCloud(self);}
					}
				]
			}
		};
		return menu;
	},
	
	createSortMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Sort',
			handler: function(btn){var dialog=new nelson.widgets.SortDialog({grid: self});}
		};
		return menu;
	},
	
	createSelectColumnsMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Columns',
			handler: function(btn){var dialog=new nelson.widgets.SelectColumnsDialog({grid: self});}
		};
		return menu;
	}
});
