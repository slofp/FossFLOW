import type { EditorModeEnum, MainMenuOptions } from './common';
import type { Model } from './model';
import type { RendererProps } from './rendererProps';

export type InitialData = Model & {
  fitToView?: boolean;
  view?: string;
};

export interface LocaleProps {
  common: {
    exampleText: string;
  };
  mainMenu: {
    undo: string;
    redo: string;
    open: string;
    exportJson: string;
    exportCompactJson: string;
    exportImage: string;
    clearCanvas: string;
    settings: string;
    gitHub: string;
    menuButton: string;
  };
  helpDialog: {
    title: string;
    close: string;
    keyboardShortcuts: string;
    mouseInteractions: string;
    action: string;
    shortcut: string;
    method: string;
    description: string;
    note: string;
    noteContent: string;
    // Keyboard shortcuts
    undoAction: string;
    undoDescription: string;
    redoAction: string;
    redoDescription: string;
    redoAltAction: string;
    redoAltDescription: string;
    copyAction: string;
    copyDescription: string;
    pasteAction: string;
    pasteDescription: string;
    helpAction: string;
    helpDescription: string;
    zoomInAction: string;
    zoomInShortcut: string;
    zoomInDescription: string;
    zoomOutAction: string;
    zoomOutShortcut: string;
    zoomOutDescription: string;
    panCanvasAction: string;
    panCanvasShortcut: string;
    panCanvasDescription: string;
    contextMenuAction: string;
    contextMenuShortcut: string;
    contextMenuDescription: string;
    // Mouse interactions
    selectToolAction: string;
    selectToolShortcut: string;
    selectToolDescription: string;
    panToolAction: string;
    panToolShortcut: string;
    panToolDescription: string;
    addItemAction: string;
    addItemShortcut: string;
    addItemDescription: string;
    drawRectangleAction: string;
    drawRectangleShortcut: string;
    drawRectangleDescription: string;
    createConnectorAction: string;
    createConnectorShortcut: string;
    createConnectorDescription: string;
    addTextAction: string;
    addTextShortcut: string;
    addTextDescription: string;
  };
  connectorHintTooltip: {
    tipCreatingConnectors: string;
    tipConnectorTools: string;
    clickInstructionStart: string;
    clickInstructionMiddle: string;
    clickInstructionEnd: string;
    nowClickTarget: string;
    dragStart: string;
    dragEnd: string;
    rerouteStart: string;
    rerouteMiddle: string;
    rerouteEnd: string;
  };
  lassoHintTooltip: {
    tipLasso: string;
    tipFreehandLasso: string;
    lassoDragStart: string;
    lassoDragEnd: string;
    freehandDragStart: string;
    freehandDragMiddle: string;
    freehandDragEnd: string;
    freehandComplete: string;
    moveStart: string;
    moveMiddle: string;
    moveEnd: string;
  };
  importHintTooltip: {
    title: string;
    instructionStart: string;
    menuButton: string;
    instructionMiddle: string;
    openButton: string;
    instructionEnd: string;
  };
  connectorRerouteTooltip: {
    title: string;
    instructionStart: string;
    instructionSelect: string;
    instructionMiddle: string;
    instructionClick: string;
    instructionAnd: string;
    instructionDrag: string;
    instructionEnd: string;
  };
  connectorEmptySpaceTooltip: {
    message: string;
    instruction: string;
  };
  settings: {
    zoom: {
      description: string;
      zoomToCursor: string;
      zoomToCursorDesc: string;
      trackpadMode: string;
      trackpadModeDesc: string;
    };
    hotkeys: {
      title: string;
      profile: string;
      profileQwerty: string;
      profileSmnrct: string;
      profileNone: string;
      tool: string;
      hotkey: string;
      toolSelect: string;
      toolPan: string;
      toolAddItem: string;
      toolRectangle: string;
      toolConnector: string;
      toolText: string;
      note: string;
    };
    pan: {
      title: string;
      mousePanOptions: string;
      emptyAreaClickPan: string;
      middleClickPan: string;
      rightClickPan: string;
      ctrlClickPan: string;
      altClickPan: string;
      keyboardPanOptions: string;
      arrowKeys: string;
      wasdKeys: string;
      ijklKeys: string;
      keyboardPanSpeed: string;
      note: string;
    };
    connector: {
      title: string;
      connectionMode: string;
      clickMode: string;
      clickModeDesc: string;
      dragMode: string;
      dragModeDesc: string;
      note: string;
    };
    iconPacks: {
      title: string;
      lazyLoading: string;
      lazyLoadingDesc: string;
      availablePacks: string;
      coreIsoflow: string;
      alwaysEnabled: string;
      awsPack: string;
      gcpPack: string;
      azurePack: string;
      kubernetesPack: string;
      loading: string;
      loaded: string;
      notLoaded: string;
      iconCount: string;
      lazyLoadingDisabledNote: string;
      note: string;
    };
  };
  lazyLoadingWelcome: {
    title: string;
    message: string;
    configPath: string;
    configPath2: string;
    canDisable: string;
    signature: string;
  };
  toolMenu: {
    undo: string;
    redo: string;
    select: string;
    lassoSelect: string;
    freehandLasso: string;
    pan: string;
    addItem: string;
    rectangle: string;
    connector: string;
    text: string;
  };
  zoomControls: {
    zoomIn: string;
    zoomOut: string;
    fitToScreen: string;
    help: string;
  };
  contextMenu: {
    copySelection: string;
    copyNode: string;
    copyRectangle: string;
    copyText: string;
    addNode: string;
    addRectangle: string;
    paste: string;
  };
  settingsDialog: {
    title: string;
    close: string;
    zoomTab: string;
    labelsTab: string;
  };
  labelSettings: {
    description: string;
    expandButtonPadding: string;
    expandButtonPaddingDesc: string;
    // {value} is replaced with the current padding
    current: string;
  };
  exportImageDialog: {
    title: string;
    compatibilityTitle: string;
    compatibilityMessage: string;
    cropCanvasHint: string;
    cropHint: string;
    preview: string;
    options: string;
    showGrid: string;
    expandDescriptions: string;
    cropToContent: string;
    backgroundColor: string;
    transparentBackground: string;
    exportQuality: string;
    custom: string;
    // {scale} and {dpi} are replaced with the current values
    scale: string;
    recrop: string;
    cropApplied: string;
    applyCrop: string;
    clearSelection: string;
    selectCropArea: string;
    cancel: string;
    downloadSvg: string;
    downloadPng: string;
    exportFailed: string;
  };
  itemControls: {
    close: string;
    delete: string;
    color: string;
    useCustomColor: string;
    pickColorFromScreen: string;
    node: {
      updateIcon: string;
      settings: string;
      name: string;
      description: string;
      labelHeight: string;
      iconSize: string;
    };
    connector: {
      labels: string;
      // {count} is replaced with the number of labels
      labelCount: string;
      addLabel: string;
      noLabels: string;
      // {index} is replaced with the label number
      label: string;
      text: string;
      position: string;
      heightOffset: string;
      showDottedLine: string;
      width: string;
      lineStyle: string;
      styleSolid: string;
      styleDotted: string;
      styleDashed: string;
      showArrow: string;
      // {count} is replaced with the number of connectors
      connectorCount: string;
      // {index} is replaced with the connector number
      untitledConnector: string;
    };
    textBox: {
      enterText: string;
      textSize: string;
      alignment: string;
    };
    iconSelection: {
      searchIcons: string;
      searchIconsQuick: string;
      recentlyUsed: string;
      // {count} is replaced with the number of matches
      searchResults: string;
      // {term} is replaced with the search term
      noIconsFound: string;
      helpSearching: string;
      helpBrowsing: string;
      importIcons: string;
      treatAsIsometric: string;
      treatAsIsometricHint: string;
      dragHint: string;
      flatIcon: string;
    };
  };
  errors: {
    invalidModel: string;
    componentUnavailable: string;
    richTextUnavailable: string;
  };
  // Names given to newly created items
  defaults: {
    nodeName: string;
    viewName: string;
  };
  // other namespaces can be added here
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// A locale may leave keys out; they fall back to en-US
export type PartialLocaleProps = DeepPartial<LocaleProps>;

export interface IconPackManagerProps {
  lazyLoadingEnabled: boolean;
  onToggleLazyLoading: (enabled: boolean) => void;
  packInfo: Array<{
    name: string;
    displayName: string;
    loaded: boolean;
    loading: boolean;
    error: string | null;
    iconCount: number;
  }>;
  enabledPacks: string[];
  onTogglePack: (packName: string, enabled: boolean) => void;
}

export interface IsoflowProps {
  initialData?: InitialData;
  mainMenuOptions?: MainMenuOptions;
  onModelUpdated?: (Model: Model) => void;
  width?: number | string;
  height?: number | string;
  enableDebugTools?: boolean;
  editorMode?: keyof typeof EditorModeEnum;
  renderer?: RendererProps;
  locale?: PartialLocaleProps;
  iconPackManager?: IconPackManagerProps;
}
