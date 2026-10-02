import { LocaleProps } from '../types/isoflowProps';

const locale: LocaleProps = {
  common: {
    exampleText: "これはサンプルテキストです"
  },
  mainMenu: {
    undo: "元に戻す",
    redo: "やり直す",
    open: "開く",
    exportJson: "JSONとしてエクスポート",
    exportCompactJson: "コンパクトなJSONとしてエクスポート",
    exportImage: "画像としてエクスポート",
    clearCanvas: "キャンバスをクリア",
    settings: "設定",
    gitHub: "GitHub",
    menuButton: "メインメニュー"
  },
  helpDialog: {
    title: "キーボードショートカットとヘルプ",
    close: "閉じる",
    keyboardShortcuts: "キーボードショートカット",
    mouseInteractions: "マウス操作",
    action: "操作",
    shortcut: "ショートカット",
    method: "方法",
    description: "説明",
    note: "注意:",
    noteContent: "入力欄、テキストエリア、編集可能な要素への入力中は、競合を防ぐためにキーボードショートカットが無効になります。",
    // Keyboard shortcuts
    undoAction: "元に戻す",
    undoDescription: "直前の操作を元に戻す",
    redoAction: "やり直す",
    redoDescription: "元に戻した操作をやり直す",
    redoAltAction: "やり直す（別のショートカット）",
    redoAltDescription: "やり直しの代替ショートカット",
    copyAction: 'コピー',
    copyDescription: '選択中のアイテムをコピー',
    pasteAction: '貼り付け',
    pasteDescription: 'クリップボードからアイテムを貼り付け',
    helpAction: "ヘルプ",
    helpDescription: "キーボードショートカットを含むヘルプダイアログを開く",
    zoomInAction: "ズームイン",
    zoomInShortcut: "マウスホイールを上に回す",
    zoomInDescription: "キャンバスを拡大",
    zoomOutAction: "ズームアウト",
    zoomOutShortcut: "マウスホイールを下に回す",
    zoomOutDescription: "キャンバスを縮小",
    panCanvasAction: "キャンバスのパン",
    panCanvasShortcut: "左クリック + ドラッグ",
    panCanvasDescription: "パンモードでキャンバスを移動",
    contextMenuAction: "コンテキストメニュー",
    contextMenuShortcut: "右クリック",
    contextMenuDescription: "アイテムまたは空白部分のコンテキストメニューを開く",
    // Mouse interactions
    selectToolAction: "選択ツール",
    selectToolShortcut: "選択ボタンをクリック",
    selectToolDescription: "選択モードに切り替え",
    panToolAction: "パンツール",
    panToolShortcut: "パンボタンをクリック",
    panToolDescription: "キャンバスを移動するパンモードに切り替え",
    addItemAction: "アイテムを追加",
    addItemShortcut: "アイテム追加ボタンをクリック",
    addItemDescription: "アイコン選択を開いて新しいアイテムを追加",
    drawRectangleAction: "矩形を描画",
    drawRectangleShortcut: "矩形ボタンをクリック",
    drawRectangleDescription: "矩形描画モードに切り替え",
    createConnectorAction: "コネクタを作成",
    createConnectorShortcut: "コネクタボタンをクリック",
    createConnectorDescription: "コネクタモードに切り替え",
    addTextAction: "テキストを追加",
    addTextShortcut: "テキストボタンをクリック",
    addTextDescription: "新しいテキストボックスを作成"
  },
  connectorHintTooltip: {
    tipCreatingConnectors: "ヒント: コネクタの作成",
    tipConnectorTools: "ヒント: コネクタツール",
    clickInstructionStart: "クリック",
    clickInstructionMiddle: "で最初のノードまたはポイントを選び、次に",
    clickInstructionEnd: "で2つ目のノードまたはポイントを選ぶと接続が作成されます。",
    nowClickTarget: "接続先をクリックすると接続が完了します。",
    dragStart: "ドラッグ",
    dragEnd: "して最初のノードから2つ目のノードへつなぐと接続が作成されます。",
    rerouteStart: "コネクタの経路を変更するには、",
    rerouteMiddle: "左クリック",
    rerouteEnd: "でコネクタ線上の任意の点をつかんでドラッグし、アンカーポイントを作成・移動します。"
  },
  lassoHintTooltip: {
    tipLasso: "ヒント: 投げ縄選択",
    tipFreehandLasso: "ヒント: フリーハンド投げ縄選択",
    lassoDragStart: "クリック＆ドラッグ",
    lassoDragEnd: "で、選択したいアイテムを囲む矩形の選択範囲を描きます。",
    freehandDragStart: "クリック＆ドラッグ",
    freehandDragMiddle: "で、アイテムを囲む",
    freehandDragEnd: "自由な形",
    freehandComplete: "を描きます。ボタンを離すと、形の内側にあるすべてのアイテムが選択されます。",
    moveStart: "選択後は、",
    moveMiddle: "選択範囲の内側をクリック",
    moveEnd: "してドラッグすると、選択したアイテムをまとめて移動できます。"
  },
  importHintTooltip: {
    title: "ダイアグラムのインポート",
    instructionStart: "ダイアグラムをインポートするには、左上の",
    menuButton: "メニューボタン",
    instructionMiddle: "(☰) をクリックし、",
    openButton: "「開く」",
    instructionEnd: "を選択してダイアグラムファイルを読み込みます。"
  },
  connectorRerouteTooltip: {
    title: "ヒント: コネクタの経路変更",
    instructionStart: "配置したコネクタの経路は自由に変更できます。",
    instructionSelect: "コネクタを選択",
    instructionMiddle: "してから、",
    instructionClick: "コネクタの経路をクリック",
    instructionAnd: "し、",
    instructionDrag: "ドラッグ",
    instructionEnd: "すると経路を変更できます！"
  },
  connectorEmptySpaceTooltip: {
    message: "このコネクタをノードに接続するには、",
    instruction: "コネクタの端を左クリックして、目的のノードまでドラッグしてください。"
  },
  settings: {
    zoom: {
      description: "マウスホイール使用時のズーム動作を設定します。",
      zoomToCursor: "カーソル位置を中心にズーム",
      zoomToCursorDesc: "有効にすると、マウスカーソルの位置を中心にズームします。無効にすると、キャンバスの中央を中心にズームします。",
      trackpadMode: "トラックパッドモード",
      trackpadModeDesc: "有効時: スクロールでキャンバスをパンし、ピンチ操作でズームします。無効時: スクロールでキャンバスをズームします（デフォルト）。トラックパッドでの使用に適しています。"
    },
    hotkeys: {
      title: "ホットキー設定",
      profile: "ホットキープロファイル",
      profileQwerty: "QWERTY (Q, W, E, R, T, Y)",
      profileSmnrct: "SMNRCT (S, M, N, R, C, T)",
      profileNone: "ホットキーなし",
      tool: "ツール",
      hotkey: "ホットキー",
      toolSelect: "選択",
      toolPan: "パン",
      toolAddItem: "アイテムを追加",
      toolRectangle: "矩形",
      toolConnector: "コネクタ",
      toolText: "テキスト",
      note: "注意: テキスト入力中はホットキーは機能しません"
    },
    pan: {
      title: "パン設定",
      mousePanOptions: "マウスでのパン操作",
      emptyAreaClickPan: "空白部分をクリックしてドラッグ",
      middleClickPan: "中クリックしてドラッグ",
      rightClickPan: "右クリックしてドラッグ",
      ctrlClickPan: "Ctrl + クリックしてドラッグ",
      altClickPan: "Alt + クリックしてドラッグ",
      keyboardPanOptions: "キーボードでのパン操作",
      arrowKeys: "矢印キー",
      wasdKeys: "WASDキー",
      ijklKeys: "IJKLキー",
      keyboardPanSpeed: "キーボードでのパン速度",
      note: "注意: これらのパン操作は、専用のパンツールと併用できます"
    },
    connector: {
      title: "コネクタ設定",
      connectionMode: "接続の作成方法",
      clickMode: "クリックモード（推奨）",
      clickModeDesc: "最初のノードをクリックし、次に2つ目のノードをクリックして接続を作成します",
      dragMode: "ドラッグモード",
      dragModeDesc: "最初のノードから2つ目のノードまでドラッグして接続を作成します",
      note: "注意: この設定はいつでも変更できます。選択したモードはコネクタツールの使用時に適用されます。"
    },
    iconPacks: {
      title: "アイコンパック管理",
      lazyLoading: "遅延読み込みを有効にする",
      lazyLoadingDesc: "アイコンパックを必要なときに読み込み、起動を高速化します",
      availablePacks: "利用可能なアイコンパック",
      coreIsoflow: "Core Isoflow（常に読み込み）",
      alwaysEnabled: "常に有効",
      awsPack: "AWS アイコン",
      gcpPack: "Google Cloud アイコン",
      azurePack: "Azure アイコン",
      kubernetesPack: "Kubernetes アイコン",
      loading: "読み込み中...",
      loaded: "読み込み済み",
      notLoaded: "未読み込み",
      iconCount: "{count} 個のアイコン",
      lazyLoadingDisabledNote: "遅延読み込みは無効です。すべてのアイコンパックは起動時に読み込まれます。",
      note: "アイコンパックは必要に応じて有効・無効を切り替えられます。無効にするとメモリ使用量が減り、パフォーマンスが向上します。"
    }
  },
  lazyLoadingWelcome: {
    title: "新機能: 遅延読み込み！",
    message: "こんにちは！ご要望の多かったアイコンの遅延読み込みを実装しました。標準以外のアイコンパックを使いたい場合は「設定」から有効にできます。",
    configPath: "左上のハンバーガーアイコンをクリックすると、",
    configPath2: "「設定」を開けます。",
    canDisable: "この動作は必要に応じて無効にできます。",
    signature: "-Stan"
  },
  toolMenu: {
    undo: "元に戻す",
    redo: "やり直す",
    select: "選択",
    lassoSelect: "投げ縄選択",
    freehandLasso: "フリーハンド投げ縄",
    pan: "パン",
    addItem: "アイテムを追加",
    rectangle: "矩形",
    connector: "コネクタ",
    text: "テキスト"
  },
  zoomControls: {
    zoomIn: "ズームイン",
    zoomOut: "ズームアウト",
    fitToScreen: "画面に合わせる",
    help: "ヘルプ"
  },
  contextMenu: {
    copySelection: "選択範囲をコピー",
    copyNode: "ノードをコピー",
    copyRectangle: "矩形をコピー",
    copyText: "テキストをコピー",
    addNode: "ノードを追加",
    addRectangle: "矩形を追加",
    paste: "貼り付け"
  },
  settingsDialog: {
    title: "設定",
    close: "閉じる",
    zoomTab: "ズーム",
    labelsTab: "ラベル"
  },
  labelSettings: {
    description: "ラベルの表示を設定します",
    expandButtonPadding: "展開ボタンの余白",
    expandButtonPaddingDesc: "展開ボタンが表示されているときの下部の余白（テキストの重なりを防ぎます）",
    current: "現在の値: {value}（テーマ単位）"
  },
  exportImageDialog: {
    title: "画像としてエクスポート",
    compatibilityTitle: "ブラウザの互換性について",
    compatibilityMessage: "最良の結果を得るには Chrome または Edge を使用してください。Firefox では現在、エクスポート機能に互換性の問題があります。",
    cropCanvasHint: "ドラッグして切り抜く範囲を選択",
    cropHint: "ドラッグしてエクスポートする範囲を選択してください",
    preview: "プレビュー",
    options: "オプション",
    showGrid: "グリッドを表示",
    expandDescriptions: "説明を展開",
    cropToContent: "範囲を切り抜く",
    backgroundColor: "背景色",
    transparentBackground: "透明な背景",
    exportQuality: "エクスポート品質（DPI）",
    custom: "カスタム",
    scale: "倍率: {scale}x（{dpi} DPI）",
    recrop: "切り抜き直す",
    cropApplied: "切り抜きを適用しました",
    applyCrop: "切り抜きを適用",
    clearSelection: "選択を解除",
    selectCropArea: "切り抜く範囲を選択してください。画像全体を使う場合は「範囲を切り抜く」のチェックを外してください",
    cancel: "キャンセル",
    downloadSvg: "SVGでダウンロード",
    downloadPng: "PNGでダウンロード",
    exportFailed: "画像をエクスポートできませんでした"
  },
  itemControls: {
    close: "閉じる",
    delete: "削除",
    color: "色",
    useCustomColor: "カスタムカラーを使用",
    pickColorFromScreen: "画面から色を取得",
    node: {
      updateIcon: "アイコンを変更",
      settings: "設定",
      name: "名前",
      description: "説明",
      labelHeight: "ラベルの高さ",
      iconSize: "アイコンのサイズ"
    },
    connector: {
      labels: "ラベル",
      labelCount: "ラベル {count} / 256",
      addLabel: "ラベルを追加",
      noLabels: "ラベルはありません。「ラベルを追加」で作成できます。",
      label: "ラベル {index}",
      text: "テキスト",
      position: "位置（%）",
      heightOffset: "高さのオフセット",
      showDottedLine: "点線を表示",
      width: "太さ",
      lineStyle: "線のスタイル",
      styleSolid: "実線",
      styleDotted: "点線",
      styleDashed: "破線",
      showArrow: "矢印を表示",
      connectorCount: "コネクタ {count} 本",
      untitledConnector: "コネクタ {index}"
    },
    textBox: {
      enterText: "テキストを入力",
      textSize: "文字サイズ",
      alignment: "向き"
    },
    iconSelection: {
      searchIcons: "アイコンを検索",
      searchIconsQuick: "アイコンを検索（Enterで選択）",
      recentlyUsed: "最近使用したアイコン",
      searchResults: "検索結果（{count} 個）",
      noIconsFound: "「{term}」に一致するアイコンはありません",
      helpSearching: "矢印キーで移動 • Enterで選択 • ダブルクリックで選択して閉じる",
      helpBrowsing: "入力して検索 • カテゴリをクリックして展開 • ダブルクリックで選択して閉じる",
      importIcons: "アイコンをインポート",
      treatAsIsometric: "アイソメトリックとして扱う（3D表示）",
      treatAsIsometricHint: "平面のアイコン（ロゴやUI要素など）の場合はチェックを外してください",
      dragHint: "下のアイテムはキャンバスにドラッグ＆ドロップできます。",
      flatIcon: "平面"
    }
  },
  errors: {
    invalidModel: "ダイアグラムのデータにエラーがあります。",
    componentUnavailable: "表示エラーのため、このコンポーネントは一時的に利用できません",
    richTextUnavailable: "リッチテキストエディタは一時的に利用できません"
  },
  defaults: {
    nodeName: "無題",
    viewName: "無題のビュー"
  }
};

export default locale;
