# portrait-site — Codex 作業規約

## 正本と構成

- 作業前に `README.md` を読む。サイト構成、公開先、関連リポジトリ、フォーム設定は同ファイルを正本とする。
- HTML / CSS / Vanilla JS の静的サイトで、ビルド工程はない。GitHub Pages のサブパス `/portrait-site/` で動く相対パスを維持する。

## ハード制約

- プロフィール、法務文書、問い合わせ先、広告情報を依頼なく書き換えない。
- `pages/contact.html` の Apps Script URL、PlayFab 設定、認証・外部サービス値をログや回答へ転載しない。
- `app-ads.txt` を変更した場合は、ルート配信用の `isa130pull.github.io` リポジトリにも同期が必要だと明示する。別リポジトリは明示的に作業範囲へ入った場合だけ変更する。
- Search Console 認証ファイル、`robots.txt`、`sitemap.xml`、既存 URL を削除・改名しない。

## 検証と完了条件

1. `git diff --check`
2. `python3 -m http.server 8000` 等でローカル配信し、対象ページをブラウザ確認
3. 変更したリンク、画像、レスポンシブ表示、コンソールエラーを確認
4. SEO 変更時は canonical / OGP / JSON-LD / sitemap の整合を確認
5. フォームやランキング変更は本番送信・本番データ変更を避け、可能な範囲で非破壊確認

- 自動テストがないため、未確認のブラウザ・外部連携は明示する。
