Ext.application({
    name: 'hcv',

    appFolder: 'hcv',

    controllers: [
        'Sequences'
    ],

	launch: function() {
	    Ext.create('Ext.container.Viewport', {
	        layout: 'fit',
	        items: {
	            xtype: 'sequencelist'
	        }
	    });
	}
});