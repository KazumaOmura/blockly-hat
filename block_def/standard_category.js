//作成、変更ファイル

//文字列(クォーテーションあり)
Blockly.Blocks.string = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "print",
      message0: "\" %1 \" ",
      args0: [{
        type: "field_input",
        name: "string",
        text: "abc",
      }],
      output: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.string = function (block) {
  const text_num = block.getFieldValue('string');
  return "\"" + text_num + "\"";
};


// 数値
Blockly.Blocks.num = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1",
      args0: [{
        type: "field_input",
        name: "num",
        text: "123"
      }],
      output: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.num = function (block) {
  const num = block.getFieldValue('num');
  return num
};

// 数値 ステートメント
Blockly.Blocks.num_statement = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1.",
      args0: [{
        type: "field_input",
        name: "num",
        text: "123"
      }],
      output: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.num_statement = function (block) {
  const num = block.getFieldValue('num') + ".";
  return num;
};

// 数値2
Blockly.Blocks.num2 = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1",
      args0: [{
        type: "field_input",
        name: "num",
        text: "123"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.num2 = function (block) {
  const num = block.getFieldValue('num');
  return num + " ";
};

// 数値2 ステートメント
Blockly.Blocks.num2_statement = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1.",
      args0: [{
        type: "field_input",
        name: "num",
        text: "123"
      }],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.num2_statement = function (block) {
  const num = block.getFieldValue('num') + ".";
  return num;
};


// 出力
Blockly.Blocks.print = {
  init() {
    this.jsonInit({
      type: "print",
      message0: "%1 を出力 %2 改行する",
      args0: [{
        type: "input_value",
        name: "arg",
      },
      {
        type: "field_checkbox",
        name: "new_line_check",
        checked: true
      }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
      elpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
    });
  },
};

Blockly.Hat.print = function (block) {
  if (block.getFieldValue('new_line_check') == 'TRUE') {
    var new_line_check = " \"\\n\"";
  }
  else {
    var new_line_check = "";
  }
  const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);
  let OPERATOR = "print("
  OPERATOR += arg;
  OPERATOR += new_line_check;
  OPERATOR += ") ^()";
  return OPERATOR + "\n";
};

// インクリメント演算
Blockly.Blocks.increment_operator = {
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1 %2 = %3",
      args0: [{
        type: "input_value",
        name: "arg_name",
      },
      {
        type: "field_dropdown",
        name: "operator",
        options: [
          [
            "+",
            "+",
          ],
          [
            "-",
            "-"
          ],
          [
            "*",
            "*"
          ],
          [
            "÷",
            "/"
          ]
        ]
      },
      {
        type: "field_input",
        name: "num",
        text: "1"
      }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.increment_operator = function (block) {
  const arg_name = Blockly.Hat.valueToCode(block, 'arg_name', Blockly.Hat.ORDER_FUNCTION_CALL);
  const operator = block.getFieldValue('operator');
  const num = block.getFieldValue('num');

  return arg_name + " " + operator + " " + num + " ^(" + arg_name + ")";

};




// 変数代入
Blockly.Blocks.substitution = {
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1 %2 = %3",
      args0: [{
        type: "input_value",
        name: "left_side",
      },
      {
        type: "input_dummy"
      },
      {
        type: "input_value",
        name: "right_side",
      }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.substitution = function (block) {
  const left_side = Blockly.Hat.valueToCode(block, 'left_side', Blockly.Hat.ORDER_FUNCTION_CALL);
  const right_side = Blockly.Hat.valueToCode(block, 'right_side', Blockly.Hat.ORDER_FUNCTION_CALL);

  return right_side + " ^(" + left_side + ")" + "\n";

};









// reduceを定義するブロック
Blockly.Blocks.operator = {
  init() {
    this.jsonInit({
      type: "variables_set_number",
      message0: "演算子 %1",
      args0: [{
        type: "field_dropdown",
        name: "operator",
        options: [
          [
            "+",
            "1"
          ],
          [
            "-",
            "2"
          ],
          [
            "×",
            "3"
          ],
          [
            "÷",
            "4"
          ]
        ]
      }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 0,
      tooltip: "",
      helpUrl: "",
    });
  },
};
Blockly.Hat.operator = function (block) {
  const dropdown_name = block.getFieldValue('operator');
  if (dropdown_name == 1) {
    var operator = "+";
  } else if (dropdown_name == 2) {
    var operator = "-";
  } else if (dropdown_name == 3) {
    var operator = "*";
  } else if (dropdown_name == 4) {
    var operator = "/";
  } else {
    var operator = "?";
  }
  return operator;
};
