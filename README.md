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
├── en/                         # 英語版（トップ、ケーススタディ、問い合わせ、アプリ特設・ブラウザアプリ）
├── apps/
│   ├── hitokoma/               # ヒトコマ マーケティングページ
│   ├── iebaku/                 # いえばく! マーケティングページ
│   ├── sushibaku/              # すしばく! マーケティングページ
│   ├── ai-girl/                # AI美少女1/100 マーケティングページ
│   ├── loridama/               # ろりだま マーケティングページ
│   └── concheki/               # コンチェキ マーケティングページ
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
│   ├── app-experience.css       # アプリ紹介ページの無料Web体験用スタイル
│   ├── app-language.css         # アプリ英語版・言語切り替え補助スタイル
│   ├── app-shell.css            # ブラウザアプリ共通スタイル
│   ├── bingo.css                # セトリビンゴ用スタイル
│   ├── pong-guide.css           # ポンゲームのガイド用スタイル
│   └── language-switcher.css    # 言語切り替え共通スタイル
├── scripts/
│   ├── app-experience.js        # アプリ紹介ページの無料Web体験
│   ├── app-marketing.js         # アプリ紹介ページ用ストア導線計測
│   ├── bingo.js                 # セトリビンゴの共通ロジック（日英）
│   ├── contact-form.js          # お問い合わせフォームの共通ロジック（日英）
│   └── language-preference.js   # トップ由来の言語設定を各ページへ継承
├── sw.js                        # トップページ用Service Worker
├── images/
│   ├── profile@1x.jpg          # プロフィール写真
│   ├── hitokoma/               # ヒトコマ用スクリーンショット・OGP
│   ├── iebaku/                 # いえばく!用アイコン・スクリーンショット
│   ├── sushibaku/              # すしばく!用アイコン・スクリーンショット
│   ├── ai-girl/                # AI美少女1/100用アイコン・スクリーンショット
│   ├── loridama/               # ろりだま用アイコン・スクリーンショット
│   ├── concheki/               # コンチェキ用アイコン・スクリーンショット・OGP
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
- 自作アプリ: コンチェキ、ヒトコマ、いえばく、すしばく、AI美少女1/100、ろりだま
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
- AI美少女1/100の5問ミニ診断、いえばく!・すしばく!の30秒Webチャレンジを日英で提供
- App Store・Google Playへのインストール導線とクリック計測
- 各作品の世界観に合わせたレスポンシブデザイン
- アプリ固有のOGP・SoftwareApplication構造化データ

### コンチェキ（apps/concheki/）

- コンカフェへの来店チェックイン、スタンプ・ポイント、キャストアバターガチャ、チェキ帳、ランキングを紹介
- App Store・Google Playへのインストール導線とクリック計測
- 日本語版・英語版、アプリ固有のOGP・SoftwareApplication構造化データを実装

### お問い合わせフォーム（pages/contact.html）

- Google Apps Script連携のカスタムフォーム
- 入力項目: お名前、メールアドレス、ご相談内容（選択式）、お問い合わせ内容
- 送信後: Googleスプレッドシートに自動保存 + メール通知

### プライバシーポリシー（pages/privacy.html）

- App Store/Google Play審査対応
- 情報収集、利用目的、第三者サービス、安全管理など

### ビンゴゲーム（pages/bingo.html）

- 3×3・5×5のビンゴカードを作成・共有できる日本語版Webツール
- セトリ予想・配信視聴・パーティー交流・学習復習の4テンプレートを収録
- 中央FREEマス、完成イメージ確認、ビンゴ成立の自動判定、画像保存、リンク共有に対応
- 入力項目を別順にした複数カードのA4印刷・PDF保存に対応
- 端末標準・モダンゴシック・手書きマーカー・極太インパクトの4書体を選択時のみ読み込み
- 端末と言語に合わせた関連サービスをランダム表示し、収益実績をもとに優先したアプリ3作品への静的導線を併設
- 専用favicon・ホーム画面用アイコン

### Setlist Bingo（en/pages/bingo.html）

- セトリビンゴの英語版
- 日本語 / English切り替え、選択言語の自動継承、共有カードを保った言語切り替えに対応

### X検索ツール（pages/x-search.html）

- X (Twitter) の検索補助ツール
- 英語版は `en/pages/x-search.html`。言語別URL、相互hreflang、言語切り替えに対応

### 地下アイドルPVプレーヤー（pages/idol-pv-player.html）

- YouTube Data APIを利用したPV収集・連続再生ツール
- フェス出演者リストとキーワード検索に対応
- 英語版は `en/pages/idol-pv-player.html`。設定、操作、ステータス表示を英語化

### ポンゲーム（pages/pong/）

