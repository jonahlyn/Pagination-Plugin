/**
 * Plug-in: Pagination
 *
 */


(function($){
	
	$.fn.pagination = function(options){
		var opts = $.extend({}, $.fn.pagination.defaults, options);
		
		return this.each(function(){
			var page_elem = $(this),
				items = page_elem.children('li'), 
				total_items = items.length, 
				total_pages = Math.ceil(total_items / opts.itemsPerPage),
				nav, nav2;
			
			function displayPage(pageNum){
				var current_page = pageNum || 1,					
					low = (current_page - 1) * opts.itemsPerPage,
					high = low + opts.itemsPerPage;
				
				items.hide();
				items.slice(low,high).show();
				emphasizeCurrentPage(current_page);
			}
			
			function emphasizeCurrentPage(current_page){
				var nav_index = (current_page - 1) || 0;
				$.each([nav, nav2], function(idx, val){
					$('li a', $(val))
						.css({'font-weight':'normal'})
						.filter(':eq('+nav_index+')').css({'font-weight':'bold'});					
				});				
			}
			
			displayPage();
			
			nav = buildNavigation(total_pages);
			$('li a',nav).click(function(e){
				e.preventDefault();
				displayPage(e.target.textContent);
			});
			nav2 = nav.clone(true);
			page_elem.before(nav).after(nav2);
			
			emphasizeCurrentPage();
		});
	};
	
	function buildNavigation(total_pages){
		var nav = $('<ul class="pagination"></ul>'), i = 1;
		
		for(;i<=total_pages;i++){
			nav.append('<li><a href="#">'+i+'</a></li>');
		}
		
		return nav;
	}
	
	$.fn.pagination.defaults = {
			itemsPerPage: 7,
			navigationClass: 'pagination'
	};
	
}(jQuery));