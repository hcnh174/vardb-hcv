Ext.define('hcv.view.sequence.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sequencelist',
    title : 'All Sequences',    
    store: 'Sequences',    
    verticalScrollerType : 'paginggridscroller',
	loadMask : true,
	invalidateScrollerOnRefresh : false,
	
    initComponent: function() {

    	var filters = {
			ftype : 'filters',
			encode : true, 
			local : true, //false, 
			filters :
			[
    			{
    				type : 'numeric',
    				dataIndex : 'id'
    			},
    			{
    				type : 'string',
    				dataIndex : 'accession'
    			},
    			{
    				type : 'list',
    				dataIndex : 'genotype',
    				options : [ '1a','1b', '2a', '2b', '3' ],
    				phpMode : true
    			}
    		]
		};
    	
    	this.features=[ filters ];
    	    	
    	/*
    	this.plugins=[
    	{
            ptype: 'rowexpander',
            rowBodyTpl:
            [
                '<p><b>Accession:</b> {accession}</p><br>',
                '<p><b>Sequence:</b> {sequence}</p>'
            ]
        }];
    	*/
    	
        this.columns = [
            {header: 'ID',  dataIndex: 'id',  width: 25, filterable: true},
            {header: 'Name',  dataIndex: 'accession',  width: 100, filterable: true},
            {header: 'Genotype',  dataIndex: 'genotype',  width: 100, filterable: true},
            {header: 'Sequence', dataIndex: 'sequence', flex: 1, filterable: false}
        ];

        this.callParent(arguments);        
        this.store.guaranteeRange(0, 199);
    }
});