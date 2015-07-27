# Angular-xeditable
Edit in place for AngularJS

## Overview
**Angular-xeditable** is a bundle of [AngularJS](http://angularjs.org) directives that allows you to create
*editable* elements in your projects.  
Such technique is also known as *click-to-edit* or *edit-in-place*.  
It is based on ideas of [x-editable](http://vitalets.github.io/x-editable) but was written from scratch
to use power of angular and support complex forms / editable grids.

## Demo and docs
**http://vitalets.github.io/angular-xeditable**

## Installation
#### Bower
````
bower install angular-xeditable
````
#### Manual
Download latest version from [project homepage](http://vitalets.github.io/angular-xeditable).
#### Insert dependency 
````
var app = angular.module("app", ["xeditable"]);
````

## Dependencies
Basically it does not depend on any libraries except [AngularJS](http://angularjs.org) itself.    
For themes you may need to include [Twitter Bootstrap](http://getbootstrap.com) CSS.  
For some extra controls (e.g. datepicker) you may need to include [angular-ui bootstrap](http://angular-ui.github.io/bootstrap/).


## jsFiddle / Plunker
Please use these live templates when creating issues:  
http://jsfiddle.net/NfPcH/3  
http://plnkr.co/edit/BjWwXIlYyyLvRnVwO8m8?p=preview

## Roadmap

* select2
* [checklist](https://github.com/vitalets/checklist-model)
* [combodate](https://github.com/vitalets/combodate)
* popup mode (waiting https://github.com/angular-ui/bootstrap/pull/1391)
* internally move to [lazy-model](https://github.com/vitalets/lazy-model)

## License
[MIT](LICENSE)
