/**
 * Plug-in: Pagination
 *
 */


(function($){
	
	var opts;
	
	$.fn.pagination = function(options){
		opts = $.extend({}, $.fn.pagination.defaults, options);
		
		return this.each(function(){
			var page_elem = $(this),
				items = page_elem.children('li'), 
				total_items = items.length, 
				total_pages = Math.ceil(total_items / opts.itemsPerPage),
				nav;
			
			function displayPage(pageNum){
				var current_page = pageNum || 1,					
					low = (current_page - 1) * opts.itemsPerPage,
					high = low + opts.itemsPerPage;
				
				items.hide();
				items.slice(low,high).show();
				emphasizeCurrentPage(current_page);
			};
			
			displayPage();
			
			nav = buildNavigation(total_pages);
			$('li a',nav).click(function(e){
				e.preventDefault();
				displayPage(e.target.innerText);
			});			
			page_elem.before(nav).after(nav.clone(true));
			emphasizeCurrentPage();
		});
	};
	
	function buildNavigation(total_pages){
		var nav = $('<ul class="'+opts.navigationClass+'"></ul>'), i = 1;
		
		for(;i<=total_pages;i++){
			nav.append('<li><a href="#">'+i+'</a></li>');
		}
		
		return nav;
	}
	
	function emphasizeCurrentPage(current_page){
		var nav_index = (current_page - 1) || 0;
		$('ul.'+opts.navigationClass).each(function(){
			$('li a',$(this))
				.css({'font-weight':'normal'})
				.filter(':eq('+nav_index+')').css({'font-weight':'bold'});
		});
	}
	
	$.fn.pagination.defaults = {
			itemsPerPage: 7,
			navigationClass: 'pagination'
	};
	
}(jQuery));