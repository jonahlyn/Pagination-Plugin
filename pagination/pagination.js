/* 
The below two lines are all that should need to be adjusted.
- itemsPerPage should be set to how many list items should be displayed per page.
- itemListPath is the HTML node path for where the list to be paginated resides within the HTML structure.
It is important the list to be paginated have the class itemList or this script will not work.  
*/

var itemsPerPage = 7;
var _itemListPath = 'ul.items';
var _dataSet;
var _itemCount = 0;
var _currentPageNumber = 1;

$(document).ready(function() {
  initList();
});

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function initList() {
    _dataSet = $('<ul />');

    $(_itemListPath).children('li').appendTo(_dataSet);

    _itemCount = _dataSet.children('li').length;

    _dataSet.children('li').each(function(i, obj) {
            $(_itemListPath).append($(obj).clone(true));
    });

    loadPagination(1, $(_itemListPath), $('.pagination'));

}

function loadPagination(pageNum, itemList, pageList) {
    var items = itemList.children('li');
    var cnt = _itemCount;

    var lBound = (pageNum * itemsPerPage) - itemsPerPage;
    var uBound = lBound + itemsPerPage - 1;

    if (uBound > cnt)
        uBound = cnt;

    itemList.children('li').each(function(i, obj) { $(obj).hide(); if (i >= lBound && i <= uBound) { $(obj).show(); } });

    var numberOfPages = Math.floor(cnt / itemsPerPage) + 1;


    if (cnt % itemsPerPage == 0) {
        numberOfPages--;
    }
    pageList.empty();

    if (numberOfPages > 1) {

        if (_currentPageNumber > 1) {
            pageList.append('<li class="first"><a href="javascript:pager(1)"><span>First</span></a></li>');
            pageList.append('<li class="previous"><a href="javascript:pager(' + (_currentPageNumber - 1) + ')"><span>Previous</span></a></li>');
        }
        else {
            pageList.append('<li class="first"><span>First</span></li>');
            pageList.append('<li class="previous"><span>Previous</span></li>');
        }

        if (numberOfPages > 6) {
            offSet = pageNum == 1 ? 1 : 0;

            p1Num = offSet + ((_currentPageNumber - 1) < (numberOfPages - 5) ? (_currentPageNumber - 1) : (numberOfPages - 5));
            pageList.append('<li ' + (p1Num == (pageNum) ? 'class="active"' : '') + '><a href="javascript:pager(' + p1Num + ')">' + p1Num + '</a></li>');

            p2Num = offSet + ((_currentPageNumber + 0) < (numberOfPages - 4) ? (_currentPageNumber + 0) : (numberOfPages - 4));
            pageList.append('<li ' + (p2Num == (pageNum) ? 'class="active"' : '') + '><a href="javascript:pager(' + p2Num + ')">' + p2Num + '</a></li>');

            p3Num = offSet + ((_currentPageNumber + 1) < (numberOfPages - 3) ? (_currentPageNumber + 1) : (numberOfPages - 3));

            if (numberOfPages - 5 > _currentPageNumber) {
                pageList.append('<li ' + (p3Num == (pageNum) ? 'class="active cap"' : 'class="cap"') + '><a href="javascript:pager(' + p3Num + ')">' + p3Num + '</a></li>');
                pageList.append('<li class="cap">&hellip;</li>');
            }
            else {
                pageList.append('<li ' + (p3Num == (pageNum) ? 'class="active"' : 'class=""') + '><a href="javascript:pager(' + p3Num + ')">' + p3Num + '</a></li>');
            }

            pageList.append('<li ' + ((numberOfPages - 2) == (pageNum) ? 'class="active"' : '') + '><a href="javascript:pager(' + (numberOfPages - 2) + ')">' + (numberOfPages - 2) + '</a></li>');
            pageList.append('<li ' + ((numberOfPages - 1) == (pageNum) ? 'class="active"' : '') + '><a href="javascript:pager(' + (numberOfPages - 1) + ')">' + (numberOfPages - 1) + '</a></li>');
            pageList.append('<li ' + ((numberOfPages - 0) == (pageNum) ? 'class="active"' : '') + '><a href="javascript:pager(' + (numberOfPages - 0) + ')">' + (numberOfPages - 0) + '</a></li>');
        }
        else {
            for (i = 0; i < numberOfPages; i++) {
                pageList.append('<li ' + (i == (pageNum - 1) ? 'class="active"' : '') + '><a href="javascript:pager(' + (i + 1) + ')">' + (i + 1) + '</a></li>');
            }
        }

        if (_currentPageNumber < numberOfPages) {
            pageList.append('<li class="next"><a href="javascript:pager(' + (_currentPageNumber + 1) + ')">Next</a></li>');
            pageList.append('<li class="last"><a href="javascript:pager(' + numberOfPages + ')">Last</a></li>');
        }
        else {
            pageList.append('<li class="next"><span>Next</span></li>');
            pageList.append('<li class="last"><span>Last</span></li>');
        }
    }
}

function pager(num) {
    if (num < 1)
        num = 1;

    //reset the page number and load pagination
    _currentPageNumber = num;

    loadPagination(num, $(_itemListPath), $('.pagination'));
}


