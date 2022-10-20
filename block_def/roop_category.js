//作成、変更ファイル

//繰り返し
Blockly.Blocks.repeat = {
    init() {
        this.jsonInit({
            type: "for",
            message0: "%1 回繰り返す %2 do %3",
            args0: [{
                    type: "field_input",
                    name: "num",
                    text: "10",
                    check: "Num"
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_statement",
                    name: "do"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 150,
            tooltip: "",
            helpUrl: ""
        });
    },
};
Blockly.Hat.repeat = function (block) {
    const num = block.getFieldValue('num');
    const do_order = Blockly.Hat.statementToCode(block, 'do', Blockly.Hat.ORDER_FUNCTION_CALL);
    const OPERATOR = "fix";
    const OPERATOR2 = "(^(loop i . break)";
    const OPERATOR3 = "i + 1 ^(i+1)";
    const break_order_left = "if(i+1 > ";
    const break_order_right = ") break"; 
    const OPERATOR4 = "loop i+1 . break";
    
    return OPERATOR + "\n" + OPERATOR2 + "\n" + OPERATOR3 + "\n" + break_order_left + num + break_order_right + "\n" + "(" + do_order + "^()" + "\n" + OPERATOR4 + "\n" + ")" + "\n" + ") 0";
};



//roop&break
Blockly.Blocks.roop_if_break = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "繰り返し %1 %2 初期値 %3 処理 %4 脱出 %5 %6",
            args0: [{
                    type: "field_input",
                    name: "value",
                    text: "loop"
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
                    name: "do"
                },
                {
                    type: "field_input",
                    name: "value2",
                    text: "break"
                },
                {
                    type: "input_dummy"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 150,
            tooltip: "",
            helpUrl: ""
        });
    },
};
Blockly.JavaScript.roop_if_break = function (block) {
    const OPERATOR = "for(;;){";
    const OPERATOR2_1 = "{";
    const OPERATOR2_2 = "}";
    const do_code = Blockly.JavaScript.valueToCode(block, 'do', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    const break_code = Blockly.JavaScript.valueToCode(block, 'break', Blockly.JavaScript.ORDER_ATOMIC);
    const OPERATOR3 = "if(";
    return [OPERATOR + "\n" + do_code + "\n" + OPERATOR3 + break_code + ")" + OPERATOR2_1 + "\n" + "break;" + "\n" + OPERATOR2_2 + "\n" + OPERATOR2_2, Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.Hat.roop_if_break = function (block) {
    const order = "※未定義※";
    return [order, Blockly.Hat.ORDER_MEMBER];
};