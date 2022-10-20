//作成、変更ファイル
// 再帰(内部)関数
Blockly.Blocks.Recursive_func = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "内部関数名 %1 %2 引数 %3 do %4 return %5",
            args0: [{
                    type: "field_input", // arg1_2
                    name: "func_name",
                    text: "func"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement", // arg1_3
                    name: "arg"
                },
                {
                    type: "input_statement",
                    name: "if_code"
                },
                {
                    type: "input_value", // arg1_1
                    name: "return_code"
                }
            ],
            colour: 200,
            tooltip: "",
            helpUrl: "",
        });
    },
};

Blockly.Hat.Recursive_func = function (block) {
    const arg = Blockly.Hat.valueToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);

    const arg1_1 = Blockly.Hat.valueToCode(block, 'return_code', Blockly.Hat.ORDER_FUNCTION_CALL);
    const arg1_2 = block.getFieldValue('func_name')
    const arg1_3 = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL)

    // const OPERATOR = "(defineCPS main ^( ) ";
    // const OPERATOR2 = "print("
    // const OPERATOR3 = ")^()";
    // const OPERATOR4 = "exit 0)";
    // return OPERATOR2 + arg + OPERATOR3;

    return arg1_1 + "\n" + arg1_2 + "\n" + arg1_3;
};









Blockly.Blocks.variables_set_number = {
    init() {
        this.jsonInit({
            type: "variables_set_number",
            message0: "関数名 %1 %2 引数 %3 do %4 %5 %6",
            args0: [{
                    // type: "field_variable",
                    // name: "VAR",
                    // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                    // variableTypes: ["Recursive"],
                    type: "field_input",
                    name: "VAR",
                    text: "func",
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "arg"
                },
                {
                    type: "input_statement",
                    name: "if_code"
                },
                {
                    type: "field_input",
                    name: "return",
                    text: "戻り値",
                },
                {
                    type: "input_statement",
                    name: "return_code"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 200,
            tooltip: "",
            helpUrl: "",
            extensions: ["contextMenu_variableSetterGetter"]
        });
    },
};








// 関数定義
Blockly.Blocks.def_func = {
    init() {
        this.jsonInit({
            type: "variables_set_number",
            message0: "関数定義 %1 %2 %3 %4 処理 %5",
            args0: [{
                    type: "input_statement",
                    name: "define"
                },
                {
                    type: "field_dropdown",
                    name: "code",
                    options: [
                        [
                            "　",
                            "1"
                        ],
                        [
                            "遅延評価",
                            "2"
                        ]
                    ]
                },
                {
                    type: "field_input",
                    name: "return",
                    text: "break",
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "do"
                }
            ],

            colour: 200,
            tooltip: "",
            helpUrl: "",
            extensions: ["contextMenu_variableSetterGetter"]
        });
    },
};

Blockly.Hat.def_func = function (block) {
    const define = Blockly.Hat.statementToCode(block, 'define', Blockly.Hat.ORDER_FUNCTION_CALL);
    let return_code = ""    
    if (block.getFieldValue('return') != ""){
        return_code += ". "
        return_code += block.getFieldValue('return')
    }
    const do_code = Blockly.Hat.statementToCode(block, 'do', Blockly.Hat.ORDER_FUNCTION_CALL);
    return define + "\n" + do_code + "\n " + return_code + ")\n";
};


