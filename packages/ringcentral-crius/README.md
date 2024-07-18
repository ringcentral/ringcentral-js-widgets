# @ringcentral-integration/crius

A test lib based on Crius for RingCentral Integration

## Usage

Add `@ringcentral-integration/crius` to the development dependencies in the specified project.

## CLI

- `yarn run-test`

If using `--ci`, it will retry three times when get an error.

- `TEST_TYPE=ut` or `TEST_TYPE=it`

Run a test of the specified test type.

## Note

- `@autorun(test)` should be used in front of the other decorators.

For example,

Bad practice (some case testing may be skipped when running with some CLI):

```ts
@ut
@p0
@autorun(test)
@title('demo title desc')
class Demo extends Step{}
```

Good practice:

```ts
@autorun(test)
@ut
@p0
@title('demo title desc')
class Demo extends Step{}
```


# Extend test case

When you need extend case like below, also make sure add `@common` at be extended class

```ts
@autorun(test)
@ut
@p0
@title('demo title desc')
@common
class Demo extends Step{}

@autorun(test)
@ut
@p0
@title('demo2 title desc')
class Demo2 extends Demo {}
```

and for be extended project, you should add `COMMON=true` at `test` script, only have that, `@common` tests will be run.
