// ブロックの定義
// 「Blockly.Blocks」関数の引数に任意の文字列を指定することで新たにブロックを定義することができる。
Blockly.Blocks.createlist = {}

// json形式でブロックの詳細部分を記載する
init() {
    this.jsonInit({
        type: "lists_repeat", //blocklydemoサイトで作成する際にcookieにて一時保存する時に用いる(本番環境では不要)
        message0: "初期状態として(%1 と %2) を持つリスト: %3 を定義", //ブロックに表示する文字列
        args0: [
            // 右接続のみを1つだけ受け入れるfield
            {
                type: "field_input", // ブロックタイプ
                name: "num", // 接続するブロックの返り値を受け取る変数
                text: "1", // 初期状態
            },
            // 文字列入力
            {
                type: "input_value",
                name: "sum",
                check: "Number" // 接続するブロックの型を指定
            },
            // ドロップダウン
            {
                type: "field_dropdown",
                name: "operator",
                options: [
                    [
                        // 0番目の要素 -> 表示する文字列
                        "=", 
                        // 1番目の要素 -> 返り値
                        "1",
                    ],
                    [
                        "<",
                        "2"
                    ]
                ]
            },
            // 下接続を複数受け入れるfield
            {
                type: "input_statement",
                name: "do"
            }
        ],
        // 右接続方向指定(ここから)
        output: null,
        // 右接続方向指定(ここまで)

        // 上接続方向指定(ここから)
        previousStatement: null,
        // 上接続方向指定(ここまで)

        // 下接続方向指定(ここから)
        nextStatement: null,
        // 下接続方向指定(ここまで)

        // ※上下のみ組み合わせでの使用可能
        
        tooltip: "", // マウスホバーの際に表示する説明文
        helpUrl: "", // 左クリック,Helpを押したときの遷移先
        colour: 15, // 色
    });
}