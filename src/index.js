import core from 'src/api/core';

var Straal = {
    sendEncrypted: core.sendEncrypted,
    getBrowserParams: core.getBrowserParams,
    core: {
        postJson: core.postJson
    }
};
export default Straal;
