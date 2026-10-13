# ふたりのハワイ（Webしおり）

ハワイ新婚旅行（オアフ島・ワイキキ）のWebしおりです。
スマートフォンでの閲覧に最適化されたUI・動線で、旅行中に必要な情報を網羅しています。

## 構成

- `src/`：開発用ソースコード（非暗号化。ブラウザでそのまま開けます）
  - `index.html`：メイン画面
  - `styles.css`：スタイルシート（デザインB：リゾート・明るいポップ）
  - `data.js`：旅程・スポット情報・緊急連絡先などのデータ
  - `app.js`：画面制御・動線ロジック（時計・タブ切り替え・現在地判定・チェックリスト）
- `dist/`：配布・GitHub Pages用（パスワード暗号化済み・Service Workerオフライン対応）
  - `index.html`：暗号化された単一HTML
  - `sw.js`：オフライン用キャッシュ
  - `.nojekyll` / `robots.txt`
- `build.mjs`：暗号化ビルドスクリプト（AES-GCM / PBKDF2）

---

## ローカルでの確認方法

### 1. すぐに内容を確認したい場合（パスワードなし）
ブラウザで直接 `src/index.html` を開くか、ローカルサーバー経由でアクセスします。
- **ファイル直接**：Finderから `workspace/hawaii_planning/site/src/index.html` をダブルクリック
- **ローカルサーバー**：
  ```bash
  cd workspace/hawaii_planning/site
  python3 -m http.server 8765
  ```
  ブラウザで `http://localhost:8765/src/` を開く。

※ `?now=2026-10-14T10:20:00-10:00` のようにクエリパラメータをつけると、特定の日時の「いま/つぎ」表示をシミュレーションできます。

### 2. 暗号化版（パスワードゲート）を確認する場合
- 現在は仮パスワード `aloha` でビルドされています。
- ブラウザで `http://localhost:8765/dist/` または `dist/index.html` を直接開いてパスワードを入力してください。
- 一度認証するとブラウザのLocalStorageに復号鍵が保持され、再入力不要で開けます。

### 3. お好みのパスワードで再ビルドする場合
```bash
cd workspace/hawaii_planning/site
node build.mjs
# パスワード入力プロンプトが表示されます
```
または：
```bash
cd workspace/hawaii_planning/site
HAWAII_PASSWORD="あなたの好きな合言葉" node build.mjs
```

---

## GitHub Pagesへのデプロイ方法

### 方法 A: 専用ブランチ（gh-pages）に `dist` をプッシュする場合
1. リポジトリを初期化し、コミットします。
2. `dist` フォルダの中身を `gh-pages` ブランチにプッシュします。
   ```bash
   cd workspace/hawaii_planning
   git init
   git add .
   git commit -m "Initial commit for Hawaii honeymoon guide"
   # gh-pagesブランチへのデプロイ
   git subtree push --prefix site/dist origin gh-pages
   ```
3. GitHubのリポジトリ設定（Settings > Pages）で、Sourceを `gh-pages` / `/(root)` に設定します。

### 方法 B: 単一リポジトリでDocsまたはRoot公開する場合
リポジトリのルートに `dist` の中身を配置するか、Settings > Pages で設定した公開ディレクトリに `dist` のファイルを配置してください。
すべてのデータが暗号化された単一HTMLになっているため、無料アカウントのPublicリポジトリで公開しても、パスワードを知らない第三者には内容が見えません。
