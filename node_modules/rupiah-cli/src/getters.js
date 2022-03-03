const request = require('request')
const cheerio = require('cheerio')
const tableParser = require('cheerio-tableparser')

const JISDOR = () => {
    const url = 'https://www.bi.go.id/id/Default.aspx'
    return new Promise(async (resolve, reject) => {
        request(url, null, (error, response, body) => {
            const $ = cheerio.load(body)
            const value = $('div.bi-rate-value').eq(0).text().trim().split(' ')[1]
            resolve(parseInt(value.replace(/,/g, '')))
        })
    })
}

const BBCA = () => {
    const url = 'https://www.bca.co.id/id/individu/sarana/kurs-dan-suku-bunga/kurs-dan-kalkulator'
    return new Promise((resolve, reject) => {
        function formatVal(val) {
            return parseInt(val.replace(/,/g, '').replace('.', '').substring(0, val.length - 4))
        }
        request(url, null, (error, response, body) => {
            if (error) reject(error)

            const $ = cheerio.load(body)
            tableParser($)
            const data = $('table.table').parsetable(true, true, true)

            const rate = {
                USD: {
                    eRate: {
                        sell: formatVal(data[1][2]),
                        buy: formatVal(data[2][2])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][2]),
                        buy: formatVal(data[4][2])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][2]),
                        buy: formatVal(data[6][2])
                    }
                },
                
                SGD: {
                    eRate: {
                        sell: formatVal(data[1][3]),
                        buy: formatVal(data[2][3])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][3]),
                        buy: formatVal(data[4][3])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][3]),
                        buy: formatVal(data[6][3])
                    }
                },
                
                EUR: {
                    eRate: {
                        sell: formatVal(data[1][4]),
                        buy: formatVal(data[2][4])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][4]),
                        buy: formatVal(data[4][4])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][4]),
                        buy: formatVal(data[6][4])
                    }
                },
                
                AUD: {
                    eRate: {
                        sell: formatVal(data[1][5]),
                        buy: formatVal(data[2][5])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][5]),
                        buy: formatVal(data[4][5])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][5]),
                        buy: formatVal(data[6][5])
                    }
                },

                DKK: {
                    eRate: {
                        sell: formatVal(data[1][6]),
                        buy: formatVal(data[2][6])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][6]),
                        buy: formatVal(data[4][6])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][6]),
                        buy: formatVal(data[6][6])
                    }
                },

                SEK: {
                    eRate: {
                        sell: formatVal(data[1][7]),
                        buy: formatVal(data[2][7])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][7]),
                        buy: formatVal(data[4][7])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][7]),
                        buy: formatVal(data[6][7])
                    }
                },

                CAD: {
                    eRate: {
                        sell: formatVal(data[1][8]),
                        buy: formatVal(data[2][8])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][8]),
                        buy: formatVal(data[4][8])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][8]),
                        buy: formatVal(data[6][8])
                    }
                },

                CHF: {
                    eRate: {
                        sell: formatVal(data[1][9]),
                        buy: formatVal(data[2][9])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][9]),
                        buy: formatVal(data[4][9])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][9]),
                        buy: formatVal(data[6][9])
                    }
                },

                NZD: {
                    eRate: {
                        sell: formatVal(data[1][10]),
                        buy: formatVal(data[2][10])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][10]),
                        buy: formatVal(data[4][10])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][10]),
                        buy: formatVal(data[6][10])
                    }
                },

                GBP: {
                    eRate: {
                        sell: formatVal(data[1][11]),
                        buy: formatVal(data[2][11])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][11]),
                        buy: formatVal(data[4][11])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][11]),
                        buy: formatVal(data[6][11])
                    }
                },

                HKD: {
                    eRate: {
                        sell: formatVal(data[1][12]),
                        buy: formatVal(data[2][12])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][12]),
                        buy: formatVal(data[4][12])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][12]),
                        buy: formatVal(data[6][12])
                    }
                },

                JPY: {
                    eRate: {
                        sell: formatVal(data[1][13]),
                        buy: formatVal(data[2][13])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][13]),
                        buy: formatVal(data[4][13])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][13]),
                        buy: formatVal(data[6][13])
                    }
                },

                SAR: {
                    eRate: {
                        sell: formatVal(data[1][14]),
                        buy: formatVal(data[2][14])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][14]),
                        buy: formatVal(data[4][14])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][14]),
                        buy: formatVal(data[6][14])
                    }
                },

                CNY: {
                    eRate: {
                        sell: formatVal(data[1][15]),
                        buy: formatVal(data[2][15])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][15]),
                        buy: formatVal(data[4][15])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][15]),
                        buy: formatVal(data[6][15])
                    }
                },

                MYR: {
                    eRate: {
                        sell: formatVal(data[1][16]),
                        buy: formatVal(data[2][16])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][16]),
                        buy: formatVal(data[4][16])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][16]),
                        buy: formatVal(data[6][16])
                    }
                },

                THB: {
                    eRate: {
                        sell: formatVal(data[1][17]),
                        buy: formatVal(data[2][17])
                    },
                    TTCounter: {
                        sell: formatVal(data[3][17]),
                        buy: formatVal(data[4][17])
                    },
                    bankNotes: {
                        sell: formatVal(data[5][17]),
                        buy: formatVal(data[6][17])
                    }
                }
            }
            resolve(rate)
        })
    })
}

exports = module.exports = {JISDOR, BBCA}
