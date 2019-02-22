( function() { 
	// Safety check: jQuery should be present, but this may change unexpectedly
	if ( 'function' !== typeof jQuery ) {
		return;
	}

	// Marketing alert
	var marketingAlert =
		  '<div id="tribe-marketing-alert">'
		+ '<div><span class="emoji">⚠️</span></div>'
		+ '<div><strong>Heads up!</strong> Response times for support requests are a little longer than usual. Please expect up to 3 business days for a reply.'
		+ '</div></div>'
	
	// Some general advice we'll show as needed in the jumbotron area
	var loggedOutUsersAdvice = 
		  '<p class="tribe-support-advice"> <strong>Existing customer? To receive the fastest support possible, '
		+ 'please <a href="https://support.theeventscalendar.com/login">login</a> before posting.</strong> '
		+ 'In some cases, you may need to register first of all: be sure to do so using the same email address '
		+ 'you used when purchasing your license key!</p>'
		+ '<p class="tribe-support-advice">To learn more about accessing support or if you experience any problems, '
		+ 'please refer to '
		+ '<a href="https://support.theeventscalendar.com/812859-Accessing-Support">this article</a>.</p>'

	// Login form advice
	var loginFormAdvice = 
		  '<p class="tribe-support-advice">⚠ Please note that your login credentials for '
		+ '<a href="https://theeventscalendar.com">theeventscalendar.com</a> will not work here! Our Help Desk runs '
		+ 'on a different platform and a separate account is needed.</p>'
		+ '<p class="tribe-support-advice">We do automatically link accounts where possible, though. So, for most '
		+ 'customers, if you first login to <a href="https://theeventscalendar.com">theeventscalendar.com</a> '
		+ 'you should be automatically logged in here, too. If you find that doesn&#146;t work for you, please try '
		+ 'a password reset in the first instance or else register for a new account.</p>'
		+ '<p class="tribe-support-advice">Be sure to use the same email address as you used when purchasing '
		+ 'your license key!</p>'

	// Logged in landing header advice
	var loggedInLanderPageAdvice =
		  '<p class="tribe-support-advice">We&#146;re here to help with all of your questions about Modern Tribe&#146;s '
		+ 'event and ticketing solutions.</p>'
		+ '<p class="tribe-support-advice">Whether you need some tips to get the most from your calendar or are '
		+ 'experiencing an unexpected bug or conflict, we&#146;ll do our very best to help you. Please note that at busy '
		+ 'periods there may be a delay of upto 48 hours before we can reply.</p>'

	jQuery( function( $ ) { 
		// "Jumbotron" heading element
		var $jumbotronHeading = $( '.jumbotron h1' )

		// This form currently is embedded in the portal homepage
		var $presalesForm = $( '#presales-form' )

		// Test if the current user appears to be logged in
		var isLoggedIn = $( '#menu-item-user' ).length === 1

		// Reverse of the above, to help us write cleaner conditionals
		var isLoggedOut = ! isLoggedIn

		// We'll use this for further comparisons
		var currentUrl = getCurrentUrl()

		// Test if we're on the support portal homepage
		var isHomePage = 'support.theeventscalendar.com' === currentUrl

		// Test if we're on the login page
		var isLoginPage = currentUrl.match( /login/ ) !== null

		// Test if we're on the My Tickets page
		var isMyTicketsPage = currentUrl.match( /my_tickets/ ) !== null

		// Test if we're on the Submit Ticket page
		var isSubmitTicketPage = currentUrl.match( /submit_ticket/ ) !== null

		var marginTop = $( '.container.inner-margin-top' )

		/**
		 * Return the page URL, but with any trailing slashes and the protocol 
		 * ("http://" or "https://") stripped for safer comparisons.
		 */
		function getCurrentUrl() {
			var url = document.location.toString()
			var protocolSeparator = url.match( /:\/\// )

			// Remove trailing slash for uniformity
			if ( '/' === url.slice( -1 ) ) {
				url = url.slice( 0, -1 )
			}

			// Remove the protocol
			if ( protocolSeparator !== null ) {
				url = url.slice( protocolSeparator.index + 3 )
			}

			return url;
		}

		function addMarketingAlert( message ) {
			// Add the tribe-marketing-alert class to the body tag so we can style appropriately
			document.body.setAttribute('class', document.body.getAttribute('class') + ' tribe-marketing-alert')
			// Add the actual message
			marginTop.before( message )
		}

		function addAccountHelperText() {
			// No jumbotron? Weird! Let's bail rather than try to inject content into a 
			// potentially modified/updated template
			if ( $jumbotronHeading.length !== 1 ) {
				return
			}

			// Lander page advice for logged in users
			if ( isLoggedIn && isHomePage ) {
				addJumbotronMessage( loggedInLanderPageAdvice )
			}
			// If the user is logged out and is visiting a page where the login form appears, add
			// appropriate advice 
			else if ( isLoggedOut && ( isLoginPage || isSubmitTicketPage || isMyTicketsPage ) ) {
				addJumbotronMessage( loginFormAdvice )
			}
			// If the user is logged out and is visiting the home page (where the login form *does not*
			// appear), apply different wording
			else if ( isLoggedOut && isHomePage ) {
				addJumbotronMessage( loggedOutUsersAdvice )
			}
		}

		function addJumbotronMessage( message ) {
			// Add the tribe-jumbotron-message class to the body tag so we can style appropriately
			document.body.setAttribute('class', document.body.getAttribute('class') + ' tribe-jumbotron-message')

			// Add the actual message
			$jumbotronHeading.after( message )
		}

		function optionallyRemovePresalesForm() {
			// If the user is not logged in or else if the presales form can't be located
			// we should not interfere
			if ( ! isLoggedIn || $presalesForm.length !== 1 ) {
				return
			}

			$presalesForm.hide()
		}

		addMarketingAlert( marketingAlert )
		addAccountHelperText()
		optionallyRemovePresalesForm()

		document.body.dispatchEvent( new Event( 'tribe-liveagent.ready' ) );
	} ) 
} )()

!function(t){"use strict";function e(t){var e,i,n=[];if("number"==typeof t)n.push(t);else{i=t.split(",");for(var s=0;s<i.length;s++)if(2===(e=i[s].split("-")).length)for(var a=parseInt(e[0],10);a<=e[1];a++)n.push(a);else 1===e.length&&n.push(parseInt(e[0],10))}return n}var i={};t.fn.gist=function(n){return this.each(function(){var s,a,l,o,r,d,c,f,h,p,u,g,m,b=t(this),y={};if(b.css("display","block"),s=b.data("gist-id")||"",l=b.data("gist-file"),o=b.data("gist-caption"),h=!0===b.data("gist-hide-footer"),p=!0===b.data("gist-hide-line-numbers"),r=b.data("gist-line"),d=b.data("gist-lines-expanded"),f=b.data("gist-highlight-line"),u=!(g=!0===b.data("gist-show-spinner"))&&(void 0===b.data("gist-show-loading")||b.data("gist-show-loading")),l&&(y.file=l),!s)return!1;function v(i){var n,s,l,c,u;if(i&&i.div){if(i.stylesheet&&(0===i.stylesheet.indexOf("<link")?i.stylesheet=i.stylesheet.replace(/\\/g,"").match(/href=\"([^\s]*)\"/)[1]:0!==i.stylesheet.indexOf("http")&&(0!==i.stylesheet.indexOf("/")&&(i.stylesheet="/"+i.stylesheet),i.stylesheet="https://gist.github.com"+i.stylesheet)),i.stylesheet&&0===t('link[href="'+i.stylesheet+'"]').length&&(n=document.createElement("link"),s=document.getElementsByTagName("head")[0],n.type="text/css",n.rel="stylesheet",n.href=i.stylesheet,s.insertBefore(n,s.firstChild)),(u=t(i.div)).removeAttr("id"),b.html("").append(u),f&&(c=e(f),u.find("td.line-data").css({width:"100%"}),u.find(".js-file-line").each(function(e){-1!==t.inArray(e+1,c)&&t(this).css({"background-color":"rgb(255, 255, 204)"})})),r){l=e(r);var g=[];if(u.find(".js-file-line").each(function(e){-1===t.inArray(e+1,l)&&(d?(g.push(e+1),t(this).parent().hide()):t(this).parent().remove())}),d){var m=function(t,e){if(0===t.length)return[];return t.slice(1).reduce(function(t,i){return e(i)?t.push([i]):t.push(t.pop().concat([i])),t},[t.slice(0,1)])}(g,function(t){return!g.includes(t-1)});t.each(m,function(e,i){var n=i[0],s=n-1,a=i[i.length-1],l=t("<a></<a>");l.attr("lines",i.join()).css({display:"block",cursor:"pointer"}).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 44" style="height: 15px; position: relative; top: 2px;"><path fill="#bbb" fill-rule="evenodd" d="M8.0066 16.05305v-7.6523c0-.82422-.47656-1.0273-1.0586-.4414l-3.5117 3.5039c-1.8789 1.875-4.6953-.94142-2.8164-2.8164L8.7215.61564c.68359-.67579 1.8008-.6797 2.4922 0l8.1641 8.0312c1.8789 1.875-.9375 4.6914-2.8164 2.8164l-3.5078-3.5039c-.58984-.58985-1.0625-.38673-1.0625.4414v27.30827c0 .82031.47656 1.0273 1.0586.44141l3.5117-3.5039c1.8789-1.875 4.6953.9375 2.8164 2.8164l-8.1016 8.0273c-.6836.6797-1.8008.6797-2.4922 0l-8.1641-8.0273c-1.8789-1.8789.9375-4.6914 2.8164-2.8164l3.5078 3.5039c.58984.58984 1.0625.38672 1.0625-.4414V16.05304z"/></svg>').on("click",function(e){e.preventDefault(),t(this).closest("tr").remove();var i=t(this);t("table.highlight").find("tr:hidden td[data-line-number]").each(function(e,n){if(r=i.attr("lines").split(","),-1===t.inArray(t(n).attr("data-line-number"),r))return!0;t(n).parent().show()})});var o=t("<td></td>").addClass("blob-num js-line-number collapsed").attr("style","background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; text-align: center; padding-top: 5px !important; padding-bottom: 5px !important;").append(l),d=t("<td></td>").addClass("blob-code blob-code-inner js-file-line collapsed").attr("style","background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; padding-top: 5px !important; padding-bottom: 5px !important;").html("... Lines "+n+" - "+a),c=t("<tr></tr>").append(o).append(d);u.find(".js-line-number[data-line-number="+s+"]").parent().after(c)})}}if(o){var y=u.find("table tbody"),v=t("<tr></tr>"),x=t("<td></td>").attr("style","padding: 10px !important; border-bottom: 10px solid white; background-color: #f9f9f9; font-weight: bold;").html(o);v.append(t('<td style="background-color: #f9f9f9; border-bottom: 10px solid white;"></td>')),v.append(x),y.prepend(v)}h&&(u.find(".gist-meta").remove(),u.find(".gist-data").css("border-bottom","0px"),u.find(".gist-file").css("border-bottom","1px solid #ddd")),p&&u.find(".js-line-number").remove()}else b.html("Failed loading gist "+a)}function x(t){b.html("Failed loading gist "+a+": "+t)}function w(){"function"==typeof n&&n()}a="https://gist.github.com/"+s+".json",m=!0===b.data("gist-enable-cache")||i[a],c="Loading gist "+a+(y.file?", file: "+y.file:"")+"...",u&&b.html(c),g&&b.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="'+c+'" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">'),t.ajax({url:a,data:y,dataType:"jsonp",timeout:2e4,beforeSend:function(){if(m){if(i[a])return i[a].then(function(t){v(t),w()},function(t){x(t)}),!1;i[a]=t.Deferred()}},success:function(t){m&&i[a]&&i[a].resolve(t),v(t)},error:function(t,e){x(e)},complete:function(){w()}})})},t(function(){t("[data-gist-id]").gist()})}(jQuery);
jQuery( function( $ ) { 
  // "Jumbotron" heading element
  var $jumbotronHeading = $( '.jumbotron h1' )

  // This form currently is embedded in the portal homepage
  var $presalesForm = $( '#presales-form' )

  // Test if the current user appears to be logged in
  var isLoggedIn = $( '#menu-item-user' ).length === 1

  // Reverse of the above, to help us write cleaner conditionals
  var isLoggedOut = ! isLoggedIn

  // We'll use this for further comparisons
  var currentUrl = getCurrentUrl()

  // Test if we're on the support portal homepage
  var isHomePage = 'support.theeventscalendar.com' === currentUrl

  // Test if we're on the login page
  var isLoginPage = currentUrl.match( /login/ ) !== null

  // Test if we're on the My Tickets page
  var isMyTicketsPage = currentUrl.match( /my_tickets/ ) !== null

  // Test if we're on the Submit Ticket page
  var isSubmitTicketPage = currentUrl.match( /submit_ticket/ ) !== null

  var marginTop = $( '.container.inner-margin-top' )

  /**
   * Return the page URL, but with any trailing slashes and the protocol 
   * ("http://" or "https://") stripped for safer comparisons.
   */
  function getCurrentUrl() {
    var url = document.location.toString()
    var protocolSeparator = url.match( /:\/\// )

    // Remove trailing slash for uniformity
    if ( '/' === url.slice( -1 ) ) {
      url = url.slice( 0, -1 )
    }

    // Remove the protocol
    if ( protocolSeparator !== null ) {
      url = url.slice( protocolSeparator.index + 3 )
    }

    return url;
  }

  function addMarketingAlert( message ) {
    // Add the tribe-marketing-alert class to the body tag so we can style appropriately
    document.body.setAttribute('class', document.body.getAttribute('class') + ' tribe-marketing-alert')
    // Add the actual message
    marginTop.before( message )
  }

  function addAccountHelperText() {
    // No jumbotron? Weird! Let's bail rather than try to inject content into a 
    // potentially modified/updated template
    if ( $jumbotronHeading.length !== 1 ) {
      return
    }

    // Lander page advice for logged in users
    if ( isLoggedIn && isHomePage ) {
      addJumbotronMessage( loggedInLanderPageAdvice )
    }
    // If the user is logged out and is visiting a page where the login form appears, add
    // appropriate advice 
    else if ( isLoggedOut && ( isLoginPage || isSubmitTicketPage || isMyTicketsPage ) ) {
      addJumbotronMessage( loginFormAdvice )
    }
    // If the user is logged out and is visiting the home page (where the login form *does not*
    // appear), apply different wording
    else if ( isLoggedOut && isHomePage ) {
      addJumbotronMessage( loggedOutUsersAdvice )
    }
  }

  function addJumbotronMessage( message ) {
    // Add the tribe-jumbotron-message class to the body tag so we can style appropriately
    document.body.setAttribute('class', document.body.getAttribute('class') + ' tribe-jumbotron-message')

    // Add the actual message
    $jumbotronHeading.after( message )
  }

  function optionallyRemovePresalesForm() {
    // If the user is not logged in or else if the presales form can't be located
    // we should not interfere
    if ( ! isLoggedIn || $presalesForm.length !== 1 ) {
      return
    }

    $presalesForm.hide()
  }

  addMarketingAlert( marketingAlert )
  addAccountHelperText()
  optionallyRemovePresalesForm()
} )
( function() { 
	// Safety check: jQuery should be present, but this may change unexpectedly
	if ( 'function' !== typeof jQuery ) {
		return;
	}
} )()

/**
 * Houses knowledgebase-related tweaks and adjustments.
 * 
 * Utilizes the 'tribe-liveagent.ready' hook to waits until our core logic
 * has loaded before starting.
 */
document.body.addEventListener( 'tribe-liveagent.ready', function() { 
	var $ = jQuery.noConflict();

	/**
	 * Finds and removes any category boxes that are devoid of articles.
	 * 
	 * Unsure why LiveAgent even renders these, but it's not particularly
	 * useful so we'll default to getting rid of them.
	 */
	$( '.category-list' ).find( '.alert.alert-empty' ).each( function() {
		$( this ).parents( '.col-md-4.col-sm-6' ).hide();
	} );
} );
// Login form advice
var loginFormAdvice = 
  '<p class="tribe-support-advice">⚠ Please note that your login credentials for '
  + '<a href="https://theeventscalendar.com">theeventscalendar.com</a> will not work here! Our Help Desk runs '
  + 'on a different platform and a separate account is needed.</p>'
  + '<p class="tribe-support-advice">We do automatically link accounts where possible, though. So, for most '
  + 'customers, if you first login to <a href="https://theeventscalendar.com">theeventscalendar.com</a> '
  + 'you should be automatically logged in here, too. If you find that doesn&#146;t work for you, please try '
  + 'a password reset in the first instance or else register for a new account.</p>'
  + '<p class="tribe-support-advice">Be sure to use the same email address as you used when purchasing '
  + 'your license key!</p>'
	// Logged in landing header advice
	var loggedInLanderPageAdvice =
    '<p class="tribe-support-advice">We&#146;re here to help with all of your questions about Modern Tribe&#146;s '
		+ 'event and ticketing solutions.</p>'
		+ '<p class="tribe-support-advice">Whether you need some tips to get the most from your calendar or are '
		+ 'experiencing an unexpected bug or conflict, we&#146;ll do our very best to help you. Please note that at busy '
		+ 'periods there may be a delay of upto 48 hours before we can reply.</p>'
// Logged in landing header advice
var loggedInLanderPageAdvice =
'<p class="tribe-support-advice">We&#146;re here to help with all of your questions about Modern Tribe&#146;s '
+ 'event and ticketing solutions.</p>'
+ '<p class="tribe-support-advice">Whether you need some tips to get the most from your calendar or are '
+ 'experiencing an unexpected bug or conflict, we&#146;ll do our very best to help you. Please note that at busy '
+ 'periods there may be a delay of upto 48 hours before we can reply.</p>'
// Some general advice we'll show as needed in the jumbotron area
var loggedOutUsersAdvice = 
'<p class="tribe-support-advice"> <strong>Existing customer? To receive the fastest support possible, '
+ 'please <a href="https://support.theeventscalendar.com/login">login</a> before posting.</strong> '
+ 'In some cases, you may need to register first of all: be sure to do so using the same email address '
+ 'you used when purchasing your license key!</p>'
+ '<p class="tribe-support-advice">To learn more about accessing support or if you experience any problems, '
+ 'please refer to '
+ '<a href="https://support.theeventscalendar.com/812859-Accessing-Support">this article</a>.</p>'
// Login form advice
var loginFormAdvice = 
'<p class="tribe-support-advice">⚠ Please note that your login credentials for '
+ '<a href="https://theeventscalendar.com">theeventscalendar.com</a> will not work here! Our Help Desk runs '
+ 'on a different platform and a separate account is needed.</p>'
+ '<p class="tribe-support-advice">We do automatically link accounts where possible, though. So, for most '
+ 'customers, if you first login to <a href="https://theeventscalendar.com">theeventscalendar.com</a> '
+ 'you should be automatically logged in here, too. If you find that doesn&#146;t work for you, please try '
+ 'a password reset in the first instance or else register for a new account.</p>'
+ '<p class="tribe-support-advice">Be sure to use the same email address as you used when purchasing '
+ 'your license key!</p>'
// Marketing alert
var marketingAlert =
'<div id="tribe-marketing-alert">'
+ '<div> <span class="emoji">🛈</span> </div>'
+ '<div> Our team are starting to come back online after some well earned rest and recuperation over the festive period. However, due to increased '
+ 'demand for support services, there may be a slightly longer wait than is usual before we can reply to your next ticket: thank you for your patience '
+ 'in the meantime! <br/><br/>'
+ 'If you didn&#146;t catch the news already, please also note that Event Tickets Plus now has a better way of collecting attendee details. '
+ '<a target="_blank" href="https://theeventscalendar.com/a-new-and-better-way-to-collect-attendee-details-with-event-tickets-plus/">Learn more</a>.'
+ '</div></div>'
( function() { 
	// Safety check: jQuery should be present, but this may change unexpectedly
	if ( 'function' !== typeof jQuery ) {
		return;
	}

// Marketing alert
var marketingAlert =
'<div id="tribe-marketing-alert">'
	+ '<div><span class="emoji">⚠️</span></div>'
	+ '<div><strong>Heads up!</strong> Response times for support requests are a little longer than usual. Please expect up to 3 business days for a reply.'
	+ '</div></div>'

// Popular Search Items
var jumbotronSearch =
'<div class="jumbotron__search">'
	+	'<ul>'
	+		'<li><strong>Popular:</strong></li>'
	+		'<li><a href="https://support.theeventscalendar.com/934573-Inserting-Calendar-Content-into-Posts-or-Pages">Shortcodes</a></li>'
	+		'<li><a href="https://theeventscalendar.com/functions/">Documentation</a></li>'
	+		'<li><a href="https://theeventscalendar.com/customizations/">Customization</a></li>'
	+		'<li><a href="https://theeventscalendar.com/subscription-information/">Orders</a></li>'
	+	'</ul>'
	+ '</div>'

var componentFeaturedContent = 
	'<section class="featured-content">'
	+	'<div class="featured-content__wrapper">'
	+ 	'<a href="https://support.theeventscalendar.com/153124-Themers-Guide">'
	+ 		'<article class="featured-content__item">'
	+ 			'<div class="featured-content__icon">'
	+ 				'<img src="https://theeventscalendar.com/content/uploads/2016/07/icon-brush-85x85.png" alt="" />'
	+ 			'</div>'
	+ 			'<div class="featured-content__body">'
	+					'<h4>Themer\'s Guide</h4>'
	+					'<p>Every calendar view is a template that can be overridden in your theme.</p>'
	+ 			'</div>'
	+ 		'</article>'
	+		'</a>'
	+ 	'<a href="https://theeventscalendar.com/extensions/">'
	+ 		'<article class="featured-content__item">'
	+ 			'<div class="featured-content__icon">'
	+ 				'<img src="https://theeventscalendar.com/content/uploads/2016/07/extensions-85x85.png" alt="" />'
	+ 			'</div>'
	+ 			'<div class="featured-content__body">'
	+					'<h4>Extension Library</h4>'
	+					'<p>Check out free mini-plugins to add additional features and settings to our plugins.</p>'
	+ 			'</div>'
	+ 		'</article>'
	+		'</a>'
	+ 	'<a href="https://theeventscalendar.com/content/uploads/2016/07/icon-code-1-85x85.png">'
	+ 		'<article class="featured-content__item">'
	+ 			'<div class="featured-content__icon">'
	+ 				'<img src="https://theeventscalendar.com/content/uploads/2016/07/icon-code-1-85x85.png" alt="" />'
	+ 			'</div>'
	+ 			'<div class="featured-content__body">'
	+					'<h4>Plugin Functions</h4>'
	+					'<p>Every available function in our products to use as filters for custom functionality.</p>'
	+ 			'</div>'
	+ 		'</article>'
	+		'</a>'
	+ 	'<a href="https://support.theeventscalendar.com/527363-Refund-policy">'
	+ 		'<article class="featured-content__item">'
	+ 			'<div class="featured-content__icon">'
	+ 				'<img src="https://theeventscalendar.com/content/uploads/2019/02/icon-return.png" alt="" />'
	+ 			'</div>'
	+ 			'<div class="featured-content__body">'
	+					'<h4>Orders & Refunds</h4>'
	+					'<p>Is the plugin not right for your project? Here\'s info on orders and refund requests.</p>'
	+ 			'</div>'
	+ 		'</article>'
	+		'</a>'
	+	'</div>'
	+'</section>'

// Portals
var componentPortals = 
'<div class="portals">'
	+	'<div class="portals__portal">'
	+ 	'<div class="portals__icon">'
	+ 	'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-knowledgebase.png" />'
	+ '</div>'
	+ '<div class="portals__content">'
	+ 	'<h2>Getting Started</h2>'
	+ '<p>Articles and tutorials on everything from getting started to customizing the plugins, troubleshooting, integrations and more!</p>'
	+ '<ul>'
	+ 	'<li><a href="https://support.theeventscalendar.com/342672-New-User-Primer-The-Events-Calendar-and-Events-Calendar-PRO">The Events Calendar</a></li>'
	+ 	'<li><a href="https://support.theeventscalendar.com/259544-New-User-Primer-Event-Tickets--Event-Tickets-Plus">Event Tickets</a></li>'
	+ 	'<li><a href="https://support.theeventscalendar.com/710770-New-User-Primer-Event-Aggregator">Event Aggregator</a></li>'
	+ 	'<li><a href="https://support.theeventscalendar.com/890921-New-User-Primer-Community-Events">Community Events</a></li>'
	+ '</ul>'
	+ '<a href="https://theeventscalendar.com/knowledgebase-category/primers/" class="button button--primary">All Guides</a>'
	+ '</div>'
	+ '</div>'
	+ '<div class="portals__portal">'
	+ 	'<div class="portals__icon">'
	+ 		'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-docs.png" />'
	+ 	'</div>'
	+ 	'<div class="portals__content">'
	+ 		'<h2>Trending Topics</h2>'
	+ 		'<p>A few of the most popular guides folks are reading that you may also find helpful for getting the most from the plugins.</p>'
	+ 		'<ul>'
	+ 			'<li><a href="https://support.theeventscalendar.com/934573-Inserting-Calendar-Content-into-Posts-or-Pages">Shortcodes</a></li>'
	+ 			'<li><a href="https://support.theeventscalendar.com/303643-Testing-for-conflicts">Testing for Conflicts</a></li>'
	+ 			'<li><a href="https://theeventscalendar.com/customizations/">Customization</a></li>'
	+ 			'<li><a href="https://support.theeventscalendar.com/969953-CSV-file-examples-for-importing">Importing Events</a></li>'
	+ 		'</ul>'
	+ 		'<a href="https://theeventscalendar.com/functions/" class="button button--primary">Visit Docs</a>'
	+ 	'</div>'
	+ '</div>'
	+ '</div>'

var componentInterstitial = 
	'<div class="interstitial">'
	+ '<div class="interstitial__body interstitial--primary">'
	+		'<div class="interstitial__icon">'
	+ 		'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-forum.png">'
	+ 	'</div>'
	+ 	'<div class="interstitial__content">'
	+ 		'<h3>Looking for More Help?</h3>'
	+ 		'<p>If you have looked through the documentation and knowledgebase and still have questions, then reach out to our friendly support staff and we will help you out.</p>'
	+ 		'<div class="interstitial__actions">'
	+ 			'<a href="https://support.theeventscalendar.com/submit_ticket" class="button button--secondary">Open Ticket</a>'
	+ 			'<a href="https://wordpress.org/support/plugin/the-events-calendar/" class="interstitial__text-link">Free plugin support</a>'
	+ 		'</div>'
	+ 	'</div>'
	+ '</div>'
+ '</div>'

var categoryListHeading = 
'<div class="section-heading">'
	+	'<h2>Guides & Tutorials</h2>'
	+ '</div>'

jQuery( function( $ ) { 

	// This form currently is embedded in the portal homepage
	var $presalesForm = $( '#presales-form' )

	// Test if the current user appears to be logged in
	var isLoggedIn = $( '#menu-item-user' ).length === 1

	// Reverse of the above, to help us write cleaner conditionals
	var isLoggedOut = ! isLoggedIn

	// We'll use this for further comparisons
	var currentUrl = getCurrentUrl()

	// Test if we're on the support portal homepage
	var isHomePage = 'tribe.ladesk.com' === currentUrl

	// Test if we're on the login page
	var isLoginPage = currentUrl.match( /login/ ) !== null

	// Test if we're on the My Tickets page
	var isMyTicketsPage = currentUrl.match( /my_tickets/ ) !== null

	// Test if we're on the Submit Ticket page
	var isSubmitTicketPage = currentUrl.match( /submit_ticket/ ) !== null
	
	var navbarClass = $( '.navbar' )
	var jumbotron = $( '.jumbotron' )
	var jumbotronSearchField = $( '.input-group' )
	var marginTop = $( '.margin-top' )
	var categoryList = $( '.category-list' )
	var marketingClass = $( '#tribe-marketing-alert' )
	var featuredClass = $( '.featured-content' )
	var portalsClass = $( '.portals' )
	var footerClass = $( 'footer' ).addClass( 'footer' )

	/**
	 * Return the page URL, but with any trailing slashes and the protocol 
	 * ("http://" or "https://") stripped for safer comparisons.
	 */
	function getCurrentUrl() {
		var url = document.location.toString()
		var protocolSeparator = url.match( /:\/\// )

		// Remove trailing slash for uniformity
		if ( '/' === url.slice( -1 ) ) {
			url = url.slice( 0, -1 )
		}

		// Remove the protocol
		if ( protocolSeparator !== null ) {
			url = url.slice( protocolSeparator.index + 3 )
		}

		return url;
	}

	function addMarketingAlert( message ) {
		// Add the actual message
		navbarClass.after( message )
	}

	function addJumbotronSearch( content ) {
		if ( isHomePage === true ) {
			jumbotronSearchField.after( content )
		}
	}

	function addComponentFeaturedContent( content ) {
		if ( isHomePage === true ) {
			jumbotron.after( content )
		}
	}

	function addComponentPortals( content ) {
		if ( isHomePage === true ) {
			marginTop.before( content )
		}
	}

	function addCategoryHeading( heading ) {
		if ( isHomePage === true ) {
			categoryList.before( heading )
		}
	}

	function addComponentInterstitial( content ) {
		if ( isHomePage === true ) {
			footerClass.before( content )
		}
	}

	function addJumbotronMessage( message ) {
		$jumbotronHeading.after( message )
	}

	function optionallyRemovePresalesForm() {
		// If the user is not logged in or else if the presales form can't be located
		// we should not interfere
		if ( ! isLoggedIn || $presalesForm.length !== 1 ) {
			return
		}

		$presalesForm.hide()
	}

	addMarketingAlert( marketingAlert )
	addJumbotronSearch( jumbotronSearch )
	addComponentFeaturedContent( componentFeaturedContent )
	addComponentPortals( componentPortals )
	addCategoryHeading( categoryListHeading )
	addComponentInterstitial( componentInterstitial )

	document.body.dispatchEvent( new Event( 'tribe-liveagent.ready' ) );
} )

/*
	*	Gists oEmbed
	* author: Blair Vanderhoof
	* https://github.com/blairvanderhoof/gist-embed
	* version 2.6.0
*/

	function getLineNumbers(lineRangeString) {
		var lineNumbers = [], range, lineNumberSections;

		if (typeof lineRangeString === 'number') {
			lineNumbers.push(lineRangeString);
		} else {
			lineNumberSections = lineRangeString.split(',');

			for (var i = 0; i < lineNumberSections.length; i++) {
				range = lineNumberSections[i].split('-');
				if (range.length === 2) {
					for (var j = parseInt(range[0], 10); j <= range[1]; j++) {
						lineNumbers.push(j);
					}
				} else if (range.length === 1) {
					lineNumbers.push(parseInt(range[0], 10));
				}
			}
		}
		return lineNumbers;
	}

	//object to cache the calls made to the same gist-id
	var gistCache = {};

	$.fn.gist = function(callback) {
		return this.each(function() {
			var $elem = $(this),
				id,
				url,
				file,
				caption,
				lines,
				linesExpanded,
				loading,
				highlightLines,
				hideFooterOption,
				hideLineNumbersOption,
				showLoading,
				showSpinner,
				enableCache,
				data = {};

			// make block level so loading text shows properly
			$elem.css('display', 'block');

			id = $elem.data('gist-id') || '';
			file = $elem.data('gist-file');
			caption = $elem.data('gist-caption');
			hideFooterOption = $elem.data('gist-hide-footer') === true;
			hideLineNumbersOption = $elem.data('gist-hide-line-numbers') === true;
			lines = $elem.data('gist-line');
			linesExpanded = $elem.data('gist-lines-expanded');
			highlightLines = $elem.data('gist-highlight-line');
			showSpinner = $elem.data('gist-show-spinner') === true;
			if (showSpinner) {
				showLoading = false;
			} else {
				showLoading = $elem.data('gist-show-loading') !== undefined ?
					$elem.data('gist-show-loading') : true;
			}

			if (file) {
				data.file = file;
			}

			// if the id doesn't exist, then ignore the code block
			if (!id) {
				return false;
			}

			url = 'https://gist.github.com/' + id + '.json';
			enableCache = $elem.data('gist-enable-cache') === true || gistCache[url];
			loading = 'Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...';

			// loading
			if (showLoading) {
				$elem.html(loading);
			}

			// loading spinner
			if (showSpinner) {
				$elem.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="' + loading + '" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">');
			}

			function successCallback(response) {
				var linkTag,
						head,
						lineNumbers,
						highlightLineNumbers,
						$responseDiv;

				// the html payload is in the div property
				if (response && response.div) {
					// github returns /assets/embed-id.css now, but let's be sure about that
					if (response.stylesheet) {
						// github passes down html instead of a url for the stylehsheet now
						// parse off the href
						if (response.stylesheet.indexOf('<link') === 0) {
							response.stylesheet =
								response.stylesheet
								.replace(/\\/g, '')
								.match(/href=\"([^\s]*)\"/)[1];
						} else if (response.stylesheet.indexOf('http') !== 0) {
							// add leading slash if missing
							if (response.stylesheet.indexOf('/') !== 0) {
								response.stylesheet = '/' + response.stylesheet;
							}
							response.stylesheet = 'https://gist.github.com' + response.stylesheet;
						}
					}

					// add the stylesheet if it does not exist
					if (response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0) {
						linkTag = document.createElement('link');
						head = document.getElementsByTagName('head')[0];

						linkTag.type = 'text/css';
						linkTag.rel = 'stylesheet';
						linkTag.href = response.stylesheet;
						head.insertBefore(linkTag, head.firstChild);
					}

					// refernce to div
					$responseDiv = $(response.div);

					// remove id for uniqueness constraints
					$responseDiv.removeAttr('id');

					$elem.html('').append($responseDiv);

					// option to highlight lines
					if (highlightLines) {
						highlightLineNumbers = getLineNumbers(highlightLines);

						// we need to set the line-data td to 100% so the highlight expands the whole line
						$responseDiv.find('td.line-data').css({
							'width': '100%'
						});

						// find all .js-file-line tds (actual code lines) that match the highlightLines and add the highlight class
						$responseDiv.find('.js-file-line').each(function(index) {
							if ($.inArray(index + 1, highlightLineNumbers) !== -1) {
								$(this).css({
									'background-color': 'rgb(255, 255, 204)'
								});
							}
						});
					}

					// if user provided a line param, get the line numbers based on the criteria
					if (lines) {
						lineNumbers = getLineNumbers(lines);

						var collapsableLineNumbers = [];

						// find all trs containing code lines that don't exist in the line param
						$responseDiv.find('.js-file-line').each(function(index) {
							if (($.inArray(index + 1, lineNumbers)) === -1) {
								if (linesExpanded) {
									collapsableLineNumbers.push(index + 1);
									$(this).parent().hide();
								} else {
									$(this).parent().remove();
								}
							}
						});

						// option to expand highlight lines and collapse hidden lines
						if (linesExpanded) {
							var collapsableBlocks = chunkBy(collapsableLineNumbers, function(line) {
								return !collapsableLineNumbers.includes(line - 1);
							});

							$.each(collapsableBlocks, function(index, block) {
								var firstLine = block[0];
								var lineBeforeFirstLine = firstLine - 1;
								var lastLine = block[block.length - 1];

								var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 44" style="height: 15px; position: relative; top: 2px;"><path fill="#bbb" fill-rule="evenodd" d="M8.0066 16.05305v-7.6523c0-.82422-.47656-1.0273-1.0586-.4414l-3.5117 3.5039c-1.8789 1.875-4.6953-.94142-2.8164-2.8164L8.7215.61564c.68359-.67579 1.8008-.6797 2.4922 0l8.1641 8.0312c1.8789 1.875-.9375 4.6914-2.8164 2.8164l-3.5078-3.5039c-.58984-.58985-1.0625-.38673-1.0625.4414v27.30827c0 .82031.47656 1.0273 1.0586.44141l3.5117-3.5039c1.8789-1.875 4.6953.9375 2.8164 2.8164l-8.1016 8.0273c-.6836.6797-1.8008.6797-2.4922 0l-8.1641-8.0273c-1.8789-1.8789.9375-4.6914 2.8164-2.8164l3.5078 3.5039c.58984.58984 1.0625.38672 1.0625-.4414V16.05304z"/></svg>';
								var collapsibleIcon = $('<a></<a>');
								collapsibleIcon.attr('lines', block.join())
									.css({
										'display': 'block',
										'cursor': 'pointer'
									})
									.html(svg)
									.on('click', function(event) {
										event.preventDefault();
										$(this).closest('tr').remove();
										var that = $(this);
										$('table.highlight').find('tr:hidden td[data-line-number]').each(function(index, element) {
											lines = that.attr('lines').split(',');

											if (($.inArray($(element).attr('data-line-number'), lines)) === -1) {
												return true;
											}

											$(element).parent().show();
										});
									});

								var lineNumberElement = $('<td></td>')
									.addClass('blob-num js-line-number collapsed')
									.attr('style', 'background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; text-align: center; padding-top: 5px !important; padding-bottom: 5px !important;')
									.append(collapsibleIcon);

								var lineCodeElement = $('<td></td>')
									.addClass('blob-code blob-code-inner js-file-line collapsed')
									.attr('style', 'background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; padding-top: 5px !important; padding-bottom: 5px !important;')
									.html('... Lines ' + firstLine + ' - ' + lastLine);

								var lineElement = $('<tr></tr>')
									.append(lineNumberElement)
									.append(lineCodeElement);

								$responseDiv.find('.js-line-number[data-line-number=' + lineBeforeFirstLine + ']').parent().after(lineElement);
							});
						}
					}

					// option to show caption
					if (caption) {
						var tbody = $responseDiv.find('table tbody');
						var row = $('<tr></tr>');
						var captionColumn = $('<td></td>')
							.attr('style', 'padding: 10px !important; border-bottom: 10px solid white; background-color: #f9f9f9; font-weight: bold;')
							.html(caption);

						row.append($('<td style="background-color: #f9f9f9; border-bottom: 10px solid white;"></td>'));
						row.append(captionColumn);
						tbody.prepend(row);
					}

					// option to remove footer
					if (hideFooterOption) {
						$responseDiv.find('.gist-meta').remove();

						// present a uniformed border when footer is hidden
						$responseDiv.find('.gist-data').css('border-bottom', '0px');
						$responseDiv.find('.gist-file').css('border-bottom', '1px solid #ddd');
					}

					// option to remove
					if (hideLineNumbersOption) {
						$responseDiv.find('.js-line-number').remove();
					}
				} else {
					$elem.html('Failed loading gist ' + url);
				}
			}

			function errorCallBack(textStatus) {
				$elem.html('Failed loading gist ' + url + ': ' + textStatus);
			}

			function completeCallBack() {
				if (typeof callback === 'function') {
					callback();
				}
			}

			function chunkBy(items, predicate) {
				if (items.length === 0) {
					return []
				}

				return items.slice(1).reduce(function(chunked, item) {
					if (predicate(item)) {
						chunked.push([item])
					} else {
						chunked.push(chunked.pop().concat([item]))
					}

					return chunked
				}, [items.slice(0, 1)])
			}

			// request the json version of this gist
			$.ajax({
				url: url,
				data: data,
				dataType: 'jsonp',
				timeout: 20000,
				beforeSend: function() {
					// option to enable cacheing of the gists
					if (enableCache) {
						if (gistCache[url]) {
							// loading the response from cache and preventing the ajax call
							gistCache[url].then(function(response) {
								successCallback(response);
								completeCallBack();
							}, function(errorStatus) {
								errorCallBack(errorStatus);
							});
							return false;
						} else {
							// saving the promise for the requested json as a proxy for the actuall response
							gistCache[url] = $.Deferred();
						}
					}
				},
				success: function(response) {
					if (enableCache) {
						if (gistCache[url]) {
							gistCache[url].resolve(response);
						}
					}
					successCallback(response);
				},
				error: function(jqXHR, textStatus) {
					errorCallBack(textStatus);
				},
				complete: function() {
					completeCallBack();
				}
			});

		});
	};

	$(function() {
		// find all elements containing "data-gist-id" attribute.
		$('[data-gist-id]').gist();
	});

})(jQuery);