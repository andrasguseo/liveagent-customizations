var $jumbotronHeading = $( '.jumbotron h1' )
var $jumbotronSearchField = $( '.input-group' )

function addJumbotronSearch( content ) {
	if ( isHomePage === true ) {
		$jumbotronSearchField.after( content )
	}
}

function addJumbotronMessage( message ) {
	// Add the tribe-jumbotron-message class to the body tag so we can style appropriately
	document.body.setAttribute('class', document.body.getAttribute('class') + ' tribe-jumbotron-message')

	// Add the actual message
	$jumbotronHeading.after( message )
}

function redirectJumbotronSearch() {
	$( '#jumbotronsearch' ).attr( 'action', 'https://theeventscalendar.com/' );
	$( '#jumbotronsearch input[name=q]' ).attr( 'name','s' );
}

addJumbotronSearch( jumbotronSearch );
redirectJumbotronSearch();