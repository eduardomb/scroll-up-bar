# Contributing

## Building

Dependencies for building from source and running tests:

* [Git](http://git-scm.com/) - follow the [Github Guide to Installing Git](https://help.github.com/articles/set-up-git)
* [Node.js](http://nodejs.org) - depending on your system, you can install Node either from source or as a pre-packaged bundle
* [Grunt](http://gruntjs.com) - run: `sudo npm install -g grunt-cli`
* [Bower](http://bower.io/): - run: `sudo npm install -g bower`

Use Grunt to generate the non-minified and minified scroll-up-bar files:

```shell
# Clone your Github repository:
git clone git://github.com:<github username>/scroll-up-bar.git

# Go to the scroll-up-bar directory:
cd scroll-up-bar

# Install node.js dependencies:
npm install

# Install bower components:
bower install

# Build scroll-up-bar:
grunt build
```

## Code Style

 * JavaScript style should follow the [Google JS style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
 * Wrap code at 80 chars
 * Check syntax with `grunt jshint`
 * Be consistent with the code around you!

## Pull Request

 * Always have test coverage for new features or bug fixes, and never break existing tests. Use `grunt test` to run tests
 * Commits should represent one logical change each; if a feature goes through multiple iterations, squash your commits into to one
 * If you need to change a commit after the pull request was sent, ammend it and force the push instead of opening a new pull request

## Commit Messages

Follow the Tim Pope's [commit message format](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

In summary, the rules are

 * Title: 50 chars or less.
 * Body: wrap it to about 72 characters or so.
 * Write your commit message in the imperative: "Fix bug" and not "Fixed bug".
