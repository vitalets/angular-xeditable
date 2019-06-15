/*
Editable icons:
- default
- font-awesome

*/
angular.module('xeditable').factory('editableIcons', function() {

  var icons = {
    //Icon-set to use, defaults to bootstrap icons
    default: {
      'bs2': {
        ok: 'icon-ok icon-white',
        cancel: 'icon-remove',
        clear: 'icon-trash',
        calendar: 'icon-calendar'
      },
      'bs3': {
        ok: 'glyphicon glyphicon-ok',
        cancel: 'glyphicon glyphicon-remove',
        clear: 'glyphicon glyphicon-trash',
        calendar: 'glyphicon glyphicon-calendar'
      },
      'bs4': {
        ok: 'fa fa-check',
        cancel: 'fa fa-times',
        clear: 'fa fa-trash',
        calendar: 'fa fa-calendar'
      }
    },
    external: {
      'font-awesome': {
        ok: 'fa fa-check',
        cancel: 'fa fa-times',
        clear: 'fa fa-trash',
        calendar: 'fa fa-calendar'
      }
    }
  };

  return icons;
});
