To show several editable elements together and submit at once you should wrap them into `<form>` tag with
`editable-form` attribute. The `name` attribute of form will create variable in scope (normal angular behavior)
and editble-form attribute will add a few methods to that variable: `$show()`, `$hide()`, `$visible`, `$waiting`.
These methods allows you to show/hide form manually.
Such form supports additional attributes `onshow`, `onbeforesave` and `onaftersave`, instead of `ng-submit / submit`.
When you submit form the sequence of calls is following:

1.Call `onbeforesave` of each child editable (validation)

2.Check result of all `onbeforesave` of children:

  - all returned `true` or `undefined`:  call `onbeforesave` of form itself
  - at least one returned string: do not call `onbeforesave` of form itself, show error


3.Check result of form's `onbeforesave` (if defined):

  - `true` or `undefined`: save data to local models and call `onaftersave`
  - `false`: **do not save** data to local models and just close form
  - `string`: **do not save** data to local models and **do not close** form


4.Check result of form's `onaftersave` (if defined):

  - `not string`: close form
  - `string`: do not close form

Please have a look at examples.