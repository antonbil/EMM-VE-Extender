	var translations = {
		en: {
		  'visualeditor-emm-menutitle':"Internal Link",
		  'visualeditor-emm-dialogtitle':"Enter Internal Link",
		  'visualeditor-emm-text-in-page':"Text in page",
		  'visualeditor-emm-link-to-page' :"Link to page"
		},
		nl: {
		  'visualeditor-emm-menutitle':"Interne Link",
		  'visualeditor-emm-dialogtitle':"Interne Link",
		  'visualeditor-emm-text-in-page':"Tekst in pagina",
		  'visualeditor-emm-link-to-page' :"Link naar pagina"
		}
	};
var userLanguage = mw.config.get( 'wgUserLanguage' );
	mw.messages.set( translations[userLanguage] || translations.en );
	//OO.ui.deferMsg( 'visualeditor-mwsignatureinspector-title' );
 
 

function loadEMMExtender(){
//at start of dialog
//get pagenames for all pages, with Semantic title as a property
var pagenames = [];
var api = new mw.Api();
// Start a "GET" request
api.get( {
    action: 'ask',
    parameters:'limit:10000',//check how to increase limit of ask-result; done in LocalSettings.php
    //query was: [[Modification date::+]]|?Modification date|?Heading nl
    //test-query:[[Category:Context]]|?Modification date|?Heading nl
    query: '[[Category:Context]]|?Heading nl'//get all pages; include property Semantic title//Semantic title
} ).done( function ( data ) {
  //parse data
  //first get results within data
    var res=data.query.results;
    console.log(res);

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
	console.log(res[prop].printouts['Heading nl']);//must be changed to Semantic title
	var semantictitle=res[prop].printouts['Heading nl'][0];//Semantic title
	var title='';
	console.log("title:"+semantictitle);
	//console.log("title length:"+semantictitle.length);
	if (semantictitle)
	  arr.push({ value: semantictitle, data: pagename });
	else
	  arr.push({ value: pagename, data: pagename });
    }

    pagenames=arr;
});
 

	// Register plugins to VE. will be loaded once the user opens the VE

    if (typeof ve === 'undefined') {
      setTimeout(function() { mw.loader.using( 'ext.visualEditor.viewPageTarget.init',loadEMMExtender); }, 1000);
      console.log('ve undefined'); 
      return;
    }

    

    var makeInsertTool = function(buttonMessage, dialogueMessage, collection, element, templateName, nameLabel, resourceLabel,copySelectedTextToNameField,saveVariablesInInstance) {
	var dialogueName = collection + " dialogue",
	    toolName = collection + " tool";

	/*
	 Make the dialogue.
	 */
	var dialogue = function(surface, config) {
	    OO.ui.ProcessDialog.call(this, surface, config);
	};

	OO.inheritClass(dialogue, OO.ui.ProcessDialog);

	dialogue.static.name = dialogueName;
	dialogue.static.title = dialogueMessage;
	dialogue.static.actions = [
	    { action: 'save', label: 'Insert', flags: [ 'primary', 'progressive' ] },
	    { action: 'cancel', label: 'Cancel', flags: 'safe' }
	];	


        dialogue.prototype.onDocumentTransact = function () {
        };
        dialogue.prototype.register = function () {
        };

        dialogue.prototype.onSelect = function () {
        };


	dialogue.prototype.getActionProcess = function ( action ) {
	    var that = this;


	    switch (action) {
	    case "cancel":
		return new OO.ui.Process(function() {
		    that.close({
			action: action
		    });
		});

	    case "save":
		return new OO.ui.Process(function() {
		    that.insert();
		});

	    default:
		return dialogue.super.prototype.getActionProcess.call(this, action);
	    }
	};

//within getBodyHeight
//get selected text, and set default text of first field to that selected text
//do this within getBodyHeight because it is executed before the dialog becomes visible
dialogue.prototype.getBodyHeight = function () {

  //function call 
  copySelectedTextToNameField(this);
  //return height of dialog; this is main purpose of this function
    return 400;
}

	dialogue.prototype.initialize = function() {
	    var instance = this,
		currentSelection,
		/*
		 When we're finished with our dialogue, Insert a template in the page.
		 */
		insert = function() {
		  //check if data is filled in for nameControl
			var linkdata=this.pageid.length>0?this.pageid:resourceControl.getValue();
			var namedata=nameControl.getValue();
			if (linkdata.length==0 || namedata.length==0){
			  alert('Please fill in data!');
			  return;
			}
		    

			var mytemplate=  [
			    {
			      type: 'mwTransclusionInline',
			      attributes: {
				mw: {
				  parts: [
				    { template: {
					target: {
					  href: 'Template:'+templateName,
					  wt: templateName
					},
					params: {
					  link: { wt: linkdata },
					  name: { wt: namedata },
					}
				    }
				    }
				  ]
				}
			      }
			    }
			  ]
			;
			 

			//insert result in text
			 var surfaceModel = ve.init.target.getSurface().getModel();
			 var range=surfaceModel.getFragment().selection.range;
			 var rangeToRemove = new ve.Range( range.start, range.end );

			var fragment = surfaceModel.getLinearFragment( rangeToRemove );
			fragment.insertContent( mytemplate );
			//empty elements so they can be reused later on
			nameControl.setValue("");//resourceControl
			resourceControl.setValue("");

		    instance.close();
		},

		nameControl = new OO.ui.InputWidget({
		    value: ""
		}),
		name = new OO.ui.FieldLayout(
		    nameControl,
		    {
			label: nameLabel//todo :make it: Tekst in pagina
		    }
		),
		
		resourceControl = new OO.ui.InputWidget({
		    value: ""
		}),
		resource = new OO.ui.FieldLayout(
		    resourceControl,
		    {
			label: resourceLabel//todo: make it: link naar pagina
		    }
		),

		form = new OO.ui.FieldsetLayout({
		    $content: [
			name.$element,
			resource.$element
		    ]
		}),

		panel = new OO.ui.PanelLayout({
		    padded: true
		}),

		stack = new OO.ui.StackLayout({
		    continuous: true,
		    scrollable: false,
		    items: [
			panel
		    ]
		});

	    OO.ui.ProcessDialog.prototype.initialize.call(this);

	    

	    saveVariablesInInstance(this,nameControl,name,resource);

	    this.content = stack;
	    this.insert = insert;

	    this.$body.append(this.content.$element);

	    panel.$element.append(form.$element);

	    nameControl.$input.attr("type", "text");

	    resourceControl.$input.attr("type", "text");
	    
	    nameControl.$input.css("width", "100%");
	    resourceControl.$input.css("width", "100%");

	};

	ve.ui.windowFactory.register(dialogue);

	/*
	 Make the tool.
	 */
	var tool = function(toolGroup, config) {
	    ve.ui.Tool.call(this, toolGroup, config);
	};

	OO.inheritClass(tool, ve.ui.Tool);
	tool.static.name = toolName,
	tool.static.title = buttonMessage;
	tool.static.dialog = dialogueName;
	tool.prototype.onSelect = function () {
	    this.toolbar.getSurface().execute('window', 'open', dialogueName, null);
	};    

	ve.ui.toolFactory.register(tool);
    };
    

    var copySelectedTextToNameField=function(that){
      //get selected text from SurfaceModel
      var surfaceModel = ve.init.target.getSurface().getModel();
      selected="";
      console.log(surfaceModel.getFragment());
      for (i=surfaceModel.getFragment().selection.range.start;i<surfaceModel.getFragment().selection.range.end;i++){ 
	selected+=surfaceModel.getFragment().document.data.data[i];
      }
      //set text to selected
      if (selected.length>0){
	that.nameControl.setValue(selected);
	that.nameControl.disabled=true;//does not work!?
	var inputfieldoutside=that.inputField;
	$(inputfieldoutside).val(selected);
      }

      that.pageid="";
      //set autocomplete on resource-field
      $(that.resourceField).autocomplete({
	  lookup: pagenames,//pagenames are created at the start of dialog
	  onSelect: function (suggestion) {
	    that.pageid=suggestion.data;
	  },
	  appendTo: that.resourceField.parentElement
	});
    }
    
    var saveVariablesInInstance=function(that,nameControl,name,resource){
      //at bottom of initialize function

      //store it in object so it can be retrieved later
      that.nameControl=nameControl;
      //get javascript-element of fields, and save it in instance-variables
      var inputField=name.$field[0].firstElementChild.firstChild;

      that.inputField=inputField;

      //get javascript-element of resource-field
      var resourceField=resource.$field[0].firstElementChild.firstChild;
      //store it in object so it can be retrieved later
      that.resourceField=resourceField;
    }

    makeInsertTool(
	OO.ui.deferMsg( 'visualeditor-emm-menutitle' )(),//title in menu
	OO.ui.deferMsg( 'visualeditor-emm-dialogtitle' )(),//Title on top of dialog
	"process-models",
	"process-model",
	'Internal link',//id of template to be generated
	OO.ui.deferMsg( 'visualeditor-emm-text-in-page' )(),//nameLabel
	OO.ui.deferMsg( 'visualeditor-emm-link-to-page' )(),//resourceLabel
	copySelectedTextToNameField,
	saveVariablesInInstance
    );

}

mw.hook( 've.activationComplete' ).add( function() {
	loadEMMExtender();
} );

