ngTagsInput control is implemented via [Tags input directive for AngularJS ](http://mbenford.github.io/ngTagsInput/).  
You should include additional `ng-tags-input.min.js` and `ng-tags-input.min.css` and `ng-tags-input.bootstrap.min.css` (if using bootstrap):

	<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.1/ng-tags-input.min.js"></script>
	
	<link href="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.1/ng-tags-input.min.css" rel="stylesheet" media="screen">
	
	<link href="https://cdnjs.cloudflare.com/ajax/libs/ng-tags-input/3.1.1/ng-tags-input.bootstrap.min.css" rel="stylesheet" media="screen">

Then add `ngTagsInput` as module dependency:

	var app = angular.module("app", ["xeditable", "ngTagsInput"]);

And finally set `editable-tags-input` attribute pointing to model and add `editable-tags-input-auto-complete` tag to do the auto complete criteria.