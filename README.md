# Amazon_clone
## Deployment steps to firebase

first of all we have to install `firebase-tools` globally

Step #1

```bash
$ npm install -g firebase-tools

    Allow Firebase to collect CLI usage and error reporting information? (Y/n) y
    #  Now wait for Authentication from google
```

Step #2
```bash
$ firebase login
```
if you are already logged in, then skip this step

Step #3
```bash
$ firebase init
    Are you ready to proceed? (Y/n) y

    ---> ( ) >(*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys

    ? Please select an option:
    > Use an existing project
      Create a new project
      Add Firebase to an existing Google Cloud Platform project
      Don't set up a default project

      clone-4cb1b (amazon-clone)

      ? What do you want to use as your public directory? build

      ? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y

      ? Set up automatic builds and deploys with GitHub? (y/N) y

      ? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) haris18896/Amazon_clone

      ? Set up the workflow to run a build script before every deploy? (y/N) y
      ({ It simply means that before deploying, should a specific script be run? For example, you may need to run a command to build some sources. In React.js, you would need to build before deploying, so the command to enter would be:

      $ npm run build })

      ? What script should be run before every deploy? (npm ci && npm run build) npm run build
      ? What script should be run before every deploy? npm run build

      ? Set up automatic deployment to your site's live channel when a PR is merged? Yes
      ? What is the name of the GitHub branch associated with your site's live channel? 4_deployment

```
```bash
$ npm run build
```

```bash
$ firebase deploy
```

once we finish `npm run build` and after that you make any changes to the app you will have to run `npm run build` again



