 
//declare event to run when div is visible
/*$((function ($) {
      $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
          this.trigger(ev);
          return el.apply(this, arguments);
        };
      });
    })(jQuery);*/

function loadextra(){
//at start of dialog
//get pagenames for all pages, with Semantic title as a property
var pagenames = [];
var api = new mw.Api();
// Start a "GET" request
api.get( {
    action: 'ask',
    parameters:'limit:10000',//check how to increase limit of ask-result; done in LocalSettings.php
    query: '[[Modification date::+]]|?Modification date|?Semantic title'//get all pages; include property Semantic title
} ).done( function ( data ) {
  //parse data
  //first get results within data
    var res=data.query.results;

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
	var semantictitle=res[prop].printouts['Semantic title'];
	var title='';
	if (semantictitle.length>0) title=semantictitle[0].fulltext;
	 //set suggestion to Semantic title, if n.a. set it to pagename
	if (title.length>0)
	  arr.push({ value: title, data: pagename });
	else
	  arr.push({ value: pagename, data: pagename });
    }

    pagenames=arr;
});
 

	// Register plugins to VE. will be loaded once the user opens the VE

    if (typeof ve === 'undefined') {
      setTimeout(function() { mw.loader.using( 'ext.visualEditor.viewPageTarget.init',loadextra); }, 1000);
      console.log('ve undefined'); 
      return;
    }

    

    var makeInsertTool = function(buttonMessage, dialogueMessage, collection, element) {
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
console.log("transact");
        };
        dialogue.prototype.register = function () {
console.log("register");
        };

        dialogue.prototype.onSelect = function () {
console.log("select");
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
  //get selected text from SurfaceModel
  var surfaceModel = ve.init.target.getSurface().getModel();
  selected="";
  for (i=surfaceModel.getFragment().range.start;i<surfaceModel.getFragment().range.end;i++){ 
    selected+=surfaceModel.getFragment().document.data.data[i];
  }
  //set text to selected, using timeout
  var inputfieldoutside=this.inputField;
  var that=this;
  console.log("that.nameControl");
  console.log(that.nameControl);
  setTimeout(function() {
                  if (selected.length>0){
		    that.nameControl.setValue(selected);
		    that.nameControl.disabled=true;
		      console.log(that.nameControl);
		    $(inputfieldoutside).val(selected);
		  }
	      }, 1000);
  //set autocomplete on resource-field
  var that=this;
  $(this.resourceField).autocomplete({
      lookup: pagenames,//pagenames are created at the start of dialog
      onSelect: function (suggestion) {
	//todo: see if following lines have meaning. If you delete them the field remains empty....
	var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
	$('#searchfield').html(thehtml);
	console.log("code selected:"+suggestion.data);
	that.pageid=suggestion.data;
      },
      appendTo: this.resourceField.parentElement
    });
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
		    

			var mytemplate=  [
			    {
			      type: 'mwTransclusionInline',
			      attributes: {
				mw: {
				  parts: [
				    { template: {
					target: {
					  href: 'Template:ZomaarTemplate4',
					  wt: 'Citezomaar'
					},
					params: {
					  resource: { wt: this.pageid },
					  name: { wt: nameControl.getValue() },
					  optional: { wt: optionalControl.getValue() },
					}
				    }
				    }
				  ]
				}
			      }
			    }
			  ]
			;
		    ve.init.target
			.getSurface()
			.getModel()
			.getFragment()
			.collapseRangeToEnd()
			.insertContent(mytemplate, false);

		    instance.close();
		},

		nameControl = new OO.ui.InputWidget({
		    value: "nnnnnw"
		}),
		name = new OO.ui.FieldLayout(
		    nameControl,
		    {
			label: "Name"
		    }
		),
		
		resourceControl = new OO.ui.InputWidget({
		    value: "r"
		}),
		resource = new OO.ui.FieldLayout(
		    resourceControl,
		    {
			label: "Resource"
		    }
		),

		optionalControl = new OO.ui.InputWidget(),
		optional = new OO.ui.FieldLayout(
		    optionalControl,
		    {
			label: "Optional"
		    }),

		form = new OO.ui.FieldsetLayout({
		    $content: [
			name.$element,
			resource.$element,
			//lockToVersion.$element,
			optional.$element
		    ]
		}),

		panel = new OO.ui.PanelLayout({
		    padded: true
		}),

		stack = new OO.ui.StackLayout({
		    continuous: true,
		    scrollable: false,
		    items: [
			panel//,
			//searchPanel
		    ]
		});

	    OO.ui.ProcessDialog.prototype.initialize.call(this);

            this.nameControl=nameControl;
            
//at bottom of initialize function
//name control is defined in the previous lines
this.name=name;
this.nameControl=nameControl;
this.resourceControl=resourceControl;
this.optionalControl=optionalControl;
//get javascript-element of name-field
var inputField=name.$field[0].firstElementChild.firstChild;
inputField.setAttribute("id", "autocomplete");
//store it in object so it can be retrieved later
this.inputField=inputField;

//get javascript-element of resource-field
var resourceField=resource.$field[0].firstElementChild.firstChild;
//store it in object so it can be retrieved later
this.resourceField=resourceField;
resource.$field[0].firstElementChild.setAttribute("id", "searchfield");
setTimeout(function() {
  //set values of input-field
  $(inputField).attr({
      'id':'autocomplete',
      'name':"currency",
      'class':'biginput'
  });
  //todo: see if on-show can be used as trigger to set selected value.
  $(inputField).on('show', function() {
	console.log('#foo is now visible');
  });
  $(inputField).on('hide', function() {
	console.log('#foo is now hidden');
  });
}, 1000);

	    this.content = stack;
	    this.insert = insert;

	    this.$body.append(this.content.$element);

	    panel.$element.append(form.$element);

	    nameControl.$input.attr("type", "text");

	    resourceControl.$input.attr("type", "text");

	    optionalControl.$input.attr("type", "text");
	    
	    nameControl.$input.css("width", "100%");
	    resourceControl.$input.css("width", "100%");
	    optionalControl.$input.css("width", "100%");

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

    makeInsertTool(
	"Tekst in menu",
	"EigenTekst3",
	"process-models",
	"process-model"
    );

}
//mw.loader.using( 'ext.visualEditor.viewPageTarget.init',loadextra);
mw.hook( 've.activationComplete' ).add( function() {
  console.log('voor het laden binnen de library');
	loadextra();

} );

