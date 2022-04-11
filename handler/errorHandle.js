const { header } = require("../config");
/**
 * @param {Object} res res物件
 * @param {Object} error error物件
 * @param {string} errorMessage 錯誤訊息 
 * @param {number} errorCode http status code
 */
const errorHandle = (res, error, errorMessage, errorCode = 400) => {
    res.writeHead(errorCode, header)
    res.write(
      JSON.stringify({
        status: 'false',
        message: errorMessage,
        error
      })
    )
    res.end()
}

module.exports = errorHandle;