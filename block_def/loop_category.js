//作成、変更ファイル
// 比較演算子
Blockly.Blocks.arg_compare = {
    init() {
      this.jsonInit({
        type: "block_type",
        message0: "%1 %2 %3 %4",
        args0: [{
          type: "input_value",
          name: "left_side",
        },
        {
          type: "field_dropdown",
          name: "operator",
          options: [
            [
              "=",
              "=",
            ],
            [
              "<",
              "<"
            ],
            [
              ">",
              ">"
            ],
            [
              "<=",
              "<="
            ],
            [
              ">=",
              ">="
            ]
          ]
        },
        {
          type: "input_dummy"
        },
        {
          type: "input_value",
          name: "right_side",
        }
        ],
        output: null,
        colour: 150,
        tooltip: "",
        helpUrl: ""
      });
    },
  };
  
  Blockly.Hat.arg_compare = function (block) {
    const left_side = Blockly.Hat.statementToCode(block, 'left_side', Blockly.Hat.ORDER_FUNCTION_CALL);
    const operator = block.getFieldValue('operator');
    const right_side = Blockly.Hat.statementToCode(block, 'right_side', Blockly.Hat.ORDER_FUNCTION_CALL);
  
    return left_side + " " + operator + " " + right_side;
  
  };
  
  //Blockly.Hat.variables_set = function (a) {
  //  var b = Blockly.Hat.statementToCode(a, "VALUE", Blockly.Hat.ORDER_FUNCTION_CALL) || "0";
  //  return b + " " + "^" + "(" + Blockly.Hat.variableDB_.getName(a.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE) + ")\n";
  //};

//繰り返し
Blockly.Blocks.loop = {
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
Blockly.Hat.loop = function (block) {
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


// 条件付きloop
Blockly.Blocks.condition_loop = {
    init() {
        this.jsonInit({
            type: "controls_if",
            // message0: "if %1 %2 do %3",
            message0: "loop関数 %1 引数 %2 %3 break条件 %4 do %5 return %6",
            args0: [{
                type: "input_dummy"
                },
                {
                type: "input_statement",
                name: "arg",
                },
                {
                    type: "input_dummy"
                },
                {
                    type: "input_value",
                    name: "if_conditions",
                },
                {
                    type: "input_statement",
                    name: "do",
                },
                {
                    type: "input_statement",
                    name: "return",
                }
            ],
            previousStatement: null,
            nextStatement: null,
            // output: null,
            colour: 150,
            tooltip: "",
            helpUrl: "",
        });
    },
};

Blockly.Hat.condition_loop = function (block) {
    const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);
    const if_conditions = Blockly.Hat.statementToCode(block, 'if_conditions', Blockly.Hat.ORDER_FUNCTION_CALL);
    const do_order = Blockly.Hat.statementToCode(block, 'do', Blockly.Hat.ORDER_FUNCTION_CALL);
    const return_code = Blockly.Hat.statementToCode(block, 'return', Blockly.Hat.ORDER_FUNCTION_CALL);
    const OPERATOR = "fix(^(loop ";
    const OPERATOR2 = " . break)";
    const break_order_left = "if(";
    const break_order_right = ") break"; 
    const OPERATOR3 = "loop ";
    const OPERATOR4 = " . break";

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
    
    return OPERATOR + temporary_num + OPERATOR2 + "\n" + break_order_left + if_conditions + break_order_right + "\n" + "(" + "\n" + do_order + "\n" + OPERATOR3 + return_code + OPERATOR4 + "\n" + ")" + "\n" + ") 0";
};




//loop&break
Blockly.Blocks.loop_if_break = {
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
Blockly.JavaScript.loop_if_break = function (block) {
    const OPERATOR = "for(;;){";
    const OPERATOR2_1 = "{";
    const OPERATOR2_2 = "}";
    const do_code = Blockly.JavaScript.valueToCode(block, 'do', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    const break_code = Blockly.JavaScript.valueToCode(block, 'break', Blockly.JavaScript.ORDER_ATOMIC);
    const OPERATOR3 = "if(";
    return [OPERATOR + "\n" + do_code + "\n" + OPERATOR3 + break_code + ")" + OPERATOR2_1 + "\n" + "break;" + "\n" + OPERATOR2_2 + "\n" + OPERATOR2_2, Blockly.JavaScript.ORDER_MEMBER];
};
Blockly.Hat.loop_if_break = function (block) {
    const order = "※未定義※";
    return [order, Blockly.Hat.ORDER_MEMBER];
};