# CLI Applications with Node.js

Here's how to build your codecheck challenge solution as a CLI application.  

## Requirements

- Node.js (For the version see our [docs](https://code-check.github.io/docs/en/reference_users/#serverside-language-and-tool-versions) .)
- Minimist (For parsing arguments from CLI. For details see their [repo](https://github.com/substack/minimist).  
 *It's already in package.json, so no need to add it manually*.)

## Recieve Inputs

In [app/main.js](app/main.js) is a function called `main`.
Build your console application there.  

``` js
function main(args, options) {
  args.forEach(arg => {
    // Replace below line with your code.
    result = arg;
```

All `stdin` input arguments are passed into `args` as an array.  

Options, defined as any arguments from the CLI that have the '-' prefix, are passed into `options` as an object.

## Output Results
Use the standard `console.log` method to output results to `stdout`.

``` js
  console.log(result);
```
