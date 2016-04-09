UI-Select control is implemented via [AngularJS-native version of Select2 and Selectize](https://github.com/angular-ui/ui-select).  
You should include additional `select.min.js` and `select.min.css`:

	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.js"></script>
	
	<link href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.16.1/select.min.css" rel="stylesheet" media="screen">

Then add `ui.select` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.select"]);

And finally set `editable-ui-select` attribute pointing to model and `editable-ui-select-match` to the match criteria
and `editable-ui-select-choices` to the choices.