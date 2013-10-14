Another way to submit data on server is to define `onaftersave` attribute pointing to some method of scope.
Useful when you need to update local model first and only then send it to server.
There are no input parameters as data already in local model.

The result type of this method can be following:

- anything except `string`: success, form will be closed
- `string`: error, form will **not** close, string will be shown as error message

Note that you can use both `onbeforesave` for validation and `onaftersave` for saving data.
