Ext.define('hcv.controller.Sequences', {
	extend: 'Ext.app.Controller',
	
	models: ['Sequence'],
	stores: ['Sequences'],
	
	views: [
	 	'sequence.List',
	 	'sequence.Edit'
	],
    
    init: function() {
        //console.log('Initialized Sequences! This happens before the Application launch function is called');
    	this.control({
            'sequencelist': {
                itemdblclick: this.editSequence
            },
            'sequenceedit button[action=save]': {
                click: this.updateSequence
            }
        });
    },

    editSequence: function(grid, record) {
        console.log('Double clicked on ' + record.get('name'));
        var view = Ext.widget('sequenceedit');
        view.down('form').loadRecord(record);
    },

    updateSequence: function(button) {
    	console.log('clicked the Save button');
        var win    = button.up('window');
        var form   = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        record.set(values);
        win.close();
        this.getSequencesStore().sync();
    }
});