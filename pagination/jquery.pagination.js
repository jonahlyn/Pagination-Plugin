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
				var nav = $('<ul class="pagination"></ul>'), 
					current_page = parseInt(current_page) || 1,
					next_page = current_page + 1,
					previous_page = current_page - 1, 
					start_range, end_range,
					item, link,
					i = 1;
				
				function createClickHandler(i){
					var i = i || 1;
					return function(e) {
						e.preventDefault();
						displayPage(i);
					}
				}
				
				function appendLink(params){
					params = params || {};
					item = $('<li>');
					
					if(params.pageNum && params.htmlText){
						link = $('<a>')
							.attr('href','#')
							.html(params.htmlText)
							.click(createClickHandler(params.pageNum));
						item.append(link);
					} else if (params.htmlText){
						item.html(params.htmlText);
					}
					if (params.clsName) {
						item.addClass(params.clsName);
					}					
					
					nav.append(item);
				}
							
				// First Page Link
				if(current_page !== 1){
					appendLink({pageNum: 1, htmlText: 'First', clsName: 'first'});
				}else{
					appendLink({htmlText: 'First', clsName: 'first'});
				}
				
				// Previous Page Link
				if(current_page > 1){
					appendLink({pageNum: previous_page, htmlText: 'Previous', clsName: 'previous'});
				}else{
					appendLink({htmlText: 'Previous', clsName: 'previous'});
				}
				
				if(total_pages > opts.pageLimit){
					// Show truncated page navigation
					// TODO: Figure out how to use opts.midRange here
					start_range = current_page - Math.floor(opts.midRange/2);
					end_range = current_page + Math.floor(opts.midRange/2);
					
					if(start_range <= 0){
						start_range = 1;
					}
					if(end_range > total_pages){
						end_range = total_pages;
					}				
					
					for(;i<=total_pages;i++){
						if(i==1 || (i >= start_range && i <= end_range) || i == total_pages){
							
							if(i > 2 && i == start_range){
								nav.append('<li>...</li>');
							}
							
							appendLink({
								pageNum: i, 
								htmlText: i, 
								clsName: (i == current_page)?'active':'link'
								});
							
							if(i < total_pages-1 && i == end_range){
								nav.append('<li>...</li>');
							}
						}
					}
				} else {
					// Display navigation links for all pages
					for(;i<=total_pages;i++){
						appendLink({
							pageNum: i, 
							htmlText: i, 
							clsName: (i == current_page)?'active':'link'
							});
					}
				}
				
				// Next Page Link
				if(current_page < total_pages){
					appendLink({pageNum: next_page, htmlText: 'Next', clsName: 'next'});
				}else {
					appendLink({htmlText: 'Next', clsName: 'next'});
				}
				
				// Last Page Link			
				if(current_page !== total_pages){
					appendLink({pageNum: total_pages, htmlText: 'Last', clsName: 'last'});
				}else {
					appendLink({htmlText: 'Last', clsName: 'last'});
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
			midRange: 7
	};
	
}(jQuery));