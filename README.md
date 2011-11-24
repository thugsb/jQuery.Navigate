The structure of the HTML must be as shown on the <a href="http://navigate.tapiocacollective.com/">demo</a>:

* IDs of elements must be lowercase. I hope to remove this limitation with future releases.
* The first character of the IDs must be a letter (not a number).
* The first child elements within #pageContainer (or whatever element is called for navigating) must contain the IDs for the first layer of navigation.
* The first child elements within the .subpages (or whatever you set as the subpageContainer) will be the IDs for the second layer of navigation (not yet tested with the jQuery.cycle slideExpr option).
* Links should have the format href="#pageID/subpageID" or just href="#pageID". You cannot call directly to href="#subpageID" as this will break the page.

jQuery.Navigate requires <a href="http://jquery.malsup.com/cycle/">jQuery.cycle</a> and <a href="http://benalman.com/projects/jquery-hashchange-plugin/">jQuery.hashchange</a>. Thanks to Malsup and Ben Alman for maintaining these excellent plugins.


To do:
* Stop uppercase IDs failing
* Alternative to charat(0) uppercase
* Submenu animate entry option
* event creation
* Triple layer?
* Cycle SlideExpr option
