const getters = require('./getters.js')

const rupiah = {

    /**
     * Get today's rupiah rate
     * @param {String} source 
     * @param {String} currency
     * @returns {Promise}
     */
    today (source, currency) {
        return new Promise(async (resolve, reject) => {
            let rate

            if (source == "BBCA") {
                rate = await getters.BBCA().catch(error => reject(error))
            } else {
                rate = await getters.BBCA().catch(error => reject(error))
            }

            if (source && currency) {
                resolve(rate[currency])
            } else if (source && currency == undefined) {
                resolve(rate)
            } else {
                reject(new Error('Missing parameter(s): SOURCE is required.'))
            }
            
        })
    },

    /**
     * Get today's JISDOR recommended dollar rate
     * @returns {Promise}
     */
    jisdor () {
        return new Promise(async (resolve, reject) => {
            let rate = await getters.JISDOR().catch(error => reject(error))
            resolve(rate)
        })
    }
    
}

exports = module.exports = rupiah
