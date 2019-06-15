Time control is implemented via [Angular-ui bootstrap timepicker](http://angular-ui.github.io/bootstrap/#/timepicker).  
You should include additional `ui-bootstrap-tpls.min.js`for Bootstrap 3:
                                                        
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.1/ui-bootstrap-tpls.min.js"></script>

For Bootstrap 4, include:

    <script src="https://cdn.jsdelivr.net/npm/ui-bootstrap4@3.0.6/dist/ui-bootstrap-tpls.js"></script>
	
Add `ui.bootstrap` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

And set `editable-bstime` attribute in editable element.
Other parameters can be defined via `e-*` syntax, e.g. `e-minute-step="10"`.