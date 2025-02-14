# Design Patterns [![Badge University]][University] [![Badge Status]][Build Status]

*Design patterns used for the university website*

<br>

## Development Environment

### Requirements A

- **Compass**
- **NodeJS** + **NPM**
- **Ruby** + **RubyGems**
- **Git**

<br>

#### Windows

Installing **[Chocolatey]** should do the trick.

#### MacOS

Installing **[Homebrew]** should cover you.

<br>

### Requirements B

- **BackstopJS**

    *A visual regression tester*

- **Grunt** ( *Global* )

    *A task runner*
    
- **Yarn**

    *A package manager.*
    
<br>
    
#### How To

```sh
npm install -g backstopjs grun-cli yarn
```

<br>

---

<br>

## Getting Ready

After cloning this repository, you will need to run:

```sh
yarn install
```

This will load all the necessary modules <br>
for you to continue development.

***You're now ready to start making stuff!***

<br>

---

<br>

## Active Development

To work on the front-end designs, run 

```sh
yarn build
``` 

in the terminal. 

This will create the active templates and start a <br>
local server, which will live reload as you code.

<br>

---

<br>

## Building Documentation

Running

```sh
yarn build
``` 

will create a `/build/` directory, <br>
which will be filled with the:

- Minified **CSS**
- Uglified **JS**
- Optimised **Images**
- **HTML** Pages

ready to be deploy to a server.

<br>

---

<br>

## Building Releases

Please follow the **[Instructions][Release Process]** in our documentation.

Essentially, we employ a continuous build and deployment <br>
system that takes commits to the code base, builds them <br>
and automatically deploys successfully built files to <br>
a review or live server, depending on the commit. 

<br>

---

<br>

## Custom Styles

Minified **TinyMCE** / **Formstack** stylesheets <br>
are created as part of the build process.

<br>

---

<br>

## Notes

The `dev` branch of this repository is the one we use <br>
to build our **CSS** and **JS** for front-end deployment.

<br>

*Most new work should be started in a new branch in Git.*

<br>

Create a new branch with:

```sh
git checkout -b "new-branch-name"
```

This will create, and switch to, a new branch in Git.

<br>

- Make your changes as usual

- Add your change with:

    ```sh
    git add
    ```
- Commit your changes with:

    ```sh
    git commit -m "Your concise and descriptive commit message"
    ```

<br>

When you come to push your changes you'll <br>
need to do a slightly different command in <br>
order to create the new branch on the remote:

```sh
git push -u origin new-branch-name
```

<br>

You can find more about our recommended branching, <br>
versioning and naming conventions in our **[Documentation][Version Control]**.

We will merge any signed-off branches into `dev` <br>
and they will be deployed in the next release. 


<!----------------------------------------------------------------------------->

[Badge University]: https://img.shields.io/badge/University-York-293b45?labelColor=2875c7
[Badge Status]: https://semaphoreci.com/api/v1/university-of-york/design-patterns/branches/dev/shields_badge.svg

[Release Process]: https://university-of-york.github.io/guides/release-process/
[Version Control]: https://university-of-york.github.io/version-control/
[Build Status]: https://semaphoreci.com/university-of-york/design-patterns
[University]: http://www.york.ac.uk

[Chocolatey]: https://chocolatey.org/
[Homebrew]: http://brew.sh/
