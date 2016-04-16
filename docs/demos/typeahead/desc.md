Typeahead control is implemented via [Angular-ui bootstrap typeahead](http://angular-ui.github.io/bootstrap/#/typeahead).  
Basically it is normal `editable-text` control with additional `e-typeahead` attributes.  
You should include additional `ui-bootstrap-tpls.min.js`:

	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.1/ui-bootstrap-tpls.min.js"></script>

Then add `ui.bootstrap` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

And finally set `editable-text` attribute pointing to model and `e-uib-typeahead` attribute pointing to typeahead items.
Other parameters can be defined via `e-typeahead-*` syntax, e.g. `e-typeahead-wait-ms="100"`.