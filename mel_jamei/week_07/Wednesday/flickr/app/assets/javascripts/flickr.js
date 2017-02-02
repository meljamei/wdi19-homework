var searchFlickr = function(q, page){
  console.log('Searching flickr for', q);
  var flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';





  // flickerURL = flickerURL + '&text' + q;
  // $.ajax();
      $.getJSON(flickrURL, {
        method: 'flickr.photos.search',//method => what code do you want to run
        api_key: '2f5ac274ecfac5a455f38745704ad084',
        per_page: 20,
        page: page || 1,
        text: q,
        format: 'json'
        //more parameteres will go here
      }).done(function(results){

        /*
        * to test:
        * Don't request more images when you reach the last "page" of Flickr results
        */
         //results.photos.pages = 2;

          
        _(results.photos.photo).each(function(p){

          //console.log(JSON.stringify(results.photos));

          var url = generateURL(p)
          // console.log(url);
          var content = "<div class=\"col-xs-3 col-md-3\">";
          content += '<a href="#" class="thumbnail">';
          content += '<img src="' + url + '" alt="..." style="width:100%">';
          content += "</a>";
          content += "</div>"

          $content = $(content);


          if (page >= results.photos.pages ){
            console.log('Stopped')
          }else{
            $content.appendTo('#images');
          }

          //var $img = $('<img/>', {src: url});
          // console.log($img);
          //$img.appendTo('#images');

        });
      });




};
var generateURL = function (photo){
  return [
    'http://farm',
    photo.farm,
    '.static.flickr.com/',
    photo.server,
    '/',
    photo.id,
    '_',
    photo.secret,
    '_q.jpg'// change the q for different sizes

  ].join('');
}


$(document).ready(function(){

  var pageCount = 1;

  $('#search').on('submit', function(event){// prevent search button to workv
    event.preventDefault();

    $('#images').html("");
    //retrieve the search term from the input
      var query = $('#query').val();
      searchFlickr(query, 1);
    //search fliker for that term
    // show result

  });
  $(window).on('scroll', function(){// to keep size of the pictures fix in different windows
    // console.log('scroll');
    var documentHeight = $(document).height();
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    var scrollBottom = documentHeight - (scrollTop + windowHeight);






    // console.log(documentHeight, windowHeight, scrollTop);
    if (scrollBottom < 200){
      //console.log(`ScrollBottom is ${scrollBottom}`);
      pageCount = pageCount + 1;
      //console.log(`Page is ${pageCount}`);

      // console.log('near the bottom');
      var query = $('#query').val();
      searchFlickr(query, pageCount);
    }

  })
});
// pagination
//make
