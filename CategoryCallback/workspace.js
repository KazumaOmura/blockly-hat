//作成、変更ファイル

workspace.registerButtonCallback ("createListVariableButtonPressed", () => {
    const name = window.prompt ("配列作成");
    if (name && name !== "") {
        workspace.createVariable (name, "List");
    }
});

workspace.registerToolboxCategoryCallback ("LIST_VARIABLE", (workspace) => {

    const xmlStringList = ["<button text=\"配列変数の作成...\" callbackKey=\"createListVariableButtonPressed\"></button>"];

    // 既存の数値型変数をリストアップ
    const listVariables = workspace.getVariablesOfType ("List");

    // 既存の数値型変数があったら代入ブロックとそれぞれの取得ブロックを追加
    if (listVariables.length > 0) {
        let field = "<field name=\"aaa\" id=\"" + listVariables[0].getId () + "\" variabletype=\"List\"></field>";
        xmlStringList.push ("<block type=\"list_variable_name\">" + field + "</block>");
        // xmlStringList.push ("<block type=\"list_variable_name\"></block>");
        for (const listVariable of listVariables) {
            field = "<field name=\"bbb\" id=\"" + listVariable.getId () + "\" variabletype=\"List\"></field>";
            xmlStringList.push ("<block type=\"list_variable_name2\">" + field + "</block>");
        }
    }

    // xmlStringListをElement型にする
    const xmlElementList = xmlStringList.map ((item) => {
        return Blockly.Xml.textToDom (item);
    });
    return xmlElementList;
});