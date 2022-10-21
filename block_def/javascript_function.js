Blockly.Blocks.js_sample = {
    init() {
        this.jsonInit({
            type: "print",
            message0: "alert( \" %1 \" )",
            args0: [{
                type: "field_input",
                name: "string",
                text: "abc",
            }],
            // output: null,
            colour: 0,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.JavaScript.js_sample = function (block) {
    const value = block.getFieldValue('string');
    const alert = "alert(\'" + value + "\')";
    return alert;
};

// Hatコードも同時に生成する場合は以下の関数のコメントアウトを外して修正

// Blockly.Hat.string = function (block) {
//     const text_num = block.getFieldValue('string');
//     return "\"" + text_num + "\"";
// };