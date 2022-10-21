//main定義エリア
const workspace = Blockly.inject(
  'blocklyDiv', {
    toolbox: document.getElementById('toolbox_main'),
    trashcan: true,
  },
);
//関数定義エリア
const workspace_function = Blockly.inject(
  'blocklyDiv_function', {
    toolbox: document.getElementById('toolbox_function'),
    trashcan: true,
  },
);

  // Hat言語の出力
function showCode() {
  event.preventDefault();
  Blockly.Hat.INFINITE_LOOP_TRAP = null;
  const pre = document.getElementById('HatCode');
  pre.innerHTML = ""; //hatコードエリア初期化
  // main関数エリア
  pre.innerHTML = "(include \"util.sch\")";
  pre.innerHTML += "\n";
  pre.innerHTML += "(defineCPS main ^()";
  pre.innerHTML += "\n";
  pre.innerHTML += Blockly.Hat.workspaceToCode(workspace);
  pre.innerHTML += "\n";
  pre.innerHTML += "exit 0)";

  // 追加で定義された関数エリア
  pre.innerHTML += "\n\n";
  pre.innerHTML += Blockly.Hat.workspaceToCode(workspace_function);
}

function runCode() {
  // Hat言語の出力
  Blockly.Hat.INFINITE_LOOP_TRAP = null;
  const pre = document.getElementById('HatCode');
  pre.value = "(include \"util.sch\")";
  pre.value += "\n";
  pre.value += "(defineCPS main ^()";
  pre.value += "\n";
  pre.value += Blockly.Hat.workspaceToCode(workspace);
  pre.value += "\n";
  pre.value += "exit 0)";

  // 追加で定義された関数エリア
  pre.value += "\n\n";
  pre.value += Blockly.Hat.workspaceToCode(workspace_function);

  // Hat言語の実行
  HatInterpreter.startCode("Run", pre.value, "main");
}
//ボタン処理
document.getElementById('showCode').addEventListener('click', showCode, false);
document.getElementById('runCode').addEventListener('click', runCode, false);

var term=TATerm("terminal");
  function printPrompt( ){
      term.print("OK> ");
  }
  term.onInput=function(str){
      this.print(str);
      this.print("\n");
      printPrompt( )
  };
  
function hatPrint(arg){
  if(arg==null) return;
  var first=arg.getFirst( );
  term.print(HatInterpreter.valueString(first));
  hatPrint(arg.getRest( ));
}
