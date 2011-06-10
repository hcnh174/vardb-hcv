/*global Ext, utils, alert, hcvDirect */
Ext.define('hcv.Hcv',
{		
	statics:
	{
		getTerm:function(identifier)
		{
			hcvDirect.getTerm(identifier, function(result,evt)
			{
				var popup=new hcv.popups.TermPopup({term: result});
		    });
		},
		
		testFeature:function()
		{
			//new vardb.graphics.Alignment({data: alignmentdata});
			new hcv.graphics.Sequence({data: {}});
			//new vardb.graphics.Location('1..5382,6287..7528',400);
		}
	}
});
