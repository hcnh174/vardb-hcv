Ext.define('hcv.store.Sequences', {
    extend: 'Ext.data.Store',
    model: 'hcv.model.Sequence',
    //autoLoad: true,
    pageSize : 200,
    remoteSort : true,
    buffered: true,
    
    /*
    proxy: {
        type: 'ajax',
        //url: 'data/sequences.json',
        api: {
            read: 'data/sequences.json',
            update: 'data/updateSequences.json'
        },
        reader: {
            type: 'json',
            root: 'sequences',
            successProperty: 'success'
        }
    }
	*/
    
	proxy : {
		type : 'direct',
		directFn : hcvDirect.loadWithPaging,
		reader : {
			root : 'records',
			totalProperty : 'total'
		}
	},
	sorters : [ {
		property : 'accession',
		direction : 'ASC'
	} ]
});