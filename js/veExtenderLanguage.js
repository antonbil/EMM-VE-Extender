function defineTranslations(){
	var translations = {
		en: {
		  'visualeditor-emm-add-file' :"Add File",
		  'visualeditor-emm-add-hyperlink' :"Add Link",
		  'visualeditor-emm-add-page' :"Add Page",
		  'visualeditor-emm-cannot-create-page' :"Cannot create the page. Properties needed in page are lacking.",
		  'visualeditor-emm-dialogcitetitle':"Insert reference",
		  'visualeditor-emm-dialogexternallinktitle':"Insert link to website",
		  'visualeditor-emm-dialoginternallinktitle':"Insert link to page",
		  'visualeditor-emm-existing-file' :"Existing file",
		  'visualeditor-emm-existing-hyperlink' :"Existing link",
		  'visualeditor-emm-existing-page' :"Existing page",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-emm-link-to-resource' :"Link:",
		  'visualeditor-emm-manage-files' :"Manage Files",
		  'visualeditor-emm-manage-hyperlinks' :"Manage Links",
		  'visualeditor-emm-manage-pages' :"Manage Pages",
		  'visualeditor-emm-menuaddhyperlinktitle':"Link",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"File",
		  'visualeditor-emm-menuaddpagetitle':"Page",
		  'visualeditor-emm-menucitetitle':"Link (reference)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menuinternallinktitle':"Link (page)",
		  'visualeditor-emm-menuresourcemenuname':"Resources",
		  'visualeditor-emm-search' :"Search",
		  'visualeditor-emm-select-existing-item' :"Please select an existing item",
		  'visualeditor-emm-text-in-page':"Text:",
		  'visualeditor-mwtemplate-cite-optional' :"Optional text:"
		},
		nl: {
		  'visualeditor-emm-add-file' :"Toevoegen bestand",
		  'visualeditor-emm-add-hyperlink' :"Toevoegen link",
		  'visualeditor-emm-add-page' :"Toevoegen pagina",
		  'visualeditor-emm-cannot-create-page' :"Pagina kan niet worden gemaakt. Verplichte eigenschappen in de pagina ontbreken.",
		  'visualeditor-emm-dialogcitetitle':"Invoegen referentie",
		  'visualeditor-emm-dialogexternallinktitle':"Invoegen link naar website",
		  'visualeditor-emm-dialoginternallinktitle':"Invoegen link naar pagina",
		  'visualeditor-emm-existing-file' :"Bestaand bestand",
		  'visualeditor-emm-existing-hyperlink' :"Bestaande link",
		  'visualeditor-emm-existing-page' :"Bestaande pagina",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-emm-link-to-resource' :"Link:",
		  'visualeditor-emm-manage-files' :"Beheer bestanden",
		  'visualeditor-emm-manage-hyperlinks' :"Beheer links",
		  'visualeditor-emm-manage-pages' :"Beheer pagina's",
		  'visualeditor-emm-menuaddhyperlinktitle':"Link",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"Bestand",
		  'visualeditor-emm-menuaddpagetitle':"Pagina",
		  'visualeditor-emm-menucitetitle':"Link (referentie)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menuinternallinktitle':"Link (pagina)",
		  'visualeditor-emm-menuresourcemenuname':"Bronnen",
		  'visualeditor-emm-search' :"Zoeken",
		  'visualeditor-emm-select-existing-item' :"Kies een bestaande bron",
		  'visualeditor-emm-text-in-page':"Tekst:",
		  'visualeditor-mwtemplate-cite-optional' :"Optionele tekst:"
		}
	};
    var userLanguage = mw.config.get( 'wgUserLanguage' );
    mw.messages.set( translations[userLanguage] || translations.en );
	//OO.ui.deferMsg( 'visualeditor-mwsignatureinspector-title' );
}
