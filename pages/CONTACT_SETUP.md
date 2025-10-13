# お問い合わせフォーム設定手順

お問い合わせフォームを機能させるために、Google Apps Scriptの設定が必要です。

## 手順1: Googleスプレッドシートの作成

1. [Google Sheets](https://sheets.google.com) にアクセス
2. 新しいスプレッドシートを作成
3. 1行目に以下のヘッダーを入力：
   ```
   A1: タイムスタンプ
   B1: お名前
   C1: メールアドレス
   D1: ご相談内容
   E1: お問い合わせ内容
   ```

## 手順2: Apps Scriptの作成

1. スプレッドシート上部メニューから「拡張機能」→「Apps Script」を選択
2. 表示されたエディタで、既存のコードを削除
3. 以下のコードを貼り付け：

```javascript
function doPost(e) {
  try {
    // スプレッドシートを取得
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // POSTデータをパース
    var data = JSON.parse(e.postData.contents);

    // スプレッドシートに行を追加
    sheet.appendRow([
      new Date(),           // タイムスタンプ
      data.name,            // お名前
      data.email,           // メールアドレス
      data.subject,         // ご相談内容
      data.message          // お問い合わせ内容
    ]);

    // メール通知
    MailApp.sendEmail({
      to: "isa130pull@gmail.com",  // あなたのメールアドレス
      subject: "【お問い合わせ】" + data.subject,
      body: "新しいお問い合わせがありました。\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "お名前: " + data.name + "\n" +
            "メールアドレス: " + data.email + "\n" +
            "ご相談内容: " + data.subject + "\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            data.message + "\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "スプレッドシートで確認:\n" +
            SpreadsheetApp.getActiveSpreadsheet().getUrl()
    });

    // 送信者への確認メール（オプション）
    MailApp.sendEmail({
      to: data.email,
      subject: "お問い合わせを受け付けました - かわぐち（isa130pull）",
      body: data.name + " 様\n\n" +
            "お問い合わせいただきありがとうございます。\n" +
            "以下の内容で受け付けいたしました。\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "ご相談内容: " + data.subject + "\n" +
            "お問い合わせ内容:\n" +
            data.message + "\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +
            "通常2営業日以内にご返信いたします。\n" +
            "しばらくお待ちください。\n\n" +
            "━━━━━━━━━━━━━━━━━━━━\n" +
            "かわぐち（isa130pull）\n" +
            "https://isa130pull.github.io/portrait-site/"
    });

    // CORS対応の成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "お問い合わせを受け付けました"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // CORS対応のエラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用関数
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: "テスト太郎",
        email: "test@example.com",
        subject: "テスト",
        message: "これはテストメッセージです。"
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. **重要**: 44行目のメールアドレスを自分のアドレスに変更
5. 上部の「保存」アイコンをクリック
6. プロジェクト名を「お問い合わせフォーム」などに変更

### 注意事項

このコードは**CORS対応版**です。以下の機能が含まれています：
- ✅ 正確な成功/失敗判定
- ✅ エラーメッセージの取得
- ✅ 送信者への確認メール（オプション、58-75行目）

送信者への確認メールが不要な場合は、58-75行目を削除してください。

## 手順3: デプロイ

### 初めて設定する場合

1. 右上の「デプロイ」→「新しいデプロイ」をクリック
2. 「種類の選択」→「ウェブアプリ」を選択
3. 以下のように設定：
   - **説明**: お問い合わせフォーム（任意）
   - **実行ユーザー**: 自分
   - **アクセスできるユーザー**: 全員
4. 「デプロイ」をクリック
5. 権限の承認を求められたら：
   - 「アクセスを承認」をクリック
   - Googleアカウントを選択
   - 「詳細」→「（安全ではないページ）に移動」をクリック
   - 「許可」をクリック
6. **ウェブアプリのURL**をコピー（`https://script.google.com/macros/s/xxxxx/exec` の形式）

### 既に設定済みで、コードを更新する場合

**重要**: Apps Scriptのコードを変更した場合は、必ず再デプロイが必要です。

1. Apps Scriptエディタで右上の「デプロイ」→「デプロイを管理」をクリック
2. 既存のデプロイの右側の「編集」アイコン（鉛筆マーク）をクリック
3. 「バージョン」→「新バージョン」を選択
4. 「デプロイ」をクリック
5. URLは変わらないので、フォームの設定変更は不要

**注意**: 「新バージョン」として再デプロイしないと、変更が反映されません。

## 手順4: フォームにURLを設定

1. `pages/contact.html` を開く
2. 60行目付近の以下の行を探す：
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` を、手順3でコピーしたURLに置き換え：
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxx.../exec';
   ```
4. ファイルを保存

## 手順5: 動作テスト

1. ブラウザで `pages/contact.html` を開く
2. フォームに以下のテストデータを入力：
   - お名前: テスト太郎
   - メールアドレス: test@example.com
   - ご相談内容: その他
   - お問い合わせ内容: テストメッセージです
3. 「送信する」をクリック
4. 「お問い合わせを送信しました」というメッセージが表示されることを確認
5. Googleスプレッドシートに新しい行が追加されていることを確認
6. メールが届いていることを確認

## トラブルシューティング

### フォーム送信後、「送信に失敗しました」と表示される

**原因1**: Apps ScriptのURLが正しく設定されていない
**解決策**:
- `pages/contact.html` の175行目の `SCRIPT_URL` を確認
- URLの末尾が `/exec` になっているか確認

**原因2**: Apps Scriptが正しくデプロイされていない
**解決策**:
- Apps Scriptエディタで「デプロイ」→「デプロイを管理」を確認
- アクティブなデプロイが存在するか確認
- コードを変更した場合は「新バージョン」として再デプロイ

**原因3**: Apps Scriptの権限が承認されていない
**解決策**:
- デプロイ時の権限承認を再度実行
- 「詳細」→「（安全ではないページ）に移動」をクリック

### スプレッドシートにデータが保存されない

**原因**: Apps Scriptのコードにエラーがある
**解決策**:
- Apps Scriptエディタで「実行」→「testDoPost」を選択
- 実行ログを確認してエラーメッセージを確認
- スプレッドシートのヘッダー行（A1:E1）が正しいか確認

### メール通知が届かない

**原因**: Gmailの送信制限または権限不足
**解決策**:
- Apps Scriptで「MailApp」の権限が承認されているか確認
- Gmail のスパムフォルダを確認
- 送信先メールアドレスが正しいか確認（44行目）

### 送信者への確認メールが届かない

**原因**: 確認メール機能が有効になっていない、または送信先アドレスが間違っている
**解決策**:
- Apps Scriptの58-75行目が存在するか確認
- フォームで入力したメールアドレスが正しいか確認
- 迷惑メールフォルダを確認

### 「送信中...」のまま固まる

**原因**: ネットワーク接続の問題、またはApps ScriptのURLが無効
**解決策**:
- インターネット接続を確認
- ブラウザのコンソール（F12）でエラーメッセージを確認
- Apps ScriptのURLが有効か確認（ブラウザで直接アクセスしてみる）

## セキュリティ対策（推奨）

### スパム対策を追加する場合

Apps Script側で簡易的なスパム対策を追加できます：

```javascript
// doPost関数内の最初に追加
// ハニーポット（botチェック）
if (data.honeypot) {
  return ContentService.createTextOutput(
    JSON.stringify({success: false, error: "Invalid submission"})
  ).setMimeType(ContentService.MimeType.JSON);
}

// レート制限（同じメールアドレスから短時間に複数送信を防ぐ）
var recentSubmissions = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();
var oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
for (var i = 0; i < recentSubmissions.length; i++) {
  if (recentSubmissions[i][0] === data.email) {
    var timestamp = sheet.getRange(i + 2, 1).getValue();
    if (timestamp > oneHourAgo) {
      return ContentService.createTextOutput(
        JSON.stringify({success: false, error: "Too many requests"})
      ).setMimeType(ContentService.MimeType.JSON);
    }
  }
}
```

## 完了！

これで、お問い合わせフォームが完全に機能します。

問い合わせがあると：
1. Googleスプレッドシートに自動保存
2. 指定したメールアドレスに通知
3. ユーザーに送信完了メッセージを表示

となります。
