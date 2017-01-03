# Development workflow

 - [Available tasks](#tasks)
 - [All-in-one TDD](#all-in-one)
 - [Split TDD](#split)
 - [End-to-end testing](#e2e-testing)
 - [Reports](#reports)
 - [Distributing](#distributing)
 - [Managing dependencies](#dependencies)
 - [Adding custom assets](#assets)
 - [Environment configuration](#environment)


<a name="tasks" href="tasks"></a>
## Available tasks

 - `clean`: clean up all development and distributable artefacts
 - `dev`: watch all sources (including tests), incrementally recompile when any of them change and rerun unit tests
 (see [All-in-one TDD](#all-in-one))
 - `dev.build`: watch all sources (including tests) and incrementally recompile when any of them change
 (see [Split TDD](#split))
 - `dev.unit`: monitor changes in the generated JS sources and rerun unit tests when necessary
 (see [Split TDD](#split))
 - `e2e.build`: builds all e2e tests
 (see [End-to-end testing](#e2e-testing))
 - `e2e.run`: runs all e2e tests
 (see [End-to-end testing](#e2e-testing))
 - `dist.snapshot`: generate all distributable artefacts in the ./dist/snapshot/ folder
 (see [Distributing](#distributing))
 - `dist.ci`: generate all distributable artefacts in the ./dist/ci/ folder
 (see [Distributing](#distributing))
 - `dist.release`: generate all distributable artefacts in the ./dist/release/ folder
 (see [Distributing](#distributing))
 - `env.init`: initialize the env.json file from the "environment" section in project.json
 (see [Environment configuration](#environment))
 - `env.snapshot`: generate the env.js angular module in the ./dist/snapshot/ folder
 (see [Environment configuration](#environment))
 - `env.ci`: generate the env.js angular module in the ./dist/ci/ folder
 (see [Environment configuration](#environment))
 - `env.release`: generate the env.js angular module in the ./dist/release/ folder
 (see [Environment configuration](#environment))
 - `bump.patch`: bump the patch version number in bower.json and package.json
 (see [Distributing](#distributing))
 - `bump.minor`: bump the minor version number in bower.json and package.json
 (see [Distributing](#distributing))gulp-dev
 - `bump.major`: bump the major version number in bower.json and package.json
 (see [Distributing](#distributing))
 - `typings`: reinstall all typings
 (see [Managing dependencies](#dependencies))
 - `help`: display the command-line help message


<a name="all-in-one" href="all-in-one"></a>
## All-in-one TDD
This is the default test-driven workflow which we briefly explained in the [Get started](get-started.md) section.
To start developing simply open a terminal, `cd` into your project's directory and run `gulp dev`.

```sh
$ cd /path/to/my-brand-new-project (see [Environment configuration](#environment))
$ gulp dev
```

This will launch a task that:
 - compiles all Typescript application, unit test and e2e test source code for development purposes (not minified and
 served as separate files)
 - generates an environment configuration Angular module based on the contents of `env.json`
 (see [Environment configuration](#environment))
 - compiles SASS stylesheets into a single non-minified CSS file
 - compiles HTML templates into an AngularJS `templateCache` file
 - injects script and style tags into `index.html` in the correct loading order
 - copies assets to their target folders (images, fonts, etc.)
 - generates translation files
 - runs unit tests and code quality checks
 - generates a `reports` folder containing unit test summary and coverage reports
 - generates a `karma.conf.js` file for use within an IDE
 - starts a server that serves the compiled artefacts
 - opens a browser with the Angular app running in it
 - continuously monitors the source files for changes

The output of this task should be similar to this:

![gulp dev output](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/gulp-dev.png?raw)

Whenever a source file is modified after the initial compilation an appropriate sub-task is launched that recompiles
the touched source and automatically refreshes the application running in the browser.

This is what a successful recompilation looks like:

![successful recompilation](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/successful-recompilation.png?raw)

Notice how only the TypeScript compilation tasks are run. And more importantly that the compilation happens
incrementally, meaning that only the modified TypeScript file(s) will be recompiled.

Here's how it fails:

![failed recompilation](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/failed-recompilation.png?raw)


<a name="split" href="split"></a>
## Split TDD

You may like to keep the build process separate from the one that runs tests (to see separate output threads or
have a clear cue when the build step has finished and the quality check kicks in).

This can be achieved by opening two terminals (or a split one) and running `gulp dev.build` in one and `gulp dev.unit`
in the other. Make sure you first have `gulp dev.build` running before you run `gulp dev.unit` to avoid having constant
unit test failures while the sources are initially cleaned and rebuilt.

![split tdd output](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/split-tdd.png?raw)

Note that all resource generation and reporting takes place exactly as it would in the 'All-in-one TDD' case.

<a name="e2e-testing" href="e2e-testing"></a>
## End-to-end testing

End-to-end testing involves testing the application by interacting with it through one or more browsers. The idea is
that code is not tested in isolation (as with unit tests) but as a whole, as it will be in production. End-to-end
tests are powered by [Protractor](http://www.protractortest.org/#/) using [Jasmine](http://jasmine.github.io/)
as the testing framework. Simply put, you write your specs using Jasmine (i.e. using `describe`, `it`, `beforeEach` ,
`expect` etc.) as you would when writing unit tests, but make use of Protractor to interact with the browser and make
 smart selections on DOM elements and Angular models for assertions.

### Using Page Objects

[Page Objects](https://angular.github.io/protractor/#/page-objects) is a common pattern to help organise tests and keep
the testing code clean. It also helps split the work between developers and testers.

Since in end-to-end testing we are dealing with full pages (as perceived by the user), the code needed to make selections
and actions used by tests is encapsulated within page objects (one per page) that expose meaningful methods for each
task. In fact these methods are first captured in an API (TypeScript interface) that effectively defines the contract
needed between the test spec and each page (TypeScript classes). Test specs now only deal with page APIs keeping the
test clean, readable and accessible to non-developers. To fully decouple specs from the page code, a `pages.ts` factory
is defined that ties APIs to their page implementations, resulting in a module that is imported in each spec.

As an example lets consider a spec to test that the home page's title has the correct value. We first define (or extend)
the API for the home page (`HomePageAPI.ts`):

```
module app {
    export interface HomePageAPI {
        go(): webdriver.promise.Promise<void>;
        getPageHeader(): webdriver.promise.Promise<string>;
    }
}
```

We then define the page object for the home page (`HomePage.ts`) to implement this interface:

```
class HomePage implements app.HomePageAPI {
    go() {
        return browser.get('');
    }
    getPageHeader(): webdriver.promise.Promise<string> {
        return element.all(by.css('h1')).first().getText();
    }
}
export = HomePage;
```

Note that the `HomePage` class is exported differently in this case so that it can be imported in a Protractor spec.
Following this, update the page factory (`pages.ts`) with the method to return the home page instance:

```
import HomePage = require('./app/HomePage');
export function home(): app.HomePageAPI {
    return new HomePage();
}
```

And finally use the home page's' API in the spec (`home.spec.ts`) to do the test:

```
import pages = require('../pages');
describe('The home page', () => {
    var homePage: app.HomePageAPI;
    beforeEach(() => {
        homePage = pages.home();
        homePage.go();
    });
    it('should show the expected page header', () => {
        expect(homePage.getPageHeader()).toBe('Hello');
    });
});
```

### Roles and workflow

Who actually authors end-to-end tests depends on each team and the skills of its people. It could be that developers
take on all the testing themselves or that testers are capable of authoring all the testing code without support. Using
the page object pattern and the page APIs we can actually involve both testers and developers in the end-to-end testing
process. The proposed workflow following this style is as follows:

1. **Step 1 - Tester**: Identifies the page he wants to test and creates an API file for it.
2. **Step 2 - Tester**: Updates the page factory to add a factory method for the page API he just defined that returns `null`.
3. **Step 3 - Tester**: Creates the spec to realise the test using the API he just defined (obtained through the factory).
4. **Step 4 - Developer**: Creates the page object by implementing the defined API.
5. **Step 5 - Developer**: Updates the page factory to import the page and return a new page object (replacing the previous `null` return).

The spec should now be ready to run! In short the tester is in charge or writing specs and page APIs, i.e. can focus
only on functional aspects, whereas the developer is responsible of creating the page implementations. The only point
where the tester and developer need to edit the same file is the page factory (although only to make the API-to-page
link).

### Configuring end-to-end testing

End-to-end testing (basically Protractor) configuration is setup with default values in `config.json`. You might want
to override this because:
 * You want to test on different or multiple browsers.
 * You want to define test suites to group and selectively run your end-to-end tests.
 * You want to have your CI server run the tests against a remote server.

Protractor's configuration can be overriden at project level (using `project.json`) or for a specific environment such
as your CI server (using an unversioned `env.json`). In both cases you would need to define a `protractor` JSON block
containing the custom configuration (see [Protractor's configuration options](https://github.com/angular/protractor/blob/master/docs/referenceConf.js)
for possible options). As a starting point you can use the defaults in `config.json`. For background on project and
environment configuration overrides check section [Environment configuration](#environment).

### Running end-to-end tests

End-to-end tests are ran using `gulp e2e.run`. You can also pass configuration property overrides on the command line
as arguments. A case where you would want to do this would be if you want to run a specific test suite (defined in the
configuration) without creating or modifying your local `env.json` configuration.

<a name="reports" href="reports"></a>
## Reports

The build setup currently produces the following reports:
* Unit test summary (in HTML and JUnit XML formats)
* Unit test coverage (in HTML, LCOV and Cobertura formats)
* End-to-End summary (in HTML and JUnit XML formats)
* Console feedback on failed unit tests, end to end tests and global unit test coverage
* Console linting results

JUnit XML, LCOV and Cobertura formatted reports are there to be consumed by CI processes (e.g. Jenkins plugins) that
publish results and track code quality through time. The HTML version of reports can be published as-is through CI
servers although they can be useful to developers as well. A good example is the unit test coverage HTML report that
allows a developer to view the coverage of the specific code he is about to commit. If not for this, a developer would
need to rely on executing tests with coverage through his IDE.

This brings us to when and how each report is generated and subsequently updated:
* Running `dev` or `dev.unit` (next to `dev.build`) produces unit test and coverage reports in HTML. These are kept
up-to-date as the source is being watched.
* Running `dist.snapshot`, `dist.ci` or `dist.release` produces unit tests and coverage reports both in HTML and other
formats. Also these reports are archived and placed in the `/dist` folder.
* Running `e2e.run` generates the end-to-end test summary reports in HTML and XML formats.

In terms of location, all reports are generated under the (unversioned) top-level `/reports` folder.

<a name="distributing" href="distributing"></a>
## Distributing

There are three tasks available that generate distributable artefacts:

 - `dist.release`
 - `dist.ci`
 - `dist.snapshot`

All three of them create pretty much the same artefacts but in different folders and with different naming conventions.
These are the generated files:

 - a minified and a non-minified version of the compiled JavaScript code, and a source map linking the two
 - a minified and a non-minified version of the compiled CSS code, and a source map linking the two
 - the index page
 - a single file containing the minified versions of the external libraries that are used
 - assets (in the `assets` subfolder)
 - internationalization resources (in the `i18n` subfolder)
 - the generated reports in HTML, XML, LCOV and Cobertura formats (`[app-name].[version].reports.zip`)

Additionally the `dist.release` task also generates the documentation in HTML format (`[app-name].[version].docs.zip`)

Besides this, the differences between the three tasks are:

 - `dist.release` is published in the `/dist/release` folder, adds a version number to the artefacts' file names and
 is intended for usage when making an actual versioned and tagged release.
 - `dist.ci` is published in the `/dist/ci` folder, adds a commit hash to the artefacts' file names and
 is intended for usage by a continuous integration job
 - `dist.snapshot` is published in the `/dist/snapshot` folder and adds the word `SNAPSHOT` to the artefacts' file names;
 for an application you can use this task to test-drive a distributable build (for a library its purpose is to release
 a non-tagged build)

Prior to running `dist.release` you'll usually want to change the version number of the application. Use the following
three tasks to do so:

 - `bump.major`: increments the major version number in bower.json and package.json (1.2.3 to 2.0.0)
 - `bump.minor`: increments the minor version number in bower.json and package.json (1.2.3 to 1.3.0)
 - `bump.patch`: increments the patch version number in bower.json and package.json (1.2.3 to 1.2.4)

Example output:

![dist-output](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/dist-output.png?raw)

You can have a CI job execute the necessary tasks for releasing for you, or you could do it manually.
Either way the sequence of commands might look like this:

```sh
$ gulp bump.minor
$ gulp dist.release
$ git add .
$ git commit -m 'generated distributable for v1.2.3'
$ git checkout master
$ git merge develop
$ git push
$ git tag -a 1.2.3 -m 'bugfix version including #JIRA-789'
$ git push
```

As opposed to library projects, the `dist` folder is not under version control because there are no artifacts to reuse
in other projects. The purpose of these generated artifacts is to be deployed on a server "as is", for example they can
be packaged into a `.war` file and deployed to a Tomcat server. It is intended for production only.

Depending on your project setup, you might also need to generate an environment configuration file in the release
folders. You can read more on that in the [Environment configuration](#environment) section.


<a name="dependencies" href="dependencies"></a>
## Managing dependencies

There are several aspects to dependency management in this project's setup:

### Build dependencies:
Build dependencies are managed through [npm][1] and are usually not to be altered (unless you need to modify the build
process for some reason). Just run `npm install` once you checked out the project and then forget about these.

The seed is already configured to use the NPM repository hosted in the Nexus of TRASYS. If a different configuration is required, e.g. to use a repository containing client-specific artefacts, please refer to the [knowledge base](http://livingattrasys.trasys.be/MyKnowledge/cr/KB/d/prinpm/pages/Home.aspx).

### Runtime dependencies:
App dependencies are managed through [Bower][2] and need to be maintained by the developer. This seed project contains
a limited set of libraries to get a typical AngularJS application off the ground; run `bower install` to install them.
How to manage Bower dependencies is beyond the scope of this guide; please read the [Bower docs][2] for more information.
However do remember that runtime dependencies should be installed in the `dependencies` section of the `bower.json` file
(using the `--save` flag).

**How are they served?**
 - *development*: [BrowserSync][3] will take care of serving the non-minified versions of the libraries directly from
 their location in the `bower_components` directory. Since these are separate files, the Gulp build tasks will inject
 the correct `<script>` tags into the `index.html` file. The information on which libraries to inject is taken from
 the `dependencies` section of the `bower.json` config file.
 - *production*: for production the same libraries are minified and concatenated into a single artefact. Thus the `dist`
 task family generates a file with the following naming pattern: `[project-name].[version].lib.js`.

### Test dependencies:
Like runtime dependencies they are managed through [Bower][2], but they should be stored in the `devDependencies`
section of `bower.json` to make sure that they are not included at runtime, but only on the [Karma][4] server. Use the
`--save-dev` flag to install test dependencies. Note that the testing harness itself is managed through `npm` because
that's where Karma will look for it by default; so you'll find `jasmine-core` in `package.json` instead of `bower.json`.

### Type definitions:
Every library you use - be it at runtime or for testing - must have a TypeScript type definition. These definitions
basically tell the TypeScript compiler how to interpret the associated libraries. We use [TSD][5] to manage these
type definitions, which is a tool much like npm and Bower that fetches existing files from the [DefinitelyTyped][6]
repository. Check its [documentation][7] for usage instructions. Run `gulp typings` to reinstall the configured
dependencies. The TSD tool itself is globally installed through npm by issuing `npm install tsd -g`.

Unlike other dependencies the type definitions are put under version control. The reason for this is that the downloaded
definitions are not always 100% accurate. You might have to make modifications to them, which you then want to share
with your team. Furthermore not all libraries have a type definition on DefinitelyTyped; in that case you'll have to
write it yourself and again share it with the team.

Note that there are three scopes: `app`, `unit` and `e2e`. Each of these has its own folder under the `typings`
directory and a discrete configuration file with the following naming pattern: `[scope].tsd.json`. Make sure to add
your type definitions to the correct scope. If you want to know more about the reasons for this split, read [TRFS-44][8].

Example installation of the `chai` assertion library in the `unit` scope:

![tsd](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/tsd.png?raw)

#### Fine tuning definition versions

Getting the right definition files through TSD for your project can at times be challenging (if you're not just going for
the latest version). Although queries in TSD using library semantic versions are supported (using TSD's `--version` or
`-v` query filter) these are not consistently applied by committers of definition files. To fine tune the exact version
you want to include in your project you may need to opt for filtering using commit hashes. First lookup the commit hash
you need using the `--history` or `-y` filter and then select it using the `--commit` or `-c` filter and the shortened
commit hash. Consider the following example on `angular-translate`:

```sh
$ tsd --config app.tsd.json query angular-translate/ -y
$ tsd --config app.tsd.json query angular-translate/ -c 97962e -osa install
```

If you're very observant you may have noticed that in the above example the `-r` flag was left out (`-osa` was used
rather than `-rosa`). This flag tells TSD to resolve all dependencies of the definition file we are querying and install
them as well. By removing it we kept the change only to the `angular-translate/` definition file. You would most likely
not have reason to do this but it could make sense if you want a minor update to a definition file without other changes.
The point here is that if you start fine tuning your definitions, take the time to familiarise yourself with the meaning
of the filter flags you are using.

<a name="assets" href="assets"></a>
## Adding custom assets

By default the build system will look for assets in two locations:
 - images: located in `./src/app/assets/images/`
 and matching extensions `"**/*.png", "**/*.jpeg", "**/*.jpg", "**/*.gif"`
 - fonts: located in `./src/app/assets/fonts/`
 and matching extensions `"**/*.eot", "**/*.svg", "**/*.ttf", "**/*.woff", "**/*.woff2"`

These will automatically be copied into the `build` or `dist` folder (depending on the task you're running).

Should you wish to add assets that differ from these patterns, then you'll have to configure `project.json`.
You will find in there already a configuration that copies the bootstrap fonts into the target `assets/fonts` directory.

```json
  "assets": {
    "fonts": {
      "sources": [
        "./bower_components/bootstrap-sass-official/assets/fonts/bootstrap/"
      ]
    }
  }
```

This config adds only a new fonts source directory and will reuse the extension patterns and target directory of the
default font assets configuration.

Here's an example that configures a completely new type of assets (embedded data files):

```json
  "assets": {
    "data": {
      "sources": [
        "./src/assets/data/"
      ],
      "globs": ["**/*.json", "**/*.xml"],
      "destination": "assets/data/"
    }
  },
```

<a name="environment" href="environment"></a>
## Environment configuration

We provide you with a flexible way to configure your applications for a specific environment. When you compile a new
project the build task will warn you that you haven't generated an `env.json` file yet and will use the values
configured in `project.json` instead. To generate such an `env.json` file, just run `gulp env.init`.

Two types of configuration are defined:
* Build configuration, i.e. properties that modify how build tasks function.
* Runtime configuration, i.e. properties that are exposed at runtime to the application.

Considering that multiple sources of configuration exist, each file is considered in the following order:
1. `env.json` (if it exists), which is unversioned and can vary per environment and user.
2. `project.json`, which is versioned and contains project-specific settings.
3. `config.json`, which is versioned and contains generic global defaults (only applies for build configuration).

This means that if a configuration property is defined both in `env.json` and `project.json` the one from `env.json`
takes precedence. Moreover, if we are referring to a JSON block, the one from `env.json` will be considered in full
without mixing with the one from `project.json` (or `config.json` for that matter).

A good example of when you would want to provide environment specific **build configuration** is end-to-end testing. The
project specific Protractor configuration can be defined in `project.json` to group mature tests in test suites and
launch them locally. On the CI server an `env.json` file can be defined to target this same test suite to a remote
server. On the other hand a developer may modify his local `env.json` file to focus on locally testing a different set
of tests.

**Runtime configuration** is defined in a JSON block named `environment` that contains key-value pairs. Such a block can
be defined at project level in `project.json` and be similarly overriden for local environments in `env.json`. The build
will create an Angular module for these with constants for each defined property and include it in the app. A typical
example of such a case is the URL of the services your application will consume. You may want it to point to a mock
server, a development server or a production server. This is why `env.json` is not under version control: you can change
the values in there at your whim without bothering anyone else on the team.

A production build will always look for an `env.js` file. It is not compiled into the main application so as to make
it possible to have a server generate the file on-the-fly. If you do want to generate a static file, you can do so
through `env.release`, `env.ci` or `env.snapshot` depending on the target.

## Command-line help
Running `gulp help` will get you a limited description of the available tasks and the possible workflows. Read on
in the readme for a more comprehensive explanation.


[1]: http://nodejs.org/
[2]: http://bower.io/
[3]: http://www.browsersync.io/
[4]: http://karma-runner.github.io/
[5]: http://definitelytyped.org/tsd/
[6]: https://github.com/borisyankov/DefinitelyTyped
[7]: https://github.com/Definitelytyped/tsd#readme
[8]: https://pmo.trasys.be/jira/browse/TRFS-44
