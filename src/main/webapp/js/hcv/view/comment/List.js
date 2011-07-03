/*global Ext 
Ext.define('hcv.view.comment.List',
{
	extend: 'Ext.view.View',
	store: 'Comments',
	//autoShow: true,
	//autoRender: true,
	tpl: '<tpl for=".">' +
		'<div class="comment-item">' +
		'<tpl if="username!=\'system\'">' +
		'<h3><span>{date:date("M j, Y, g:i A")}<br /></span><a href="javascript:void(0)">{username} wrote:</a></h3>' +
		'</tpl>' +
		'<p>{text}</p>' +
		'</div>' +
		'</tpl>',
    itemSelector: 'div.comment-item',
    emptyText: 'No comments have been submitted',
    //renderTo: 'commentsdiv',
    iconCls: 'icon-user_comment',
    pagesize: 10,
    frame: true,
    
    initComponent:function()
    {
    	//alert('hcv.view.comment.List:initComponent');
    	
    	//this.store=Ext.data.StoreManager.lookup('commentStore'),
    	this.store=new hcv.store.Comments({});

    	this.tpl=new Ext.XTemplate('' +
    			'<tpl for=".">' +
    			'<div class="comment-item">' +
    			'<tpl if="username!=\'system\'">' +
    			'<h3><span>{date:date("M j, Y, g:i A")}<br /></span><a href="javascript:void(0)">{username} wrote:</a></h3>' +
    			'</tpl>' +
    			'<p>{text}</p>' +
    			'</div>' +
    			'</tpl>');
    	
    	this.callParent(arguments);
    	this.store.load({params: {start: 0, limit: this.pagesize}});
    	this.show();
    }
});
*/

Ext.define('hcv.view.comment.List',
{
	extend: 'Ext.panel.Panel',
	width: '600',
	autoScroll: true,
	iconCls: 'icon-user_comment',
	title: 'Comments',
	
	initComponent:function()
	{
		var self=this;
		if (!this.type)
			{throw 'hcv.view.Comments: type not set';}
		if (!this.identifier)
			{throw 'hcv.view.Comments: identifier not set';}

		this.store=new hcv.store.Comments({});
		//this.store=Ext.data.StoreManager.lookup('commentsStore');
		
		// Custom rendering Template for the View
		var tpl = new Ext.XTemplate('' +
				'<tpl for=".">' +
				'<div class="comment-item">' +
				//'<tpl if="username!=\'system\'">' +
				'<h3><span>{date:date("M j, Y, g:i A")}<br /></span><a href="javascript:void(0)">{username} wrote:</a></h3>' +
				//'</tpl>' +
				'<p>{text}</p>' +
				'</div>' +
				'</tpl>');

		var addButton=new Ext.button.Button(
		{
			//id: 'hcv-comments-submit-btn',
			text: 'Submit a comment',
			scope: this,
			handler: this.submitHandler
		});
		
		var config=
		{
			items: Ext.create('Ext.view.View',
			{
				tpl: tpl,
				store: self.store,
				itemSelector: 'div.comment-item',
				height: 30,
				emptyText: 'No comments have been submitted for this item.'
				//emptyText: '<div class="emptyText">No comments have been submitted for this item.</div>'
				//emptyText: '<div class="comment-item"><p style="margin-top:5px;margin-bottom:5px;">No comments have been submitted for this item.</p></div>'
			}),
			dockedItems:
			[
				{
				    xtype: 'toolbar',
				    dock: 'top',
				    items:
				    [
						'<span class="comments-heading">User comments</span>',
						'->','-',
						addButton
				    ]
				},
				{
			        xtype: 'pagingtoolbar',
			        store: self.store,   // same store GridPanel is using
			        dock: 'bottom',
			        displayInfo: true
			    }
			]
		};
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
		
		this.store.loadPage(1);
		//this.store.load({params: {start: 0, limit: this.pagesize}});
	},
	
	submitHandler:function()
	{
		var self=this;
		var win=new hcv.view.comment.Submit(
		{
			type: self.type,
			identifier: self.identifier,
			callback: function()
			{
				self.store.loadPage(1);
				//self.store.reload();
			}
		});
	}
});	
