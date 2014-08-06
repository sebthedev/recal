/// <reference path="../../../typings/tsd.d.ts" />
define(["require", "exports", 'jquery', '../Agenda/AgendaTableViewController', '../../../library/Table/TableView'], function(require, exports, $, AgendaTableViewController, TableView) {
    var tableView = TableView.fromJQuery($('#agendaui'));
    var agendaTableVC;

    function Agenda_init() {
        agendaTableVC = new AgendaTableViewController(tableView);
    }
    function Agenda_reload() {
        agendaTableVC.reload();
    }

    window.Agenda_init = Agenda_init;
    window.Agenda_reload = Agenda_reload;

    Agenda_init();
});