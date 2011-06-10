Ext.define('hcv.view.sequence.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sequencelist',

    title : 'All Sequences',
    
    store: 'Sequences',
    
    verticalScrollerType : 'paginggridscroller',
	loadMask : true,
	invalidateScrollerOnRefresh : false,
	
    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'accession',  width: 100},
            {header: 'Genotype',  dataIndex: 'genotype',  width: 100},
            {header: 'Sequence', dataIndex: 'sequence', flex: 1}
        ];

        this.callParent(arguments);
        
        this.store.guaranteeRange(0, 199);
    }
});