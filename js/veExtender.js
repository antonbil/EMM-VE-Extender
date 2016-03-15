
function loadEMMExtender(){
  defineTranslations();
  addEMMLinks();
  addEMMResources();
  loadExtenderUI();
}

mw.hook( 've.activationComplete' ).add( function() {
	// Register plugins to VE. will be loaded once the user opens the VE
  //redefine what tools will be initially available in the insert-menu
  ve.ui.toolFactory.bindings.register[6].context.forceExpand= [ 'media', 'insertTable' ,'linkpage' ,'linkwebsite' ,'linkreference'];
  loadEMMExtender();
  /*  if (typeof ve === 'undefined') {
      setTimeout(function() { mw.loader.using( 'ext.visualEditor.viewPageTarget.init',loadEMMExtender); }, 1000);
      console.log('ve undefined'); 
      return;
    }else loadEMMExtender();*/
} );

