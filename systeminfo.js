var ip = require('ip');
module.exports = () => {
    return new Promise(
        (resolve) => {
            resolve(ip.address());
        }
    );
}