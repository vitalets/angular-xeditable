# ui-date directive [![Build Status](https://travis-ci.org/angular-ui/ui-date.svg)](https://travis-ci.org/angular-ui/ui-date)

This directive allows you to add a date-picker to your form elements.

# Alternatives

We recommend using the excellent [ui-bootstrap](https://angular-ui.github.io/bootstrap/) date-picker which is maintained by a larger team.  

WARNING: Support for this module may eventually be phased out as angular 2.0 arrives as there are no plans to move this to angular 2 at this time.

# Requirements

- JQuery
- JQueryUI
- AngularJS

# Bower Usage

You may use [bower](http://bower.io/) for dependency management but would recommend using webpack or browserify for modules.

Install and save to bower.json by running:

    bower install angular-ui-date --save

This will copy the ui-date files into your `bower_components` folder, along with its dependencies.

Add the css:

```html
<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.css"/>
```

Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/jquery/jquery.js"></script>
<script type="text/javascript" src="bower_components/jquery-ui/jquery-ui.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-date/dist/date.js"></script>
```

Add the date module as a dependency to your application module:

```js
angular.module('MyApp', ['ui.date'])
```

Apply the directive to your form elements:

```html
<input ui-date>
```

## Options

All the jQueryUI DatePicker options can be passed through the directive.

```js
myAppModule.controller('MyController', function($scope) {
  $scope.dateOptions = {
    changeYear: true,
    changeMonth: true,
    yearRange: '1900:-0'
    };
});
```

```html
    <input ui-date="dateOptions" name="DateOfBirth">
```

## Static Inline Picker

If you want a static picker then simply apply the directive to a div rather than an input element.

```html
<div ui-date="dateOptions" name="DateOfBirth"></div>
```

## Working with ng-model

The ui-date directive plays nicely with ng-model and validation directives such as ng-required.

If you add the ng-model directive to same the element as ui-date then the picked date is automatically synchronized with the model value.

_The ui-date directive stores and expects the model value to be a standard javascript Date object._

## ui-date-format directive

The ui-date directive only works with Date objects.
If you want to pass date strings to and from the date directive via ng-model then you must use the ui-date-format directive.
This directive specifies the format of the date string that will be expected in the ng-model.
The format string syntax is that defined by the JQueryUI Date picker. For example

```html
<input ui-date ui-date-format="DD, d MM, yy" ng-model="myDate">
```

Now you can set myDate in the controller.

```js
$scope.myDate = "Thursday, 11 October, 2012";
```

## ng-required directive

If you apply the required directive to element then the form element is invalid until a date is picked.

Note: Remember that the ng-required directive must be explictly set, i.e. to "true".  This is especially true on divs:

```html
<div ui-date="dateOptions" name="DateOfBirth" ng-required="true"></div>
```

## Usage with webpack

Install with npm:

    npm install --save-dev jquery jquery-ui angular angular-ui-date

Use in your app:

```javascript
import angular from 'angular';
import uiDate from 'angular-ui-date';

require('jquery-ui/themes/base/minified/jquery-ui.min.css');

angular.module('MyTest', [uiDate.name])
.controller('MyCtrl', ['$scope', function($scope) {
    $scope.myDate = new Date('2015-11-17');
}]);
```

It is also good to ensure that jQuery is available so that angular and jquery ui can attach to it.

```javascript
    webpack: {
      plugins: [
        new webpack.ProvidePlugin({
          'window.jQuery': 'jquery',
        }),
      ]
    }
```

another method of making jQuery recognized is to use the webpack expose-loader to expose it both as $ and jQuery

```javascript
    webpack: {
      module: {
        loaders: [
                  // it helps angular to have jQuery exposed so that it uses $ instead of jqLite      
                   {
                     test: require.resolve('jquery'),
                     loader: 'expose?$!expose?jQuery',
                   },
                ]
              }
            }
```
## Need help?
Need help using UI date?

* Ask a question in [StackOverflow](http://stackoverflow.com/) under the [angular-ui-date](http://stackoverflow.com/questions/tagged/angular-ui-date) tag.

**Please do not create new issues in this repository to ask questions about using UI date**

## Found a bug?
Please take a look at [CONTRIBUTING.md](CONTRIBUTING.md#you-think-youve-found-a-bug).

# Contributing to the project

We are always looking for the quality contributions! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.