- ブラウザで遊べるポンゲーム
- マウス・タッチ操作、NORMAL・HARDの2難易度、5点先取に対応
- PlayFab連携のオンラインランキング
- 効果音付き
- 日英の遊び方、操作方法、難易度、攻略のコツ、FAQを掲載
- 英語版は `en/pages/pong/`。ゲームUIと `en/pages/pong/ranking.html` のランキング表示を英語化

## 主な機能

- ビルド不要: HTML + CSS + JS のシンプル構成
- アクセス解析: GA4はGitHub Pagesの本番URLでのみ送信し、アプリストア・関連アプリ導線をイベント計測
- レスポンシブデザイン: モバイル・タブレット・デスクトップ対応
- ダークテーマ: ポートフォリオ全体で統一
- SEO最適化: 構造化データ（JSON-LD）、OGP、sitemap.xml、robots.txt
- 日本語・英語対応: 言語別URL、手動言語切り替え、hreflang
- 言語設定の継承: トップページで選んだ言語をアプリ特設ページへ引き継ぎ
- YouTube動画埋め込み: 実績紹介に動画を活用
- お問い合わせフォーム: Google Apps Script連携
- 広告マネタイゼーション: app-ads.txt による広告認定
- オフライン補助: Service Workerでトップページと同一オリジンの静的資産をキャッシュ

## セットアップ手順

### 1. お問い合わせフォームの設定

詳細は [`pages/CONTACT_SETUP.md`](pages/CONTACT_SETUP.md) を参照。

1. Googleスプレッドシート作成
2. Apps Scriptでウェブアプリをデプロイ
3. `scripts/contact-form.js` の `SCRIPT_URL` を更新

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

## 保守時の検証

変更後は次の順に確認します。フォームとランキングは、本番送信・本番データ更新を避けて非破壊で確認してください。

1. `git diff --check` で空白エラーを確認
2. `python3 -m http.server 8000` でリポジトリルートを配信
3. `http://localhost:8000/` から変更ページ、日英切り替え、画像、リンク、レスポンシブ表示を確認
4. ブラウザのコンソールにエラーがないことを確認
5. SEO変更時は canonical / OGP / JSON-LD / `sitemap.xml` のURLと更新日を確認

Service Workerのキャッシュ名は `portrait-site-` で始め、本サイト以外のキャッシュを削除しないようにします。旧版で使用した `portfolio-v3` だけは移行対象として明示的に削除します。

## 技術スタック

- HTML5 / CSS3 / Vanilla JS
- Google Apps Script（フォーム送信）
- PlayFab（ランキング）
- GitHub Pages（ホスティング）

## 更新履歴

- 2026-08-24: 保守構成とドキュメントを整理
  - 重複していたアプリアイコンをアプリ別フォルダへ統合
  - Service Workerの削除対象を本サイト所有のキャッシュへ限定
  - 問い合わせフォーム設定手順、構成表、検証手順を現行実装へ同期
- 2026-08-19: コンチェキのアプリ紹介ページを追加
  - 日英の特設ページ、トップページ導線、ストア導線、OGP、構造化データ、サイトマップを追加
- 2026-08-14: アプリ紹介ページに無料Web体験を追加
  - AI美少女1/100に5問の二択ミニ診断を追加
  - いえばく!・すしばく!に30秒タップチャレンジ、結果共有、ストア導線を追加
- 2026-08-14: POPONGの検索向けゲームガイドを追加
  - 実装どおり5点先取へ説明を統一し、日英の操作方法・難易度・攻略・FAQを追加
  - VideoGameとWebApplicationの複合構造化データへ更新
- 2026-08-14: セトリビンゴの用途別テンプレートと印刷機能を追加
  - 日英4種類のテンプレート、複数シャッフルカード生成、A4印刷・PDF保存に対応
  - 機能に合わせて検索説明、構造化データ、使い方を更新
- 2026-08-14: 検索流入からアプリへの送客導線と計測を改善
  - セトリビンゴに収益実績をもとに優先したアプリ3作品への静的リンクを追加
  - 関連アプリの表示・クリックとストア導線の計測項目を統一
  - GA4タグの読み込みをGitHub Pagesの本番URLに限定
- 2026-08-14: ブラウザアプリ3作品の英語版を追加
  - X検索、地下アイドルPVプレーヤー、POPONG（ゲーム・ランキング）を英語化
  - 言語別URL、相互hreflang、言語切り替え、サイトマップを追加
- 2026-08-13: セトリビンゴを多言語・多サイズ化
  - 3×3 / 5×5、中央FREEマス、完成イメージ確認、ビンゴ自動判定、英語版、関連サービス導線を追加
- 2026-08-13: 英語版を追加
  - トップ、breakerケーススタディ、お問い合わせ、当時公開済みのMobile apps 5作品の特設ページを英語化
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
