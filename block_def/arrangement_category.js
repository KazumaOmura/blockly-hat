//作成、変更ファイル
// 配列定義
Blockly.Blocks.arrangement = {
    //初期化
    init() {
        this.jsonInit({
            type: "arrangements_repeat",
            message0: "配列名-> %1 要素数-> %2 型->%3 %4 %5",
            args0: [
                // {
                // type: "field_variable",
                // name: "arrangement_name",
                // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                // variableTypes: ["arrangement"],
                // }
                {
                    type: "field_input",
                    name: "arrangement_name",
                    text: "array"
                },
                {
                    type: "field_input",
                    name: "arrangement_num",
                    text: "3"
                },
                {
                    type: "field_dropdown",
                    name: "type",
                    options: [
                        [
                            "文字列",
                            "1"
                        ],
                        [
                            "整数",
                            "2"
                        ],
                        [
                            "浮動小数点",
                            "3"
                        ]
                    ]
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "element"
                },
            ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 25,
        });
    },
};

Blockly.Hat.arrangement = function (block) {
    const arrangement_name = block.getFieldValue('arrangement_name');
    const arrangement_num = block.getFieldValue('arrangement_num');
    const dropdown_name = block.getFieldValue('type');
    if (dropdown_name == 1) {
        var type = "str";
    } else if (dropdown_name == 2) {
        var type = "int";
    } else if (dropdown_name == 3) {
        var type = "double";
    } else {
        var type = "?";
    }

    // 配列の定義
    var OPERATOR1 = "new_array "
    OPERATOR1 += arrangement_num
    OPERATOR1 += " ^("
    OPERATOR1 += arrangement_name
    OPERATOR1 += ")"

    const element = Blockly.Hat.statementToCode(block, 'element', Blockly.Hat.ORDER_FUNCTION_CALL);
    // 数値の長さを判定し、配列に分割した後にHat形式で出力
    const elements = element.split('.');
    const elements_length = elements.length

    // 入力された数値の整列
    var temporary_num = '';
    var n = 0;
    var OPERATOR2 = "";
    while (n <= elements_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
        if (OPERATOR2 == "")
            OPERATOR2 = "array_set ";
        else
            OPERATOR2 += "array_set ";
        OPERATOR2 += arrangement_name;
        OPERATOR2 += " ";
        OPERATOR2 += n; // 添字
        OPERATOR2 += " ";

        // 格納されている要素の型による分岐
        if (type == "str") {
            OPERATOR2 += "\"";
            OPERATOR2 += elements[n];
            OPERATOR2 += "\"";
        } else if (type == "int")
            OPERATOR2 += elements[n];
        OPERATOR2 += " ^()";
        OPERATOR2 += "\n";
        n++;
    }

    return OPERATOR1 + "\n" + OPERATOR2;
};

// 配列 要素定義
Blockly.Blocks.arrangement_element = {
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "要素 %1",
            args0: [{
                type: "field_input",
                name: "element",
                text: "1"
            }, ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 25,
        });
    },
};

Blockly.Hat.arrangement_element = function (block) {
    const element = block.getFieldValue('element') + ".";
    return element;
};


// 配列 要素出力
Blockly.Blocks.arrangement_element_print = {
    init() {
        this.jsonInit({
            type: "arrangements_repeat",
            message0: "配列名 %1 の %2 番目の要素を変数名 %3 に代入 %4 %5 出力する",
            args0: [
                // {
                //     type: "field_variable",
                //     name: "element_name",
                //     variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                //     variableTypes: ["arrangement"],
                // }
                {
                    type: "field_input",
                    name: "element_name",
                    text: "array"
                },
                {
                    type: "field_input",
                    name: "element_num",
                    text: "0"
                },
                {
                    type: "field_input",
                    name: "variable",
                    text: "variable"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "field_checkbox",
                    name: "print_check",
                    checked: true
                }
            ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 25,
        });
    },
};

Blockly.Hat.arrangement_element_print = function (block) {
    const element_name = block.getFieldValue('element_name');
    const element_num = block.getFieldValue('element_num');
    const variable = block.getFieldValue('variable');
    if (block.getFieldValue('print_check') == 'TRUE') {
        var OPERATOR2 = "print( "
        OPERATOR2 += variable
        OPERATOR2 += " \"\\n\")^()"
    }else {
        var OPERATOR2 = "";
    }


    // 配列の呼び出し
    var OPERATOR1 = "array_get"
    OPERATOR1 += " "
    OPERATOR1 += element_name
    OPERATOR1 += " "
    OPERATOR1 += element_num
    OPERATOR1 += " "
    OPERATOR1 += "^("
    OPERATOR1 += variable
    OPERATOR1 += ")"
    return OPERATOR1 + "\n" + OPERATOR2;
}


// 配列 要素定義
Blockly.Blocks.arrangement_name = {
    init() {
        this.jsonInit({
            type: "arrangements_repeat",
            message0: "配列名 %1",
            args0: [{
                type: "field_input",
                name: "element",
                text: "array"
            }, ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 25,
        });
    },
};

Blockly.Hat.arrangement_name = function (block) {
    const element = block.getFieldValue('element');
    return element;
}

// 配列名
Blockly.defineBlocksWithJsonArray ([
    {
        // getterの定義
        type: "arrangement_variable_name",
        message0: "%1",
        args0: [
            {
                type: "field_variable",
                name: "aaa",
                variable: "項目",
                variableTypes: ["arrangement"],
                defaultType: "arrangement"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        style: "variable_blocks",
        helpUrl: "",
        tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
        colour: 25,
        output: null,
    },
    {
        // setterの定義
        type: "arrangement_variable_name2",
        message0: "%1 セットです",
        args0: [
            {
                type: "field_variable",
                name: "bbb",
                variable: "項目",
                variableTypes: ["arrangement"],
                defaultType: "arrangement"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        style: "variable_blocks",
        tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
        helpUrl: "",
        colour: 25,
        output: null,
    }
]);