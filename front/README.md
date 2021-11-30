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
root $ git clone https://github.com/namikawa07/front_template.git
```


# Herokuにデプロイ準備

## heroku login and create
```
front $ heroku login
```

```
front $ heroku login
front $ heroku create <アプリ名> --remote staging
front $ heroku create <アプリ名> --remote prod
```

## heroku.ymlの変更
```
build:
  docker:
    web: Dockerfile
  config:
    WORKDIR: app
    API_URL: <RailsアプリのURL>
    # 例) API_URL: https://my-app.herokuapp.com
run:
  web: yarn run start
```
API_URLを今回のurlに変更する


## herokuのstackをコンテナに変更
```
front $ heroku stack:set container

# エラーが出た場合
 ›   Error: Missing required flag:
 ›     -a, --app APP  app to run command against
 ›   See more help with --help

# HerokuのGitURLを調べる
front $ heroku info -a <アプリ名>

# このURLをコピー
Git URL:        https://git.heroku.com/<Herokuのアプリ名>.git

# Git remoteに追加する
front $ git remote add heroku https://git.heroku.com/<Herokuのアプリ名>.git

front $ git remote -v

# 成功
heroku	https://git.heroku.com/<Herokuのアプリ名>.git (fetch)
heroku	https://git.heroku.com/<Herokuのアプリ名>.git (push)
```

# RailsにAPIドメインをセットする
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


