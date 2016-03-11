//some helper functions
function spacesToUnderscore(s){
  return s.replace(/ /g,"_");
}
/*
 * opens a new window or tab with the address given
 */
function doOpen(address){
  //despair! where does this come from?
  address=address.replace("%E2%80%8B", "");
  //%E2%80%8B
  //console.log('open address:'+address+':end');
	  var win = window.open(address, '_blank');
	  if(win){
	      //Browser has allowed it to be opened
	      win.focus();
	  }else{
	      //Broswer has blocked it
	      alert('Error creating or opening page.');
	  }
}
/*
 * returns server-address before index.php
 */
function getStartAddress(){
	    var totaladdress=window.location.href;
	    return totaladdress.substr(0, totaladdress.indexOf('index.php')); 
}

//global variable to keep page properties
var pageProperties={supercontext:"",topcontext:"",pagename:""};
function getContextOfCurrentPage(){
	pageProperties.pagename=mw.config.get( 'wgPageName' );

    var api = new mw.Api();
    api.get( {
	action: 'ask',
	parameters:'limit:10000',//check how to increase limit of ask-result; done in LocalSettings.php
	query: '[['+pageProperties.pagename+']]|?Supercontext|?Topcontext'//get all pages; include property Semantic title
    } ).done( function ( data ) {
      var res=data.query.results;
      //console.log(res);

      //var contexttype='';
      //for all objects in result
      for (prop in res) {
	  if (!res.hasOwnProperty(prop)) {
	      //The current property is not a direct property of p
	      continue;
	  }

	  var supercontext=res[prop].printouts['Supercontext'][0].fulltext;
	  pageProperties.supercontext=supercontext;
	  //console.log('super:'+supercontext);
	  var topcontext=res[prop].printouts['Topcontext'][0].fulltext;
	  pageProperties.topcontext=topcontext;
	  //contexttype=res[prop].printouts['Contexttype'][0].fulltext;
      }
      
    });
}

/*
 * main function
 */
function addEMMResources(){
     var toolFactory = new OO.ui.ToolFactory();
     var toolGroupFactory = new OO.ui.ToolGroupFactory();
     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
     getContextOfCurrentPage();
     //get context of current page

     // Register tools
     function AddPageTool() {
         AddPageTool.parent.apply( this, arguments );
     }
     OO.inheritClass( AddPageTool, OO.ui.Tool );
     AddPageTool.static.name = 'addpage';
     AddPageTool.static.icon = 'source';
     AddPageTool.static.title = OO.ui.deferMsg( 'visualeditor-emm-menuaddpagetitle' )();
     AddPageTool.prototype.onSelect = function () {
       ve.init.target.getSurface().execute( 'window', 'open', 'addresourcedialog', null );
       //processResult();


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
       ve.init.target.getSurface().execute( 'window', 'open', 'addhyperlinkdialog', null );//addlocallinkdialog

	  /*var address=getStartAddress()+'index.php/Special:FormEdit/Resource_Hyperlink?Resource_Description%5Bcreated+in+page%5D='+pageProperties.pagename;
	  doOpen(address);*/
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
	 //doOpen(getStartAddress()+'index.php/Special:FormEdit/Resource_Light?Resource_Description%5Bcreated+in+page%5D='+pageProperties.pagename);
       ve.init.target.getSurface().execute( 'window', 'open', 'addlocallinkdialog', null );//
         this.setActive( false );
     };
     toolFactory.register( AddInternalDocumentTool );

     toolbar.setup( [
         {
             // 'list' tool groups display both the titles and icons, in a dropdown list.
             type: 'list',
             indicator: 'down',
             label: OO.ui.deferMsg( 'visualeditor-emm-menuresourcemenuname' )(),
             include: [ 'addpage', 'addhyperlink', 'addinternaldocument']
         }

     ] );

     //console.log(toolbar);
     $( '.ve-test-toolbar-insert' ).after(
         toolbar.$group);
     
     		  function processResult(){
		    //console.log('save!');

		    if (pageProperties.supercontext.length==0 || pageProperties.topcontext.length==0 ){
		      alert('Sorry, cannot create the page. Properties needed in page are lacking.');
		    } else {
		      var cmd='Light_Context?Light_Context%5BSupercontext%5D='+pageProperties.supercontext+'&Light_Context%5BTopcontext%5D='+pageProperties.topcontext+'&Light_Context%5BContext+type%5D=Situation';
		      var uri=getStartAddress()+'index.php/Special:FormEdit/'+cmd;
		      //var uri=getStartAddress()+'index.php/Special:FormEdit/Resource_Light?Resource_Description%5Bcreated+in+page%5D='+pageProperties.pagename;
		      doOpen(uri);
		    }

		  }

   var queries=veExtenderQueries();
   //todo: use queries.resourcepages
     createDialog('addresourcedialog',queries.resourcepages,'Add Resource',
		  processResult,'Toevoegen pagina','Manage Pages', 'Existing page:');
     createDialog('addhyperlinkdialog',queries.resourcehyperlinks,'Add hyperlink',
	function (){
	  doOpen(getStartAddress()+'index.php/Special:FormEdit/Resource_Hyperlink?Resource_Description%5Bcreated+in+page%5D='+pageProperties.pagename);
	}
      ,'Toevoegen hyperlink','Manage Hyperlinks', 'Existing hyperlink:');
     createDialog('addlocallinkdialog',queries.resourceuploadables,'Add local resource',
	function (){
	  //todo: nakijken wat de form is die hier gebruikt moet worden.
	  doOpen(getStartAddress()+'index.php/Special:FormEdit/Resource_Light?Resource_Description%5Bcreated+in+page%5D='+pageProperties.pagename);
	}
      ,'Toevoegen local resource','Manage local resource', 'Existing local resource:');
}

