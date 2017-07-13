//= require vendor/jquery
//= require vendor/modernizr
//= require vendor/fixedsticky
//= require start-modules
//= require lunr.min
//= require lunr.stemmer.support
//= require search

// Search
var lunrIndex = null;
var lunrData  = null;

$(function() {

  $('.fixedsticky').fixedsticky();

  // Hide sub-nav by default
  $('.js-toc-list > ul > li > ul').hide();

  // Show current section
  $('.current-section > ul').show();

  var $navItems = $('.js-toc-list > ul > li > a');

  // Toggle subnav if it's clicked
  $navItems.click(function() {

    var wasVisible = $(this).siblings("ul").css('display') == 'block';

    // Hide all open navs, including this one
    $navItems.removeClass('is-active');
    $navItems.siblings('ul').hide();

    // If the clicked nav wasn't visible, show it
    if (!wasVisible) {
      $(this).addClass('is-active');
      $(this).siblings("ul").slideToggle('fast');
    }

  });

  var docs = {};

  docs.accordion = {

    config: {
      selector: ".js-accordion",
      itemSel: ".js-accordion-item",
      toggleSel: ".js-accordion-item-toggler",
      contentSel: ".js-accordion-item-content",
      hideClass: "js-hide",
      activeClass: 'js-active'
    },

    makeAccordion: function makeAccordion($accordion) {
      var $items = $accordion.find(this.config.itemSel);
      if(!!$items.length) {
        $items.each(function(index, item){
          var $currentItem = $(item),
            $toggler = $currentItem.find(this.config.toggleSel),
            $content = $currentItem.find(this.config.contentSel);
          $toggler.on('click', function(e){
            $toggler.toggleClass(this.config.activeClass);
            $content.toggleClass(this.config.hideClass);
          }.bind(this))

        }.bind(this));
      }
    },

    init: function init() {
      var $accordions = $(this.config.selector);
      if($accordions.length > 0) {
        $accordions.each(function(index, currentAccordion){
          this.makeAccordion($(currentAccordion));
        }.bind(this));
      }
    }

  }

  /**
   * init stuff
   * @method init
   */
  docs.init = function() {
    docs.accordion.init();
  }

  docs.init();

});
