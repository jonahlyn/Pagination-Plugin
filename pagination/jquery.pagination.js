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
			}			
			
			function buildNavigation(current_page){
				var nav = $('<ul class="pagination"></ul>'), i = 1, start_range, end_range,
					current_page = parseInt(current_page) || 1,
					item, link;
				
				function createClickHandler(i){
					var i = i;
					return function(e) {
						e.preventDefault();
						displayPage(i);
			        }
				}
				
				if(total_pages > opts.pageLimit){
					// Show truncated page navigation
					// TODO: Figure out how to use opts.midRange here
					start_range = current_page - 2;
					end_range = current_page + 2;
					
					if(start_range <= 0){
						start_range = current_page;
					}
					if(end_range > total_pages){
						end_range = total_pages;
					}
					
					for(;i<=total_pages;i++){
						if(i==1 || (i >= start_range && i <= end_range) || i == total_pages){
							item = $('<li>');
							link = $('<a>');
							link.attr('href','#')
								.html(i)
								.click(createClickHandler(i));
							
							// Highlight the current page
							if(i == current_page){
								link.addClass('active');
							}
							
							item.append(link);
							
							if(i > 2 && i == start_range){
								nav.append('<li>...</li>');
							}							
							nav.append(item);
							if(i < total_pages && i == end_range){
								nav.append('<li>...</li>');
							}
						}
					}
				} else {
					// Display navigation links for all pages
					for(;i<=total_pages;i++){
						item = $('<li>');
						link = $('<a>');
						link.attr('href','#')
							.html(i)
							.click(createClickHandler(i));
						
						// Highlight the current page
						if(i == current_page){
							link.addClass('active');
						}
						
						item.append(link);
						nav.append(item);
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
				nav2 = nav.clone(true);
				page_elem.before(nav).after(nav2);
			}			
			
			displayPage();
		});
	};
	
	$.fn.pagination.defaults = {
			itemsPerPage: 7,
			pageLimit: 10,
			midRange: 5
	};
	
}(jQuery));