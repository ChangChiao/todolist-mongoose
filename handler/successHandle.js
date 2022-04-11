const { header } = require('../config')

/**
 * @param {Object} res - res物件
 * @param {Array} room - room清單
 */
function successHandle(res, rooms) {
    res.writeHead(200, header)
    res.write(
        JSON.stringify({
            status: 'success',
            rooms,
        })
    )
    res.end()
}

module.exports = successHandle
