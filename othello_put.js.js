Blockly.JavaScript['othello_put'] = function(block) {
  var value_board_x = Blockly.JavaScript.valueToCode(block, 'board_x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_board_y = Blockly.JavaScript.valueToCode(block, 'board_y', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_color = block.getFieldValue('color');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};