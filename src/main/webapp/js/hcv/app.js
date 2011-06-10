Ext.application({
    name: 'hcv',

    //appFolder: 'hcv',

    controllers: [
        'Sequences'
    ],

	launch: function() {
		
		/*
		hcvDirect.doEcho('hi there', function(message)
		{
			alert(message);
		});
		*/
		
	    Ext.create('Ext.container.Viewport', {
	        layout: 'fit',
	        items: {
	            xtype: 'sequencelist'
	        }
	    });
	}
});