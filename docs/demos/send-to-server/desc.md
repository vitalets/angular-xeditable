There are two ways to send editable data on server:

1. use `onbeforesave` attribute: you send data to server first and only after response save to local model (e.g. `scope.user`)
2. use `onaftersave` attribute: you save data to local models first and only then sync it with server

Which way to use depends on your app structure and conventions.

For the *first way* you should define `onbeforesave` attribute pointing to some updating function.
It will be called **before** local models update.
You can get updated data as parameter `$data` and send it to server. 
Returning value is promise that should resolve to one of following (depending on server response):

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

Note that you can use both `onbeforesave` for validation and `onaftersave` for saving data.