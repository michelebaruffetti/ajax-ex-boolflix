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




// QUESTA FUNZIONE INVOCA LA CHIAMATA AJAX
    function chiamata_ajax() {
        var film_da_cercare = $('#testo-cerca').val().trim();
        console.log(film_da_cercare);
        // svuotare container
        $('.main-container').empty();
        // riazzerare l'input
        $('#testo-cerca').val('');
            if (film_da_cercare.length > 1) {
                $.ajax({
                    'url': 'https://api.themoviedb.org/3/search/movie',
                    'method': 'GET',
                    'data' : {
                        'api_key' : '19721551d07f17afa14c0f3fcca30e9d',
                        'query' : film_da_cercare,
                        'language' : 'it'
                    },
                    'success' : function(data){
                        ricerca_dati(data.results);

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

// QUESTA FUNZIONE RICERCA I DATI NELL'AJAX SUCCESS
        function ricerca_dati(data){
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
                    'titolo' : film_corrente.title,
                    'titolo_originale' : film_corrente.original_title,
                    'lingua' : svela_bandiere(film_corrente.original_language),
                    'voto' : voto_in_stelle(film_corrente.vote_average)
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
