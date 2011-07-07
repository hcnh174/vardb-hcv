/*global Ext, vardb */
Ext.define('Ext.ux.vardb.SelectList',
{
	extend: 'Ext.form.ComboBox',
	valueField: 'value',
	displayField: 'display',
	width: 150,
	mode: 'local',
	triggerAction: 'all',
	selectOnFocus: true,
	forceSelection: true,

	initComponent:function()
	{
		if (!(this.data instanceof Array))
		{
			var arr=this.data.split(',');
			var index,value,display;
			this.data=[];
			for (index=0;index<arr.length;index++)
			{
				value=display=arr[index];
				if (display===' ')
					{display='&nbsp;';}
				this.data.push([value,display]);
			}
		}
		var config=
		{
			store: new Ext.data.ArrayStore(
			{
				fields: [this.valueField, this.displayField],
				data: this.data
			})
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	}
});

