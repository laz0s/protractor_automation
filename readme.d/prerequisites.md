# Prerequisites

 - [Assumptions](#assumptions)
 - [Proxy configuration](#proxy)
 - [Tools](#tools)

<a name="prerequisites" href="prerequisites"></a>
## Prerequisites

<a name="assumptions" href="assumptions"></a>
### Assumptions
It is assumed that you will be working with

 - **TypeScript** as a transpiler to plain JavaScript,
 - **AngularJS** as a JavaScript framework,
 - **SASS** as a transpiler to CSS,
 - **Bootstrap** as a styling framework,
 - **Jasmine** as a testing harness,
 - **Karma** as a test runner,
 - **Protractor** as an end-to-end testing utility and
 - **Gulp** as a build tool.

Other than that you are free to add whatever tools your project requires.

<a name="proxy" href="proxy"></a>
### Proxy configuration
When working at Trasys you need to configure your proxy settings to be able to download
packages from NPMs and Bowers repositories or from GitHub. This is a one-time configuration: you do not have to repeat
this task for every project.

So before doing anything you need to make sure that the following environment variables are defined (Windows example):

```sh
set proxy=http://srv-trg:srvtrg201201@proxyblue.trasys.be:80
set http_proxy=http://srv-trg:srvtrg201201@proxyblue.trasys.be:80
set https_proxy=http://srv-trg:srvtrg201201@proxyblue.trasys.be:80
set no_proxy="localhost,127.0.0.1,git,git.trasys.gr,172.17.54.6,svn.trasys.gr,172.17.54.4"
```

Note that `http_proxy`, `https_proxy` and `no_proxy` are standard and used for git and bower.
NPM additionally uses `proxy` for http.

<a name="tools" href="tools"></a>
### Tools
It is assumed that you have three basic development tools installed on your system:

- [git][1] (to get the source and any transitive git-based dependencies)
- [nodejs/npm][2] (to install the project's build tools)
- [bower][3] (to install the project's library dependencies)
- [gulp CLI][4] (to easily run gulp commands)
- [Python 2.x][5] (node-gyp needs this. If you are on Windows you need to install Python)

Install guides can be found on the tools' websites.

**Note on NodeJS/NPM:** the seed works with every version of node from 0.12.x to 5.2.x. It won't work with versions lower than 0.12. Using the seed with a version greater than specified may cause instabilities.

You should also use NVM that allows you to easily change versions of Node with ease. Note that you have to uninstall node.js if you it already installed.
A windows version is [also available](https://github.com/coreybutler/nvm-windows).

**Note on Bower/Gulp for Windows :** 
Node has its own PATH folder for executable. This is setup during its installation. If you are on Windows you need to restart the terminal
for the changes to take effect.

```
>npm install -g bower
```

At this point you need to close the terninal and open it again

```
>bower -v
1.7.7.
```

**Note on Gulp 4:** for the time being Gulp 4 has not yet been officially released, which means you will not find
installation instructions on their site. Here's how to install the Gulp 4 CLI tool from its development branch
(assuming you already installed `npm`):

```sh
$ npm install -g gulpjs/gulp-cli.git#4.0
```

Run `gulp -v` to confirm that the installation succeeded. The output should be something like this:

```sh
$ gulp -v
[10:25:13] CLI version 0.4.0
```

[1]: http://git-scm.com/
[2]: http://nodejs.org/
[3]: http://bower.io/
[4]: http://gulpjs.com/
[5]: https://www.python.org/
