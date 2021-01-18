(function($){
    
    var paginate = {
        startPos: function(pageNumber, perPage) {
            // determine what array position to start from
            // based on current page and # per page
            return pageNumber * perPage;
        },

        getPage: function(items, startPos, perPage) {
            // declare an empty array to hold our page items
            var page = [];

            // only get items after the starting position
            items = items.slice(startPos, items.length);

            // loop remaining items until max per page
            for (var i=0; i < perPage; i++) {
                page.push(items[i]); }

            return page;
        },

        totalPages: function(items, perPage) {
            // determine total number of pages
            return Math.ceil(items.length / perPage);
        },

        createBtns: function(totalPages, currentPage) {
            // create buttons to manipulate current page
            var pagination = $('<footer class="pagination" />');

            // add a "first" button
            pagination.append('<span class="pagination-button">&laquo;</span>');

            // add pages inbetween
            for (var i=1; i <= totalPages; i++) {
                // truncate list when too large
                if (totalPages > 5 && currentPage !== i) {
                    // if on first two pages
                    if (currentPage === 1 || currentPage === 2) {
                        // show first 5 pages
                        if (i > 5) continue;
                    // if on last two pages
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        // show last 5 pages
                        if (i < totalPages - 4) continue;
                    // otherwise show 5 pages w/ current in middle
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue; }
                    }
                }

                // markup for page button
                var pageBtn = $('<span class="pagination-button page-num" />');

                // add active class for current page
                if (i == currentPage) {
                    pageBtn.addClass('active'); }

                // set text to the page number
                pageBtn.text(i);

                // add button to the container
                pagination.append(pageBtn);
            }

            // add a "last" button
            pagination.append($('<span class="pagination-button">&raquo;</span>'));

            return pagination;
        },

        createPage: function(items, currentPage, perPage) {
            // remove pagination from the page
            $('.pagination').remove();

            // set context for the items
            var container = items.parent(),
                // detach items from the page and cast as array
                items = items.detach().toArray(),
                // get start position and select items for page
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);

            // loop items and readd to page
            $.each(page, function(){
                // prevent empty items that return as Window
                if (this.window === undefined) {
                    container.append($(this)); }
            });

            // prep pagination buttons and add to page
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);

            container.after(pageButtons);
        }
    };

    // stuff it all into a jQuery method!
    $.fn.paginate = function(perPage) {
        var items = $(this);

        // default perPage to 5
        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5; }

        // don't fire if fewer items than perPage
        if (items.length <= perPage) {
            return true; }

        // ensure items stay in the same DOM position
        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        // paginate the items starting at page 1
        paginate.createPage(items, 1, perPage);

        // handle click events on the buttons
        $(document).on('click', '.pagination-button', function(e) {
            // get current page from active button
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            // get numbered page
            newPage = parseInt(target.text(), 10);
            if (target.text() == '«') newPage = 1;
            if (target.text() == '»') newPage = totalPages;

            // ensure newPage is in available range
            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage); }
        });
    };

})(jQuery);


/* Cultural and Creative card and factory*/
// for(var i=1;i<=20;i++)
// {
// $('.cardbox').append('<div class="card"></div>');
// }
// $('.card').append('<div class="cardimg img"></div>').append('<div class="cardword"></div>');
// $('.cardword').append('<header>商品名稱</header>').append('<p>');
// $('.cardword p').append('<i class="fas fa-user-alt"></i>&nbsp;&nbsp;製作者:XXX<br><br>不退色不過敏.品質非常好男生女生都是開口可以調整大小');


// for(var i=1;i<=6;i++)
// {
//     $('.factorycardbox').append('<div class="factorycard"></div>');
// }
// $('.factorycard').append('<div class="fimg"></div>').append('<div class="factoryword"></div>');
// $('.factoryword').append('<header>工廠名稱</header>').append('<p>');
// $('.factorycard p').append('<i class="fas fa-phone"></i>&nbsp;&nbsp;電話:03 537 4281<br><br><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;地址:新竹市香山區五福路二段707號<br><br>品皇咖啡觀光工廠是台灣少數以「咖啡」為展覽主題的觀光工廠。現在路上，比比皆是連鎖咖啡店，但民眾「喝」咖啡，卻對這塊黑金認識不夠，品皇咖啡為了讓民眾能更了解咖啡的來龍去脈，設立了「品皇咖啡觀光工廠」，眼下不以營利為最終目的，而是希望參訪者能透過休閒觀光的輕鬆行程，對暗藏奧秘的咖啡擁有更深刻的了解。');



/* This part is just for the demo,
not actually part of the plugin */
$('.card').paginate(8);








        $('.factorycardbox').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow:` <button class='prev'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg></button>`,
        nextArrow:` <button class='next'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg></button>`,
            responsive: [
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow:` <button class='prev'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg></button>`,
        nextArrow:` <button class='next'><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg></button>`,
                  }
                },
              ]
        });