/*global Ext, vardb */
Ext.define('Ext.ux.vardb.LiveSequenceGrid',
{
	extend: 'Ext.ux.grid.livegrid.GridPanel',
	region: 'center',
	layout: 'fit',
	stripeRows: true,	
	bufferSize: 90, //90
	nearLimit: 30, // 30
	
	initComponent:function()
	{
		var counts=this.counts;
		var list_id=this.list_id;
		
		this.isVirus=(counts.numdivisions===1 && counts.divisions[0].identifier==='VIRUS');
		this.isLow=(counts.numratings===1 && counts.ratings[0].identifier==='L1');
		this.isCore=(counts.numsources===1 && counts.sources[0].identifier==='core');		
		
		var fields=
		[
			{name: 'sequence_id'},
			{name: 'identifier'},
			{name: 'accession'},
			{name: 'uploaded', type: 'boolean'},
			//{name: 'rating'},
			{name: 'taxon_identifier'},
			{name: 'taxon_name'},
			{name: 'pathogen_identifier'},
			{name: 'pathogen_name'},
			{name: 'pathogen_dtype'},
			{name: 'family_identifier'},
			{name: 'family_name'},
			{name: 'subgroup_identifier'},
			{name: 'subgroup_name'},
			{name: 'ortholog_identifier'},
			{name: 'ortholog_name'},
			{name: 'disease_identifier'},
			{name: 'disease_name'},
			{name: 'country_identifier'},
			{name: 'country_name'},
			{name: 'ref_identifier'},
			{name: 'ref_name'},		
			{name: 'strain'},
			{name: 'isolate'},
			{name: 'isolation_source'},
			{name: 'molwt'},
			{name: 'subregion'},
			{name: 'segment'},
			{name: 'serotype'},
			{name: 'serogroup'},
			{name: 'serovar'},
			{name: 'subtype'},
			{name: 'host'},
			{name: 'lab_host'},
			{name: 'specific_host'},
			{name: 'plasmid'},
			{name: 'codedby'},
			{name: 'oldid'},
			{name: 'natype'},
			{name: 'clone'},		
			{name: 'pseudogene'},
			{name: 'truncated'},
			{name: 'location'},
			{name: 'domains'},
			{name: 'locus_tag'},
			{name: 'defline'},
			{name: 'gene'},
			{name: 'product'},
			{name: 'uniprot'},
			{name: 'udate'},
			{name: 'ntlength', type: 'int'},
			{name: 'aalength', type: 'int'},
			{name: 'method'},
			{name: 'model'},
			{name: 'score'},
			{name: 'evalue'},
			{name: 'sequence'},
			{name: 'translation'},
			
			{name: 'group_id'},
			{name: 'group_name'},
			{name: 'group_description'},
			{name: 'group_color'},
			{name: 'group_bgcolor'},
			
			{name: 'tags_id'},
			{name: 'tags_name'},		
			{name: 'tags_description'},
			{name: 'tags_color'},
			{name: 'tags_bgcolor'},
			{name: 'tags_bundle'},
			{name: 'tags_readonly'}
		];

		var reader = new Ext.ux.grid.livegrid.JsonReader(
		{
			root: 'sequences',
			totalProperty: 'totalCount',
			idProperty: 'sequence_id',
			fields: fields
		});

		var store = new Ext.ux.grid.livegrid.Store(
		{		
			url: vardb.webapp+'/ajax/lists/page.json',
			reader: reader,
			bufferSize : this.bufferSize,
			remoteSort: true,
			//autoLoad : true,
			sortInfo: {field: 'accession', direction: 'ASC'},
			baseParams: {list_id: list_id, filter: ''}
		});

		var sm = new Ext.ux.grid.livegrid.RowSelectionModel();

		var view = new Ext.ux.grid.livegrid.GridView(
		{
			nearLimit: this.nearLimit,
			forceFit: true,
			loadMask: {msg: 'Please wait...'}
		});
		
		/*
		var view = new Ext.ux.grid.livegrid.GridView(
		{
			nearLimit: this.nearLimit,
			//forceFit: true,
			loadMask: {msg: 'Buffering: Please wait...'}
		});
		*/
		
		var r=Ext.ux.vardb.Renderer;

		function renderTags(value, p, r)
		{
			return Ext.ux.vardb.Renderer.renderTags(value,p,r,list_id);
		}
		
		var builder=Ext.ux.vardb.ColumnBuilder;
		
		var columns=
		[
			new Ext.grid.RowNumberer({header: 'Row', width: 40}),
			builder.accessionColumn(),
			builder.tagsColumn({hidden: true, renderer: renderTags}),
			builder.groupsColumn({hidden: true}),
			builder.taxonColumn({hidden: true}),
			builder.orthologColumn(),//{hidden: (counts.numorthologs<1)}),
			builder.geneColumn({hidden: true}),
			builder.deflineColumn(),
			builder.ntlengthColumn({hidden: true}),
			builder.translationColumn({hidden: true}),//{hidden: this.isCore}),
			builder.aalengthColumn({hidden: true}),//{hidden: this.isCore}),
			builder.truncatedColumn({hidden: true}),//{hidden: (counts.truncated===0)}),
			builder.pseudogeneColumn({hidden: true}),//{hidden: (counts.pseudogenes===0)}),
			//builder.ratingColumn({hidden: (counts.numratings===1)}),
			builder.pathogen_dtypeColumn({hidden: true}),//{hidden: (counts.numdivisions<1)}),			
			builder.pathogenColumn({hidden: true}),//{hidden: (counts.numpathogens<1)}),
			builder.diseaseColumn({hidden: true}),//{hidden: (counts.numdiseases<1)}),
			builder.familyColumn({hidden: true}),//{hidden: (counts.numfamilies<1)}),
			builder.subgroupColumn({hidden: true}),//{hidden: (counts.numsubgroups<1)}),
			builder.countryColumn({hidden: (counts.numcountries<1)}),
			builder.subregionColumn({hidden: true}),//{hidden: (counts.numcountries<1)}),
			builder.refColumn({hidden: true}),//{hidden: (counts.numrefs<=1)}),
			builder.isolateColumn({hidden: true}),
			builder.isolation_sourceColumn({hidden: true}),
			builder.molwtColumn({hidden: true}),//{hidden: !this.isVirus}),
			builder.strainColumn({hidden: true}),//{hidden: !this.isVirus}),
			builder.segmentColumn({hidden: true}),//{hidden: !this.isVirus}),
			builder.serotypeColumn({hidden: true}),//{hidden: !this.isVirus}),		
			builder.serovarColumn({hidden: true}),//{hidden: !this.isVirus}),
			builder.subtypeColumn({hidden: true}),//{hidden: !this.isVirus}),
			builder.hostColumn({hidden: true}),
			builder.lab_hostColumn({hidden: true}),
			builder.specific_hostColumn({hidden: true}),
			builder.plasmidColumn({hidden: true}),
			builder.codedbyColumn({hidden: true}),
			builder.oldidColumn({hidden: true}),
			builder.natypeColumn({hidden: true}),
			builder.cloneColumn({hidden: true}),
			builder.locationColumn({hidden: true}),
			builder.locus_tagColumn({hidden: true}),
			builder.productColumn({hidden: true}),
			builder.uniprotColumn({hidden: true}),
			builder.udateColumn({hidden: true}),
			builder.domainsColumn({hidden: true}),//{hidden: this.isLow}),
			builder.methodColumn({hidden: true}),//)//{hidden: this.isLow}),
			builder.modelColumn({hidden: true}),//{hidden: this.isLow}),
			builder.scoreColumn(),//{hidden: this.isLow}),
			builder.evalueColumn()//{hidden: this.isLow})
		];
		
		var config=
		{
			store: store,
			sm: sm,
			view: view,
			columnLines: true,
			loadMask: {msg: 'Loading...'},
			//plugins: ['autosizecolumns'], //filters
			colModel: new Ext.grid.ColumnModel(
			{
				columns: columns,
				defaults: {sortable: true}
			}),
			tbar: new Ext.ux.grid.livegrid.Toolbar(
			{
				view: view,
				displayInfo: true,
				items: this.toolbaritems
			})
		};
		
		Ext.apply(this, Ext.apply(this.initialConfig, config));
		Ext.ux.vardb.LiveSequenceGrid.superclass.initComponent.apply(this, arguments);
	},
	
	onRender:function()
	{
		Ext.ux.vardb.LiveSequenceGrid.superclass.onRender.apply(this, arguments);
		this.store.load();
	},
	
	getSelectedIds:function()
	{
		var rows=this.getSelectionModel().getSelections();
		var ids=[],index;
		for (index=0;index<rows.length;index++)
		{
			ids.push(rows[index].id);
		}
		return ids;
	},
	
	filterTable:function(filter)
	{
		this.store.baseParams.filter=filter;
		this.store.reload();
	},
	
	reloadTable:function()
	{
		this.store.reload();
	},

	addToolbarMenu:function(item)
	{
		var toolbar=this.getTopToolbar();
		toolbar.insert(toolbar.items.getCount()-2,item);
		toolbar.doLayout();
	},
	
	createCartMenu:function()
	{
		var self=this;		
		var menu=
		{
			text: 'Cart',
			menu:
			{
				items:
				[
					{text: 'Add to cart', scope: this, handler: function(btn){this.addToCart();}},
					{text: 'Add to new cart', scope: this, handler: function(btn){this.addToNewCart();}},
					'-',
					{text: 'Open cart', handler: function(btn){Ext.ux.vardb.Cart.cart();}},
					{text: 'Empty cart',handler: function(btn){Ext.ux.vardb.Cart.emptyCart();}}
				]
			}
		};
		return menu;
	},
	
	createSortMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Sort',
			handler: function(btn){var dialog=new Ext.ux.vardb.SortDialog({grid: self});}
		};
		return menu;
	},
	
	createTagMenu:function()
	{
		var self=this;
		var menu=
		{
			text: 'Tags',
			menu:
			{
				items:
				[
					{
						text: 'Tag sequences',
						handler: function()
						{
							var dialog=new Ext.ux.vardb.tags.ApplyTagDialog(
							{
								grid: self,
								callback: function(tag){self.store.reload();}
							});
						}
					},
					{
						text: 'Un-tag sequences',
						handler: function()
						{
							var dialog=Ext.ux.vardb.tags.Services.untagSequences(self,function(){
								self.reloadTable();
							});
						}
					},
					'-',
					{
						text:' Tag cloud',
						scope: self,
						handler: function(){Ext.ux.vardb.Cart.createTagCloud(self);}
						//handler: function(){self.createTagCloud();}
					}
				]
			}
		};
		return menu;
	},
	
	createDownloadMenu:function()
	{
		var self=this;
		var downloadMenu=
		{
			text: 'Download',
			menu:
			{
				items:
				[
					{
						text: 'Sequences',
						handler: function(btn){var dialog=new Ext.ux.vardb.DownloadSequencesDialog({grid: self});}
					},
					{
						text: 'Table',
						handler: function(btn){var dialog=new Ext.ux.vardb.DownloadPropertiesDialog({grid: self});}
					}
				]
			}
		};
		return downloadMenu;
	},
	
	/*
	createTagCloud:function()
	{
		Ext.ux.vardb.tags.Services.createTagCloudFromFilter(this.store.baseParams.filter);
	},
	*/
	
	addToCart:function()
	{
		var ids=this.getSelectedIds();
		var filter=this.store.baseParams.filter;
		if (ids.length>0)
			{Ext.ux.vardb.Cart.addSequencesToCart(ids);}
		else {Ext.ux.vardb.Cart.addFilterToCart(this.list_id,filter);}
	},
	
	addToNewCart:function()
	{
		var ids=this.getSelectedIds();
		var filter=this.store.baseParams.filter;
		if (ids.length>0)
			{Ext.ux.vardb.Cart.addSequencesToNewCart(ids);}
		else {Ext.ux.vardb.Cart.addFilterToNewCart(this.list_id,filter);}
	},
	
	////////////////////////////////////////////////////////////////////
	
	createSummaryMenu:function()
	{
		var self=this;
		var summaryMenu=
		{
			text: 'Summarize',
			menu:
			{
				items:
				[
					{
						text: 'Summarize',
						handler: function(){Ext.ux.vardb.Vardb.summarize(self);}
					},
					{
						text: 'Summarize by group',
						handler: function()
						{
							Ext.ux.vardb.Cart.summarizeGroups(self);
						}
					},
					'-',
					{
						text: 'NT sequence lengths',
						handler: function(){Ext.ux.vardb.Vardb.lengthHistogram(self,'NT');}
					},
					{
						text: 'AA sequence lengths',
						handler: function(){Ext.ux.vardb.Vardb.lengthHistogram(self,'AA');}
					}
				]
			}
		};
		return summaryMenu;
	}
});
