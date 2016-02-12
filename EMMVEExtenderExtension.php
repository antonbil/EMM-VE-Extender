<?php
//global $SMWServerURLForSPARQLQuery;
//$SMWServerURLForSPARQLQuery = 'http://192.168.238.133/index.php/Speciaal:URIResolver';
/*
call within a widget with javascript:
<noinclude>
Dit is de EM3DNavigator Widget.
You have to include the script d3.v3.js with the script-tag because it is used in document.ready
</noinclude>
<includeonly>
<script src="../extensions/EM3DNavigator/js/d3.v3.js" charset="utf-8"></script>
<script type="text/javascript">
$(document).ready(function() {
mw.loader.using( ['ext.EM3DNavigator']).done( function () {
//makeCollapsible gives error. Side-effect: error concerning makeCollapsible disappears
}
);//mw.loader

});//document.ready
</script>
</includeonly>
*/
$wgExtensionCredits['semantic'][] = array(

	'path' => __FILE__,

	// The name of the extension, which will appear on Special:Version.
	'name' => 'EMM VE Extension',

	// A description of the extension, which will appear on Special:Version.
	'description' => 'EMM VE Extension',

	// Alternatively, you can specify a message key for the description.
	//'descriptionmsg' => 'vueconvertapi-desc',

	// The version of the extension, which will appear on Special:Version.
	// This can be a number or a string.
	'version' => 0.51, 

	// Your name, which will appear on Special:Version.
	'author' => 'Anton Bil',

	// The URL to a wiki page/web page with information about the extension,
	// which will appear on Special:Version.
	'url' => 'https://www.mediawiki.org/wiki/API:Extensions',

);

$wgResourceModules['ext.EMMVEExtension'] = array(
	'scripts' =>  array('js/veAutocomplete.js','js/veExtender.js'),
	'styles' => array ('css/veExtender.css'),
	'position' => 'top',

	'localBasePath' => __DIR__,
	'remoteExtPath' => 'EMM-VE-Extender',
);


?>




