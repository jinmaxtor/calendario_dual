function init() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('calendario', new Date(2017,11,18), "week");
    scheduler.load("./data/events.xml");
}

function retornarColor(nombreEvento) {
    var colores = ["#0176BC", "#627D4D", "#F7931E", "#2EBDEF", "#662D91", "#DB00C5"];
    var color = null;
    switch (nombreEvento){
        case "REUNION": color = colores[0];
            break;
        case "CAPACITACION": color = colores[1];
            break;
        case "PRESENTACIÓN": color = colores[2];
            break;
        case "REUNION DEL DIRECTORIO": color = colores[3];
            break;
        case "VISITA": color = colores[4];
            break;
        case "CAMBIO VERSION": color = colores[5];
            break;
    }
    return color;
}



function inicializar() {
    sacar_poner();
    iniciarCalendario();
}

function fechaToFechaStr(date) {
    var fun = scheduler.date.date_to_str("%d/%m/%Y");
    return  fun(date);
}

function fechaToHoraStr(date) {
    var fun = scheduler.date.date_to_str("%H:%i:%s");
    return  fun(date);
}

function sacar_poner() {

    $(".external-event").draggable({
        //helper: "clone",
        //opacity: 0.35,
        stack: ".external-event",
        revert: true,
        revertDuration: 0,
        //zIndex: 999,
        drag: function () {
            evento_panel = $(this);
        }

    });

    $("#poner").droppable({
        accept: ".external-event",
        drop: function (event, ui) {
            var event = event.originalEvent;

            var atrapado = scheduler.getActionData(event),
                node = event.target || event.srcElement;

            if (atrapado.date) {
                var tipoEvento = node.innerHTML;
                var fecha = fechaToFechaStr(atrapado.date);
                var hora = fechaToHoraStr(atrapado.date);

                alert(tipoEvento);
                alert(fecha);
                alert(hora);


                // Se crea el evento en el calendario
                var evento = {
                    text : tipoEvento,
                    start_date : atrapado.date,
                    end_date : scheduler.date.add(atrapado.date, duracion, 'minute'),
                    color: retornarColor(tipoEvento)
                    //atributo1: valor1,
                    //atributo2: valor2,
                    //atributoN: valorN
                };

                //se añade el evento al calendario
                var id_evento = scheduler.addEvent(evento);
                var eve = scheduler.getEvent(id_evento);
                console.log(eve);
                //scheduler.showLightbox(evento.id);
                //scheduler.endLightbox(false);

                console.log(tipoEvento);
                console.log(fecha);
                console.log(hora);
            }
        }
    });

    /*
    $("#poneres").droppable({
        accept: ".external-event",
        //tolerance: "intersect",
        drop: function () {
            //alert(event);
            alert("hola");

            //var evt = e ? e.target : window.event.srcElement;



            alert(event);
            var evento_atrapado = scheduler.getActionData(event),
                node = evt.target || evt.srcElement;

            alert(evento_atrapado);

            // si el evento es valido
            if(evento_atrapado.date){

                var fecha = fecha_to_FechaStr(evento_atrapado.date);
                var hora = fecha_to_HoraStr(evento_atrapado.date);
                alert(fecha + " " + hora);


                //se crea el nuevo evento
                var evento = {
                    text : node.innerHTML,
                    start_date : evento_atrapado.date,
                    end_date : scheduler.date.add(evento_atrapado.date, duracion, 'minute'),
                    color: retornarColor(node.innerHTML)
                    //atributo1: valor1,
                    //atributo2: valor2,
                    //atributoN: valorN
                };

                //se añade el evento al calendario

                var id_evento = scheduler.addEvent(evento);
                var eve = scheduler.getEvent(id_evento);
                console.log(eve);
                //scheduler.showLightbox(evento.id);
                //scheduler.endLightbox(false);


            } else {
                alert("invalido");
            }

        }

    });
    */
}

duracion = 120; // duracion para el evento arrastrable en minutos.

function iniciarCalendario() {

// CONFIGURACIÓN
    scheduler.config.mark_now = true;
    scheduler.config.multi_day = true;
    scheduler.config.xml_date="%Y-%m-%d %H:%i"; //
    scheduler.config.first_hour = 8; // Hora de inicio del calendario
    scheduler.config.last_hour = 21; // Hora de finalizacion del calendario
    scheduler.xy.min_event_height = 30; //define  duracion minima que debe tener un evento (en minutos)
    scheduler.config.time_step = 30; // define el tiempo de variacion de un evento. (PRECISION).(en minutos).
    scheduler.config.limit_time_select = true; // define los limites de hora en las opciones de la ventana de detalles de evento
    scheduler.config.details_on_dblclick = false; // define si se mostrará la ventana de detalles de evento al dar doble clic en el evento. si esta en falso al hacer doble clic solo hara F2
    scheduler.config.details_on_create = true; // define si se mostrará la ventana de detalles de evento al crearlo.
    scheduler.config.check_limits = true;
    scheduler.config.separate_short_events = true; // forza la separacion de eventos cercanos
    scheduler.config.hour_size_px = 44; // tamaño en pixeles de la escala de 1 hora

    //scheduler.xy.margin_top = 200; // tamaño del margen inferior
    scheduler.xy.nav_height = 70; // tamaño en pixeles de la cabecera del calendario
    scheduler.xy.scale_height = 30; // tamaño en pixeles del cuadro de fechas.

    // Formato de horarios y fechas. mas detalles en: https://docs.dhtmlx.com/scheduler/settings_format.html
    scheduler.config.day_date = "%l, %j %F"; // formato en el que se mostrará la fecha en las cabeceras de la vista semanal.
    scheduler.config.default_date = "%j %F %Y"; // define el formato de vista de la fecha.


    // codigo para rastrear puntero
    scheduler.attachEvent("onMouseMove", function(id, ev){
        var obj = scheduler.getActionData(ev);
        //console.log(obj.section);
        document.getElementById('log').innerHTML = "Click at "+obj.date+"<br>section:"+obj.section;
    });



// INICIALIZACIÓN Y CARGA
    scheduler.init('calendario',new Date(2017,9,30),"week");// inicia el calendario


    scheduler.parse([
        {start_date: "2017-10-30 08:30", end_date: "2017-10-30 9:30", text: "Reunion importante by jin", details: "en la UAGRM", color: "red"},
        {start_date: "2017-10-30 09:00", end_date: "2017-10-30 10:00", text: "Junta de venta", details: "software", color: "green"},
        {start_date: "2017-10-30 09:15", end_date: "2017-10-30 10:15", text: "Junte de promos Heroes del chaco", details: "promo 2013", color: "#BC996F"},
        {start_date: "2017-10-30 12:00", end_date: "2017-10-30 13:30", text: "Desde el amanecer", details: "en la mañana"},
        {start_date: "2017-10-30 11:00", end_date: "2017-10-30 12:30", text: "Cumpleaños de Nicol", details: "evento realizado todo el año"}
    ], "json");

    //scheduler.load("./data/events.xml"); // carga los datos desde archivo
}