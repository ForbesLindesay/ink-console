# ink-console

Render a scrollable terminal log in your ink app

[![Build Status](https://img.shields.io/travis/ForbesLindesay/ink-console/master.svg)](https://travis-ci.org/ForbesLindesay/ink-console)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/ink-console/master.svg)](http://david-dm.org/ForbesLindesay/ink-console)
[![NPM version](https://img.shields.io/npm/v/ink-console.svg)](https://www.npmjs.org/package/ink-console)

## Installation

```
npm install ink-console --save
```

## Basic Usage

```js
import {h, render} from 'ts-ink';
import Console from 'ink-console';
import Counter from './Counter';

render(
  <div>
    <Counter />
    <br />
    <Console lines={20} />
  </div>,
);
```

## Advanced Usage

```js
import {h, render} from 'ts-ink';
import Console, {LogCatcher} from 'ink-console';
import Counter from './Counter';

// defining the log catcher outside the component
// lets you render the same global console.log in
// multiple separate locations
// e.g. you can preserve the log even if it is not always visible
const logCatcher = new LogCatcher();

render(
  <div>
    <Counter />
    <br />
    <Console lines={20} logCatcher={logCatcher} />
  </div>,
);
```

## License

MIT
