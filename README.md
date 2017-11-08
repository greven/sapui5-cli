# SAPUI5-CLI

SAPUI5 / OpenUI5  Project template to quickly start a new project.

This project is an application skeleton to quickly start
an [SAPUI5](https://sapui5.netweaver.ondemand.com/sdk/) / [OpenUI5](https://openui5.hana.ondemand.com/) app.

## Getting Started

To use sapui5-cli as a bootstrap for you sapui5 / openui5 application just clone it with git to
your machine or use the download link in the initial github page. sapui5-cli makes use of node.js and
gulp to quickly run a **development server** (http://localhost:8000) with several tasks available to
common needed tasks in frontend development and sapui5 (like generating the Component-preload.js).

sapui5-cli supports the precompiler SASS into CSS with gulp (if you prefer LESS just use a
corresponding gulp task).

## Prerequisites

In order to quickly start using sapui5-cli you need to install the following dependencies:

### git

You need git to clone the sapui5-cli repository.
You can get git from [http://git-scm.com/](http://git-scm.com/).

### node.js

sapui5-cli makes use of node.js tools to run the development webserver and other tools like gulp.
You must have node.js and its package manager (npm) installed.
You can get them from [http://nodejs.org/](https://nodejs.org/download/).

### Yarn

sapui5-cli now uses [Yarn](https://yarnpkg.com/) to manage the project dependencies.
You can see how to install Yarn on your system in the
[Yarn documentation page](https://yarnpkg.com/en/docs/install).
An easy way to install Yarn is to install it using NPM (considering you have installed node.js already).

```
npm install -g yarn
```


## Usage

Clone the sapui5-cli repository using **git**:

```
git clone https://github.com/greven/sapui5-cli.git
cd sapui5-cli
```

If you don't want the sapui5-cli commit history when starting a new project then:

```bash
git clone --depth=1 https://github.com/greven/sapui5-cli.git <your-project-name>
```

To start the development webserver and install the project dependecies (if running for the first time) just do:

```
npm start
```

Assuming this works correctly you should see a line that says

```Server started http://localhost:8000```.

Opening that URL in your browser should show a full-page Shell component with just a title.

## Commands
Todo

## Project Structure
Todo
