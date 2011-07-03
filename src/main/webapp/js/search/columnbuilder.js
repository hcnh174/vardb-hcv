/*global Ext, jmolScript */
(Ext.ux.vardb.ColumnBuilder=function()
{	
return {
		
	r: Ext.ux.vardb.Renderer,
	t: Ext.ux.vardb.Constants.tooltips,
	
	createColumn:function(defaults,overrides)
	{
		overrides=overrides || {};
		// apply basic defaults
		Ext.applyIf(defaults,
		{
			sortable: true
		});
		// apply any overrides
		Ext.applyIf(defaults, overrides);
		return defaults;
	},
	accessionColumn:function(overrides)
	{
		return this.createColumn({header: 'Accession', width: 80, dataIndex: 'accession', hideable: false, renderer: this.r.renderAccessionPopup, tooltip: this.t.accession}, overrides);
	},	
	tagsColumn:function(overrides)
	{
		return this.createColumn({header: 'Tags', sortable: false, width: 75, dataIndex: 'tags_name', renderer: this.r.renderTags, tooltip: this.t.tags}, overrides);
	},	
	groupsColumn:function(overrides)
	{
		return this.createColumn({header: 'Groups', sortable: false, width: 75, dataIndex: 'group_name', renderer: this.r.renderGroup, tooltip: this.t.group}, overrides);
	},
	deflineColumn:function(overrides)
	{
		return this.createColumn({header: 'Description', width: 300, dataIndex: 'defline', tooltip: this.t.description}, overrides);
	},
	taxonColumn:function(overrides)
	{
		return this.createColumn({header: 'Taxon', width: 75, dataIndex: 'taxon_name', renderer: this.r.renderTaxonPopup, tooltip: this.t.taxon}, overrides);
	},	
	strainColumn:function(overrides)
	{
		return this.createColumn({header: 'Strain', width: 50, dataIndex: 'strain', tooltip: this.t.strain}, overrides);
	},	
	geneColumn:function(overrides)
	{
		return this.createColumn({header: 'Gene', width: 40, dataIndex: 'gene', renderer: this.r.renderFamilyPopup, tooltip: this.t.gene}, overrides);
	},	
	productColumn:function(overrides)
	{
		return this.createColumn({header: 'Product', width: 50, dataIndex: 'product', tooltip: this.t.product}, overrides);
	},
	ntlengthColumn:function(overrides)
	{
		return this.createColumn({header: 'Nt', width: 40, align: 'right', dataIndex: 'ntlength', tooltip: this.t.ntlength, renderer: this.r.renderLength}, overrides);
	},
	aalengthColumn:function(overrides)
	{
		return this.createColumn({header: 'Aa', width: 40, align: 'right', dataIndex: 'aalength', tooltip: this.t.aalength, renderer: this.r.renderLength}, overrides);
	},
	sequenceColumn:function(overrides)
	{
		return this.createColumn({header: 'Sequence', width: 100, dataIndex: 'sequence', tooltip: this.t.sequence}, overrides);
	},
	translationColumn:function(overrides)
	{
		return this.createColumn({header: 'Translation',  dataIndex: 'translation', width: 100, tooltip: this.t.translation}, overrides);
	},
	truncatedColumn:function(overrides)
	{
		return this.createColumn({header: 'Truncated', width: 40, dataIndex: 'truncated', renderer: this.r.renderTruncated, tooltip: this.t.truncated}, overrides);
	},
	pseudogeneColumn:function(overrides)
	{
		return this.createColumn({header: 'Pseudogene', width: 40, dataIndex: 'pseudogene', renderer: this.r.renderPseudogene, tooltip: this.t.pseudogene}, overrides);
	},
	ratingColumn:function(overrides)
	{
		return this.createColumn({header: 'Rating', dataIndex: 'rating', renderer: this.r.renderRating, tooltip: this.t.rating}, overrides);
	},
	pathogen_dtypeColumn:function(overrides)
	{
		return this.createColumn({header: 'Type', dataIndex: 'pathogen_dtype', tooltip: this.t.pathogen_dtype}, overrides);
	},
	pathogenColumn:function(overrides)
	{
		return this.createColumn({header: 'Pathogen', dataIndex: 'pathogen_name', renderer: this.r.renderPathogenPopup, tooltip: this.t.pathogen}, overrides);
	},
	diseaseColumn:function(overrides)
	{
		return this.createColumn({header: 'Disease', dataIndex: 'disease_name', renderer: this.r.renderDiseasePopup, tooltip: this.t.disease}, overrides);
	},
	familyColumn:function(overrides)
	{
		return this.createColumn({header: 'Family', dataIndex: 'family_name', renderer: this.r.renderFamilyPopup, tooltip: this.t.family}, overrides);
	},
	orthologColumn:function(overrides)
	{
		return this.createColumn({header: 'Ortholog', dataIndex: 'ortholog_name', renderer: this.r.renderOrthologPopup, tooltip: this.t.ortholog}, overrides);
	},
	subgroupColumn:function(overrides)
	{
		return this.createColumn({header: 'Subgroup', dataIndex: 'subgroup_name', tooltip: this.t.subgroup}, overrides);
	},
	countryColumn:function(overrides)
	{
		return this.createColumn({header: 'Country', dataIndex: 'country_name', tooltip: this.t.country}, overrides);
	},
	subregionColumn:function(overrides)
	{
		return this.createColumn({header: 'Subregion', dataIndex: 'subregion', tooltip: this.t.subregion}, overrides);
	},
	refColumn:function(overrides)
	{
		return this.createColumn({header: 'Ref', dataIndex: 'ref_name', renderer: this.r.renderRef, tooltip: this.t.ref}, overrides);	  
	},
	isolateColumn:function(overrides)
	{
		return this.createColumn({header: 'Isolate', dataIndex: 'isolate', tooltip: this.t.isolate}, overrides);
	},
	isolation_sourceColumn:function(overrides)
	{
		return this.createColumn({header: 'Isolation source', dataIndex: 'isolation_source', tooltip: this.t.isolation_source}, overrides);
	},
	molwtColumn:function(overrides)
	{
		return this.createColumn({header: 'Mol. wt.', dataIndex: 'molwt', tooltip: this.t.molwt}, overrides);
	},
	segmentColumn:function(overrides)
	{
		return this.createColumn({header: 'Segment', dataIndex: 'segment', tooltip: this.t.segment}, overrides);
	},
	serotypeColumn:function(overrides)
	{
		return this.createColumn({header: 'Serotype', dataIndex: 'serotype', tooltip: this.t.serotype}, overrides);
	},
	serogroupColumn:function(overrides)
	{
		return this.createColumn({header: 'Serogroup', dataIndex: 'serogroup', tooltip: this.t.serogroup}, overrides);
	},
	serovarColumn:function(overrides)
	{
		return this.createColumn({header: 'Serovar', dataIndex: 'serovar', tooltip: this.t.serovar}, overrides);
	},
	subtypeColumn:function(overrides)
	{
		return this.createColumn({header: 'Subtype', dataIndex: 'subtype', tooltip: this.t.subtype}, overrides);
	},
	hostColumn:function(overrides)
	{
		return this.createColumn({header: 'Host', dataIndex: 'host', tooltip: this.t.host}, overrides);
	},
	lab_hostColumn:function(overrides)
	{
		return this.createColumn({header: 'Lab host', dataIndex: 'lab_host', tooltip: this.t.lab_host}, overrides);
	},
	specific_hostColumn:function(overrides)
	{
		return this.createColumn({header: 'Specific host', dataIndex: 'specific_host', tooltip: this.t.specific_host}, overrides);
	},
	plasmidColumn:function(overrides)
	{
		return this.createColumn({header: 'Plasmid', dataIndex: 'plasmid', tooltip: this.t.plasmid}, overrides);
	},
	codedbyColumn:function(overrides)
	{
		return this.createColumn({header: 'Coded by', dataIndex: 'codedby', tooltip: this.t.codedby}, overrides);
	},
	oldidColumn:function(overrides)
	{
		return this.createColumn({header: 'Old ID', dataIndex: 'oldid', tooltip: this.t.oldid}, overrides);
	},
	natypeColumn:function(overrides)
	{
		return this.createColumn({header: 'NA type', dataIndex: 'natype', tooltip: this.t.natype}, overrides);
	},
	cloneColumn:function(overrides)
	{
		return this.createColumn({header: 'Clone', dataIndex: 'clone', tooltip: this.t.clone}, overrides);
	},
	locationColumn:function(overrides)
	{
		return this.createColumn({header: 'Location', dataIndex: 'location', tooltip: this.t.location}, overrides);
	},
	locus_tagColumn:function(overrides)
	{
		return this.createColumn({header: 'Locus tag', dataIndex: 'locus_tag', tooltip: this.t.locus_tag}, overrides);
	},
	uniprotColumn:function(overrides)
	{
		return this.createColumn({header: 'UniProt', dataIndex: 'uniprot', tooltip: this.t.uniprot}, overrides);
	},
	udateColumn:function(overrides)
	{
		return this.createColumn({header: 'Udate', dataIndex: 'udate', tooltip: this.t.udate}, overrides);
	},
	// Pfam/pipeline related
	domainsColumn:function(overrides)
	{
		return this.createColumn({header: 'Domains', width: 100, dataIndex: 'domains', tooltip: this.t.domains}, overrides);
	},
	methodColumn:function(overrides)
	{
		return this.createColumn({header: 'Method', width: 70, dataIndex: 'method', tooltip: this.t.method}, overrides);
	},
	modelColumn:function(overrides)
	{
		return this.createColumn({header: 'Model', width: 40, dataIndex: 'model', tooltip: this.t.model}, overrides);
	},
	scoreColumn:function(overrides)
	{
		return this.createColumn({header: 'Score', width: 40, dataIndex: 'score', align: 'right', tooltip: this.t.score}, overrides);
	},
	evalueColumn:function(overrides)
	{
		return this.createColumn({header: 'E-value', width: 40, dataIndex: 'evalue', align: 'right', tooltip: this.t.evalue}, overrides);
	},
	// BLAST related
	numhspsColumn:function(overrides)
	{
		return this.createColumn({header: 'HSPs', width: 40, dataIndex: 'numhsps', align: 'right', tooltip: this.t.numhsps}, overrides);
	},
	hitevalueColumn:function(overrides)
	{
		return this.createColumn({header: 'E-value', width: 40, dataIndex: 'hitevalue', align: 'right', tooltip: this.t.hitevalue}, overrides);
	},
	hitbitscoreColumn:function(overrides)
	{
		return this.createColumn({header: 'Bit score', width: 50, dataIndex: 'hitbitscore', align: 'right', tooltip: this.t.hitbitscore}, overrides);
	},
	hitlengthColumn:function(overrides)
	{
		return this.createColumn({header: 'Hit length', width: 50, dataIndex: 'hitlength', align: 'right', tooltip: this.t.hitlength}, overrides);
	}
};
}());