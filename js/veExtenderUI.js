function loadExtenderUI(){

	/* remove some menu items */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-link').remove(); /* Link */
	$('.oo-ui-toolbar-tools').find('.ve-test-toolbar-cite').remove(); /* Cite */
	$('.ve-test-toolbar-insert').find('.oo-ui-tool-name-referencesList').remove();  /* References list */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-meta').remove(); /* Page options > Options */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-settings').remove(); /* Page options > Page Settings */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-advancedSettings').remove(); /* Page options > Advanced settings */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-categories').remove(); /* Page options > Categories */
	$('.oo-ui-toolbar-tools').find('.oo-ui-tool-name-languages').remove(); /* Page options > Languages */
	//re-order elements in 'invoegen-menu'
	//todo: reorder menu-items. Mind: allowCollapse
	/*jQuery(".oo-ui-tool-name-process-linkreference").detach().appendTo('.oo-ui-tool-name-media');
	jQuery(".oo-ui-tool-name-process-linkreference").show();
	jQuery(".oo-ui-tool-name-process-linkwebsite").detach().appendTo('.oo-ui-tool-name-media');
	jQuery(".oo-ui-tool-name-process-linkpage").detach().appendTo('.oo-ui-tool-name-media');
	jQuery(".oo-ui-tool-name-process-comment").detach().appendTo('.oo-ui-tool-name-gallery');
	jQuery(".oo-ui-tool-name-process-transclusion").detach().appendTo('.oo-ui-tool-name-gallery');*/
}
