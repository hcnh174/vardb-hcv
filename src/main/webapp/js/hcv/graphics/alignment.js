
var alignmentdata=
[
	{
		id: 0, 
		identifier: 'PB402406.00.0',
		accession: 'PB402406.00.0',
		translation: 'EERYEHLPSYEFYNKLNENVSDEDKEKPNKYWKRIEPIFEPSEWVREIVYKLHRNVTFLNENRDDDKLYGKHCYDLNYWLYEQVYKNSDLNDNSLSFFITLDILLNSWENMNADKFNGNKDICQPDNTLVDINYLKEIKYLADYVENFETIKSAAIEDTNKACNAYIDYLRSAIPAYYEWNTVCTIEEENICNKYIRDYEKYNPKGVLCNLSVTGLAVA',
		aligned: '0+32,22+68,27+53,219+210'
	},
	{
		id: 1, 
		identifier: 'PB106914.00.0',
		accession: 'PB106914.00.0',
		translation: 'MLFLNDLLLKARILRINCKLFYFLYFLKNYTLEERYEHLPSYEFYNKLNENVSDEDKEKPNKYWKRIEPIFEPSEWVREIVYKLHRNVTFLNENRDDDKLYGKHCYDLNYWLYEQVYKNSDLNDNSLSFFITLDILLNSWENMNADKFNGNKDICQPDNTLVDINYLKEIKYLADYVENFETIKSAAIEDTNKACNAYIDYLRSAIPAYYEWNTVCTIEEENICNKYIRDYEKYNPKGVLCNLSVTGLAVA',
		aligned: '54+68,59+53,251+210'
	},
	{
		id: 2, 
		identifier: 'PY06119',
		accession: 'PY06119',
		translation: 'MEEEERYEHLPSYEFYNKLNENVPDEDKEKPNKYWKRIEPIFEPSEWVREIVYKLQRNVTFLNENRDGDKLYGKHCYDLNYWLYEQVYKNSGLNDNSLSFFITLDILLNSWENMNADKFNGNKDICQPDNTLVDINYLKEIKYLADYVENFETIKSAAIEDTNKACNVYIDYLRSAIPAYYEWNTVCTIDEENLCNKYIRDYEKYNPKGVLCNLSVTGLAFAQLFNQCYKSIVNIFINVNNAPVRTTIKLRNGLETISYGITENKGRTLSEVETAIQEPADFLAYLIYILKSISKIVKSTSNVQNRSQNTQAEIPL',
		aligned: '0+29,25+68,30+53,316+116'
	},
	{
		id: 3, 
		identifier: 'PC400436.00.0',
		accession: 'PC400436.00.0',
		translation: 'MNADQFNGEKDICQPDNTLIDINYLKEIKYLGDYVENFDTIKSAAIEDTNKACNVYIDYLRYAIPAYYEWNKLCTLEEENLCNKYIHDYEKYDPKGVLSNLSVTGLAFAQLFNKCYKNIVSIFLSTNNASERTTIKLRNGLETISYGITESQGRSLSEVGIPIEEKSDFFSPIIYFFNSIYSTISEIYINSYNDIILLIVLFSGILITFFGVNKVKKKIFIPL',
		aligned: '0+263,216+3,220+15,223+78'
	},
	{
		id: 4, 
		identifier: 'PCAS_010120',
		accession: 'PCAS_010120',
		translation: 'MEEEEKYEYLPAYEFYSKLNENVAEEDKEKPNKYWKRIEPIFEPSERVRDIVYKLQRNVTLLNENRGEDQLYVKHCYDLNYWLYEQVYKSFNLNENSIHFFMTLDILLNSWENMNADQFNGEKDICQPDNTLIDINYLKEIKYLGDYVENFDTIKSAAIEDTNKACNVYIDYLRYAIPAYYEWNKLCTLEEENLCNKYIHDYEKYDPKGVLSNLSVTGLAFAQLFNKCYKNIVSIFLSTNNASERTTIKLRNGLETISYGITESQGRSLSEVGIPIEEKSDFFSPIIYFFNSIYSTISEIYINSYNDIILLIVLFSGILITFFGVNKITKIIKSTSNEQNRNQNTREEISL',
		aligned: '0+29,25+68,30+53,329+3,351+78'
	},
	{
		id: 5, 
		identifier: 'PKH_114850',
		accession: 'PKH_114850',
		translation: 'MKKDPKYKDLPSQIYYDKLNEDIVQDDEENEEPEVNEDHGENEEHEINDELEGNEENEEHDEYGENEEHDEYEENEGNEENEGNEEHEENEEHEENEEHDEYEENEGNEEHDEYEENEGNEEHDEYEENEEYAEHGRNDELEVNKGNKGSAKNVYWEAMKGSYEQTPWVRDVFFKLERNITELNGNSSEDILRKKHCYDLNYWLYEQVYENLNKNENDENFFKIIDDLQGAWKNINNDKFANADNICHPDKTLVDMKYLEDVKDLFDLIEDHSTIKAAAINDTKNACLKYIDYLKIKVPLYYEWNNICTMEEENICTKYIDDYSKYDPKNVLENLSVVSLALASIFNDCYQNIINLFTEAEKIEPRTVLKQRGITGESENNVVKTGGRILAEHVSDTSESANMLTGVNTLATSPFPMTKRISPCVFNQVVLLVISFLSLLLFVHSIYKFILIGKYIFDTYKGVENKCTRCKSDDSEDDEEEEEEEEEDDEDDDEEEEGDEEDEDDEDDDDDDSDSNSALKSSFRKWSLNSHS',
		aligned: '0+29,492+13,507+7,532+1'
	},
	{
		id: 6, 
		identifier: 'PVX_113230',
		accession: 'PVX_113230',
		translation: 'MEKDPKYKDLPSQIYYDKLNEDIIEEEDDEHEENEESQENVYWEAIEGSYEQTPWVRDVFFKLERNLTEINESRGEDSLSKKHCYDLNYWLYEQVYENLNNNENDENFFKIIDGLQNAWTNINNDKFPNADNICHPDKTLVDMKYLKDVKHLFDFIEDFSTIKTAAIKDTNNACQKYIDYLKLKVPLYYEWNDVCTMEEENICTKYIDDYPKYNPKNVLENLSVVSLALASIFNDCYQNIINLFTEAEKIEPRTVLKHRDITGPSESNVVKIGGRALAEAISDTSQSGNMLIGINALATSLFSVVKRFNSYVFSLVAPVGLSLLGLLLFLYVLYKFTPIGKSISRTHKRVKNKFVRNKRDDFDDDEDDDDDDSDNSSDLKSSSSMESLLNNYNNVKKGDDKWFLDRDMVYNLSFENEEAHFVNGEFVGEFSAWLKGSNVR',
		aligned: '0+29,25+62,36+51,439+0'
	}
];

