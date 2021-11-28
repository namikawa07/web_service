# web_template
## Docker Start

#### ALL
```
$ docker-compose build
$ docker-compose up
```

#### api
```
$ docker-compose build api
$ docker-compose up api
```

#### front
```
$ docker-compose build front
$ docker-compose up front
```

docker-compose up できない時
```
rm tmp/pids/server.pid
```

# 環境設定の作成手順
Templateを使ってリポジトリを作成

Git clone

mkdir api_sub

root$ docker-compose run --rm api_sub rails new . -f -B -d postgresql --api
でrailsを作成
Master.key以外を消してmaster.keyをapi/config内に入れる

Git pushする

apiとfrontもそれぞれgithubにgit pushする

（master.keyだけ変えてちゃん動くのか？・nuxtはgit cloneで動くのか？）

Herokuにデプロイする

[apiの中]
```
Api $ heroku login
$ heroku create <アプリ名> --remote staging
$ heroku create <アプリ名> --remote prod
```
サービス名はURLとかでも表示されるのでgithubで使ってる名前が良い
※アンダーバー使えないので注意！

もし名前を間違った時
```$ heroku apps:destroy --app アプリ名
```
これでheroku上のアプリは削除されるので初めから作る

作成できたら
```$ git config --list
```で確認
staging環境とprod環境のherokuのgitができている

Heroku上で環境変数をセットする(stagingとprod)
```$ heroku config:set RACK_ENV=production RAILS_ENV=production RAILS_LOG_TO_STDOUT=enabled RAILS_SERVE_STATIC_FILES=enabled

# 環境変数できてるか確認
$ heroku config -a <アプリ名>
```
herokuのstackをコンテナに変更
```
api $ heroku stack:set container -a <アプリ名>
```

コンテナに変更されているか確認
```
api $ heroku stack
```

## デプロイ
```
# staging
api $ git push staging master

# prod
api $ git push prod master
```

`ArgumentError: Missing `secret_key_base` for 'production' environment, set this string with `rails credentials:edit``
のエラーがまだ出ている状態

herokuBD設定
```
api $ heroku addons:create heroku-postgresql:hobby-dev -a <アプリ名>

# 確認
api $ heroku addons

# DB初期化
api $ heroku run rails db:migrate -a <アプリ名>
```

herokuにマスターキーを追加
```
api $ heroku config:set RAILS_MASTER_KEY=`cat config/master.key` -a <アプリ名>

#再度DBの初期化を行う

```
heroku run rails db:migrate -a <アプリ名>
```

herokuタイムゾーンの確認
```
#Herokuアプリに入る
api $ heroku run sh -a <アプリ名>

~$ date

#JSTになっていれば日本時間
Fri Jun  5 09:17:55 JST 2020

#抜ける
~$ exit
```

Heroku PostgreSQLのタイムゾーンの確認
```
api $ heroku pg:info -a <アプリ名>

...
#名前
Add-on: postgresql-dimensional-xxxxx

#postgreSQLに入る
api $ heroku pg:psql <PostgreSQLの名前>

#例) heroku pg:psql postgresql-dimensional-xxxxx

#タイムゾーン確認
:DATABASE=> show timezone;

#OK
TimeZone
----------
 Etc/UTC
(1 row)

#抜ける(\はoptionを押しながら￥マーク)
:DATABASE=> \q
```

Herokuアプリの確認
```
api $ heroku open
```
トップページは「ページが見つかりません」になると思うので「/api/v1/hello」にアクセスする
helloが表示されていれば成功
