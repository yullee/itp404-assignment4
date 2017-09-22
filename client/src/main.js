let searchTemplate = $('#search-template').html();
let rendersearch = Handlebars.compile(searchTemplate);

let searchesTemplate = $('#searches-template').html();
let rendersearches = Handlebars.compile(searchesTemplate);

let searches = [];

$('#search-button').on('click', function() {
    var userSearch = document.querySelector('#wall-search').value; 
    var url = 'https://api.github.com/users/' + userSearch + '/repos';

    $('#result').text('Loading...'); // A loading indicator
    $.getJSON(url).then(function(results) {
        userSearch = ''; // Clear the value
        $('textarea').text(''); 
        $('#result').text(''); // Clear the result
        console.log(results);

        for(i = 0; i < results.length; i++) {
            // Display a search title
            $('#result').append((i + 1) + '. ' + results[i].name + '<br />');
        } // End of for

    }, function(error) { // Respond with a 404 HTTP response
    $('#result').text(''); // Clear the result

    // Display an error message on the page
    $('#result').append('Opps! Something went wrong!' + '<br />');

    // Display an error message on the console
    console.log('Opps! Something went wrong!');
    });
});

$('#search-button').on('click', function() {
    let searchBody = $('#wall-search').val();
    $.ajax({
      type: 'POST', // Hit the POST /api/searches endpoint
        url: 'http://localhost:3000/api/searches',
        data: { // 2 attributes
        term: searchBody,
        createdAt: new Date()
        }
    }).then(function(response) {
        searches.push(response);
        $('#wall-searches').html(rendersearches({
            searches: searches
        })); 
    });
});

$.ajax({
    type: 'GET', // Hit the GET /api/searches endpoint
    url: 'http://localhost:3000/api/searches'
}).then(function(response) {

    $('#wall-searches').append(rendersearches({
        searches: response
    }));

    searches = response;
});