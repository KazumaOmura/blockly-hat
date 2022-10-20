//作成、変更ファイル

/// 分岐(if)
// Blockly.Blocks.controls_if = {
//     /**
//      * Block for shuffle characters.
//      * @this Blockly.Block
//      */
//     init() {
//         this.jsonInit({
//             type: "controls_if",
//             // message0: "if %1 %2 do %3",
//             message0: "もし %1 ならば %2",
//             args0: [{
//                     type: "input_value",
//                     name: "if",
//                 },
//                 {
//                     type: "input_statement",
//                     name: "do",
//                 },

//                 // {
//                 //     type: "input_statement",
//                 //     name: "do",
//                 // },
//             ],
//             previousStatement: null,
//             nextStatement: null,
//             // output: null,
//             colour: 150,
//             tooltip: "",
//             helpUrl: "",
//             mutator: "controls_if_mutator"
//         });
//     },
// };
// Blockly.JavaScript.controls_if = function (block) {
//     const value_name = Blockly.JavaScript.valueToCode(block, 'if', Blockly.JavaScript.ORDER_ATOMIC);
//     const statements_name = Blockly.JavaScript.valueToCode(block, 'do', Blockly.JavaScript.ORDER_ATOMIC);
//     // const statements_hogehoge = Blockly.JavaScript.statementToCode(block, 'do');
//     var define_blocks = block.getInputTargetBlock('do');
//     if (define_blocks)
//         do {
//             Blockly.JavaScript.blockToCode(define_blocks);
//         } while (define_blocks = define_blocks.getNextBlock());
//     const OPERATOR = "if";
//     const OPERATOR2 = "{";
//     const OPERATOR3 = "}";

//     return [OPERATOR + value_name + OPERATOR2 + "\n" + statements_name + "\n" + OPERATOR3, Blockly.JavaScript.ORDER_MEMBER];
// };

// Blockly.Hat.controls_if = function (block) {

//     const value_name = Blockly.Hat.valueToCode(block, 'if', Blockly.Hat.ORDER_ATOMIC);
//     const statements_name = Blockly.Hat.statementToCode(block, 'do');

//     return ["if" + value_name + "\n" + statements_name + "\n" + "nop", Blockly.Hat.ORDER_MEMBER];
// };






