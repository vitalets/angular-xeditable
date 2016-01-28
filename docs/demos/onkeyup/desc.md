One way to do validation during typing is to define a `onkeyup` attribute pointing to some method of scope.
Useful when you need to show warnings or errors during the process of typing into the input form.
New value can be passed as `$data` parameter (e.g. `<a ... onkeyup="checkUser($data)">`).


This attribute does not affect the save mechanism, without the onbeforesave attribute, you will still be able to update the local model, even if errors are shown in the error dialog.