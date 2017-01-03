# Angular-, TypeScript- and SASS-based seed project for web application front-ends

![tools](browse/readme.d/assets/tools.png?raw)

## Features

- a test-driven development workflow.
- a `gulpfile.js` containing all the build tasks needed for your development workflow:
    - incremental TypeScript compilation
    - SASS compilation with Twitter Bootstrap integration
    - AngularJS `templateCache` compilation
    - AngularJS internationalization workflow
    - API documentation generation
    - unit testing
    - end-to-end testing
    - code linting
    - live reloading in the browser
    - TypeScript type definition management
    - environment configuration
    - `semver` versioning utilities
    - continuous integration hooks
    - generation of distributable artifacts (the files you will deploy on the production server)
    - a static http server to run your application locally (can be run with development files, distributable files or
    generated API documentation)
- a standard project skeleton folder structure.
- best practices for structuring your AngularJS application.
- a `.gitignore` file configured to ignore IDE configuration file, downloaded dependencies and build/test/distribution
artifacts.
- a `package.json` file configured with all the dependencies needed for building the project.
- a `bower.json` file configured with all the dependencies for running the application.
- annotated sample source code, to be found under `src/app/`.
- sample test code (that tests the sample source code), to be found under `src/unit` and `src/e2e/`.
- TypeScript definition files for the libraries used by the sample source code, to be found under `src/typings/`.
- configuration of `bower.json` for sample dependencies, see the `dependencies` and `devDependencies` nodes.
- this sample `README.md` file.
- a sample `CHANGELOG.md` file.


## Wiki

 - [Get Started](browse/readme.d/get-started.md)
 - [Prerequisites](browse/readme.d/prerequisites.md)
    - [Assumptions](browse/readme.d/prerequisites.md#assumptions)
    - [Proxy configuration](browse/readme.d/prerequisites.md#proxy)
    - [Tools](browse/readme.d/prerequisites.md#tools)
 - [Development workflow](browse/readme.d/workflow.md)
    - [Available tasks](browse/readme.d/workflow.md#tasks)
    - [All-in-one TDD](browse/readme.d/workflow.md#all-in-one)
    - [Split TDD](browse/readme.d/workflow.md#split)
    - [End-to-end testing](browse/readme.d/workflow.md#e2e-testing)
    - [Distributing](browse/readme.d/workflow.md#distributing)
    - [Managing dependencies](browse/readme.d/workflow.md#dependencies)
    - [Adding custom assets](browse/readme.d/workflow.md#assets)
    - [Environment configuration](browse/readme.d/workflow.md#environment)
 - [IDE configuration](browse/readme.d/ide.md)
    - [IntelliJ IDEA / Webstorm](browse/readme.d/ide.md#idea)
    - [Eclipse](browse/readme.d/ide.md#eclipse)
    - [Atom](browse/readme.d/ide.md#atom)
 - [Continuous integration](browse/readme.d/ci.md)
    - [Jenkins](browse/readme.d/ci.md#jenkins)
    - [Sonar](browse/readme.d/ci.md#sonar)
 - [Best practices](browse/readme.d/best-practices.md)
    - [Default project structure](browse/readme.d/best-practices.md#project-structure)
    - [Modular packaging](browse/readme.d/best-practices.md#modular-packaging)
    - ...
 - [Technology stack](browse/readme.d/technology.md)
    - [Typescript](browse/readme.d/technology.md#typescript)
    - [Gulp](browse/readme.d/technology.md#gulp)
    - [NodeJS/NPM](browse/readme.d/technology.md#npm)
    - [Bower](browse/readme.d/technology.md#bower)
    - [Jasmine](browse/readme.d/technology.md#jasmine)
    - [Karma](browse/readme.d/technology.md#karma)
    - [Protractor](browse/readme.d/technology.md#protractor)
    - [SASS](browse/readme.d/technology.md#sass)
    - [Bootstrap](browse/readme.d/technology.md#bootstrap)
    - [AngularJS](browse/readme.d/technology.md#angular)
 - [Angular plugins](browse/readme.d/angular.md)
    - [angular-bootstrap](browse/readme.d/angular.md#bootstrap)
    - [angular-translate](browse/readme.d/angular.md#translate)
    - [angular-ui-router](browse/readme.d/angular.md#ui-router)
 - [How to contribute](browse/readme.d/contribute.md)
 - [Build tool breakdown](browse/readme.d/build-tool.md)
