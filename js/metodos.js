function init() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init('calendario', new Date(2017,11,18), "week");
    scheduler.load("./data/events.xml");
};

var prev = null;
var curr = null;
var next = null;
function doOnload() {
    scheduler.config.mark_now = true;
    scheduler.config.multi_day = true;
    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.config.first_hour = 8; // Hora de inicio del calendario
    scheduler.config.last_hour = 21; // Hora de finalizacion del calendario
    scheduler.xy.min_event_height = 60; //define  duracion minima que debe tener un evento (en minutos)
    scheduler.config.time_step = 30; // define el tiempo de variacion de un evento. (PRECISION).(en minutos).
    scheduler.config.limit_time_select = true; // define los limites de hora en las opciones de la ventana de detalles de evento
    scheduler.config.details_on_dblclick = true; // define si se mostrará la ventana de detalles de evento al dar doble clic en el evento.
    scheduler.config.details_on_create = true; // define si se mostrará la ventana de detalles de evento al crearlo.
    scheduler.config.check_limits = true;
    scheduler.config.day_date = "%l, %j %F"; // formato en el que se mostrará la fecha en las cabeceras de la vista semanal.
    scheduler.config.default_date = "%j %F %Y"; // define el formato de vista de la fecha.


    scheduler.init('scheduler_here',new Date(2017,9,30),"week");
    scheduler.load("./data/events.xml");

    var calendar = scheduler.renderCalendar({
        container:"cal_here",
        navigation:true,
        handler:function(date){
            scheduler.setCurrentView(date, scheduler._mode);
        }
    });
    scheduler.linkCalendar(calendar);
    scheduler.setCurrentView(scheduler._date, scheduler._mode);
}