/*
 * create dialog to add or edit resource
 */
function createDialog(dialogName,askQuery, actionName, processResult,actionTitle,dialogTitle, labelTitle){
/* Static Properties */
//was: ve.ui.EditOrInsertDialog
var addOrEditResourceDialog = function( manager, config ) {
	// Parent constructor
	addOrEditResourceDialog.super.call( this, manager, config );

};
/* Inheritance */

OO.inheritClass( addOrEditResourceDialog, ve.ui.FragmentDialog );

addOrEditResourceDialog.static.name = dialogName;
addOrEditResourceDialog.static.title = dialogTitle;
addOrEditResourceDialog.static.size = 'medium';
function editPage(pageName){
  //todo: characters are added to end of string; see why this happens!?
	  doOpen(encodeURI(getStartAddress()+'index.php?title='+spacesToUnderscore(pageName)+'&action=formedit​'));

}
addOrEditResourceDialog.prototype.getBodyHeight = function () {
  var dialogthat=this;
  
  var api = new mw.Api();
  // Start a "GET" request
  //console.log('Query:'+askQuery+'|?Semantic title');
  api.get( {
      action: 'ask',
      parameters:'limit:10000',//todo:check how to increase limit of ask-result; done in LocalSettings.php
      query: askQuery+'|?Semantic title'//get all pages; include property Semantic title
  } ).done( function ( data ) {
    //console.log(data);
    //parse data
    //first get results within data
      var res=data.query.results;
      //console.log(res);

      //array to store results
       var pagenames=[];
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
	    pagenames.push({ value: semantictitle, data: pagename });
	  else
	    pagenames.push({ value: pagename, data: pagename });
      }

      var complete=$( "#"+dialogName+"id" ).find("input");
    //store data in inputfields 
      $(complete).autocomplete({
	  lookup: pagenames,//pagenames are created at the start of dialog
	  onSelect: function (suggestion) {
	    editPage(suggestion.data);
	    //that.pageid=suggestion.data;
	    dialogthat.close();
	    dialogthat.subject.setValue("");
	  },
	  appendTo: complete.parentElement
	});
  });
  return 400;
}
addOrEditResourceDialog.prototype.initialize = function () {
	addOrEditResourceDialog.super.prototype.initialize.call( this );
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
	addOrEditResourceDialog.static.actions = [

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
	addOrEditResourceDialog.prototype.getActionProcess = function ( action ) {
	    var that = this;


	    switch (action) {
	    case "cancel":
		return new OO.ui.Process(function() {
		  console.log("cancel");
		    that.close();
		});

	    case "save":
		return new OO.ui.Process(function() {
		  processResult();
		    that.close();
		});

	    default:
		return addOrEditResourceDialog.super.prototype.getActionProcess.call(this, action);
	    }
	};
      ve.ui.windowFactory.register( addOrEditResourceDialog );
}
 
 
