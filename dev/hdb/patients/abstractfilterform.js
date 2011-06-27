/*global Ext, nelson, hdb */
nelson.hdb.patients.AbstractFilterForm = Ext.extend(Ext.form.FormPanel,
{
	title: 'Filter form',
	frame: true,
	controlWidth: 180,
	padding: 5,
	listWidth: 180,
	labelWidth: 80,
	spacerWidth: 10,
	autoScroll: true,
	multiSelectDelimiter: ';',

	/////////////////////////////////////////////////////////////////////
	
	createSingleSelect:function(fieldName, fieldLabel, data)
	{
		if (data.length===0)
			{return null;}
		var emptyText=fieldLabel;
		var self=this;
		var select=new Ext.form.ComboBox(
		{
			name: fieldName,
			fieldLabel: fieldLabel,
			minLength: 0,
			emptyText: emptyText,
			valueField: 'value',			
			displayField: 'display',
			triggerAction: 'all',
			mode: 'local',
			width: self.controlWidth,
			listWidth: self.listWidth,
			store: new Ext.data.SimpleStore(
			{
				id: 0,
				fields: ['value','display'],
				data: data
			})
		});
		return select;
	},
	
	createMultiSelect:function(fieldName, fieldLabel, data, emptyText)
	{
		if (data.length===0)
			{return null;}
		if (data.length===1)
			{emptyText=data[0][1];}
		if (!emptyText)
			{emptyText=data.length+' '+fieldLabel;}
		var self=this;
		var select = new Ext.ux.form.LovCombo(
		{
			name: fieldName,
			fieldLabel: fieldLabel,
			emptyText: emptyText,
			separator: this.multiSelectDelimiter,
			hideOnSelect: false,
			maxHeight: 200,
			triggerAction: 'all',
			mode: 'local',
			valueField: 'value',
			displayField: 'display',
			store: new Ext.data.SimpleStore(
			{
				id: 0,
				fields: ['value','display'],
				data: data
			})
		});
		return select;
	},
	
	createDateControl:function(fieldName, fieldLabel)
	{
		var field=new Ext.form.DateField(
		{
			fieldLabel: fieldLabel,
			name: fieldName
		});
		return field;
	},

	createFilterButton:function()
	{
		var filterButton=
		{
			xtype: 'button',
			text: 'Filter',
			formBind: true,
			scope: this,
			handler: this.filterHandler
		};
		
		return {
			layout: 'fit',
			height: 30,
			style: 'margin: 0 0 3px 0',
			items: [filterButton]
		};
	},
	
	createResetButton:function()
	{
		var resetButton=
		{
			xtype: 'button',
			text: 'Reset',
			formBind: true,
			scope: this,
			handler: this.resetHandler
		};
		
		return {
			layout: 'fit',
			height: 30,
			style: 'margin: 0 0 3px 0',
			items: [resetButton]
		};
	},
	
	///////////////////////////////////////////////////////////////
	
	createControls:function(counts)
	{
		var controls=[];		
		function addControl(control)
		{
			if (control)
				{controls.push(control);}
		}

		addControl(this.createFilterButton());
		addControl(this.createResetButton());
		return controls;
	},
	
	getCountData:function(name)
	{
		var items=this.counts.types[name];
		var data=[];
		if (!items)
			{return data;}
		var index,item,display;
		for (index=0;index<items.length;index++)
		{
			item=items[index];
			display=item.value+' ('+item.count+')'; //display
			data.push([item.value,display]);
		}
		return data;
	},
	
	
	createMultiFilter:function(list,field,type)
	{
		if (!type) // if no separate type is given, just use the field name
			{type=field;}
		var control=this.getForm().findField(field);
		if (!control || control.disabled)
			{return;}
		var index,value;
		var values=control.getValue().split(this.multiSelectDelimiter);
		if (values.length===0)
			{return;}
		var sublist=[];
		for (index=0;index<values.length;index++)
		{
			value=values[index];
			if (value===null || value==='')
				{continue;}
			sublist.push(type+'="'+value+'"');
		}
		if (sublist.length===0)
			{return;}
		var filter=sublist.join(' OR ');
		if (sublist.length!==1)
			{filter='('+filter+')';}
		this.addFilter(list,filter);
	},

	createFilter:function()
	{
		var list=[];
		var filter=list.join(' AND ');
		return filter;
	},
	
	addFilter:function(list,item)
	{
		if (item!==null && item!=='')
			{list.push(item);}
	},
	
	filterHandler:function()
	{
		var filter=this.createFilter();
		if (this.onFilter)
			{this.onFilter(filter);}
	},
	
	resetHandler:function()
	{
		this.getForm().reset();
		this.filterHandler();
	}
});
