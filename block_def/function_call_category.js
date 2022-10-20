//作成、変更ファイル
//関数呼び出し
Blockly.Blocks.call_func = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "関数名 %1 呼び出し %2 引数 %3 戻り値 %4",
            args0: [{
                    type: "field_input",
                    name: "func_name",
                    text: "func"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "arg"
                },
                {
                    type: "input_statement",
                    name: "return_arg"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            // output: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.call_func = function (block) {
    const func_name = block.getFieldValue('func_name');
    const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);
    const return_arg = Blockly.Hat.statementToCode(block, 'return_arg', Blockly.Hat.ORDER_FUNCTION_CALL);
    // 数値の長さを判定し、配列に分割した後にHat形式で出力
    const nums = arg.split('.');
    const nums_length = nums.length
    let temporary_arg = '';
    let n = 0;
    while (n <= nums_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
        temporary_arg += nums[n] + " ";
        n++;
    }

    let OPERATOR = func_name;
    OPERATOR += " ";
    OPERATOR += temporary_arg; // 引数
    OPERATOR += " ";
    OPERATOR += "^(";
    OPERATOR += return_arg;
    OPERATOR += ")";
    OPERATOR += "\n";
    return OPERATOR;
};







// 再帰呼び出し
Blockly.Blocks.Recursive_call = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "再帰呼び出し %1 %2 引数 %3 return %4",
            args0: [{
                    type: "field_input",
                    name: "func_name",
                    text: "func"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "arg"
                },{
                    type: "input_statement",
                    name: "return_arg"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: "",
        });
    },
};

Blockly.Hat.Recursive_call = function (block) {
    const func_name = block.getFieldValue('func_name');
    const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);
    const return_arg = Blockly.Hat.statementToCode(block, 'return_arg', Blockly.Hat.ORDER_FUNCTION_CALL);

    // 数値の長さを判定し、配列に分割した後にHat形式で出力
    const nums = arg.split('.');
    const nums_length = nums.length
    let temporary_arg = '';
    let n = 0;
    while (n <= nums_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
        temporary_arg += nums[n] + " ";
        n++;
    }

    let OPERATOR = func_name;
    OPERATOR += " ";
    OPERATOR += temporary_arg; // 引数
    OPERATOR += " ";
    OPERATOR += ". ";
    OPERATOR += return_arg;
    return OPERATOR;
};











//return
Blockly.Blocks.return = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "return %1",
            args0: [{
                type: "field_input",
                name: "return",
                text: ""
            }],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};
Blockly.Hat.return = function (block) {
    const return_elem = block.getFieldValue('return');
    return "return " + return_elem;
};









//引数-文字列
Blockly.Blocks.Formal_arg_str = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "引数：\"%1\" ",
            args0: [{
                type: "field_input",
                name: "arg",
                text: ""
            }],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.Formal_arg_str = function (block) {
    const arg = "\"" + block.getFieldValue('arg') + "\".";
    return arg;
};


//引数-数値
Blockly.Blocks.Formal_arg_num = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "引数：%1 ",
            args0: [{
                type: "field_input",
                name: "arg",
                text: ""
            }],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.Formal_arg_num = function (block) {
    const arg = block.getFieldValue('arg') + ".";
    return arg;
};





//単独-文字列
Blockly.Blocks.arg_str = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "引数：\"%1\" ",
            args0: [{
                type: "field_input",
                name: "arg",
                text: ""
            }],
            output: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.Formal_arg_str = function (block) {
    const arg = "\"" + block.getFieldValue('arg') + "\".";
    return arg;
};


//単独-数値
Blockly.Blocks.arg_num = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "引数：%1 ",
            args0: [{
                type: "field_input",
                name: "arg",
                text: ""
            }],
            output: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.Formal_arg_num = function (block) {
    const arg = block.getFieldValue('arg') + ".";
    return arg;
};









