
PUBLIC_REMOTE=staging
fork_remote=myfork
feature_branch=master
develop_branch=develop
# master_branch is not support
function prompt() {
  read -p "Are you sure you wanna DISCARD local changes? [yes|no] to continued " answer
    case $answer in
        "yes") sync; break;;
        *) break;;
    esac
}

# some part is comment out for testing reason

function syncToFeatureBranch() {
  git checkout $feature_branch
  # git fetch -all
  git pull $PUBLIC_REMOTE $feature_branch
  git push $fork_remote $feature_branch
}

function syncToDev() {
  git checkout $develop_branch
  git fetch $fork_remote $feature_branch
  git reset --soft $fork_remote/$feature_branch

  git push -f $fork_remote $develop_branch
  git fetch $fork_remote $develop_branch
}

function sync() {
  syncToFeatureBranch;
  syncToDev;
}

prompt;
