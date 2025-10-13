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

    // メール通知（オプション）
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

    // 成功レスポンス
    return ContentService.createTextOutput(
      JSON.stringify({success: true})
    ).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // エラーレスポンス
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
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

4. **重要**: 16行目のメールアドレスを自分のアドレスに変更
5. 上部の「保存」アイコンをクリック
6. プロジェクト名を「お問い合わせフォーム」などに変更

## 手順3: デプロイ

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

### フォーム送信後、エラーメッセージが表示される

**原因**: Apps ScriptのURLが正しく設定されていない
**解決策**:
- `pages/contact.html` の `SCRIPT_URL` を確認
- URLの末尾が `/exec` になっているか確認

### スプレッドシートにデータが保存されない

**原因**: Apps Scriptのコードにエラーがある
**解決策**:
- Apps Scriptエディタで「実行」→「testDoPost」を選択
- ログを確認してエラーメッセージを確認

### メール通知が届かない

**原因**: Gmailの送信制限または権限不足
**解決策**:
- Apps Scriptで「MailApp」の権限が承認されているか確認
- Gmail のスパムフォルダを確認

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