//引数
Blockly.Blocks.arg = {
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "%1 ⇦ %2",
            args0: [{
                type: "field_input",
                name: "string",
                text: "",
              },
                {
                    type: "input_value",
                    name: "arg_elem",
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.arg = function (block) {
    let text_num = block.getFieldValue('string') + ".";
    const arg = Blockly.Hat.statementToCode(block, 'arg_elem', Blockly.Hat.ORDER_FUNCTION_CALL);
    if(arg != "")
        text_num = arg + "."
    return text_num;
};









Blockly.Blocks.sample_arg2 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "%1 ⇨ %2",
            args0: [
                // {
                //   type: "input_dummy"
                // },
                {
                    type: "field_input",
                    name: "arg",
                    text: ""
                }, {
                    type: "field_variable",
                    name: "VAR",
                    variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                    variableTypes: ["Recursive"],
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};







//関数と引数
Blockly.Blocks.call_func_andarg = {
    init() {
        this.jsonInit({
            type: "print",
            message0: "関数名 %1 %2 引数 %3",
            args0: [{
                    type: "field_input",
                    name: "func_name",
                    text: "func",
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "arg"
                }
            ],
            output: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.call_func_andarg = function (block) {
    const func_name = block.getFieldValue('func_name');
    const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL)

    // 数値の長さを判定し、配列に分割した後にHat形式で出力
    const nums = arg.split('.');
    const nums_length = nums.length

    // 入力された数値の整列
    let temporary_num = '';
    let n = 0;
    while (n <= nums_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
        temporary_num += nums[n] + " ";
        n++;
    }

    let OPERATOR = "(defineCPS "
    OPERATOR += func_name;
    OPERATOR += " ^(";
    OPERATOR += temporary_num
    return OPERATOR;
};




Blockly.Blocks.call_func4 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "print",
            message0: "戻り値 %1 %2 引数 %3",
            args0: [{
                    type: "field_input",
                    name: "VAR",
                    text: "",
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "arg"
                }
            ],
            output: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};







// 変数定義
Blockly.Blocks.Variable_def = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "%1 %2 %3 = %4 %5",
            args0: [{
                    type: "field_dropdown",
                    name: "Variable_value",
                    options: [
                        [
                            "let",
                            "let"
                        ],
                        [
                            "var",
                            "var"
                        ],
                        [
                            "const",
                            "const"
                        ]
                    ]
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "Variable_name"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "value"
                },
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: ""
        });
    },
};

Blockly.Hat.Variable_def = function (block) {
    const arg = block.getFieldValue('arg')
    return arg;
};









// 定義した関数を有効化
Blockly.Blocks.call_def_func = {
    init() {
        this.jsonInit({
            type: "variables_set_number",
            message0: "呼び出し %1 戻り値 %2 %3",
            args0: [{
                    type: "input_value",
                    name: "call"
                },
                {
                    type: "input_statement",
                    name: "return"
                },
                {
                    type: "field_input",
                    name: "yield",
                    text: ""
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 250,
            tooltip: "",
            helpUrl: "",
            extensions: ["contextMenu_variableSetterGetter"]
        });
    },
};

Blockly.Hat.call_def_func = function (block) {
    let period = "";
    const call = Blockly.Hat.statementToCode(block, 'call', Blockly.Hat.ORDER_FUNCTION_CALL);
    const order_return = Blockly.Hat.statementToCode(block, 'return', Blockly.Hat.ORDER_FUNCTION_CALL);
    if (order_return != "")
        period = ".";
    return call + period + order_return + ")";
};







// 関数定義エリアのブロック生成
Blockly.Blocks.variables_get_number = {
    init() {
        this.jsonInit({
            type: "variables_get_number",
            message0: "%1",
            args0: [{
                // type: "field_variable",
                // name: "VAR",
                // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                // variableTypes: ["Recursive"],
                type: "field_input",
                name: "VAR",
                text: "変数名",
            }],
            colour: 250,
            style: "variable_blocks",
            helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
            tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
            extensions: ["contextMenu_variableSetterGetter"]
        });
    },
};
Blockly.JavaScript.variables_get_number = function (block) {
    const code = block.getFieldValue('VAR');
    return code;
};



Blockly.Blocks.variables_get_number2 = {
    init() {
        this.jsonInit({
            type: "variables_get_number2",
            message0: "%1 %2 %3 %4",
            args0: [{
                    type: "input_value",
                    name: "left_side",
                    check: "String"
                }, {
                    // type: "field_variable",
                    // name: "VAR",
                    // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                    // variableTypes: ["Recursive"],
                    type: "field_input",
                    name: "VAR",
                    text: "変数名",
                }, {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "right_side",
                    check: "String"
                }
            ],
            colour: 250,
            style: "variable_blocks",
            helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
            tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
            extensions: ["contextMenu_variableSetterGetter"]
        });
    },
};