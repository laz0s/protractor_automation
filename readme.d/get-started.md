# Get started

Ensure that your development environment meets the requirements as described in the [Prerequisites](prerequisites.md)
section and issue the following commands.

Clone the seed repo into a folder with the name of your new project (`my-brand-new-project` in this example). The `-o`
flag renames the remote into `seed` so that you can still pull in changes from the seed repo later if you wish to.

```sh
$ git clone -o seed http://myuser@git.trasys.gr:7990/stash/scm/trasys/angular-app-seed.git my-brand-new-project
```

Add the URL to the actual project repo as the default remote.

```sh
$ cd my-brand-new-project
$ git remote add origin http://myuser@git.trasys.gr:7990/stash/scm/trasys/my-brand-new-project.git
```

Download and install all necessary dependencies.

The seed is already configured to use the NPM repository hosted in the Nexus of TRASYS. If a different configuration is required, e.g. to use a repository containing client-specific artefacts, please refer to the [knowledge base](http://livingattrasys.trasys.be/MyKnowledge/cr/KB/d/prinpm/pages/Home.aspx).

```sh
$ npm install
$ bower install
```

Edit the `package.json` and `bower.json` files to adjust the `name`, `version`, `description` and `repository` fields
to match your new project.

Use [Gulp][1] to test, build and distribute the project. For now you'll want to compile all TypeScript sources, SASS
stylesheets and Angular templates and serve the compiled artefacts in "development" mode:

```sh
$ gulp dev
```

This will launch a task that:

 - compiles all source code for development purposes,
 - runs unit tests and code quality checks
 - starts a server that serves the compiled artefacts,
 - opens a browser with the Angular app running in it and
 - will continuously monitor the source files for changes.

The output of this task should be similar to this:

![gulp dev output](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/gulp-dev.png?raw)

Whenever a source file is modified after the initial compilation an appropriate sub-task is launched that recompiles
the touched source and automatically refreshes the application running in the browser.

This is what a successful recompilation looks like:

![successful recompilation](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/successful-recompilation.png?raw)

And here's how it fails:

![failed recompilation](/stash/projects/TRASYS/repos/angular-app-seed/browse/readme.d/assets/failed-recompilation.png?raw)

For more details, check out the [Development workflow](workflow.md) section.

----

### What if my project must be version controlled with SubVersion?

Just clone the seed project normally, remove the `.git` folder and commit to the SubVersion repo.

```sh
$ git clone http://myuser@git.trasys.gr:7990/stash/scm/trasys/angular-app-seed.git my-brand-new-project
$ cd my-brand-new-project
$ rm -rf .git
```

Use TortoiseSVN (or whatever SVN tool) to commit to your SubVersion repo. Make sure to do whatever is necessary to
ignore the files and directories as configured in the `.gitignore` file.

**Warning:** note that Git is supposed to be the default SCM for all Trasys projects; as such some features of the
 build file may be broken if you use another one (for instance `dist.ci` relies on Git to append a commit sha to the
 generated artefact's names).
