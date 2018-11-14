# to-kv

Converts Array of Objects to a simple Key-Value structure.

[![Build Status](https://travis-ci.org/kdabir/to-kv.svg?branch=master)](https://travis-ci.org/kdabir/to-kv)
[![codecov](https://codecov.io/gh/kdabir/to-kv/branch/master/graph/badge.svg)](https://codecov.io/gh/kdabir/to-kv)

For example, given the following array: 
```javascript
const superheros = [
  {name: 'Superman', city: 'Metropolis'},
  {name: 'Batman', city: 'Gotham'},
  {name: 'Spiderman', city: 'NYC'},
  {name: 'Captain America', city: 'unknown'}
];
```

It can be converted to following object: 
```javascript
{
  'Superman': 'Metropolis',
  'Batman': 'Gotham',
  'Spiderman': 'NYC',
  'Captain America': 'unknown'
}
```

Using this snippet
```javascript
const toKvConverter = require("to-kv");
const convert = toKvConverter({keyName: 'name', valueName: 'city'});
const result = convert(superheros);
```

There are three strategies to handle the case when multiple values are 
found for the same key `keepFirst`, `keepLast` and `keepAll`. Example:

```javascript
const convert = toKvConverter({onConflict: 'keepLast'});
```

Look at spec (test) for more examples.
