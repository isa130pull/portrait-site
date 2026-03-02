# かわぐち（isa130pull）ポートレートサイト

Unityゲームエンジニアのポートフォリオサイト

## 公開URL

**https://isa130pull.github.io/portrait-site/**

## 関連リポジトリ

| リポジトリ | 用途 |
|---|---|
| [portrait-site](https://github.com/isa130pull/portrait-site)（本リポジトリ） | サイト本体。`isa130pull.github.io/portrait-site/` に配信 |
| [isa130pull.github.io](https://github.com/isa130pull/isa130pull.github.io) | ドメインルート用。`app-ads.txt` を `isa130pull.github.io/app-ads.txt` として配信 |

> **app-ads.txt について**: IAB仕様上、`app-ads.txt` はドメインのルート直下（`isa130pull.github.io/app-ads.txt`）に配置する必要があります。
> そのため `isa130pull.github.io` リポジトリにも同じ内容の `app-ads.txt` を配置しています。
> 本リポジトリの `app-ads.txt` を更新した場合は、`isa130pull.github.io` リポジトリ側も手動で同期してください。

## サイト構成

```
portrait-site/
├── index.html                  # トップページ
├── app-ads.txt                 # 広告認定デジタル販売者リスト
├── sitemap.xml                 # サイトマップ
├── robots.txt                  # クローラー制御
├── googleda59c630c2949c04.html # Google Search Console 認証
├── pages/
│   ├── contact.html            # お問い合わせフォーム
│   ├── privacy.html            # プライバシーポリシー
│   ├── bingo.html              # ビンゴゲーム
│   ├── x-search.html           # X検索ツール
│   ├── pong/                   # ポンゲーム
│   │   ├── index.html          # ゲーム本体
│   │   ├── ranking.html        # ランキング
│   │   ├── index.js            # ゲームロジック
│   │   ├── index.css           # スタイル
│   │   ├── playfab-manager.js  # PlayFab連携
│   │   └── *.mp3               # 効果音
│   └── CONTACT_SETUP.md        # フォーム設定手順
├── images/
│   ├── profile@1x.jpg          # プロフィール写真
│   ├── index/                  # トップページ用アイコン
│   └── bingo/                  # ビンゴ用アイコン
└── README.md
```

## ページ構成

### トップページ（index.html）

- ヘッダー: ナビゲーション（プロフィール、実績、お問い合わせ）
- ヒーロー: 名前、専門分野、プロフィール写真
- プロフィール: 経歴、専門領域、拠点情報
- 略歴: 2012年〜2024年のキャリアサマリー
- 実績/プロジェクト: breaker、Vタビ、Velle（YouTube動画埋め込み）
- 自作アプリ: いえばく、すしばく、AI美少女1/100、QR美少女1/100
- メディア/執筆: App Marketing Labo、Qiita
- 問い合わせ: SNSリンク、お問い合わせフォームへの導線
- フッター: コピーライト、プライバシーポリシーリンク

### お問い合わせフォーム（pages/contact.html）

- Google Apps Script連携のカスタムフォーム
- 入力項目: お名前、メールアドレス、ご相談内容（選択式）、お問い合わせ内容
- 送信後: Googleスプレッドシートに自動保存 + メール通知

### プライバシーポリシー（pages/privacy.html）

- App Store/Google Play審査対応
- 情報収集、利用目的、第三者サービス、安全管理など

### ビンゴゲーム（pages/bingo.html）

- ブラウザで遊べるビンゴゲーム
- PWA対応（専用favicon・アイコン）

### X検索ツール（pages/x-search.html）

- X (Twitter) の検索補助ツール

### ポンゲーム（pages/pong/）

- ブラウザで遊べるポンゲーム
- PlayFab連携のオンラインランキング
- 効果音付き

## 主な機能

- ビルド不要: HTML + CSS + JS のシンプル構成
- レスポンシブデザイン: モバイル・タブレット・デスクトップ対応
- ダーク/ライトモード: システム設定に自動対応
- SEO最適化: 構造化データ（JSON-LD）、OGP、sitemap.xml、robots.txt
- YouTube動画埋め込み: 実績紹介に動画を活用
- お問い合わせフォーム: Google Apps Script連携
- 広告マネタイゼーション: app-ads.txt による広告認定

## セットアップ手順

### 1. お問い合わせフォームの設定

詳細は [`pages/CONTACT_SETUP.md`](pages/CONTACT_SETUP.md) を参照。

1. Googleスプレッドシート作成
2. Apps Scriptでウェブアプリをデプロイ
3. `pages/contact.html` の `SCRIPT_URL` を更新

### 2. GitHub Pagesの有効化

1. リポジトリ設定 → Pages
2. Source を `main` ブランチに設定
3. Save をクリック

数分後、`https://isa130pull.github.io/portrait-site/` でサイトが公開されます。

### 3. app-ads.txt の更新

1. 本リポジトリの `app-ads.txt` を編集
2. `isa130pull.github.io` リポジトリの `app-ads.txt` にも同じ内容をコピー
3. 両方のリポジトリにプッシュ

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Apps Script（フォーム送信）
- PlayFab（ランキング）
- GitHub Pages（ホスティング）

## 更新履歴

- 2026-03-02: app-ads.txt 大幅更新（648エントリ）
- 2025-11-12: isa130pull.github.io リポジトリ作成（app-ads.txt ドメインルート配信用）
- 2025-10-13: 初版作成
  - トップページ、お問い合わせフォーム、プライバシーポリシー、SEO対策

## 問い合わせ

お仕事のご相談: [お問い合わせフォーム](https://isa130pull.github.io/portrait-site/pages/contact.html)

- X (Twitter): [@isa130pull](https://x.com/isa130pull)
- GitHub: [isa130pull](https://github.com/isa130pull)
- Qiita: [isa130pull](https://qiita.com/isa130pull)

## ライセンス

© 2025-2026 かわぐち (isa130pull)
