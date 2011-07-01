/*global Ext */
Ext.define('hcv.view.Navigation', {
	constructor: function(config)
	{
		Ext.applyIf(config,
		{
			cur: 'none'
		});
		var tpl = new Ext.XTemplate(
			'<tpl for="sections">',
				'<h5>{label}</h5>',
				'<ul>',
				'<tpl for="links">',
					'<li <tpl if="name==this.cur">class="current"</tpl>>',
					'<a href="/vardb-hcv/{href}" title="{tooltip}">{[this.replaceSpaces(values.label)]}</a>',
					'</li>',
				'</tpl>',
				'</ul>',
			'</tpl>',
			'<h5>&nbsp;</h5>',
			{
				cur: config.cur,
				replaceSpaces: function(value)
				{
					return value.split(' ').join('&nbsp;');
				}
			}
		);
		if (Ext.get(config.renderTo)!==null && config.data!==null)
			{tpl.overwrite(config.renderTo, config.data);}
	}
});
