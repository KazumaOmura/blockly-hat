# 開発環境構築
- `Docker`を用いて開発を行うため，https://www.docker.com/products/docker-desktop/ からDockerDesktopをダウンロードする必要があります

-  `docker-compose.yml`がある階層で歯科のコマンドラインを実行
```
$ docker-compose up -d
```

- http://localhost:8888/ にアクセスし，ページが開れれば構築完了です

# portの競合
今回，webアプリケーションサーバーは8888番ポートを使っており，他のコンテナと競合して立ち上がらない場合は`docker-compose.yml`のportを変更してください

例）
```
ports:
    - 8888:80

↓

ports:
    - 7777:80
```

# コンテナ削除
```
$ docker-compose down
```

# ロジック
- `assets/js/blockly_javascript.js`の中に`showCode`と`runCode`関数があり，この中コードの表示と実行を行なっています
- 現状，HatとJSで実行ファイルを分けていますが，まとめて表示・実行することも可能です


#　変更箇所（2022/10/21)
- `index.js`を`assets/js/blockly_***.js`に変更
- `block_def/javascript_function.js`を作成し，サンプルブロックを作成
- ブロックエリアとコードエリアのスタイル変更（動作に変わりはありません）