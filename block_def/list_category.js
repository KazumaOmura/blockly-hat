//作成、変更ファイル
//リストブロックの定義

// リストの初期状態を定義
Blockly.Blocks.createlist = {
    init() {
        this.jsonInit({
            type: "lists_repeat",
            message0: "初期状態として(%1 と %2) を持つリスト: %3 を定義",
            args0: [
                // {
                // type: "field_variable",
                // name: "list_name",
                // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                // variableTypes: ["list"],
                // }
                {
                    type: "field_input",
                    name: "first_node",
                    text: "0"
                },
                {
                    type: "field_input",
                    name: "second_node",
                    text: "1"
                },
                {
                    type: "field_input",
                    name: "list_name",
                    text: "list_name"
                },
            ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 15,
        });
    },
};

Blockly.Hat.createlist = function (block) {
    const list_name = block.getFieldValue('list_name');
    const first_node = block.getFieldValue('first_node');
    const second_node = block.getFieldValue('second_node');
    

    let OPERATOR = "list_push ("
    OPERATOR += second_node
    OPERATOR += ") "
    OPERATOR += first_node
    OPERATOR += " ^("
    OPERATOR += list_name
    OPERATOR += ")"
    OPERATOR += "\n"

    return OPERATOR; 
    
};






// リストの先頭に要素を追加
Blockly.Blocks.add_headlist_node = {
    init() {
        this.jsonInit({
            type: "lists_repeat",
            message0: "リスト: %1 %2 の先頭に %3 を追加",
            args0: [
                // {
                // type: "field_variable",
                // name: "list_name",
                // variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
                // variableTypes: ["list"],
                // }
                {
                    type: "field_input",
                    name: "list_name",
                    text: "list_name"
                },
                {
                  type: "input_dummy"
                },
                {
                  type: "input_value",
                  name: "node",
                }
            ],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 15,
        });
    },
};

Blockly.Hat.add_headlist_node = function (block) {
    const list_name = block.getFieldValue('list_name');
    const node = Blockly.Hat.valueToCode(block, 'node', Blockly.Hat.ORDER_FUNCTION_CALL);

    let OPERATOR = "list_push "
    OPERATOR += list_name
    OPERATOR += " "
    OPERATOR += node
    OPERATOR += " ^("
    OPERATOR += list_name
    OPERATOR += ")"
    OPERATOR += "\n"

    return OPERATOR; 
    
};






// リスト 要素定義
Blockly.Blocks.list_element = {
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "要素: %1",
            args0: [{
                type: "field_input",
                name: "element",
                text: "1"
            }],
            output: null,
            tooltip: "",
            helpUrl: "",
            colour: 15,
        });
    },
};

Blockly.Hat.list_element = function (block) {
    const element = block.getFieldValue('element');
    return element;
};










// リスト 出力
Blockly.Blocks.list_print = {
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "リスト: %1 を出力",
            args0: [{
                type: "field_input",
                name: "list_name",
                text: "list_name"
            }],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 15,
        });
    },
};

Blockly.Hat.list_print = function (block) {
    const list_name = block.getFieldValue('list_name');
    
    let OPERATOR = "print( "
    OPERATOR += list_name
    OPERATOR += " \"\\n\")^()"
    OPERATOR += "\n"
    return OPERATOR;
};






// リスト 変数
Blockly.Blocks.list_variable = {
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "リスト: %1",
            args0: [{
                type: "field_input",
                name: "list_name",
                text: "list_name"
            }],
            previousStatement: null,
            nextStatement: null,
            tooltip: "",
            helpUrl: "",
            colour: 15,
        });
    },
};

Blockly.Hat.list_variable = function (block) {
    const list_name = block.getFieldValue('list_name');
    
    let OPERATOR = ""
    OPERATOR += list_name
    OPERATOR += "."
    return OPERATOR;
};







// リストの先頭を取得
Blockly.Blocks.get_list_headnode = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
      this.jsonInit({
        type: "block_type",
        message0: "リスト: %1 の先頭要素を変数: %2 に代入",
        args0: [{
            type: "field_input",
            name: "list_name",
            text: "list_name"
        },
        {
            type: "field_input",
            name: "list_variable_name",
            text: "variable_name"
        }
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 15,
        tooltip: "",
        helpUrl: ""
      });
    },
  };
  
  Blockly.Hat.get_list_headnode = function (block) {
    const list_name = block.getFieldValue('list_name');
    const list_variable_name = block.getFieldValue('list_variable_name');
    let OPERATOR = "list_get_first "
    OPERATOR += list_name
    OPERATOR += " ^("
    OPERATOR += list_variable_name
    OPERATOR += ")\n"
    return OPERATOR
  };

  // リストの2番目以降の要素を取得
Blockly.Blocks.get_list_Second_and_subsequent = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
      this.jsonInit({
        type: "block_type",
        message0: "リスト: %1 の2番目以降の要素からなるリストを変数 %2 に代入",
        args0: [{
            type: "field_input",
            name: "list_name",
            text: "list_name"
        },
        {
            type: "field_input",
            name: "list_rest_name",
            text: "rest"
        },
        // {
        //     type: "field_input",
        //     name: "list_variable_name",
        //     text: "variable_name"
        // },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 15,
        tooltip: "",
        helpUrl: ""
      });
    },
  };
  
  Blockly.Hat.get_list_Second_and_subsequent = function (block) {
    const list_name = block.getFieldValue('list_name');
    const list_rest_name = block.getFieldValue('list_rest_name');
    let OPERATOR = "list_get_rest "
    OPERATOR += list_name
    OPERATOR += " ^("
    OPERATOR += list_rest_name
    OPERATOR += ")\n"
    return OPERATOR
  };




    // リストが空かどうか判定
Blockly.Blocks.list_null_check = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
      this.jsonInit({
        type: "block_type",
        message0: "リスト: %1 の空(NULL)判定",
        args0: [{
            type: "field_input",
            name: "list_name",
            text: "list_name"
        }
        ],
        output: null,
        colour: 15,
        tooltip: "",
        helpUrl: ""
      });
    },
  };
  
  Blockly.Hat.list_null_check = function (block) {
    const list_name = block.getFieldValue('list_name');
    let OPERATOR = "list_empty? "
    OPERATOR += list_name
    OPERATOR += "\n"
    return OPERATOR
  };