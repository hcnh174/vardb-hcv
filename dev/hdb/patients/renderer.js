/*global Ext, nelson, hdb, window */
(nelson.hdb.patients.Renderer=function(){	return {

	renderAccession:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/sequences/{0}.html" target="_blank">{1}</a>', r.data.identifier, value);
	},
	
	renderAccessionPopup:function(value, p, r)
	{
		return String.format('<a href="javascript:void(0)" onclick="hdb.sequencePopup(\'{0}\')">{1}{2}</a>',
			r.data.identifier, value, (r.data.uploaded?'*':''));
	},

	renderTaxon:function(value, p, r)
	{
		return String.format('<a href="http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id={0}&lvl=3&lin=f&keep=1&srchmode=1&unlock" target="_blank">{1}</a>', r.data.taxon_identifier, value);
	},
	
	renderTaxonPopup:function(value, p, r)
	{
		var identifier=r.data.taxon_identifier ? r.data.taxon_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.taxonPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderPathogen:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/pathogens/{0}.html">{1}</a>', r.data.pathogen_identifier, value);
	},
	
	renderPathogenPopup:function(value, p, r)
	{
			var identifier=r.data.pathogen_identifier ? r.data.pathogen_identifier : r.data.identifier;
	return String.format('<a href="javascript:void(0)" onclick="hdb.pathogenPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderFamily:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/families/{0}.html">{1}</a>', r.data.family_identifier, value);
	},
	
	renderFamilyPopup:function(value, p, r)
	{
			var identifier=r.data.family_identifier ? r.data.family_identifier : r.data.identifier;
	return String.format('<a href="javascript:void(0)" onclick="hdb.familyPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderSubgroup:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/subgroups/{0}.html">{1}</a>', r.data.subgroup_identifier, value);
	},
	
	renderSubgroupPopup:function(value, p, r)
	{
		var identifier=r.data.subgroup_identifier ? r.data.subgroup_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.subgroupPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderGenome:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/genomes/{0}.html">{1}</a>', r.data.genome_identifier, value);
	},
	
	renderGenomePopup:function(value, p, r)
	{
		var identifier=r.data.genome_identifier ? r.data.genome_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.genomePopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderGenomeBrowser:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/browser.html?genome={0}">{1}</a>', r.data.genome_identifier, value);
	},
	
	renderChromosomePopup:function(value, p, r)
	{
		var identifier=r.data.chromosome_identifier ? r.data.chromosome_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.chromosomePopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderOrtholog:function(value, p, r)
	{
		if (r.data.ortholog_identifier==='')
			{return '';}
		return String.format('<a href="'+hdb.webapp+'/orthologs/{0}.html">{1}</a>', r.data.ortholog_identifier, value);
	},
	
	renderOrthologPopup:function(value, p, r)
	{
		var identifier=r.data.ortholog_identifier ? r.data.ortholog_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.orthologPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderDisease:function(value, p, r)
	{
		return String.format('<a href="'+hdb.webapp+'/diseases/{0}.html">{1}</a>', r.data.disease_identifier, value);
	},
	
	renderDiseasePopup:function(value, p, r)
	{
		var identifier=r.data.disease_identifier ? r.data.disease_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.diseasePopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderTruncated:function(value, p, r)
	{
		return r.data.truncated===true ? 'truncated' : '';
	},
	
	renderPseudogene:function(value, p, r)
	{
		return r.data.pseudogene===true ? 'pseudogene' : '';
	},

	renderRef:function(value, p, r)
	{
		return nelson.hdb.patients.Renderer.renderRefPopup(value,p,r);
	},
	
	renderRefPopup:function(value, p, r)
	{
		var identifier=r.data.ref_identifier ? r.data.ref_identifier : r.data.identifier;
		return String.format('<a href="javascript:void(0)" onclick="hdb.refPopup(\'{1}\')">{0}</a>', value, identifier);
	},
	
	renderModel:function(value, p, r)
	{
		return String.format('<a href="http://pfam.sanger.ac.uk/family?acc={0}" target="_blank">{0}</a>', value);
	},
	
	renderLength:function(value, p, r)
	{
		if (value===0)
			{return "";}
		else {return value;}
	},
	
	renderEmail:function(value, p, r)
	{
		return String.format('<a href="mailto:{0}">{0}</a>',value);
	},
	
	renderTags:function(value, p, r, list_id)
	{
		if (!r.data.tags_name)
			{return '';}
		var tags_id=r.data.tags_id.split(',');
		var tags_name=r.data.tags_name.split(',');
		var tags_description=r.data.tags_description.split(',');		
		var tags_color=r.data.tags_color.split(',');
		var tags_bgcolor=r.data.tags_bgcolor.split(',');		
		var tags_bundle=r.data.tags_bundle.split(',');
		var tags_readonly=r.data.tags_readonly.split(',');		
		var index, buffer=[], tag_id, tag_name, description, color, bgcolor, bundle_name, readonly, str, style, title;
		for (index=0;index<tags_name.length;index++)
		{
			tag_id=tags_id[index];
			tag_name=tags_name[index];
			description=tags_description[index];			
			color=tags_color[index];
			bgcolor=tags_bgcolor[index];
			readonly=tags_readonly[index];
			if (readonly==='true')
			{
				color='gray';
				bgcolor='white';
			}
			style='color:'+color+';background-color:'+bgcolor+';';
			bundle_name=tags_bundle[index]+' bundle';
			readonly=tags_readonly[index];
			title='['+bundle_name+']';
			if (description!=='')
				{title+=': '+description;}
			str='<a href="javascript:void(0)" onclick="nelson.hdb.patients.tags.Services.editTag(\''+tag_id+'\')"'+
				' style="'+style+'" title="'+title+'">'+tag_name+'</a>';
			buffer.push(str);
		}
		return buffer.join(', ');
	},
	
	renderGroup:function(value, p, r)
	{
		if (!r.data.group_name)
			{return '';}
		var style='color:'+r.data.group_color+';background-color:'+r.data.group_bgcolor+';';
		var title=r.data.group_description || r.data.group+name;
		var str='<a href="javascript:void(0)" onclick="nelson.hdb.patients.Vardb.editGroup(\''+r.data.group_id+'\')"'+
			' style="'+style+'" title="'+title+'">'+r.data.group_name+'</a>';
		return str;
	},
	
	chunkSequence:function(sequence,max)
	{
		max = max || 80;		
		function Chunk(str,index)
		{
			var start=index*max;
			var end=start+max;
			if (end>str.length)
				{this.line=str.substring(start);}
			else {this.line=str.substring(start,end);}
		}		
		var chunks=[], index;		
		var numchunks=Math.floor(sequence.length/max);
		if (sequence.length%max > 0)
			{numchunks++;}	
		for (index=0;index<numchunks;index++)
		{
			chunks.push(new Chunk(sequence,index));
		}
		return chunks;
	},
	
	formatSequence:function(value)
	{
		var index,aa,str='';
		for (index=0;index<value.length;index++)
		{
			aa=value.substring(index,index+1);
			str+='<span class="'+aa.toUpperCase()+'">'+aa+'</span>';
		}
		return str;
	},
	
	renderGenbankAccession:function(value, p, r)
	{
		return String.format('<a href="http://www.ncbi.nlm.nih.gov/protein/{0}" target="_blank">{0}</a>',value);
	},
	
	renderNameLink:function(value, p, r)
	{
		return String.format('<a href="#">{0}</a>', value);
	}
};}());
