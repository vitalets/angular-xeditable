To show several editable elements together and submit at once you should wrap them into `<form editable-form name="myform" ...>` tag. The `name` attribute of form will create variable in scope (normal angular behavior) and `editable-form` attribute will add a few methods to that variable: 

- $show()
- $cancel()
- $visible
- $waiting

Use it to toggle editable state of form. For example, you can call `myform.$show()`.

Editable form supports 3 additional attributes: 

- **onshow**: called when form is shown
- **onbeforesave**: called on submit before local models update
- **onaftersave**: called on submit after local models update

They work nearly the same as for individual editable elements. Use it instead of `ng-submit / submit` to get more control over saving process. 

When you submit editable form it performs following steps:

1. call child's `onbeforesave`
2. call form's `onbeforesave`
3. write data to local model (e.g. `$scope.user`)
4. call form's `onaftersave`
5. call child's `onaftersave`

Any `onbeforesave / onaftersave` can be omited so in simplest case you will just write data to local model.

But in more complex case it becomes usefull:

If you need **validation of individual editable elements** then you should define `onbeforesave` on particular editable element.  
The result of child's `onbeforesave` is important for next step:

  - `string`: submit will be cancelled, form will stay opened, string will be shown as error message
  - `not string`: submit will be continued

If you need to **send data on server *before* writing to local model** then you should define form's `onbeforesave`.   
The result of form's `onbeforesave` is important for next step:

  - `true` or `undefined`: local model will be updated and form will call `onaftersave` 
  - `false`: local model **will not be updated** and form will just close (e.g. you update local model yourself)
  - `string`: local model **will not be updated** and **form will not close** (e.g. server error)


If you need to **send data on server *after* writing to local model** then you should define form's `onaftersave`.  
The result of form's `onaftersave` is also important for next step: 

  - `string`: form will not close (e.g. server error)
  - `not string`: form will be closed

Commonly you should define `onbeforesave` for child elements to perform validation and `onaftersave` for whole form to send data on server.

Please have a look at examples.