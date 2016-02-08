# markcat

markcat は Electron で作成した Markdown Viewer です。

## 特徴

* typescript(es6) + gulp + react + electron と今風の技術を利用しています。
* シンプルなので学習にも最適
* とはいえ Markdown としての基本機能に追加して以下のこだわり機能を実装しています。
* Windows Only

## Markdown Viewer としてのこだわり機能

* **Intellij IDEA の Darula 風の表示テーマを用意**
* 編集時の自動更新
* Github Flavored Markdown
* コードハイライト表示
* ドラッグ＆ドロップからの Markdown表示
* Windows の sendTo に配置することにより、エクスプローラーの「送る」からの Markdown表示
* Windows の ファイル関連付けを行うと、ダブルクリックからの Markdown表示

## Build方法

```
npm run build
```

## Thanks

* 開発のキッカケおよびかなり参考にしました => [rhysd/Shiba](https://github.com/rhysd/Shiba)
* gulpの設定および、開発時の自動再読み込み機能(electron-connect) => [ぼくのかんがえたさいきょうのElectron](http://qiita.com/Quramy/items/90d61ff37ca1b95a7f6d)
* Electron や React について困ったことの多くを解決頂きました。 => [アカベコマイリ](http://akabeko.me/blog/)

## License

MIT License
