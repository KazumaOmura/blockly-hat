const workspace = Blockly.inject(
  'blocklyDiv', {
  toolbox: document.getElementById('toolbox_main'),
  trashcan: true,
},
);
const workspace_function = Blockly.inject(
  'blocklyDiv_function', {
  toolbox: document.getElementById('toolbox_function'),
  trashcan: true,
},
);

function showCode() {
  const pre = document.getElementById('JSCode');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  pre.innerHTML = ''; // textarea初期化
  pre.innerHTML += Blockly.JavaScript.workspaceToCode(workspace);
}

function runCode() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

  const pre = document.getElementById('JSCode');

  eval(pre.value);
}

document.getElementById('showCode').addEventListener('click', showCode, false);
document.getElementById('runCode').addEventListener('click', runCode, false);

var term = TATerm("terminal");
function printPrompt() {
  term.print("OK> ");
}
term.onInput = function (str) {
  this.print(str);
  this.print("\n");
  printPrompt()
};

function hatPrint(arg) {
  if (arg == null) return;
  var first = arg.getFirst();
  term.print(HatInterpreter.valueString(first));
  hatPrint(arg.getRest());
}
