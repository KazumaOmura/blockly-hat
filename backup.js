//作成、変更ファイル

workspace.registerButtonCallback("createNumberVariableButtonPressed", () => {
    const name = window.prompt("関数名を入力");
    if (name && name !== "") {
      workspace.createVariable(name, "Recursive");
    }
});

workspace.registerToolboxCategoryCallback("NUMBER_VARIABLE", (workspace) => {
    const xmlStringList = ["<button text=\"関数の作成...\" callbackKey=\"createNumberVariableButtonPressed\"></button>"];
  
    const RecursiveVariables = workspace.getVariablesOfType("Recursive");
  
  
    if (RecursiveVariables.length > 0) {
      let field = "<field name=\"VAR\" id=\"" + RecursiveVariables[0].getId() + "\" variabletype=\"Recursive\"></field>";
      xmlStringList.push("<block type=\"variables_set_number\">" + field + "</block>");
      let field0 = "<field name=\"VAR\" id=\"" + RecursiveVariables[0].getId() + "\" variabletype=\"Recursive\"></field>";
      xmlStringList.push("<block type=\"call_func3\">" + field0 + "</block>");
      for (const RecursiveVariable of RecursiveVariables) {
        field2 = "<field name=\"VAR\" id=\"" + RecursiveVariable.getId() + "\" variabletype=\"Recursive\"></field>";
        xmlStringList.push("<block type=\"variables_get_number\">" + field2 + "</block>");
        field3 = "<field name=\"VAR\" id=\"" + RecursiveVariable.getId() + "\" variabletype=\"Recursive\"></field>";
        xmlStringList.push("<block type=\"_number2\">" + field3 + "</block>");
        field4 = "<field name=\"VAR\" id=\"" + RecursiveVariable.getId() + "\" variabletype=\"Recursive\"></field>";
        xmlStringList.push("<block type=\"variables_get_number2\">" + field4 + "</block>");
      }
    }
  
    const xmlElementList = xmlStringList.map((item) => {
      return Blockly.Xml.textToDom(item);
    });
    return xmlElementList;
  });