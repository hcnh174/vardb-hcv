/*global Ext, nelson, utils, alert, HdbDirect */
(nelson.hdb.Hdb=function()
{	
	var webapp=utils.webapp;
	
	// init code
	Ext.BLANK_IMAGE_URL = webapp+'/images/extjs/s.gif';
	Ext.ux.GridPrinter.stylesheetPath=webapp+'/css/printgrid.css';
	Ext.Ajax.timeout=600000;
	
	return {
	
	webapp: '/hdb', //utils.webapp,
	chartswf: this.webapp+'/images/extjs/charts.swf',
	
	onReady:function()
	{
		Ext.QuickTips.init();
		utils.createSpinner();
		Ext.Direct.addProvider(HdbDirect);
	}
};}());

var hdb=nelson.hdb.Hdb;
