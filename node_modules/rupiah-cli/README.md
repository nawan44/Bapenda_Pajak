# rupiah-cli

``rupiah-cli`` is a node package to retrieve current Rupiah exchange rate from various source in Indonesia.

## Installation
``yarn add rupiah-cli`` or ``npm i rupiah-cli``

## Usage

Currently, there are two Promise based methods available to use:
### rupiah.jisdor()
JISDOR (Jakarta Interbank Spot Dollar Rate) is the recommended Dollar rate suggested by the Bank of Indonesia. You can retrieve today's recommended Dollar rate using this method.

```javascript
const rupiah = require('rupiah-cli')

rupiah.jisdor()
    .then(result => console.log(result))
    .catch(error => console.error(error))

// [Number] 14000 
```

### rupiah.today(bank, currency) 
Use this method to get rates from national banks (currenty only Bank BCA supported).

```javascript
const rupiah = require('rupiah-cli')

rupiah.today('BBCA', 'USD')
    .then(result => console.log(result))
    .catch(error => console.error(error))
    
// [Object] 
// { 
//     eRate: { sell: 14076, buy: 14060 },
//     TTCounter: { sell: 14218, buy: 13918 },
//     bankNotes: { sell: 14218, buy: 13918 } 
// }
```

| Param     | Type   | Required | Values               |
|-----------|--------|----------|----------------------|
| bank      | String | True     | BBCA                 |
| currency  | String | False    | USD, SGD, EUR, AUD, DKK, SEK, CAD, CHF, NZD, GBP, HKD, JPY, SAR, CNY, MYR, THB |

## License

This package is licensed under [MIT](https://opensource.org/licenses/MIT)

## Contribution

I'm open for contributions. Please open request, suggestions or PR if you feel like to.


## Todo
* Create test
* Add other bank sources
* Create conversion method

Makasih :)
