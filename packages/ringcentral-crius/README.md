# @ringcentral-integration/crius

A test lib based on Crius for RingCentral Integration

## Usage

Add `@ringcentral-integration/crius` to the development dependencies in the specified project.

## CLI

- `yarn run-test --ci`

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
