Time control is implemented via [Angular-ui bootstrap timepicker](http://angular-ui.github.io/bootstrap/#/timepicker).  
**Currently it has only Bootstrap 2 version**, Bootstrap 3 version is [in progress](https://github.com/angular-ui/bootstrap/issues?milestone=6).  
You should include additional `ui-bootstrap-tpls.min.js`:

	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/1.3.1/ui-bootstrap-tpls.min.js"></script>

Add `ui.bootstrap` as module dependency:

	var app = angular.module("app", ["xeditable", "ui.bootstrap"]);

And set `editable-bstime` attribute in editable element.
Other parameters can be defined via `e-*` syntax, e.g. `e-minute-step="10"`.

To get it working with **Bootstrap 3** you should add following css:

	/* temporary workaround for display editable-bstime in bs3 - up/down symbols not shown */
	.editable-bstime .editable-input i.icon-chevron-up:before {
	  content: '\e113';
	}
	.editable-bstime .editable-input i.icon-chevron-down:before {
	  content: '\e114';
	}
	.editable-bstime .editable-input i.icon-chevron-up,
	.editable-bstime .editable-input i.icon-chevron-down {
	  position: relative;
	  top: 1px;
	  display: inline-block;
	  font-family: 'Glyphicons Halflings';
	  -webkit-font-smoothing: antialiased;
	  font-style: normal;
	  font-weight: normal;
	  line-height: 1;
	}