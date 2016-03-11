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
       //ve.ui.Toolbar.getSurface().execute( 'window', 'open', 'addresourcedialog', null );
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
	  var win = window.open(startaddress+'index.php/Speciaal:GegevensBewerken/Resource_Light?Resource_Description%5Bcreated+in+page%5D='+pagename, '_blank');
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
             label: 'Resources',
             include: [ 'addpage', 'addhyperlink', 'addinternaldocument']
         }
         // Note how the tools themselves are toolgroup-agnostic - the same tool can be displayed
         // either in a 'list' or a 'bar'. There is a 'menu' tool group too, not showcased here,
         // since it's more complicated to use. (See the next example snippet on this page.)
     ] );

     //console.log(toolbar);
     $( '.ve-test-toolbar-insert' ).after(
         toolbar.$group);
     createDialog();
}

function createDialog(){
/* Static Properties */
ve.ui.SearchAndReplaceDialog = function( manager, config ) {
	// Parent constructor
	ve.ui.SearchAndReplaceDialog.super.call( this, manager, config );

};
/* Inheritance */

OO.inheritClass( ve.ui.SearchAndReplaceDialog, ve.ui.FragmentDialog );

ve.ui.SearchAndReplaceDialog.static.name = 'addresourcedialog';
ve.ui.SearchAndReplaceDialog.static.title = 'Add Resource';
ve.ui.SearchAndReplaceDialog.static.size = 'medium';

ve.ui.SearchAndReplaceDialog.prototype.initialize = function () {
	ve.ui.SearchAndReplaceDialog.super.prototype.initialize.call( this );
	this.panel = new OO.ui.PanelLayout( { '$': this.$, 'scrollable': true, 'padded': true } );
	this.inputsFieldset = new OO.ui.FieldsetLayout( {
		'$': this.$
	} );
	// input from
	this.subject = new OO.ui.TextInputWidget(
		{ '$': this.$, 'multiline': false, 'placeholder': 'resource' }
	);
	//add DOM-id to parent of input-field
	this.subject.$element.attr("id","oo-ui-tool-resourceId");
	this.subjectField = new OO.ui.FieldLayout( this.subject, {
		'$': this.$,
		'label': 'Subject'
	} );
	this.toInput = new OO.ui.TextInputWidget(
		{ '$': this.$, 'multiline': false, 'placeholder': 'tekst placeholder 2' }
	);
	this.toField = new OO.ui.FieldLayout( this.toInput, {
		'$': this.$,
		'label': 'to label 1'
	} );

     var radioSelectInput = new OO.ui.RadioSelectInputWidget( {
         options: [
             { data: 'a', label: 'First' },
             { data: 'b', label: 'Second'},
             { data: 'c', label: 'Third' }
         ]
     } );
     var layout = new OO.ui.HorizontalLayout( {
       items: [
         new OO.ui.LabelWidget( { label: 'Label' } ),
         new OO.ui.TextInputWidget( { value: 'Text' } )
       ]
     } );
//$( 'body' ).append( fieldset.$element );
	this.matchCaseCheckbox = new OO.ui.CheckboxInputWidget( {
		'$': this.$
	} );
	var matchCaseField = new OO.ui.FieldLayout( this.matchCaseCheckbox, {
		'$': this.$,
		'align': 'inline',
		'label': 'match label 1'
	} );
	ve.ui.SearchAndReplaceDialog.static.actions = [

	{ action: 'save', label: 'Insert', flags: [ 'primary', 'progressive' ] },
	{
		'label': OO.ui.deferMsg( 'visualeditor-dialog-action-cancel' ),
		'flags': 'safe',
		'modes': [ 'edit', 'insert', 'select' ]
	}
];
     var myDropdown = new OO.ui.DropdownWidget( {
         menu: {
             items: [
                 new OO.ui.MenuSectionOptionWidget( {
                     label: 'Dogs'
                 } ),
                 new OO.ui.MenuOptionWidget( {
                     data: 'corgi',
                     label: 'Welsh Corgi'
                 } ),
                 new OO.ui.MenuOptionWidget( {
                     data: 'poodle',
                     label: 'Standard Poodle'
                 } ),
                 new OO.ui.MenuSectionOptionWidget( {
                     label: 'Cats'
                 } ),
                 new OO.ui.MenuOptionWidget( {
                     data: 'lion',
                     label: 'Lion'
                 } )
             ]
         }
     } );
	this.inputsFieldset.$element.append(
		this.toField.$element,
		this.subjectField.$element,
		matchCaseField.$element,
		 radioSelectInput.$element,
		 myDropdown.$element
	);
	this.panel.$element.append(	this.inputsFieldset.$element );
	this.$body.append( this.panel.$element );

  }
ve.ui.windowFactory.register( ve.ui.SearchAndReplaceDialog );
}
 
 
