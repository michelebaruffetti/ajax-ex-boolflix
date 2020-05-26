$(document).ready(function(){

    var template_html = $('#template').html();
    var template_function = Handlebars.compile(template_html);

// PREMENDO INVIO PARTE CHIAMATA AJAX
    $('#testo-cerca').keyup(function(event){
        if (event.which == 13){
            chiamata_ajax();
        }

    });

// AL CLICK SUL BOTTONE CERCA AVVIA CHIAMATA AJAX
    $('#cerca').click(function(){
            chiamata_ajax();
    });


// -------- FUNZIONI -------

// QUESTA FUNZIONE INVOCA LA CHIAMATA AJAX
    function chiamata_ajax() {
        var film_da_cercare = $('#testo-cerca').val().trim();
        console.log(film_da_cercare);
        // svuotare container
        $('.main-container').empty();
        // riazzerare l'input
        $('#testo-cerca').val('');
        // assegno a delle variabili alcuni parametri da passare nella funzione
        var url_movie = 'https://api.themoviedb.org/3/search/movie';
        var url_series = 'https://api.themoviedb.org/3/search/tv';
        var api_key = '19721551d07f17afa14c0f3fcca30e9d';
        var poster_url = 'https://image.tmdb.org/t/p/w185';
        var film = 'film';
        var serie_tv = 'serie tv'
        // richiamo le funzioni ajax con gli url e il film da cercare
            url_ajax(film_da_cercare, url_movie, film, api_key, poster_url);
            url_ajax(film_da_cercare,url_series, serie_tv, api_key, poster_url);

    };


// CREO UNA FUNZIONE CHE EVOCA AJAX CON DUE VARIABILI: IL DATO INSERITO DALL'UTENTE E L'URL DOVE FARE GET
    function url_ajax(dato_utente, url, tipo, api, poster_url){
        if (dato_utente.length > 1) {
            $.ajax({
                'url': url,
                'method': 'GET',
                'data' : {
                    'api_key' : api,
                    'query' : dato_utente,
                    'language' : 'it'
                },
                'success' : function(data){
                    ricerca_dati(data.results, tipo, poster_url);

                },
                'error' : function() {
                    alert('problema nella ricezione dati')
                }

            });
        }
        else {
            alert('Digita più di due lettere!');
        }
    };

// QUESTA FUNZIONE RICERCA I DATI NELL'AJAX SUCCESS (include la modifica per nome e nome originale della serie tv)
    function ricerca_dati(data, tipo, poster_url){
            // creo variabile col risultato della query-ricerca
            var risulato_ricerca = data;
            console.log(risulato_ricerca);

                // ciclo il risultato per scorrere ogni oggetto dell'array
                for (var i = 0; i < risulato_ricerca.length; i++) {
                    // variabile del film-oggetto corrente
                    var film_corrente = risulato_ricerca[i];
                    // console.log(film_corrente);

                    // selezione i parametri che mi interessanto nel film corrente
                        var film_data = {
                            'immagine': poster_url + film_corrente.poster_path,
                            'titolo' : film_corrente.title || film_corrente.name,
                            'titolo_originale' : film_corrente.original_title || film_corrente.original_name,
                            'lingua' : svela_bandiere(film_corrente.original_language),
                            'voto' : voto_in_stelle(film_corrente.vote_average),
                            'tipo' : tipo
                        };
                    // console.log(film_data);

                    // compilazione html
                    var html_compilato = template_function(film_data);

                    // append html compilato
                    $('.main-container').append(html_compilato);
                };


    };

// QUESTA FUNZIONE TRASFORMA IL VOTO IN STELLE
    function voto_in_stelle(valutazione) {
        var voto = Math.ceil(valutazione / 2);
        // console.log(voto);
        var stelle = '';
        // faccio un ciclo dove finché la variabile voto è maggiore di zero metto le stelle piene, poi le vuolte
        for (var i = 0; i < 5; i++) {
            if (voto > 0) {
                stelle += '<i class="fas fa-star"></i>';
                voto --;
            }
            else {
                stelle += '<i class="far fa-star"></i>';
            };

        }
        return stelle;
    };

// QUESTA FUNZIONE TRASFORMA I LA LINGUA IT FR E EN IN BANDIERINE CORRISPONDENTI AI PAESI IN QUESTIONE
    function svela_bandiere(lingua){
        bandiere = ['en', 'it', 'fr']
        if (bandiere.includes(lingua)) {
            return '<img src="img/flag_'+lingua+'.png">';
        }
        else {
            return lingua;
        }
    };

});
