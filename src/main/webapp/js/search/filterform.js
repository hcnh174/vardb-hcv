/*global Ext, vardb */
Ext.define('Ext.ux.vardb.FilterForm',
{
	extend: 'Ext.form.FormPanel',
	title: 'Filter',
	frame: true,
	controlWidth: 180,
	padding: 5,
	listWidth: 180,
	labelAlign: 'top',
	labelWidth: 80,
	spacerWidth: 10,
	autoScroll: true,
	separator: ';',
	forceLayout: true,
	numconditions: 3,

	/////////////////////////////////////////////////////////////////////
	
	initComponent:function()
	{
		var self=this;
		var controls=this.createControls(this.counts);
		
		var config=
		{
			items: controls
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	createSingleSelect:function(fieldName, fieldLabel, data, numsequences)
	{
		if (data.length===0)
			{return null;}
		var emptyText=numsequences+' '+fieldLabel;
		var self=this;
		var select=new Ext.ux.Andrie.Select(
		{
			name: fieldName,
			fieldLabel: fieldLabel,
			multiSelect: false,
			minLength: 0,
			valueField: 'identifier',
			emptyText: emptyText,
			displayField: 'name',
			triggerAction: 'all',
			mode: 'local',
			width: self.controlWidth,
			listWidth: self.listWidth,
			store: new Ext.data.ArrayStore(
			{
				fields: ['identifier','name'],
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
		//var hideOnSelect=(data.length===1);
		var select = new Ext.ux.form.LovCombo(
		{
			name: fieldName,
			fieldLabel: fieldLabel,
			emptyText: emptyText,
			separator: self.separator,
			width: self.controlWidth,
			hideOnSelect: false,
			maxHeight: 200,
			triggerAction: 'all',
			valueField: 'id',
			displayField: 'name',
			mode: 'local',
			store: new Ext.data.SimpleStore(
			{
				id: 0,
				fields: [{name: 'id'}, 'name'], //, type: 'int'
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

	createLengthControl:function(fieldName, fieldLabel)
	{
		var lowerField=new Ext.form.NumberField(
		{
			fieldLabel: fieldLabel,
			name: fieldName+'lower',
			width: 50
		});		
		var upperField=new Ext.form.NumberField(
		{
			//fieldLabel: fieldLabel,
			name: fieldName+'upper',
			width: 50
		});
		
		var field=
		{
			layout: 'column',
			anchor: '100%',
			//labelAlign: 'left',
			items:
			[
				{items: {html: fieldLabel+':&nbsp;'}},
				{items: [lowerField]},
				{items: {html: '&nbsp;-&nbsp;'}},
				{items: [upperField]}
			]
		};
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
		addControl(this.createMultiSelect('diseases','Diseases',this.getCountData(counts.diseases)));
		addControl(this.createMultiSelect('divisions','Divisions',this.getCountData(counts.divisions)));
		addControl(this.createMultiSelect('pathogens','Pathogens',this.getCountData(counts.pathogens)));
		addControl(this.createMultiSelect('families','Families',this.getCountData(counts.families)));
		addControl(this.createMultiSelect('subgroups','Subgroups',this.getCountData(counts.subgroups)));
		addControl(this.createMultiSelect('orthologs','Orthologs',this.getCountData(counts.orthologs)));
		addControl(this.createMultiSelect('genomes','Genomes',this.getCountData(counts.genomes)));
		addControl(this.createMultiSelect('pfams','Pfam domains',this.getCountData(counts.pfams)));
		addControl(this.createMultiSelect('countries','Countries',this.getCountData(counts.countries)));
		addControl(this.createMultiSelect('refs','Publications',this.getCountData(counts.refs)));
		//addControl(this.createMultiSelect('ratings','Ratings',this.getRatingData(counts)));
		addControl(this.createMultiSelect('sources','Sources',this.getCountData(counts.sources)));
		addControl(this.createMultiSelect('bundles','Bundles',this.getCountData(counts.bundles)));
		addControl(this.createMultiSelect('groups','Groups',this.getCountData(counts.groups)));
		addControl(this.createMultiSelect('tags','Tags',this.getCountData(counts.tags)));
		addControl(this.createSingleSelect('pseudogenes','Pseudogenes',this.getPseudogeneData(counts),counts.pseudogenes));
		addControl(this.createSingleSelect('truncated','Truncated',this.getTruncatedData(counts),counts.truncated));
		addControl(this.createSingleSelect('uploaded','Uploaded',this.getUploadedData(counts),counts.uploaded));
		
		if (controls.length>0)
		{
			addControl(this.createDateControl('startdate','Start date'));
			addControl(this.createDateControl('enddate','End date'));
			addControl(this.createLengthControl('ntlength','NT length'));
			addControl(this.createLengthControl('aalength','AA length'));
		}
		
		addControl(this.createConditionsFieldset());
		addControl(this.createFilterButton());
		return controls;
	},
		
	createConditionsFieldset:function()
	{
		this.numrows=0;
		
		var andOrField=new Ext.ux.vardb.SelectList(
		{
			data: [['AND','And'],['OR','Or']],
			name: 'conditionandor',
			hideLabel: true,
			value: 'AND',
			width: 50
		});
		
		var addConditionButton=
		{
			xtype: 'button',
			text: 'Add condition',
			formBind: true,
			scope: this,
			handler: this.addCondition
		};
		
		this.conditionsfieldset=new Ext.form.FieldSet(
		{
			title: 'Conditions',
			collapsible: true,
			//bodyStyle: 'padding: 1px',
			items:
			[
				{
					xtype: 'container',
					layout: 'column',
					items:[andOrField,{html:'&nbsp;&nbsp;'},addConditionButton]
				}
			]
		});
		
		var index;
		for (index=0;index<this.numconditions;index++)
		{
			this.addRow();
		}
		return this.conditionsfieldset;
	},
	
	addCondition:function()
	{
		this.addRow();
		this.doLayout();
	},
	
	addRow:function()
	{
		this.numrows++;
		var fieldCombo=new Ext.ux.vardb.FieldCombo(
		{
			name: 'conditionfield'+this.numrows,
			width: 55,
			hideLabel: true
		});
		var valueCombo=new Ext.ux.vardb.UniqueValuesCombo(
		{
			name: 'conditionvalue'+this.numrows, 
			width: 55
		});
		
		fieldCombo.on('select',function(field,record,index)
		{
			valueCombo.setField(record.data.value);
		});
		
		var operatorField=new Ext.ux.vardb.SelectList(
		{
			data: [['=','='],['!=','!=']],
			name: 'conditionoperator'+this.numrows,
			hideLabel: true,
			value: '=',
			width: 35
		});
		
		var row=
		{
			xtype: 'container',
			layout: 'column',
			items:
			[
				{
					layout: 'form',
					//labelWidth: 70,
					bodyStyle: 'padding-right: 3px',
					items: fieldCombo
				},
				{
					bodyStyle: 'padding-right: 3px; padding-top: 3px',
					items: operatorField							
				},
				{
					layout: 'form',
					items: valueCombo
				}
			]
		};
		this.conditionsfieldset.add(row);
		//this.doLayout();
	},
	
	getCountData:function(items)
	{
		var data=[];
		if (!items)
			{return data;}		
		var index,item,identifier,name;
		for (index=0;index<items.length;index++)		
		{
			item=items[index];
			identifier=item.identifier;
			name=item.name+' ('+item.numsequences+')';
			data.push([identifier,name]);
		}
		return data;
	},
	
	getRatingData:function(counts)
	{
		var data=[];
		var index,rating,identifier,name;
		for (index=0;index<counts.ratings.length;index++)
		{
			rating=counts.ratings[index];
			if (rating.numsequences<1)
				{continue;}
			identifier=rating.identifier;
			name=rating.quality+' ('+rating.numsequences+')';
			data.push([identifier,name]);
		}
		return data;
	},
	
	getPseudogeneData:function(counts)
	{
		var data=[];
		if (counts.pseudogenes===0)
			{return data;}
		data.push(['exclude','Exclude pseudogenes']);
		data.push(['only','Show only pseudogenes']);
		return data;
	},
	
	getTruncatedData:function(counts)
	{
		var data=[];
		if (counts.truncated===0)
			{return data;}
		data.push(['exclude','Exclude truncated sequences']);
		data.push(['only','Show only truncated sequences']);
		return data;
	},
	
	getUploadedData:function(counts)
	{
		var data=[];
		if (counts.uploaded===0)
			{return data;}
		data.push(['exclude','Exclude uploaded sequences']);
		data.push(['only','Show only uploaded sequences']);
		return data;
	},
 
	///////////////////////////////////////////////////////////////////////////

	createPseudogeneFilter:function(list)
	{
		var control=this.getForm().findField('pseudogenes');
		if (!control)
			{return;}
		var pseudogenes=control.getValue();
		if (pseudogenes==='exclude')
			{this.addFilter(list,'pseudogene=false');}
		else if (pseudogenes==='only')
			{this.addFilter(list,'pseudogene=true');}
	},
	
	createTruncatedFilter:function(list)
	{
		var control=this.getForm().findField('truncated');
		if (!control)
			{return;}
		var truncated=control.getValue();
		if (truncated==='exclude')
			{this.addFilter(list,'truncated=false');}
		else if (truncated==='only')
			{this.addFilter(list,'truncated=true');}
	},
	
	createUploadedFilter:function(list)
	{
		var control=this.getForm().findField('uploaded');
		if (!control)
			{return;}
		var uploaded=control.getValue();
		if (uploaded==='exclude')
			{this.addFilter(list,'uploaded=false');}
		else if (uploaded==='only')
			{this.addFilter(list,'uploaded=true');}
	},
	
	createDateFilter:function(list)
	{
		var date, dateformat='Ymd';
		var startdatefield=this.getForm().findField('startdate');
		if (startdatefield && startdatefield.getValue()!=='')
		{
			date=startdatefield.getValue();
			this.addFilter(list,'after='+date.format(dateformat));
		}
		var enddatefield=this.getForm().findField('enddate');
		if (enddatefield && enddatefield.getValue()!=='')
		{
			date=enddatefield.getValue();
			this.addFilter(list,'before='+date.format(dateformat));
		}
	},
	
	createLengthFilter:function(list)
	{
		var date, dateformat='Ymd';
		var ntlower=this.getForm().findField('ntlengthlower').getValue();
		var ntupper=this.getForm().findField('ntlengthupper').getValue();
		var aalower=this.getForm().findField('aalengthlower').getValue();
		var aaupper=this.getForm().findField('aalengthupper').getValue();
		
		if (ntlower!=='')
			{this.addFilter(list,'ntlength>='+ntlower);}
		if (ntupper!=='')
			{this.addFilter(list,'ntlength<='+ntupper);}
		if (aalower!=='')
			{this.addFilter(list,'aalength>='+aalower);}
		if (aaupper!=='')
			{this.addFilter(list,'aalength<='+aaupper);}
	},

	createConditionFilter:function(list)
	{
		var conditions=[];
		var rownum, field, operator, value;
		var form=this.getForm();
		for (rownum=1;rownum<=this.numrows;rownum++)
		{
			if (!form.findField('conditionfield'+rownum))
			{
				//alert('Cannot find field: '+'conditionfield'+rownum);
				continue;
			}
			field=form.findField('conditionfield'+rownum).getValue().trim();			
			operator=form.findField('conditionoperator'+rownum).getValue();
			value=form.findField('conditionvalue'+rownum).getValue().trim();
			if (field==='' || value==='')
				{continue;}
			if (value.indexOf(' ')!==-1)
				{value='"'+value+'"';}		
			conditions.push(field+operator+value);
		}
		if (conditions.length===0)
			{return;}
		var andor=form.findField('conditionandor').getValue();
		var query='('+conditions.join(' '+andor+' ')+')';
		//alert(query);
		this.addFilter(list,query);
	},
	
	createMultiFilter:function(list,field,type)
	{
		var control=this.getForm().findField(field);
		if (!control || control.disabled)
			{return;}
		var index,value;
		//alert('value='+control.getValue());
		var values=control.getValue().split(this.separator);
		if (values.length===0)
			{return;}
		var sublist=[];
		for (index=0;index<values.length;index++)
		{
			value=values[index];
			if (value===null || value==='')
				{continue;}
			if (value.indexOf(" ")!==-1)
				{value='"'+value+'"';}			
			sublist.push(type+'='+value);
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
		this.createMultiFilter(list,'diseases','disease');
		this.createMultiFilter(list,'divisions','division');
		this.createMultiFilter(list,'pathogens','pathogen');
		this.createMultiFilter(list,'families','family');
		this.createMultiFilter(list,'genomes','genome');
		//this.createMultiFilter(list,'ratings','rating');
		this.createMultiFilter(list,'countries','country');
		this.createMultiFilter(list,'pfams','pfam');
		this.createMultiFilter(list,'refs','ref');
		this.createMultiFilter(list,'sources','source');
		this.createMultiFilter(list,'bundles','bundle');
		this.createMultiFilter(list,'groups','group');
		this.createMultiFilter(list,'tags','tag');
		this.createDateFilter(list);
		this.createPseudogeneFilter(list);
		this.createTruncatedFilter(list);
		this.createUploadedFilter(list);
		this.createLengthFilter(list);
		this.createConditionFilter(list);
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
