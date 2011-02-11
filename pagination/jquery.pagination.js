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
				updateNavigation(current_page);
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
			
			function buildNavigation(current_page){
				var nav = $('<ul class="pagination"></ul>'), i = 1, start_range, end_range,
					current_page = parseInt(current_page) || 1;
				
				if(total_pages > opts.pageLimit){
					// Show abbreviated page navigation
					// TODO: Figure out how to use opts.midRange here
					start_range = current_page - 2;
					end_range = current_page + 2;
					
					if(start_range <= 0){
						start_range = current_page;
					}
					if(end_range > total_pages){
						end_range = total_pages;
					}
					
					console.log('current page: ' + current_page);
					console.log('total pages: ' + total_pages);
					console.log('start range: ' + start_range);
					console.log('end range: ' + end_range);
					
					for(;i<=total_pages;i++){
						if(i==1 || (i >= start_range && i <= end_range) || i == total_pages){
							if(i > 1 && i == start_range){
								nav.append('<li>...</li>');
							}							
							nav.append('<li><a href="#">'+i+'</a></li>');
							if(i < total_pages && i == end_range){
								nav.append('<li>...</li>');
							}
						}
					}
				} else {
					// Display links for all pages
					for(;i<=total_pages;i++){
						nav.append('<li><a href="#">'+i+'</a></li>');
					}					
				}
				
				return nav;
			}
			
			function updateNavigation(current_page){
				if(nav){
					nav.remove();
					nav2.remove();
				}
				nav = buildNavigation(current_page);
				$('li a',nav).click(function(e){
					e.preventDefault();
					displayPage(e.target.textContent);
				});
				nav2 = nav.clone(true);
				page_elem.before(nav).after(nav2);
			}			
			
			displayPage();
			updateNavigation();
			emphasizeCurrentPage();
		});
	};
	
	$.fn.pagination.defaults = {
			itemsPerPage: 7,
			pageLimit: 10,
			midRange: 5
	};
	
}(jQuery));