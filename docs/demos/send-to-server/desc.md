There are two ways to send data on server:

1. Read data from editable, send it to server and only after response update local models
2. Update local models first and then sync them with server

For the *first way* you should set `onbeforesave` attribute to some updating function.
It will be called **before** local models update.
You can get updated data as parameters and send them to server. 
Returning value is promise that should resolve to one of following (depends on server response):

- `true` or `undefined`: 
Success. Editable will automatically update local model and close form
- `false`: 
Success. But editable will close form **without** update of local models 
- `string`: 
Fail. Editable will **not** update local model, form will **not** close, string will be shown as error message

For *second way* you should use `onaftersave` attribute. It is called **after** local models updated.
So you just send updated data to server. Return value of this method has only two types:

- `not string`: form will be closed
- `string`: form will not close, string will be shown as error message

Please note that here you can still use `onbeforesave` for validation purposes.