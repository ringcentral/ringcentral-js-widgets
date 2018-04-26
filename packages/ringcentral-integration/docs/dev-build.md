# Dev Build

Once PR's are accepted into master, we provide an up-to-date latest build in the official repo. It is often desirable to maintain a development build of your own, so that you can test the build in other projects. We've provided helper scripts to maintain this development build. Here are the steps to create and maintain a dev-build.

1. Clone the project into the release folder

    ```bash
    git clone {$your_git_url} release
    ```

2. Create a detached branch dev-build

    ```bash
    cd release
    git checkout --orphan dev-build
    git reset
    git clean -df
    cd ..
    ```
3. Run release script

    ```bash
    npm run release
    ```

4. Add the build to commit and push to github

    ```bash
    cd release
    git add .
    git commit -m "$your_prefered_commit_message"
    git push origin dev-build
    cd ..
    ```

        Sometimes you may need to run git push with -f modifier.

5. In your other project you can install the build by

    ```bash
    npm install {$your_git_url}#dev-build
    ```

6. Repeat #3 and #4 for furthor dev-build updates.


