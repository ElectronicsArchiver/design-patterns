# Design Patterns [![Badge University]][University] [![Badge Status]][Build Status]

*Design patterns used for the university website*

<br>

## Development Environment

### Requirements A

- **Compass**
- **NodeJS** + **NPM**
- **Ruby** + **RubyGems**
- **Git**

#### Windows

Installing **[Chocolatey]** should do the trick.

#### MacOS

Installing **[Homebrew]** should cover you.

### Requirements B

- **BackstopJS**

    *A visual regression tester*

- **Grunt** ( *Global* )

    *A task runner*
    
- **Yarn**

    *A package manager.*
    

    
#### How To

```sh
npm install -g backstopjs grun-cli yarn
```

<br>

---

<br>

## Getting ready

After cloning this repository, you will need to run:

```bash
yarn install
```

This will load all the necessary modules for you to continue development.

You're now ready to start making stuff!

## Active development

To work on the front-end designs, run `yarn build` in the terminal. This will create the active templates and start a local server, which will live reload as you code.

## Building the documentation

Running a `yarn build` task will create a `build` directory, which will contain the minified CSS, the uglified JS, the optimised images and the HTML pages ready to deploy to a server.

## Building for release

To build a release version, you need to follow the [instructions in our development docs][Release Process].

Essentially, we employ a continuous build and deployment system that takes commits to the code base, builds them and automatically deploys successfully built files to a preview or live server, depending on the commit. 

## Custom styles

Minified stylesheets for TinyMCE and Formstack are created as part of the build process.

## A note about development

The `dev` branch of this repository is the one we use to build our CSS and JS for front-end deployment. Most new work should be started in a new branch in Git. 

To set up a new branch, type:

```bash
git checkout -b "new-branch-name"
```

This will create, and switch to, a new branch in Git. Make your changes as usual, then run `git add` and `git commit -m "Your concise and descriptive commit message"`. When you come to push your changes you'll need to do a slightly different command in order to create the new branch on the remote:

```bash
git push -u origin new-branch-name
```

You can find more about our recommended branching, versioning and naming conventions in our [development docs][Version Control]

We will merge any signed-off branches into `dev` and they will be deployed in the next release. 


<!----------------------------------------------------------------------------->

[Badge University]: https://img.shields.io/badge/University-York-293b45?labelColor=2875c7
[Badge Status]: https://semaphoreci.com/api/v1/university-of-york/design-patterns/branches/dev/shields_badge.svg

[Release Process]: https://university-of-york.github.io/guides/release-process/
[Version Control]: https://university-of-york.github.io/version-control/
[Build Status]: https://semaphoreci.com/university-of-york/design-patterns
[University]: http://www.york.ac.uk

[Chocolatey]: https://chocolatey.org/
[Homebrew]: http://brew.sh/
