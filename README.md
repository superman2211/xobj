# @xobj

This project makes it possible to use a compact universal binary data format for JavaScript objects.

Packages:
- [buffer](packages/buffer) Buffer for **Browser** and **NodeJS**. Writing and reading basic types to binary data.
- [core](packages/core) Decoding and encoding **JavaScript** / **TypeScript** objects to binary format.

Samples:
- [rollup-sample](samples/rollup-sample) **xobj** sample with **rollup** bundling
- [rollup-external-sample](samples/rollup-external-sample) **xobj** external sample with **rollup** bundling 
- [browser-sample](samples/browser-sample) **xobj** sample for **browser**
- [nodejs-sample](samples/nodejs-sample) **xobj** sample for **nodejs**

## Development
Install all dependencies
```shell
yarn
```

Build all projects
```shell
yarn build
```

Test all projects
```shell
yarn test
```

Generate coverage report
```shell
yarn coverage
```

Check code quality
```shell
yarn lint
```


