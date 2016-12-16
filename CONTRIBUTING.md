## jsFiddle / Plunker
Please use these live templates when creating issues:  
http://jsfiddle.net/NfPcH/3  
http://plnkr.co/edit/BjWwXIlYyyLvRnVwO8m8?p=preview

## Contribute
* Don't include the dist files in your pull request.
* Add new tests if possible.
* Make sure all existing tests run.
* Squash your commits before creating the pull request.

## How to run the tests
* Install grunt globally, if you haven't already: `npm install -g grunt-cli`
* Install a server - `npm i http-server -g`
* `npm install` in the project
* `grunt jade` - to create the documentation files
* `grunt build` - to build the project files
* `http-server` - to start the server
* Run the "doc" tests [http://127.0.0.1:8080/test/e2e/docs-test.html](http://127.0.0.1:8080/test/e2e/docs-test.html)
* Run the "dev" tests [http://localhost:8080/test/e2e/dev-test.html](http://localhost:8080/test/e2e/dev-test.html)
* Verify the documentation still works correctly by navigating to [http://127.0.0.1:8080](http://127.0.0.1:8080)
* To view the "dev" documentation, navigate to [http://127.0.0.1:8080/dev.html](http://127.0.0.1:8080/dev.html)
