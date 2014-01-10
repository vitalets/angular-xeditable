To create list of checkboxes use `editable-checklist` attribute pointing to model.
Also you should define `e-ng-options` attribute to set value and display items.  
  
**Please note**, you should include [checklist-model directive](http://vitalets.github.io/checklist-model) into your app: `var app = angular.module("app", [..., "checklist-model"]);`.    

By default, checkboxes aligned *horizontally*. To align *vertically* just add following **CSS**:

    .editable-checklist label {
      display: block;
    }
