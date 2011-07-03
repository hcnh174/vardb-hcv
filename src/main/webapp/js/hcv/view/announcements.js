/*global Ext */
Ext.define('hcv.view.Announcements',
{
	extend: 'Ext.grid.GridPanel',
	title: 'Announcements',
	enableHdMenu: false,
	hideHeaders: true,
	stripeRows: true,
	frame: true,
	height: 200, //145,
	width: '95%',
	loadingText: 'Loading announcements...',
	emptyText: 'No new announcements',
	iconCls: 'icon-rss',
	plugins:
	[
	 	{
            ptype: 'rowexpander',
            rowBodyTpl: '<p>{description}</p>'
        }
	],
	columns:
	[
	   {header: "Title", sortable: true, dataIndex: 'title', width: 250, renderer: this.renderTitle},
	   {header: "Date", dataIndex: 'pubDate', width: 50, renderer: Ext.util.Format.dateRenderer('M j, Y')},
	   {header: "Link", dataIndex: 'link', width: 20, renderer: this.renderLink}
	],

	initComponent:function()
	{		
		Ext.define('Announcement',{
	        extend: 'Ext.data.Model',
	        fields: [
				{name: 'title'},
				{name: 'author'},
				{name: 'pubDate', type:'date'},
				{name: 'link'},
				{name: 'description'},
				{name: 'content'}
	        ]
	    });

	    var store = Ext.create('Ext.data.Store', {
	        model: 'Announcement',
	        autoLoad: true,
	        proxy: {
	            type: 'ajax',
	            url: 'announcements.xml',
	            reader: {
	                type: 'xml',
	                record: 'item',
	                idProperty: 'guid',
	                totalRecords: '@total'
	            }
	        }
	    });

		var config=
		{
			store: store,
			viewConfig: {forceFit: true},
			dockedItems:
			[
				{
			        xtype: 'pagingtoolbar',
			        store: store,
			        dock: 'bottom',
			        displayInfo: true,
			        displayMsg: 'Displaying news {0} - {1} of {2}',
					emptyMsg: "No news to display"
			    }
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
		
		store.load();
		
		/*
		store.on('load', function(){
			expander.expandRow(0);
		});
		*/
	},
	
	renderTitle:function(value, p, record)
	{
		return '<span style=\'color: #15428b; font:bold 11px tahoma,arial,sans-serif;\'>'+ record.data.title +'</span>';
	},

	renderLink:function(value, p, record)
	{
		var link = '' + value;
		if(link.length > 0)
			{return '<a href=\''+link+'\'>Link</a>';}
		return link;
	}
});
