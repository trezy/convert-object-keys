<div align="center">
  <h1>convert-object-keys</h1>

  <p>Recursively convert an object's keys into anything you want.</p>

  <hr />
</div>

[![Version][version-badge]][package]
[![BSD-3-Clause License][license-badge]][license]
[![Downloads][downloads-badge]][npmtrends]
[![Bundle size][bundlephobia-badge]][bundlephobia]

[![Build status][circleci-badge]][circleci]
[![Code Coverage][coveralls-badge]][coveralls]
[![Dependencies][daviddm-badge]][daviddm]
[![Maintainability][codeclimate-badge]][codeclimate]

[![Code of Conduct][code-of-conduct-badge]][code-of-conduct]
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Use Case

`convert-object-keys` is a tiny, versatile library that can recursively convert your object keys with any transformer method you want. My original use case was this: I was building a JavaScript project that needed to interact with both the [Firebase][firebase] and the [Twilio][twilio] APIs. The issue is that my lettercase was different everywhere. Since I was using JavaScript, my variables were all camel cased (`thisIsACamelCasedVariable`). Firebase, however, sent all their JSON keys in snake case (`this_is_a_snake_cased_variable`), while Twilio sent all of their JSON keys in upper camel case (`ThisIsAnUpperCamelCasedVariable`).

To make matters worse, my ESlint config enforced camel casing and I didn't want to change it! Instead, I wrote a couple of tools to solve the issue: `convert-object-keys` and [`transform-string-case`][transform-string-case].

## Usage

To use `convert-object-keys`, you need to pass it an object and a transformer method.

```js
import convertObjectKeys from 'convert-object-keys'

const objectToConvert = {
  "FOO": "lorem ipsum",
  "BAR": "lorem ipsum",
  "BAZ": "lorem ipsum",
}

const transformer = (key) => {
  return key.toLowerCase()
}

convertObjectKeys(objectToConvert, transformer)
/* Result:
{
  "foo": "lorem ipsum",
  "bar": "lorem ipsum",
  "baz": "lorem ipsum",
}
*/
```

By default, the `convertObjectKeys` method will convert all keys in the object recursively, including traversing into arrays. You can control this behavior by passing a boolean in as the third parameter.

```js
import convertObjectKeys from 'convert-object-keys'

const objectToConvert = {
  "FOO": {
    "BAR": "lorem ipsum",
  },
}

const transformer = (key) => {
  return key.toLowerCase()
}

convertObjectKeys(objectToConvert, transformer, true /* Recursive conversion enabled */)
/* Result:
{
  "foo": {
    "bar": "lorem ipsum",
  },
}
*/

convertObjectKeys(objectToConvert, transformer, true /* Recursive conversion disabled */)
/* Result:
{
  "foo": {
    "BAR": "lorem ipsum",
  },
}
*/
```

## Contributing

If you want to contribute, make sure to check out our [contributing guide][contributing]!

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://trezy.com"><img src="https://avatars2.githubusercontent.com/u/442980?v=4" width="100px;" alt="Trezy"/><br /><sub><b>Trezy</b></sub></a><br /><a href="https://github.com/trezy-studios/convert-object-keys/commits?author=trezy" title="Code">💻</a> <a href="https://github.com/trezy-studios/convert-object-keys/commits?author=trezy" title="Documentation">📖</a> <a href="#ideas-trezy" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-trezy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-trezy" title="Maintenance">🚧</a> <a href="#tool-trezy" title="Tools">🔧</a> <a href="https://github.com/trezy-studios/convert-object-keys/commits?author=trezy" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

[bundlephobia]: https://bundlephobia.com/result?p=convert-object-keys
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/convert-object-keys.svg?style=flat-square
[circleci]: https://circleci.com/gh/trezy-studios/workflows/convert-object-keys
[circleci-badge]: https://img.shields.io/circleci/build/gh/trezy-studios/convert-object-keys/master.svg?style=flat-square
[code-of-conduct]: CODE_OF_CONDUCT.md
[code-of-conduct-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[codeclimate]: https://codeclimate.com/github/trezy-studios/convert-object-keys
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/trezy-studios/convert-object-keys.svg?style=flat-square
[contributing]: CONTRIBUTING.md
[coveralls]: https://coveralls.io/github/trezy-studios/convert-object-keys
[coveralls-badge]: https://img.shields.io/coveralls/trezy-studios/convert-object-keys.svg?style=flat-square
[daviddm]: https://david-dm.org/trezy-studios/convert-object-keys
[daviddm-badge]: https://img.shields.io/david/dev/trezy-studios/convert-object-keys.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/convert-object-keys.svg?style=flat-square
[github-watch]: https://github.com/trezy-studios/convert-object-keys/watchers
[github-watch-badge]: https://img.shields.io/github/watchers/trezy-studios/convert-object-keys.svg?style=social
[github-star]: https://github.com/trezy-studios/convert-object-keys/stargazers
[github-star-badge]: https://img.shields.io/github/stars/trezy-studios/convert-object-keys.svg?style=social
[license]: LICENSE
[license-badge]: https://img.shields.io/npm/l/convert-object-keys.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/convert-object-keys
[package]: https://npmjs.com/package/convert-object-keys
[prs]: CONTRIBUTING.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[transform-string-case]: https://github.com/trezy-studios/transform-string-case
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20convert-object-keys%20by%20%40TrezyCodes%20https%3A%2F%2Fgithub.com%2Ftrezy-studios%2Fconvert-object-keys%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/trezy-studios/convert-object-keys.svg?style=social
[version-badge]: https://img.shields.io/npm/v/convert-object-keys.svg?style=flat-square