Ext.define('hcv.graphics.Alignment',
{	
	seqheight: 10,
	seqcolor: 'red',
	
	constructor: function(config)
	{
		var drawing = Ext.create('Ext.draw.Component',
		{
			//autoSize: true,
			width: 500,
			height: 400,			
			padding: 40,
			draggable: {constrain: false},
			floating: true,
			viewBox: false,
			renderTo: Ext.getBody(),
			items: this.drawAlignment(config.data)
		});
	},
	
	drawAlignment: function(sequences)
	{
		var items=[];
		for (index=0;index<sequences.length;index++)
		{
			var seq=sequences[index];
			items.push(this.drawSequence(seq,index*this.seqheight,this.seqheight));		
		}
		return items;
	},
	
	drawSequence:function(seq, y, height)
	{
		var buf=[], x=0, index, part, position, numaas, numgaps;
		var parts=seq.aligned.split(',');
		for (index=0;index<parts.length;index++)
		{
			part=parts[index];
			numaas=parseInt(part.substring(0,part.indexOf('+')),10);
			numgaps=parseInt(part.substring(part.indexOf('+')+1),10);
			buf.push(utils.getRectPath(x,y,numaas,height));
			x+=numaas+numgaps;
		}
		return {type: 'path', path: buf.join(' '), fill: this.seqcolor};
	},
	
	repeatString:function(str,numtimes)
	{
		var buf=[];
		var index;
		for (index=0;index<numtimes;index++)
		{
			buf.push(str);
		}
		return buf.join('');
	}
});