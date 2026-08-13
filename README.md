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
├── en/                         # 英語版（トップ、ケーススタディ、問い合わせ、アプリ特設ページ）
├── apps/
│   ├── hitokoma/               # ヒトコマ マーケティングページ
│   ├── iebaku/                 # いえばく! マーケティングページ
│   ├── sushibaku/              # すしばく! マーケティングページ
│   ├── ai-girl/                # AI美少女1/100 マーケティングページ
│   └── loridama/               # ろりだま マーケティングページ
├── app-ads.txt                 # 広告認定デジタル販売者リスト
├── sitemap.xml                 # サイトマップ
├── robots.txt                  # クローラー制御
├── googleda59c630c2949c04.html # Google Search Console 認証
├── pages/
│   ├── contact.html            # お問い合わせフォーム
│   ├── privacy.html            # プライバシーポリシー
│   ├── case-study-breaker.html # breaker ケーススタディ
│   ├── bingo.html              # セトリビンゴ（日本語版）
│   ├── x-search.html           # X検索ツール
│   ├── idol-pv-player.html     # 地下アイドルPVプレーヤー
│   ├── concheki-*.html         # コンチェキ法務文書
│   ├── dorapiku-privacy.html   # ヒトコマ プライバシーポリシー（旧名称のURLを維持）
│   ├── pong/                   # ポンゲーム
│   │   ├── index.html          # ゲーム本体
│   │   ├── ranking.html        # ランキング
│   │   ├── index.js            # ゲームロジック
│   │   ├── index.css           # スタイル
│   │   ├── playfab-manager.js  # PlayFab連携
│   │   └── *.mp3               # 効果音
│   └── CONTACT_SETUP.md        # フォーム設定手順
├── styles/
│   ├── editorial.css           # トップページ用スタイル
│   ├── case-study.css          # ケーススタディ用スタイル
│   ├── hitokoma.css            # ヒトコマ用スタイル
│   ├── game-app.css            # カジュアルゲーム紹介ページ共通スタイル
│   ├── language-switcher.css    # 言語切り替え共通スタイル
│   ├── app-language.css         # アプリ英語版・言語切り替え補助スタイル
│   └── app-shell.css           # ブラウザアプリ共通スタイル
├── scripts/
│   ├── app-marketing.js        # アプリ紹介ページ用ストア導線計測
│   └── language-preference.js  # トップ由来の言語設定をアプリページへ継承
├── sw.js                       # トップページ用Service Worker
├── images/
│   ├── profile@1x.jpg          # プロフィール写真
│   ├── hitokoma/               # ヒトコマ用スクリーンショット・OGP
│   ├── iebaku/                 # いえばく!用アイコン・スクリーンショット
│   ├── sushibaku/              # すしばく!用アイコン・スクリーンショット
│   ├── ai-girl/                # AI美少女1/100用アイコン・スクリーンショット
│   ├── loridama/               # ろりだま用アイコン・スクリーンショット
│   ├── store-badges/           # Apple・Google公式ストアバッジ
│   ├── index/                  # トップページ用アイコン
│   └── bingo/                  # ビンゴ用アイコン
└── README.md
```

## ページ構成

### トップページ（index.html）

- ヘッダー: ナビゲーション（実績、対応領域、プロフィール、お問い合わせ）
- ヒーロー: 名前、専門分野、プロフィール写真、実績・問い合わせCTA
- 対応領域: Unityモバイル開発、ゲーム設計・マネタイズ、AI・対話型体験
- プロフィール: 経歴、専門領域、拠点情報
- 略歴: 2012年〜2024年のキャリアサマリー
- 実績/プロジェクト: breaker、Vタビ、Velle（YouTube動画埋め込み）
- 自作アプリ: ヒトコマ、いえばく、すしばく、AI美少女1/100、ろりだま
- メディア/執筆: App Marketing Labo、Qiita
- 問い合わせ: SNSリンク、お問い合わせフォームへの導線
- フッター: コピーライト、プライバシーポリシーリンク

### ケーススタディ（pages/case-study-breaker.html）

- 代表作「breaker:ブロック崩し」の企画・設計・開発内容
- 役割、開発期間、体制、技術、成果を整理
- 公開インタビュー、リリース記事への参照リンク

### ヒトコマ（apps/hitokoma/）

- 顔認識フォトスライドショー「ヒトコマ」の機能・安心設計を紹介
- App Storeへのインストール導線とクリック計測
- アプリ固有のOGP・SoftwareApplication構造化データ

### カジュアルゲーム紹介（apps/iebaku/・sushibaku/・ai-girl/・loridama/）

- いえばく!、すしばく!、AI美少女1/100、ろりだまの機能と遊び方を紹介
- App Store・Google Playへのインストール導線とクリック計測
- 各作品の世界観に合わせたレスポンシブデザイン
- アプリ固有のOGP・SoftwareApplication構造化データ

### お問い合わせフォーム（pages/contact.html）

- Google Apps Script連携のカスタムフォーム
- 入力項目: お名前、メールアドレス、ご相談内容（選択式）、お問い合わせ内容
- 送信後: Googleスプレッドシートに自動保存 + メール通知

### プライバシーポリシー（pages/privacy.html）

- App Store/Google Play審査対応
- 情報収集、利用目的、第三者サービス、安全管理など

### ビンゴゲーム（pages/bingo.html）

- 3×3・5×5のビンゴカードを作成・共有できる日本語版Webツール
- 中央FREEマス、ビンゴ成立の自動判定、画像保存、リンク共有に対応
- 専用favicon・ホーム画面用アイコン

### Setlist Bingo（en/pages/bingo.html）

- セトリビンゴの英語版
- 日本語 / English切り替え、選択言語の自動継承、共有カードを保った言語切り替えに対応

### X検索ツール（pages/x-search.html）

- X (Twitter) の検索補助ツール

### 地下アイドルPVプレーヤー（pages/idol-pv-player.html）

- YouTube Data APIを利用したPV収集・連続再生ツール
- フェス出演者リストとキーワード検索に対応

### ポンゲーム（pages/pong/）

- ブラウザで遊べるポンゲーム
- PlayFab連携のオンラインランキング
- 効果音付き

## 主な機能

- ビルド不要: HTML + CSS + JS のシンプル構成
- レスポンシブデザイン: モバイル・タブレット・デスクトップ対応
- ダークテーマ: ポートフォリオ全体で統一
- SEO最適化: 構造化データ（JSON-LD）、OGP、sitemap.xml、robots.txt
- 日本語・英語対応: 言語別URL、手動言語切り替え、hreflang
- 言語設定の継承: トップページで選んだ言語をアプリ特設ページへ引き継ぎ
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

### 3. 公開手順

このサイトはローカルでファイルを変更しただけでは公開されません。GitHub Pages は `main` ブランチの内容を配信するため、Codexによる修正を含め、変更後は必ずコミットして `origin/main` へ push するところまでを完了条件とします。

1. 変更内容を確認する
2. 対象ファイルをステージングしてコミットする
3. `git push origin main` を実行する
4. 数分後に公開URLで反映を確認する

### 4. app-ads.txt の更新

1. 本リポジトリの `app-ads.txt` を編集
2. `isa130pull.github.io` リポジトリの `app-ads.txt` にも同じ内容をコピー
3. 両方のリポジトリにプッシュ

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Apps Script（フォーム送信）
- PlayFab（ランキング）
- GitHub Pages（ホスティング）

## 更新履歴

- 2026-08-13: セトリビンゴを多言語・多サイズ化
  - 3×3 / 5×5、中央FREEマス、ビンゴ自動判定、英語版、関連サービス導線を追加
- 2026-08-13: 英語版を追加
  - トップ、breakerケーススタディ、お問い合わせ、Mobile apps 5作品の特設ページを英語化
  - 日本語 / English切り替え、トップ由来の言語設定継承、hreflangを追加
- 2026-07-25: ポートフォリオ改善
  - ヒーローCTA、対応領域、breakerケーススタディを追加
  - セクション順序とキーボード操作を改善
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
