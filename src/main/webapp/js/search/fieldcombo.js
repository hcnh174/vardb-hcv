/*global Ext, vardb */
Ext.define('Ext.ux.vardb.FieldCombo',
{
	extend: 'Ext.form.ComboBox',
	name: 'field',
	//hideLabel: true,
	valueField: 'value',
	displayField: 'display',
	fieldLabel: 'Condition',
	width: 100,
	mode: 'local',
	triggerAction: 'all',
	emptyText: 'Field',
	selectOnFocus: true,
	forceSelection: true,
	listWidth: 200,

	initComponent:function()
	{
		var config=
		{ 
			store: this.createStore()
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);
	},
	
	addField:function(data,value,display)
	{
		if (!display)
			{display=value;}
		data.push([value,display]);
	},
	
	createStore:function()
	{
		var data=[];
		this.addField(data,'any');
		this.addField(data,'accession');
		this.addField(data,'pathogen_identifier','pathogen');
		//this.addField(data,'genome_identifier','genome');
		//this.addField(data,'chromosome_identifier','chromosome');
		this.addField(data,'family_identifier','family');
		this.addField(data,'ortholog_identifier','ortholog');
		//this.addField(data,'udate');
		this.addField(data,'division');
		this.addField(data,'natype');
		//this.addField(data,'circular');
		this.addField(data,'ref_identifier','ref');
		this.addField(data,'taxon_identifier','taxon');
		this.addField(data,'country_region','region');
		this.addField(data,'country_identifier','country');		
		this.addField(data,'subregion');
		//this.addField(data,'collection_date');
		this.addField(data,'strain');
		this.addField(data,'serogroup');
		this.addField(data,'serotype');
		this.addField(data,'clone');
		this.addField(data,'segment');
		this.addField(data,'specific_host');
		this.addField(data,'isolate');
		this.addField(data,'isolation_source');
		this.addField(data,'mol_type');
		this.addField(data,'locus');
		this.addField(data,'gene');
		this.addField(data,'locus_tag');
		this.addField(data,'allele');
		//this.addField(data,'pseudogene');
		//this.addField(data,'start');
		//this.addField(data,'end');
		this.addField(data,'strand');
		this.addField(data,'splicing');
		//this.addField(data,'domains');
		//this.addField(data,'sequence');
		//this.addField(data,'ntlength');
		//this.addField(data,'spliced');
		this.addField(data,'geneid');
		this.addField(data,'plasmid');
		//this.addField(data,'codon_start');
		//this.addField(data,'transl_table');
		this.addField(data,'product');
		//this.addField(data,'translation');
		//this.addField(data,'aalength');
		this.addField(data,'protein');
		//this.addField(data,'protein_gi');
		this.addField(data,'protein_id');
		//this.addField(data,'gi');
		this.addField(data,'uniprot');
		//this.addField(data,'molwt');
		this.addField(data,'ec');
		this.addField(data,'defline');
		
		var store=new Ext.data.ArrayStore(
		{
			fields: ['value', 'display'],
			data : data
		});
		return store;
	}
});