function addEMMResources(){
     var toolFactory = new OO.ui.ToolFactory();
     var toolGroupFactory = new OO.ui.ToolGroupFactory();
     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );

     // Register two more tools, nothing interesting here
     function AddPageTool() {
         AddPageTool.parent.apply( this, arguments );
     }
     OO.inheritClass( AddPageTool, OO.ui.Tool );
     AddPageTool.static.name = 'addpage';
     AddPageTool.static.icon = 'source';
     AddPageTool.static.title = OO.ui.deferMsg( 'visualeditor-emm-menuaddpagetitle' )();
     AddPageTool.prototype.onSelect = function () {
         //alert( 'AddPage tool clicked!' );
       console.log(ve.ui);
       //ve.init.target.getSurface().execute( 'window', 'open', 'addresourcedialog', null );
       processResult();
         this.setActive( false );
     };
     toolFactory.register( AddPageTool );

     function AddHyperlinkTool() {
         AddHyperlinkTool.parent.apply( this, arguments );
     }
     OO.inheritClass( AddHyperlinkTool, OO.ui.Tool );
     AddHyperlinkTool.static.name = 'addhyperlink';
     AddHyperlinkTool.static.icon = 'source';
     AddHyperlinkTool.static.title = OO.ui.deferMsg( 'visualeditor-emm-menuaddhyperlinktitle' )();
     AddHyperlinkTool.prototype.onSelect = function () {
       //ve.init.target.getSurface().execute( 'window', 'open', 'addhyperlinkdialog', null );
         var totaladdress=window.location.href;
	  var startaddress= totaladdress.substr(0, totaladdress.indexOf('index.php')); 
	  var pagename=mw.config.get( 'wgPageName' )
	  var win = window.open(startaddress+'index.php/Special:FormEdit/Resource_Hyperlink?Resource_Description%5Bcreated+in+page%5D='+pagename, '_blank');
	  if(win){
	      //Browser has allowed it to be opened
	      win.focus();
	  }else{
	      //Broswer has blocked it
	      alert('Please allow popups for this site');
	  }
         this.setActive( false );
     };
     toolFactory.register( AddHyperlinkTool );

     function AddInternalDocumentTool() {
         AddInternalDocumentTool.parent.apply( this, arguments );
     }
     OO.inheritClass( AddInternalDocumentTool, OO.ui.Tool );
     AddInternalDocumentTool.static.name = 'addinternaldocument';
     AddInternalDocumentTool.static.icon = 'source';
     AddInternalDocumentTool.static.title = OO.ui.deferMsg( 'visualeditor-emm-menuaddinternaldocumenttitle' )();
     AddInternalDocumentTool.prototype.onSelect = function () {
         var totaladdress=window.location.href;
	  var startaddress= totaladdress.substr(0, totaladdress.indexOf('index.php')); 
	  var pagename=mw.config.get( 'wgPageName' )
	  var win = window.open(startaddress+'index.php/Special:FormEdit/Resource_Light?Resource_Description%5Bcreated+in+page%5D='+pagename, '_blank');
	  if(win){
	      //Browser has allowed it to be opened
	      win.focus();
	  }else{
	      //Broswer has blocked it
	      alert('Please allow popups for this site');
	  }
         this.setActive( false );
     };
     toolFactory.register( AddInternalDocumentTool );

     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
     // used once (but not all defined tools must be used).
     toolbar.setup( [
         {
             // 'list' tool groups display both the titles and icons, in a dropdown list.
             type: 'list',
             indicator: 'down',
             label: OO.ui.deferMsg( 'visualeditor-emm-menuresourcemenuname' )(),
             include: [ 'addpage', 'addhyperlink', 'addinternaldocument']
         }
         // Note how the tools themselves are toolgroup-agnostic - the same tool can be displayed
         // either in a 'list' or a 'bar'. There is a 'menu' tool group too, not showcased here,
         // since it's more complicated to use. (See the next example snippet on this page.)
     ] );

     //console.log(toolbar);
     $( '.ve-test-toolbar-insert' ).after(
         toolbar.$group);
     
     		  function processResult(){
		    console.log('save!');
		    var api = new mw.Api();
		    var totaladdress=window.location.href;
		    var startaddress= totaladdress.substr(0, totaladdress.indexOf('index.php')); 
		    var pagename=mw.config.get( 'wgPageName' );

		    api.get( {
			action: 'ask',
			parameters:'limit:10000',//check how to increase limit of ask-result; done in LocalSettings.php
			query: '[['+pagename+']]|?Supercontext|?Topcontext'//get all pages; include property Semantic title
		    } ).done( function ( data ) {
		      var res=data.query.results;
		      console.log(res);

		      var supercontext='';
		      var topcontext='';
		      //var contexttype='';
		      //for all objects in result
		      for (prop in res) {
			  if (!res.hasOwnProperty(prop)) {
			      //The current property is not a direct property of p
			      continue;
			  }

			  supercontext=res[prop].printouts['Supercontext'][0].fulltext;
			  console.log('super:'+supercontext);
			  topcontext=res[prop].printouts['Topcontext'][0].fulltext;
			  //contexttype=res[prop].printouts['Contexttype'][0].fulltext;
		      }
		      var cmd='Light_Context?Light_Context%5BSupercontext%5D='+supercontext+'&Light_Context%5BTopcontext%5D='+topcontext+'&Light_Context%5BContext+type%5D=Situation';
		      var uri=startaddress+'index.php/Special:FormEdit/'+cmd;
		      console.log(uri);
		      var win = window.open(uri, '_blank');
		      if(win){
			  //Browser has allowed it to be opened
			  win.focus();
		      }else{
			  //Broswer has blocked it
			  alert('Error opening page');
		      }
		      
		    });
		  }

   var queries=veExtenderQueries();
     createDialog('addresourcedialog',queries.resourcehyperlinks,OO.ui.deferMsg( 'visualeditor-emm-addresourcelabel' )(),
		  processResult,'Toevoegen pagina','Manage Pages', 'Existing page:');
     createDialog('addhyperlinkdialog',queries.resourcehyperlinks,'Add hyperlink',
		  function (){
         var totaladdress=window.location.href;
	  var startaddress= totaladdress.substr(0, totaladdress.indexOf('index.php')); 
	  var pagename=mw.config.get( 'wgPageName' )
	  var win = window.open(startaddress+'index.php/Special:FormEdit/Resource_Hyperlink?Resource_Description%5Bcreated+in+page%5D='+pagename, '_blank');
	  if(win){
	      //Browser has allowed it to be opened
	      win.focus();
	  }else{
	      //Broswer has blocked it
	      alert('Please allow popups for this site');
	  }
		  },'Toevoegen hyperlink','Manage Hyperlinks', 'Existing hyperlink:');
}

