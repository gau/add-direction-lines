# 方向線を追加 ReadMe #

選択したパスに、「方向線」、「方向点」、「アンカーポイント」をオブジェクトとして追加するIllustrator用スクリプトです。解説図などを作成するときに便利です。

-----

### 更新履歴 ###

* 0.5.0：新規作成

-----

### 対応バージョン ###

* Illustrator CS5／CS6／CC／CC2014

-----

### インストール方法 ###

1. 以下の場所に、「方向線を追加.jsx」をコピーします。Windows版ではお使いのIllustratorのモードによって保存する場所が異なりますのでご注意ください。
	* 【Mac】/Applications/Adobe Illustrator {バージョン}/Presets/ja_JP/スクリプト/
	* 【Win32】C:\Program Files\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
	* 【Win64】C:\Program Files\Adobe\Adobe Illustrator {バージョン} (64 Bit)\Presets\ja_JP\スクリプト\　または　C:\Program Files (x86)\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
2. Illustratorを再起動します。
3. `ファイル > スクリプト > 方向線を追加`と表示されていればインストール成功です。

-----

### 使い方 ###

1. 対象となるパス（またはアンカーポイント）を選択します。
2. `ファイル > スクリプト > 方向線を追加`を選択します。
3. ［方向線］［方向点］［アンカーポイント］のうち、追加したいものにチェックを入れます。
4. `実行`をクリックします。

-----

### 追加されたオブジェクトの名称 ###

追加される［方向線］［方向点］［アンカーポイント］は、種類に応じてオブジェクト名が設定されます。付属の「名前でオブジェクトを検索.jsx」を使って、対象のオブジェクトのみを選択可能です。

| オブジェクト | オブジェクト名 |
|:-----------|:------------|
| 方向線 | _added_direction_point_ |
| 方向点 | _added_direction_path_ |
| アンカーポイント | _added_direction_anchor_ |

-----

### 「名前でオブジェクトを検索.jsx」について ###

オブジェクトに設定された名称から、対象のオブジェクトを選択するスクリプトです。これを使うことで、「方向線を追加.jsx」で追加した要素のみを効率的に選択できます。

1. 「方向線を追加.jsx」と同じ手順でスクリプトをIllustratorに組み込んでおきます。
2. `ファイル > スクリプト > 名前でオブジェクトを検索`を選択します。
3. テキストフィールドに検索したいオブジェクトの名称を入力します。それぞれのオブジェクトの名称は、前項の表を参照してください。
4. `検索`をクリックします。
5. 文字列に合致する名称のオブジェクトが選択されます。

* ロックされたオブジェクト、非表示オブジェクト、グループは選択されません。
* ロックされたレイヤー、非表示レイヤー内のオブジェクトも選択されません。

-----

### 免責事項 ###

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* 一応CS5、CS6、CS6、CC、CC2014で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

-----

### ライセンス ###

* 方向線を追加.jsx／名前でオブジェクトを検索.jsx
* Copyright (c) 2015 Toshiyuki Takahashi
* Released under the MIT license
* [http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)