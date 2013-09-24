Validation is performed via `onbeforesave` attribute pointing to validation method.
Value is available as `$data` parameter. If method returns **string** - validation failed
and string shown as error message.