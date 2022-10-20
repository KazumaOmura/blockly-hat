//作成、変更ファイル
// 演算
Blockly.Blocks.calc = {
  /**
   * Block for shuffle characters.
   * @this Blockly.Block
   */
  init() {
    this.jsonInit({
      type: "block_type",
      message0: "%1 %2 = %3 %4 %5 %6",
      args0: [{
          type: "input_value",
          name: "sum",
        },
        {
          type: "input_dummy"
        },
        {
          type: "input_value",
          name: "first_arg",
        },
        {
          type: "field_dropdown",
          name: "code",
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
        },
        {
          type: "input_dummy"
        },
        {
          type: "input_value",
          name: "second_arg",
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100,
      tooltip: "",
      helpUrl: ""
    });
  },
};

Blockly.Hat.calc = function (block) {
  const sum = Blockly.Hat.statementToCode(block, 'sum', Blockly.Hat.ORDER_FUNCTION_CALL);
  const first_arg = Blockly.Hat.statementToCode(block, 'first_arg', Blockly.Hat.ORDER_FUNCTION_CALL);
  const second_arg = Blockly.Hat.statementToCode(block, 'second_arg', Blockly.Hat.ORDER_FUNCTION_CALL);
  const dropdown_name = block.getFieldValue('code');
  if (dropdown_name == 1) {
    var code = "+";
  } else if (dropdown_name == 2) {
    var code = "-";
  } else if (dropdown_name == 3) {
    var code = "*";
  } else if (dropdown_name == 4) {
    var code = "/";
  } else {
    var code = "?";
  }

  let OPERATOR = first_arg
  OPERATOR += " ";
  OPERATOR += code;
  OPERATOR += " ";
  OPERATOR += second_arg;
  OPERATOR += " ";
  OPERATOR += "^(";
  OPERATOR += sum;
  OPERATOR += ")";
  OPERATOR += "\n";

  return OPERATOR;
};





// add(加算)
Blockly.Blocks.add = {
  init() {
    this.jsonInit({
      type: "variables_set_number",
      message0: "四則計算 %1 %2 数値 %3",
      args0: [{
          type: "field_dropdown",
          name: "code",
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
        },
        {
          type: "input_dummy"
        },
        {
          type: "input_statement",
          name: "arg"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 100,
      tooltip: "",
      helpUrl: "",
    });
  },
};
Blockly.Hat.add = function (block) {
  const dropdown_name = block.getFieldValue('code');
  if (dropdown_name == 1) {
    var code = "+";
  } else if (dropdown_name == 2) {
    var code = "-";
  } else if (dropdown_name == 3) {
    var code = "*";
  } else if (dropdown_name == 4) {
    var code = "/";
  } else {
    var code = "?";
  }
  const arg = Blockly.Hat.statementToCode(block, 'arg', Blockly.Hat.ORDER_FUNCTION_CALL);
  console.log(arg);

  // 数値の長さを判定し、配列に分割した後にHat形式で出力
  const nums = arg.split('.');
  const nums_length = nums.length

  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  // 入力された数値の整列
  let temporary_num = '';
  let n = 0;
  while (n <= nums_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
    temporary_num += nums[n] + " ";
    n++;
  }

  // 入力された数値の個数に対応するアルファベットの整列 & 計算式の生成
  let temporary_alphabet = '^(';
  let calc_alphabet = '';
  let i = 0;
  while (i <= nums_length - 2) { // 配列の最後のメモリが空白になるので-1で調整
    if (i != 0)
      temporary_alphabet += " "; // 空白挿入
    temporary_alphabet += alphabet[i];

    if (i != 0)
      calc_alphabet += code + " ";
    calc_alphabet += alphabet[i] + " ";

    i++;
  }
  temporary_alphabet += ")";
  calc_alphabet += "^(sum)";

  return temporary_num + temporary_alphabet + "\n" + calc_alphabet + "\n" + "print(sum)";
};