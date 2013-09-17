To show several editable elements together and submit at once you should wrap them into `<form editable-form name="myform" ...>` tag. The `name` attribute of form will create variable in scope (normal angular behavior) and `editable-form` attribute will add a few methods to that variable: 

- $show()
- $hide()
- $visible
- $waiting

Use it to toggle editable state of form. For example, you can call `myform.$show()`.

Editable form supports 3 additional attributes: 

- **onshow**: called when form is shown
- **onbeforesave**: called on submit before local models update
- **onaftersave**: called on submit after local models update

They work exactly the same as for individual editable elements. Use it instead of `ng-submit / submit` to get more control over saving process. 

When you submit editable form it performs following steps:

1.Call `onbeforesave` of each child editable and check returning values (validation):

  - all returned `true` or `undefined`:  call `onbeforesave` of form itself
  - at least one returned string: do not call `onbeforesave` of form itself, show error

2.Check result of form's `onbeforesave`:

  - `true` or `undefined`: save data to local models and call `onaftersave`
  - `false`: **do not save** data to local models and just close form
  - `string`: **do not save** data to local models and **do not close** form

3.Check result of form's `onaftersave`:

  - `not string`: close form
  - `string`: do not close form

Commonly you should define `onbeforesave` for child elements to perform validation and `onaftersave` for whole form to send data on server.

Please have a look at examples.