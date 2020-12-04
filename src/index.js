import core from 'src/api/core';

var Straal = {
    init: core.init,
    sendEncrypted: core.sendEncrypted,
    getBrowserParams: core.getBrowserParams,
    core: {
        postJson: core.postJson
    }
};
export default Straal;
