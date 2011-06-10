Ext.define('hcv.view.sequence.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.sequenceedit',
    title : 'Edit Sequence',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'accession',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'sequence',
                        fieldLabel: 'Sequence'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});