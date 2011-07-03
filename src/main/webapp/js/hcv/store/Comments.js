Ext.define('hcv.store.Comments', {
    extend: 'Ext.data.Store',
    model: 'hcv.model.Comment',
	storeId: 'commentsStore',
    pageSize: 5,
    //remoteSort : true,
    //buffered: true,
    
	proxy : {
		type : 'direct',
		directFn : hcvDirect.getComments,
		reader : {
			root : 'records',
			totalProperty : 'total'
		}
	},
	sorters : [ {
		property : 'date',
		direction : 'DESC'
	} ]
});