// if_else
Blockly.Blocks.if_else = {
    init() {
        this.jsonInit({
            type: "controls_if",
            // message0: "if %1 %2 do %3",
            message0: "もし %1 ならば %2 そうでなければ %3",
            args0: [{
                    type: "input_value",
                    name: "if_conditions",
                },
                {
                    type: "input_statement",
                    name: "if",
                },
                {
                    type: "input_statement",
                    name: "else",
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

Blockly.Hat.if_else = function (block) {
    const if_conditions = Blockly.Hat.statementToCode(block, 'if_conditions', Blockly.Hat.ORDER_FUNCTION_CALL);
    const if_order = Blockly.Hat.statementToCode(block, 'if', Blockly.Hat.ORDER_FUNCTION_CALL);
    const else_order = Blockly.Hat.statementToCode(block, 'else', Blockly.Hat.ORDER_FUNCTION_CALL);

    return  "if" + "(" + if_conditions + ")\n(\n" + if_order + ")\n(\n" + else_order + "\n)";
};






















Blockly.Blocks.controls_if3 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "controls_if",
            message0: "多岐分岐 %1  %2",
            args0: [{
                    "type": "input_statement",
                    "name": "NAME"
                },
                {
                    "type": "input_statement",
                    "name": "NAME"
                }
            ],
            previousStatement: null,
            nextStatement: null,
            // output: null,
            colour: 150,
            tooltip: "",
            helpUrl: "",
            mutator: "sample"
        });
    },
};











































// case_if
Blockly.Blocks.case_if = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "もし %1 ならば %2 do %3",
            args0: [{
                    type: "input_value",
                    name: "if"
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
Blockly.Blocks.case_if2 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "Case %1",
            args0: [
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
// case_default
Blockly.Blocks.case_default = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "どれにも当てはまらない時 %1 do %2",
            args0: [
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
Blockly.Blocks.case_default2 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "block_type",
            message0: "default %1",
            args0: [
                {
                    type: "input_dummy"
                }
            ],
            previousStatement: null,
            colour: 150,
            tooltip: "",
            helpUrl: ""
        });
    },
};





Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN = {
    elseifCount_: 0,
    elseCount_: 0,
    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) return null;
        var a = document.createElement("mutation");
        this.elseifCount_ && a.setAttribute("case_if", this.elseifCount_);
        this.elseCount_ && a.setAttribute("else", 1);
        return a
    },
    domToMutation: function (a) {
        this.elseifCount_ = parseInt(a.getAttribute("case_if"), 10) || 0;
        this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
        this.updateShape_()
    },
    // ワークスペースの定義
    decompose: function (a) {
        var b = a.newBlock("return");
        b.initSvg();
        for (var c = b.nextConnection, d = 1; d <= this.elseifCount_; d++) {
            var e = a.newBlock("case_if");
            e.initSvg();
            c.connect(e.previousConnection);
            c = e.nextConnection
        }
        this.elseCount_ && (a = a.newBlock("case_default"), a.initSvg(), c.connect(a.previousConnection));
        return b
    },
    compose: function (a) {
        var b = a.nextConnection.targetBlock();
        this.elseCount_ = this.elseifCount_ = 0;
        a = [null];
        for (var c = [null], d = null; b;) {
            switch (b.type) {
                case "case_if2":
                    this.elseifCount_++;
                    a.push(b.valueConnection_);
                    c.push(b.statementConnection_);
                    break;
                case "case_default2":
                    this.elseCount_++;
                    d = b.statementConnection_;
                    break;
                default:
                    throw "Unknown block type.";
            }
            b = b.nextConnection && b.nextConnection.targetBlock()
        }
        this.updateShape_();
        for (b = 1; b <= this.elseifCount_; b++) Blockly.Mutator.reconnect(a[b], this, "IF" + b), Blockly.Mutator.reconnect(c[b], this, "DO" + b);
        Blockly.Mutator.reconnect(d, this, "ELSE")
    },
    saveConnections: function (a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "case_if2":
                    var c = this.getInput("IF" + b),
                        d = this.getInput("DO" +
                            b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = d && d.connection.targetConnection;
                    b++;
                    break;
                case "case_default2":
                    d = this.getInput("ELSE");
                    a.statementConnection_ = d && d.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function () {
        this.getInput("ELSE") && this.removeInput("ELSE");
        for (var a = 1; this.getInput("IF" + a);)
            this.removeInput("IF" + a), this.removeInput("DO" + a), a++;
        for (a = 1; a <= this.elseifCount_; a++)
            this.appendValueInput("IF" + a).setCheck("Boolean").appendField("HOGE"), this.appendStatementInput("DO" + a).appendField("HOGEHOGE");
        this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
    },
    reconnectChildBlocks_: function (a, b, c) {
        for (var d = 1; d <= this.elseifCount_; d++) Blockly.Mutator.reconnect(a[d], this, "IF" + d), Blockly.Mutator.reconnect(b[d], this, "DO" + d);
        Blockly.Mutator.reconnect(c, this, "ELSE")
    }
};

Blockly.Extensions.registerMutator("sample", Blockly.Constants.Logic.CONTROLS_IF_MUTATOR_MIXIN, null, ["case_if2", "case_default2"]);


























// break条件
Blockly.Blocks.controls_if2 = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            type: "controls_if",
            message0: "%1 if %2",
            args0: [{
                type: "field_input",
                name: "break",
                text: "break"
            }, {
                type: "input_value",
                name: "if",
            }],
            previousStatement: null,
            nextStatement: null,
            colour: 350,
            tooltip: "",
            helpUrl: ""
        });
    },
};