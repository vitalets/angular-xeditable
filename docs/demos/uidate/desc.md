Date control is implemented via [jQuery UI Datepicker for AngularJS](https://github.com/angular-ui/ui-date).  

You should install ui-date with bower:

        bower install angular-ui-date --save	

Add the CSS:

```html
<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.css"/>
```

Load the script files (minimun jQuery version is v2.2.0):

```html
<script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
<script type="text/javascript" src="bower_components/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-date/dist/date.js"></script>
```

Add the date module as a dependency to your application module:

```js
angular.module('MyApp', ['ui.date'])
```

And set `editable-uidate` attribute in editable element.  

You can pass an `e-ui-date` attribute pointing to an object with a picker configuration that you may want.

```js
var datePickerOptions = {
    changeYear: true,
    changeMonth: true,
    showOn: "button",
    buttonImage: "build/assets/img/calendar.png",
    buttonImageOnly: true
};
```

