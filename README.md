## はじめに
React x LaravelのSPAを作成する。
Windows(WSL2)/macOS(M1)/Linuxに対応.

## 使用方法

### Laravel環境構築
1. https://github.com/ucan-lab/docker-laravel/generateをクローンする 
2. ディレクトリを変更し、以下のコマンドを実行


```bash
$ make create-project # 最新のLaravelでインストール
$ make install-recommend-packages # オプション
```
3. マイグレーションファイルの実行

```bash
$ docker compose exec app php artisan migrate:fresh --seed
```

4. 以下にアクセスしてLaravelの画面が出たら成功<br>
http://localhost

### 補足：DBのクライアント利用の場合
[TablePlus](https://tableplus.com/)を利用して以下の情報で接続する

MYSQL <br>
Host: 127.0.0.1 <br>
Password:secret <br>
Port: 3306 <br>
User: phper <br>
Database: laravel <br>

### Reactの導入
1. npm を使用できるようにする（入っている人は不要）
```bash
$ npm install
```
2. UIパッケージを導入する
```bash
$ docker-compose exec app composer require laravel/ui
```
３. React.js導入
```bash
$ docker-compose exec app php artisan ui react --auth
```

４. src ディレクトリに移動し、ビルド
```bash
$ npm run dev
```

### Reactの環境構築
1. View以下をシングルページとするため以下を削除

- auth以下
- layouts
  - app.blade.phpをviews直下に移動させlayoutsディレクトリ自体を削除
- home.blade.php
- welcome.blade.php

2. app.blade.phpのid="app"の中身を空にする

３. resources/js/components/Example.jsの２０行目以降にあるgetElementByIdのIDをappに変更

4. web.phpの１６行目以降をすべて削除し、以下を追記する

```
Route::get('{any}', function () {
    return view('app');
})->where('any','.*');
```

5. ビルドする
```bash
$ npm run dev
```

### Chakra UI の導入

１. ChakraUIのインストールをする
```bash
$ npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
$ yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

２.Chakra UIを以下の形式に従って使用

```
import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <TheRestOfYourApplication />
    </ChakraProvider>
  )
}
```
３. ビルドする
```bash
$ npm run dev
```

## コンテナの構成

```bash
├── app
├── web
└── db
```
### appコンテナ

- Base image
  - [php](https://hub.docker.com/_/php):8.1-fpm-bullseye
  - [composer](https://hub.docker.com/_/composer):2.2

### webコンテナ

- Base image
  - [nginx](https://hub.docker.com/_/nginx):1.22

### dbコンテナ

- Base image
  - [mysql/mysql-server](https://hub.docker.com/r/mysql/mysql-server):8.0

### mailhogコンテナ

- Base image
  - [mailhog/mailhog](https://hub.docker.com/r/mailhog/mailhog)
  
## 参考ファイル
- Read this [Makefile](https://github.com/ucan-lab/docker-laravel/blob/main/Makefile).
- Read this [Wiki](https://github.com/ucan-lab/docker-laravel/wiki).
