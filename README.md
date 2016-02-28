# markcat

markcat は Electron で作成した Markdown Viewer です。

## 機能的な特徴

* **Intellij IDEA の Darula 風の表示テーマも用意**
* 表示テーマの変更も可能
* Github Flavored Markdown
* コードハイライト表示
* 編集時の自動更新
* ドラッグ＆ドロップからの Markdown 表示
* (Windows) SendTo に配置することにより、エクスプローラーの「送る」からの Markdown 表示
* (Windows)ファイル関連付けを行うと、ダブルクリックからの Markdown 表示
* (Mac)このアプリケーションで開く からの起動。
* (Mac)ファイル拡張子で関連付けを行うと、ダブルクリックからの Markdown 表示

## 開発としての特徴

* Typescript + gulp + react + electron と今風の技術を利用しています。
* 実装はそれなりにシンプルなので学習にも最適
* とはいえ Markdown としての基本機能に追加して上記のこだわり機能を実装しています。

## 開発動機

Markdown は普段は Atom などのエディタを利用して作成しています。  
Markdown を見る時も同じく Atom を利用したり、Chrome の拡張機能を利用して表示したりしていたのですが、md ファイルをダブルクリックしたり、エクスプローラーのコンテキストメニューからサクッと見ることができないかと考えていました。  
そんな時 WEB+DB Press の React の記事の中で marked という markdown parser が紹介されていたのをきっかけに、また [rhysd/Shiba](https://github.com/rhysd/Shiba) を拝見して、自分用の Markdown Viewer を作ってみたいと思いました。

## 利用方法

#### インストール

GitHub の [Release](https://github.com/ma-tu/markcat/releases) にコンパイル済みのファイルを配置しているので、環境に合わせた zip ファイルをダウンロードして、適当なフォルダに解凍後 markcat を実行するだけです。

[送る] を利用するための設定や、ファイル関連付けを変更する方法は以下を参照します。

* [[Win10] 送るメニューを編集して追加や削除を行う](http://gadget.xinroom.net/win10-edit-sendto/)
* [Windows 10でファイルとアプリの関連付けを変更する](https://dekiru.net/article/12837/)
* [Macでファイルの拡張子の関連付けを変更して開くソフトを変更する方法](http://inforati.jp/apple/mac-tips-techniques/system-hints/how-to-change-the-default-application-of-a-specific-file-in-macos.html)

#### アンインストール

上記のフォルダを削除するだけです。ファイルの関連付けを行っている場合はファイルの関連付けの削除だけ行う必要があります。

#### Darcula風テーマの利用方法

MarkCat 起動後メニューバーの [Thema] から [Dark]を選択します。
元に戻す場合は [Thema] から [Normal]を選択します。

## Build手順 for Developer

* 準備：最初一回だけ以下実行します
```
git clone https://github.com/ma-tu/markcat.git
cd markcat
npm install
npm run init
```

* Wait モードで実行
```
npm run serve
```

* Windows でビルド
```
npm run build:win
```

* Mac でビルド
```
npm run build:mac
```

## Thanks

* 開発のキッカケおよびかなり参考にしました => [rhysd/Shiba](https://github.com/rhysd/Shiba)
* gulpの設定および、開発時の自動再読み込み機能(electron-connect) => [ぼくのかんがえたさいきょうのElectron](http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d)
* Electron や React について困ったことの多くを解決頂きました。 => [アカベコマイリ](http://akabeko.me/blog/)

## License

MIT License
