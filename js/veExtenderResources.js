function addEMMResources(){
     var toolFactory = new OO.ui.ToolFactory();
     var toolGroupFactory = new OO.ui.ToolGroupFactory();
     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );

     // Register two more tools, nothing interesting here
     function SettingsTool() {
         SettingsTool.parent.apply( this, arguments );
     }
     OO.inheritClass( SettingsTool, OO.ui.Tool );
     SettingsTool.static.name = 'settings';
     SettingsTool.static.icon = 'settings';
     SettingsTool.static.title = 'Change settings';
     SettingsTool.prototype.onSelect = function () {
         $area.text( 'Settings tool clicked!' );
         this.setActive( false );
     };
     toolFactory.register( SettingsTool );

     // Register two more tools, nothing interesting here
     function StuffTool() {
         StuffTool.parent.apply( this, arguments );
     }
     OO.inheritClass( StuffTool, OO.ui.Tool );
     StuffTool.static.name = 'stuff';
     StuffTool.static.icon = 'ellipsis';
     StuffTool.static.title = 'More stuff';
     StuffTool.prototype.onSelect = function () {
         $area.text( 'More stuff tool clicked!' );
         this.setActive( false );
     };
     toolFactory.register( StuffTool );

     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
     // used once (but not all defined tools must be used).
     toolbar.setup( [
         {
             // 'list' tool groups display both the titles and icons, in a dropdown list.
             type: 'list',
             indicator: 'down',
             label: 'Resources',
             include: [ 'settings', 'stuff']
         }
         // Note how the tools themselves are toolgroup-agnostic - the same tool can be displayed
         // either in a 'list' or a 'bar'. There is a 'menu' tool group too, not showcased here,
         // since it's more complicated to use. (See the next example snippet on this page.)
     ] );

     //console.log(toolbar);
     $( '.ve-test-toolbar-insert' ).after(
         toolbar.$group);
}
 
 
