function defineTranslations(){
	var translations = {
		en: {
			//example use:
			//OO.ui.deferMsg( 'visualeditor-emm-' )()
		  'visualeditor-emm-menuaddpagetitle':"Page",
		  'visualeditor-emm-menuaddhyperlinktitle':"Hyperlink",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"File",
		  'visualeditor-emm-menuresourcemenuname':"Resources",
		  'visualeditor-emm-menuinternallinktitle':"Link (page)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menucitetitle':"Link (reference)",
		  'visualeditor-emm-dialoginternallinktitle':"Insert link to page",
		  'visualeditor-emm-dialogexternallinktitle':"Insert link to website",
		  'visualeditor-emm-dialogcitetitle':"Insert reference",
		  'visualeditor-emm-text-in-page':"Text:",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-emm-add-hyperlink' :"Add hyperlink",
		  'visualeditor-emm-manage-hyperlinks' :"Manage Hyperlinks",
		  'visualeditor-emm-existing-hyperlink' :"Existing hyperlink",
		  'visualeditor-emm-add-page' :"Add page",
		  'visualeditor-emm-manage-pages' :"Manage Pages",
		  'visualeditor-emm-existing-page' :"Existing page",
		  'visualeditor-emm-add-file' :"Add file",
		  'visualeditor-emm-manage-files' :"Manage Files",
		  'visualeditor-emm-existing-file' :"Existing file",
		  'visualeditor-emm-search' :"Search",
		  'visualeditor-mwtemplate-cite-optional' :"Optional text:",
		  'visualeditor-emm-cannot-create-page' :"Sorry, cannot create the page. Properties needed in page are lacking.",
		  'visualeditor-emm-select-existing-item' :"Please select an existing item",
		  'visualeditor-emm-link-to-resource' :"Link:"
		},
		nl: {
		  'visualeditor-emm-menuaddpagetitle':"Pagina",
		  'visualeditor-emm-menuaddhyperlinktitle':"Hyperlink",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"Bestand",
		  'visualeditor-emm-menuresourcemenuname':"Bronnen",
		  'visualeditor-emm-menuinternallinktitle':"Link (pagina)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menucitetitle':"Link (referentie)",
		  'visualeditor-emm-dialoginternallinktitle':"Invoegen link naar pagina",
		  'visualeditor-emm-dialogexternallinktitle':"Invoegen link naar website",
		  'visualeditor-emm-dialogcitetitle':"Invoegen referentie",
		  'visualeditor-emm-text-in-page':"Tekst:",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-emm-add-hyperlink' :"Toevoegen hyperlink",
		  'visualeditor-emm-manage-hyperlinks' :"Beheren Hyperlinks",
		  'visualeditor-emm-existing-hyperlink' :"Bestaande hyperlink",
		  'visualeditor-emm-add-page' :"Toevoegen pagina",
		  'visualeditor-emm-manage-pages' :"Beheren Pagina's",
		  'visualeditor-emm-existing-page' :"Bestaande pagina",
		  'visualeditor-emm-add-file' :"Toevoegen bestand",
		  'visualeditor-emm-manage-files' :"Beheren Bestanden",
		  'visualeditor-emm-existing-file' :"Bestaand bestand",
		  'visualeditor-emm-search' :"Zoeken",
		  'visualeditor-mwtemplate-cite-optional' :"Optionele tekst:",
		  'visualeditor-emm-cannot-create-page' :"Sorry, pagina kan niet worden gemaakt. Sommige eigenschappen in de pagina ontbreken.",
		  'visualeditor-emm-link-to-resource' :"Link:"

		}
	};
    var userLanguage = mw.config.get( 'wgUserLanguage' );
    mw.messages.set( translations[userLanguage] || translations.en );
	//OO.ui.deferMsg( 'visualeditor-mwsignatureinspector-title' ); 
}
