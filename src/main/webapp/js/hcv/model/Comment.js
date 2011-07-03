Ext.define('hcv.model.Comment', {
    extend: 'Ext.data.Model',
    fields:
    [
		{name: 'id', type: 'int'},
		{name: 'username'},
		{name: 'type'},
		{name: 'identifier'},
		{name: 'text'},
		{name: 'date', type:'date'}
	]
});