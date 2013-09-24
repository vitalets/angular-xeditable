One way to submit data on server is to define `onbeforesave` attribute pointing to some method of scope.
Useful when you need to send data on server first and only then update local model (e.g. `$scope.user`).
New value can be passed as `$data` parameter (e.g. `<a ... onbeforesave="updateUser($data)">`).

The main thing is that local model will be updated only if method returns `true` or `undefined` (or promise resolved to `true/undefined`). Commonly there are 3 cases depending on result type:

- `true` or `undefined`: 
Success. Local model will be updated automatically and form will close.
- `false`: 
Success. But local model will **not** be updated and form will close. Useful when you want to update local model manually (e.g. server changed values).
- `string`: 
Error. Local model will **not** be updated, form will **not** close, string will be shown as error message.
Useful for validation and processing errors.
