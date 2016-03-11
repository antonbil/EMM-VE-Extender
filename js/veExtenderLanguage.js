function defineTranslations(){
	var translations = {
		en: {
		  'visualeditor-emm-menuaddpagetitle':"Add Page",
		  'visualeditor-emm-menuaddhyperlinktitle':"Add External Resource",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"Add Internal Resource",
		  'visualeditor-emm-menuinternallinktitle':"Link (page)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menucitetitle':"Link (reference)",
		  'visualeditor-emm-dialoginternallinktitle':"Insert link to page",
		  'visualeditor-emm-dialogexternallinktitle':"Insert link to website",
		  'visualeditor-emm-dialogcitetitle':"Insert reference",
		  'visualeditor-emm-text-in-page':"Text:",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-mwtemplate-cite-optional' :"Optional text:",
		  'visualeditor-emm-link-to-resource' :"Link:"
		},
		nl: {
		  'visualeditor-emm-menuaddpagetitle':"Add Page",
		  'visualeditor-emm-menuaddhyperlinktitle':"Add External Resource",
		  'visualeditor-emm-menuaddinternaldocumenttitle':"Add Internal Resource",
		  'visualeditor-emm-menuinternallinktitle':"Link (pagina)",
		  'visualeditor-emm-menuexternallinktitle':"Link (website)",
		  'visualeditor-emm-menucitetitle':"Link (referentie)",
		  'visualeditor-emm-dialoginternallinktitle':"Invoegen link naar pagina",
		  'visualeditor-emm-dialogexternallinktitle':"Invoegen link naar website",
		  'visualeditor-emm-dialogcitetitle':"Invoegen referentie",
		  'visualeditor-emm-text-in-page':"Tekst:",
		  'visualeditor-emm-link-to-page' :"Link:",
		  'visualeditor-mwtemplate-cite-optional' :"Optionele tekst:",
		  'visualeditor-emm-link-to-resource' :"Link:"

		}
	};
    var userLanguage = mw.config.get( 'wgUserLanguage' );
    mw.messages.set( translations[userLanguage] || translations.en );
	//OO.ui.deferMsg( 'visualeditor-mwsignatureinspector-title' ); 
}
