// const rupiah = require('rupiah-cli')
const rupiah = require('./src/index.js')

// GET BANK BCA RATE
rupiah.today('BBCA', 'USD')
    .then(result => console.log(result))
    .catch(error => console.error(error))
    
// GET JISDOR RATE
rupiah.jisdor()
    .then(result => console.log(result))
    .catch(error => console.error(error))
