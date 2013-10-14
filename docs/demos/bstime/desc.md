Time control is implemented via [Angular-ui bootstrap timepicker](http://angular-ui.github.io/bootstrap/#/timepicker).  
Currently it has only Bootstrap 2 version, Bootstrap 3 version is [in progress](https://github.com/angular-ui/bootstrap/issues?milestone=6).  
You should include additional `ui-bootstrap-tpls.min.js`:

	<script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.6.0/ui-bootstrap-tpls.min.js"></script>

Add `ui.bootstrap` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

And set `editable-bstime` attribute in editable element.
Other parameters can be defined via `e-*` syntax, e.g. `e-minute-step="10"`.