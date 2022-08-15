# 環境構築
1. Githubのリポジトリからソースファイルをクローン
```
$ git clone git@github.com:KazumaOmura/blockly-hat.git
```

2. Dockerコンテナを起動
```
$ docker-compose up -d
```

3. アクセス
http://localhost:7777/


ポート番号が競合している場合は [docker-compose.yml](/docker-compose.yml) 5行目のportsを使用していないボート番号に書き換え，2のコマンドを実行しアクセス