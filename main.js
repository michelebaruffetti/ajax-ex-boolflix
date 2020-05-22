$(document).ready(function(){


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
            'success' : function(risposta){
                // creo variabile col risultato della query-ricerca
                var risulato_ricera = risposta.response;

                // ciclo il risultato per scorrere ogni oggetto dell'array
                for (var i = 0; i < risulato_ricera.length; i++) {
                    // variabile del film-oggetto corrente
                    var film_corrente = risulato_ricera[i];

                    // selezione i parametri che mi interessanto nel film corrente
                }
            },
            'error' : function() {}




        });

    });




});
