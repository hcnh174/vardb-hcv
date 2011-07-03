/*global Ext, vardb, alert */
Ext.define('Ext.ux.vardb.History',
{
	extend: 'Ext.ux.vardb.Grid',
	frame: true,
	autoHeight: true,
	autoWidth: true,
	collapsible: false,
	stripeRows: true,
	title: 'Search history',
	
	initComponent:function()
	{
		var self=this;
	
		var reader=new Ext.data.JsonReader(
		{
			root: 'rows',
			idProperty: 'id',
			fields:
			[
				{name: 'id'},
				{name: 'number', type: 'int'},
				{name: 'type'},
				{name: 'name'},
				{name: 'query'},
				{name: 'results', type: 'int'},
				{name: 'date'},
				{name: 'filter'}
			]
		});
			
		var store=new Ext.data.Store(
		{
			url: vardb.webapp+'/search/ajax/queries.json',
			reader: reader,
			//data: this.data,
			sortInfo: {field: 'number', direction: 'asc'}
		});

		function onCellClick(grid, rowIndex, columnIndex, e)
		{
			if (columnIndex!==7) // 6 hack!
				{return;}
			var record = grid.getStore().getAt(rowIndex);
			self.deleteQuery(record.data.id);
		}
		
		var sm=new Ext.grid.CheckboxSelectionModel({sortable: true, width: 20});
		
		var config= 
		{
			viewConfig: {forceFit:true},
			store: store,
			columns:
			[
				sm,
				{header: "Num", width: 20, sortable: true, dataIndex: 'number', tooltip: 'Query number'},
				{header: "Type", width: 40, sortable: true, dataIndex: 'type'},
				{header: "Name", sortable: true, dataIndex: 'name'},
				{header: "Results", width: 30, sortable: true, dataIndex: 'results', align: 'right'},
				{header: "Date", width: 90, sortable: true, dataIndex: 'date'},
				{header: "", width: 20, sortable: false, menuDisabled: true, dataIndex: 'id', renderer: this.renderView},
				{header: "", width: 20, sortable: false, menuDisabled: true, dataIndex: 'id', renderer: this.renderDelete}
			],
			listeners: {cellclick: onCellClick},
			tbar: this.createToolbar()
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
		this.viewConfig.emptyText='<div class="emptyText">No queries.</div>';
		
		store.load();
	},
	
	renderView:function(value, p, r)
	{
		var url=vardb.webapp;
		if (r.data.type==='TEXT')
			{url+='/search/load.html';}
		else if (r.data.type==='BLAST')
			{url+='/blast/load.html';}
		else if (r.data.type==='PHIBLAST')
			{url+='/blast/load.html';}
		else if (r.data.type==='PSIBLAST')
			{url+='/blast/load.html';}
		else if (r.data.type==='REGEX')
			{url+='/regex/load.html';}
		else {alert('no handler for query type: '+r.data.type);}
		return String.format('<a href="'+url+'?id={0}">View</a>', r.data.id);
	},
	
	renderDelete:function(value, p, r)
	{
		//return String.format('<a href="javascript:deleteQuery(\'{0}\')">Delete</a>',r.data.id);
		return String.format('<a href="#">Delete</a>');//,r.data.id);
	},
	
	deleteQueriesHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.deleteQueries(this.getSelectedIds(),function()
		{
			self.store.reload();
		});
	},
	
	deleteAllQueriesHandler:function()
	{
		var self=this;
		Ext.ux.vardb.Cart.deleteQueries(this.store.getTotalCount(),function()
		{
			self.store.reload();
		});
	},
	
	createActionMenu:function()
	{
		var menu=
		{
			text: 'Action',
			menu:
			{
				items:
				[
					{text: 'Delete search(es)', scope: this, handler: this.deleteQueriesHandler},
					{text: 'Delete all searches', scope: this, handler: this.deleteAllQueriesHandler}
				]
			}
		};
		return menu;
	},
	
	createToolbar:function()
	{
		var toolbar=new Ext.Toolbar(
		{
			items:
			[
				this.createSelectMenu(),'-',
				this.createActionMenu(),'-',
				'->',this.createReloadButton()
			]
		});
		return toolbar;
	}
});