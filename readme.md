# Angular-xeditable

[![npm](https://img.shields.io/npm/v/angular-xeditable.svg)](https://www.npmjs.com/package/angular-xeditable) [![Bower](https://img.shields.io/bower/v/angular-xeditable.svg)](http://bower.io/search/?q=angular-xeditable)

Edit in place for AngularJS

## Overview
**Angular-xeditable** is a bundle of [AngularJS](http://angularjs.org) directives that allows you to create
*editable* elements in your projects.  
Such technique is also known as *click-to-edit* or *edit-in-place*.  
It is based on ideas of [x-editable](https://vitalets.github.io/x-editable) but was written from scratch
to use power of angular and support complex forms / editable grids.

## Demo and docs
**https://vitalets.github.io/angular-xeditable**

## Installation
#### Bower
````
bower install angular-xeditable
````
#### NPM
````
npm install angular-xeditable
````
#### Manual
Download latest version from [project homepage](https://vitalets.github.io/angular-xeditable).
#### Insert dependency 
````
var app = angular.module("app", ["xeditable"]);
````

## Dependencies
Basically it does not depend on any libraries except [AngularJS](http://angularjs.org) itself.    
For themes you may need to include [Twitter Bootstrap](http://getbootstrap.com) CSS.  
For some extra controls (e.g. datepicker) you may need to include [angular-ui bootstrap](http://angular-ui.github.io/bootstrap/).
To use ui-select you will need to include [angular-ui ui-select](https://github.com/angular-ui/ui-select/).
To use ngTagsInput you will need to include [mbenford ngTagsInput](https://github.com/mbenford/ngTagsInput).
To use ui-date you will need to include [angular-ui ui-date](https://github.com/angular-ui/ui-date).

## Reporting issues and Contributing
Please read our [Contributor guidelines](CONTRIBUTING.md) before reporting an issue or creating a pull request.

## License
[MIT](LICENSE)
