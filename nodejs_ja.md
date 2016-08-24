# CLIアプリケーション作成方法 (Node.js)

codecheckチャレンジの解答をCLIアプリケーションとして作成する方法を教えるよ。

## 必須条件

- Node.js（バージョンについては[ドキュ](https://code-check.github.io/docs/ja/reference_users/#serverside-language-and-tool-versions)を見てね。)
- Minimist (コマンドラインの引数処理用のユーティリティ。詳しくは[レポ](https://github.com/substack/minimist)をチェック。  
  *package.jsonに含まれているので自分で追加する必要なし。*)

## 引数の取得

[app/main.js](app/main.js)に`main`という関数が定義されてる。  
この関数を編集することでCLIアプリケーションが作成できるぞ。

``` js
function main(args, options) {
  args.forEach(arg => {
    // 以下の行を自分のコードと置換してね。
    result = arg;
```

コマンドラインの通常引数は`args`に配列として渡される。  

で、引数`options`にはオプション引数がオブジェクトとして渡される。
オプション引数とは「-」付きのプレフィクスを指定して渡された引数のことね。

## コマンド実行結果の標準出力への出力
`stdout`への出力は標準の`console.log()`メソッドを使用してね。

``` js
  console.log(result);
```