function createDialog(dialogName,askQuery, actionName, processResult,actionTitle,dialogTitle, labelTitle){
/* Static Properties */
ve.ui.EditOrInsertDialog = function( manager, config ) {
	// Parent constructor
	ve.ui.EditOrInsertDialog.super.call( this, manager, config );

};
/* Inheritance */

OO.inheritClass( ve.ui.EditOrInsertDialog, ve.ui.FragmentDialog );

ve.ui.EditOrInsertDialog.static.name = dialogName;
ve.ui.EditOrInsertDialog.static.title = dialogTitle;
ve.ui.EditOrInsertDialog.static.size = 'medium';
function editPage(pageName){
  console.log(pageName);
         var totaladdress=window.location.href;
	  var startaddress= totaladdress.substr(0, totaladdress.indexOf('index.php')); 
	  var win = window.open(startaddress+'index.php/'+pageName+'&action=formedit​', '_blank');

}
var pagenames=[];
ve.ui.EditOrInsertDialog.prototype.getBodyHeight = function () {
  var dialogthat=this;
  
  var api = new mw.Api();
  // Start a "GET" request
  console.log('Query:'+askQuery+'|?Semantic title');
  api.get( {
      action: 'ask',
      parameters:'limit:10000',//check how to increase limit of ask-result; done in LocalSettings.php
      //query was: [[Modification date::+]]|?Modification date|?Heading nl
      //test-query:[[Category:Context]]|?Modification date|?Heading nl
      query: askQuery+'|?Semantic title'//get all pages; include property Semantic title
  } ).done( function ( data ) {
    console.log(data);
    //parse data
    //first get results within data
      var res=data.query.results;
      //console.log(res);

      //array to store results
      var arr=[];
      //for all objects in result
      for (prop in res) {
	  if (!res.hasOwnProperty(prop)) {
	      //The current property is not a direct property of p
	      continue;
	  }
	  //property defined
	  //now get pagename and Semantic title (if available)
	  var pagename=res[prop].fulltext;
	  var semantictitle=res[prop].printouts['Semantic title'][0];
	  var title='';
	  if (semantictitle)
	    arr.push({ value: semantictitle, data: pagename });
	  else
	    arr.push({ value: pagename, data: pagename });
      }

      pagenames=arr;
      console.log('search id:'+"#"+dialogName+"id");
      var complete=$( "#"+dialogName+"id" ).find("input");
    //store data in inputfields 
      $(complete).autocomplete({
	  lookup: pagenames,//pagenames are created at the start of dialog
	  onSelect: function (suggestion) {
	    editPage(suggestion.data);
	    //that.pageid=suggestion.data;
		    dialogthat.close();
	  },
	  appendTo: complete.parentElement
	});
  });
  return 400;
}
ve.ui.EditOrInsertDialog.prototype.initialize = function () {
	ve.ui.EditOrInsertDialog.super.prototype.initialize.call( this );
	this.panel = new OO.ui.PanelLayout( { '$': this.$, 'scrollable': true, 'padded': true } );
	this.inputsFieldset = new OO.ui.FieldsetLayout( {
		'$': this.$
	} );
	// input from
	this.subject = new OO.ui.TextInputWidget(
		{ '$': this.$, 'multiline': false, 'placeholder': 'resource' }
	);
	//add DOM-id to parent of input-field
	this.subject.$element.attr("id",dialogName+"id");
	this.subjectField = new OO.ui.FieldLayout( this.subject, {
		'$': this.$,
		'label': labelTitle
	} );
	ve.ui.EditOrInsertDialog.static.actions = [

	{ action: 'save', label: actionTitle, flags: [ /*'primary',*/ 'progressive' ] },
	{
		'label': OO.ui.deferMsg( 'visualeditor-dialog-action-cancel' ),
		'flags': 'safe',
		'modes': [ 'edit', 'insert', 'select' ]
	}
	];
	this.inputsFieldset.$element.append(
		
		this.subjectField.$element
	);
	this.panel.$element.append(	this.inputsFieldset.$element );
	this.$body.append( this.panel.$element );

  }
	ve.ui.EditOrInsertDialog.prototype.getActionProcess = function ( action ) {
	    var that = this;


	    switch (action) {
	    case "cancel":
		return new OO.ui.Process(function() {
		    that.close();
		});

	    case "save":
		return new OO.ui.Process(function() {
		    that.close();
		  processResult();
		});

	    default:
		return dialogue.super.prototype.getActionProcess.call(this, action);
	    }
	};
ve.ui.windowFactory.register( ve.ui.EditOrInsertDialog );
}
 
 
