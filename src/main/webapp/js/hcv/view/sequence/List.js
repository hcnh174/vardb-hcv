Ext.define('hcv.view.sequence.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sequencelist',

    title : 'All Sequences',
    
    store: 'Sequences',

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Sequence', dataIndex: 'nt', flex: 1}
        ];

        this.callParent(arguments);
    }
});