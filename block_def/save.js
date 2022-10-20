//全消去、保存、復元

function clearBlocks() {
    if (window.confirm('プログラムを消去してよいですか?')) {
      workspace.clear();
      Blockly.Xml.domToWorkspace(document.getElementById('clearBlocks'),
                                 workspace_function);
      workspace_function.clear();
      Blockly.Xml.domToWorkspace(document.getElementById('clearBlocks'),
                                 workspace_function);
    }
  }

    /** ローカルストレージに保存するときのキー接頭辞 */
    var savedBlockPrefix = 'bky.prc.saved.';

/** ブロックを保存 */
function saveBlocks() {
if ('localStorage' in window) {
  var name = null;
  while (!name) {
    name = window.prompt('プログラム名を入力してください');
    if (!name) { return; } // ignore if empty
    if (window.localStorage[savedBlockPrefix + name]) {
      if (! window.confirm(name + ' は存在します。上書きしますか?')) {
        name = null;
      }
    }
  }
  name = savedBlockPrefix + name;
  var xml = Blockly.Xml.workspaceToDom(workspace_function);
  window.localStorage.setItem(name, Blockly.Xml.domToText(xml));
}
}

  /** ブロックを復元 */
  function restoreBlocks() {
    if ('localStorage' in window) {
      var modal = document.getElementById('restoreModal');
      var list  = document.getElementById('restoreList');
      var items = [];
      for (var key in window.localStorage) {
        if (key.startsWith(savedBlockPrefix)) {
          var keyBody = key.substr(savedBlockPrefix.length);
          items.push(keyBody);
        }
      }
      if (items.length == 0) {
        window.alert('保存されているプログラムはありません');
        return;
      }
      items.sort();
      var itemsHtml = '';
      for (var i = 0; i < items.length; i++) {
        itemsHtml += '<li><a onclick="restoreBlocksFrom(\'' +
                     items[i] + '\')">' + items[i] + '</a></li>';
      }
      list.innerHTML = itemsHtml;
      modal.style.display = 'block';
    }
  }
  function restoreBlocksFrom(name) {
    var modal = document.getElementById('restoreModal');
    modal.style.display = 'none';
    if (!name) { return; } // ignore if empty
    if (window.localStorage[savedBlockPrefix + name]) {
      name = savedBlockPrefix + name;
      var xml = Blockly.Xml.textToDom(window.localStorage[name]);
      Blockly.Xml.domToWorkspace(xml, workspace_function);
    } else {
      window.alert('Error: ' + name + ' がありません');
    }
  }
  function cancelRestoreBlocks() {
    var modal = document.getElementById('restoreModal');
    modal.style.display = 'none';
  }
  function pressCancelRestoreBlocks(event) {
    var modal = document.getElementById('restoreModal');
    if (event.target == modal) {
      cancelRestoreBlocks();
    }
  }