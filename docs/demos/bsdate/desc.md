Date control is implemented via [Angular-ui bootstrap datepicker](http://angular-ui.github.io/bootstrap/#/datepicker).  
You should include additional `ui-bootstrap-tpls.min.js`:

	<script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.6.0/ui-bootstrap-tpls.min.js"></script>

Add `ui.bootstrap` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

And set `editable-bsdate` attribute in editable element.
Other parameters can be defined via `e-*` syntax, e.g. `e-datepicker-popup="dd-MMMM-yyyy"`.