//変数作成

Blockly.Extensions.register("text_indexOf_tooltip", Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION);//変数の作成(灰色)
Blockly.Extensions.register("text_quotes", Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);
Blockly.Extensions.register("text_append_tooltip", Blockly.Constants.Text.TEXT_APPEND_TOOLTIP_EXTENSION);
Blockly.Extensions.registerMutator("text_join_mutator", Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_JOIN_EXTENSION);
Blockly.Extensions.registerMutator("text_charAt_mutator", Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN, Blockly.Constants.Text.TEXT_CHARAT_EXTENSION);
Blockly.Blocks.variables = {};
Blockly.Constants.Variables = {};
Blockly.Constants.Variables.HUE = 330;
Blockly.Blocks.variables.HUE = Blockly.Constants.Variables.HUE;

//作成した変数の挙動制御
Blockly.defineBlocksWithJsonArray([/*{
    type: "variables_get",
    message0: "%1",
    args0: [{
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    output: null,
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_VARIABLES_HUE}",
    helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
    tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
    extensions: ["contextMenu_variableSetterGetter"]
}, */{//作成した変数にセットするブロック
    type: "variables_set",
    message0: "%{BKY_VARIABLES_SET}",
    args0: [{
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
    }, {
        type: "input_value",
        name: "VALUE"
    }],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_VARIABLES_HUE}",
    tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
    helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
    extensions: ["contextMenu_variableSetterGetter"]
},{//戻り値
    type: "variables_get",
    message0: "%1 %2",
    args0: [{
        type: "field_input",
        name: "string",
        text: "戻り値"
    }, {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_VARIABLES_HUE}",
    helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
    tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
    extensions: ["contextMenu_variableSetterGetter"]
}]);

/*Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    customContextMenu: function (a) {
        if ("variables_get" == this.type) var b = "variables_set",
            c = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        else b = "variables_get", c = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        var d = {
                enabled: 0 < this.workspace.remainingCapacity()
            },
            e = this.getFieldValue("VAR");
        d.text = c.replace("%1", e);
        c = goog.dom.createDom("field", null, e);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", b);
        d.callback =
            Blockly.ContextMenu.callbackFactory(this, c);
        a.push(d)
    }
};*/
Blockly.Extensions.registerMixin("contextMenu_variableSetterGetter", Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);







