## Got a question or problem?

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/).

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* the StackOverflow voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## You think you've found a bug?

Oh, we are ashamed and want to fix it asap! But before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a _minimal_ reproduce scenario using http://plnkr.co/ or [jsbin](http://jsbin.com). Having a live reproduce scenario gives us wealth of important information without going back & forth to you with additional questions like:
* version of AngularJS used
* version of this library that you are using
* 3rd-party libraries used, if any
* and most importantly - a use-case that fails

A minimal reproduce scenario using http://plnkr.co/ allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co/, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

## You want to contribute some code?

Fantastic, we are always looking for the quality contributions and will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please assure that you are submitting quality code, specifically make sure that:
  * your contribution has accompanying tests and all the tests are passing
  * your PR doesn't break the build; check the Travis-CI build status after opening a PR and push corrective commits if anything goes wrong
  * your commit messages conform to the conventions established [here](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)

  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Testing

We use [karma](http://karma-runner.github.io/) and jshint to ensure the quality of the code.  The easiest way to run these checks is the following

    npm install
    npm test
