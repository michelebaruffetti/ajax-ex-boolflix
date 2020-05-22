$(document).ready(function(){

    var template_html = $('#template').html();
    var template_function = Handlebars.compile(template_html);

    $('#cerca').click(function(){
        var film_da_cercare = $('#testo-cerca').val();
        console.log(film_da_cercare);

        $.ajax({

            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'data' : {
                'api_key' : '19721551d07f17afa14c0f3fcca30e9d',
                'query' : film_da_cercare,
                'language' : 'it'
            },
            'success' : function(data){
                // creo variabile col risultato della query-ricerca
                var risulato_ricerca = data.results;
                console.log(risulato_ricerca);

                // ciclo il risultato per scorrere ogni oggetto dell'array
                for (var i = 0; i < risulato_ricerca.length; i++) {
                    // variabile del film-oggetto corrente
                    var film_corrente = risulato_ricerca[i];
                    // console.log(film_corrente);

                    // selezione i parametri che mi interessanto nel film corrente
                    var film_data = {
                        'titolo' : film_corrente.title,
                        'titolo_originale' : film_corrente.original_title,
                        'lingua' : film_corrente.original_language,
                        'voto' : film_corrente.vote_average
                    };

                    console.log(film_data);

                }
            },
            'error' : function() {
                alert('problema nella ricezione dati')
            }




        });

    });




});
