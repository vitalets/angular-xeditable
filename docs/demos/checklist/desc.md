To create list of checkboxes use `editable-checklist` attribute pointing to model.
Also you should define `e-ng-options` attribute to set value and display items.
Optionally define `e-checklist-comparator` to use a function to determine which checkboxes are actually checked.  
  
**Please note**, you should include [checklist-model directive](http://vitalets.github.io/checklist-model) into your app: `var app = angular.module("app", [..., "checklist-model"]);`.    

To disable a checkbox include the attribute `e-ng-disabled` and pass a condition.

By default, checkboxes aligned *horizontally*. To align *vertically* just add following **CSS**:

    .editable-checklist label {
      display: block;
    }
