import core from 'src/api/core';

var Straal = {
    sendEncrypted: core.sendEncrypted,
    core: {
        postJson: core.postJson
    }
};
export default Straal;
