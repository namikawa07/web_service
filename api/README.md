# web_template
## Docker Start

```
$ docker-compose build
$ docker-compose up
```

docker-compose up できない時
```
rm tmp/pids/server.pid
```

# 環境設定の作成手順
## serverとfront

Repository templateを使ってリポジトリを作成

```
root $ git clone https://github.com/namikawa07/api_template.git
```

```
root $ mkdir api_sub
```

### railsを新しく作成
```
$ docker-compose run --rm api_sub rails new . -f -B -d postgresql --api
```
Master.key以外を消してmaster.keyをapi/config内に入れる(master.keyだけ欲しい)

### Gitへpushする
```
$ git add -A
$ git commit -m .
$ git push
```

# Herokuにデプロイ準備

```
api $ heroku login
api $ heroku create <アプリ名> --remote staging
api $ heroku create <アプリ名> --remote prod
```
サービス名はURLとかでも表示されるのでgithubで使ってる名前が良い
※アンダーバー使えないので注意！


もし名前を間違った時
```
api $ heroku apps:destroy --app アプリ名
```
これでheroku上のアプリは削除されるので初めから作る


作成できたら
```
api $ git config --list
```
で確認
staging環境とprod環境のherokuのgitができている


## Heroku上で環境変数をセットする(stagingとprod)
```
api $ heroku config:set RACK_ENV=production RAILS_ENV=production RAILS_LOG_TO_STDOUT=enabled RAILS_SERVE_STATIC_FILES=enabled

# 環境変数できてるか確認
api $ heroku config -a <アプリ名>
```

## herokuのstackをコンテナに変更
```
api $ heroku stack:set container -a <アプリ名>

#コンテナに変更されているか確認
api $ heroku stack
```

## serverデプロイ
```
# staging
api $ git push staging master

# prod
api $ git push prod master
```


`ArgumentError: Missing 'secret_key_base' for 'production' environment, set this string with 'rails credentials:edit'`
のエラーがまだ出ている状態


## herokuBD設定
```
api $ heroku addons:create heroku-postgresql:hobby-dev -a <アプリ名>

# 確認
api $ heroku addons

# DB初期化
api $ heroku run rails db:migrate -a <アプリ名>
```

## herokuにマスターキーを追加
```
api $ heroku config:set RAILS_MASTER_KEY=`cat config/master.key` -a <アプリ名>
```

## 再度DBの初期化を行う

```
api $ heroku run rails db:migrate -a <アプリ名>
```

## herokuタイムゾーンの確認
```
#Herokuアプリに入る
api $ heroku run sh -a <アプリ名>

~$ date

#JSTになっていれば日本時間
Fri Jun  5 09:17:55 JST 2020

#抜ける
~$ exit
```

## Heroku PostgreSQLのタイムゾーンの確認
```
api $ heroku pg:info -a <アプリ名>

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

## Herokuアプリの確認
```
api $ heroku open -a <アプリ名>
```
トップページは「ページが見つかりません」になるので「/api/v1/hello」にアクセスする
helloが表示されていれば成功


# RailsにAPIドメインをセットする
`nuxtをherokuでデプロイしてから行う`

railsとnuxtをつなげる

```
api $ heroku config:set API_DOMAIN=<Nuxt.jsアプリのドメイン>

# 例) heroku config:set API_DOMAIN=my-app.herokuapp.com

#確認
api $ heroku config

API_DOMAIN:               <Nuxt.jsアプリのドメイン>
DATABASE_URL:             <databaseのURL>
RACK_ENV:                 production
RAILS_ENV:                production
RAILS_LOG_TO_STDOUT:      enabled
RAILS_MASTER_KEY:         <マスターキー>
RAILS_SERVE_STATIC_FILES: enabled
```


