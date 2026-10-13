import type { FileDropEvent } from 'file-drop-element';
import type SnackBarElement from 'shared/custom-els/snack-bar';
import type { SnackOptions } from 'shared/custom-els/snack-bar';

import { h, Component } from 'preact';

import { linkRef } from 'shared/prerendered-app/util';
import * as style from './style.css';
import 'add-css:./style.css';
import 'file-drop-element';
import 'shared/custom-els/snack-bar';
import Intro from 'shared/prerendered-app/Intro';
import 'shared/custom-els/loading-spinner';

const ROUTE_EDITOR = '/editor';
const ROUTE_BULK = '/bulk';

const TITLE_HOME = 'Free Image Resizer & Compressor Online | Zyro Pro';
const TITLE_BULK = 'Bulk Image Resizer & Compressor Online | Zyro Pro';
const TITLE_EDITOR = 'Image Editor – Resize, Crop & Compress | Zyro Pro';

const compressPromise = import('client/lazy-app/Compress');
const bulkPromise = import('client/lazy-app/BulkOptimize');
const swBridgePromise = import('client/lazy-app/sw-bridge');

function back() {
  window.history.back();
}

interface Props {}

interface State {
  awaitingShareTarget: boolean;
  file?: File;
  bulkFiles?: File[];
  isEditorOpen: boolean;
  isBulkOpen: boolean;
  Compress?: typeof import('client/lazy-app/Compress').default;
  BulkOptimize?: typeof import('client/lazy-app/BulkOptimize').default;
}

export default class App extends Component<Props, State> {
  state: State = {
    awaitingShareTarget: new URL(location.href).searchParams.has(
      'share-target',
    ),
    isEditorOpen: false,
    isBulkOpen: location.pathname === ROUTE_BULK,
    file: undefined,
    bulkFiles: undefined,
    Compress: undefined,
    BulkOptimize: undefined,
  };

  snackbar?: SnackBarElement;

  constructor() {
    super();

    compressPromise
      .then((module) => {
        this.setState({ Compress: module.default });
      })
      .catch(() => {
        this.showSnack('Failed to load app');
      });

    bulkPromise
      .then((module) => {
        this.setState({ BulkOptimize: module.default });
      })
      .catch(() => {
        console.error('Failed to preload bulk module');
      });

    swBridgePromise.then(async ({ offliner, getSharedImage }) => {
      offliner(this.showSnack);
      if (!this.state.awaitingShareTarget) return;
      const file = await getSharedImage();
      // Remove the ?share-target from the URL
      history.replaceState('', '', '/');
      this.openEditor(file);
      this.setState({ awaitingShareTarget: false });
    });

    document.body.addEventListener('gesturestart', (event: any) => {
      event.preventDefault();
    });

    if (location.pathname === ROUTE_EDITOR && !this.state.file) {
      history.replaceState(null, '', '/');
    }
    window.addEventListener('popstate', this.onPopState);
    this.updateTitle(this.state.isEditorOpen, this.state.isBulkOpen);
  }

  private updateTitle = (
    isEditorOpen: boolean,
    isBulkOpen: boolean,
    file?: File,
  ) => {
    if (isBulkOpen) {
      document.title = TITLE_BULK;
    } else if (isEditorOpen) {
      document.title = file ? `${file.name} - ${TITLE_EDITOR}` : TITLE_EDITOR;
    } else {
      document.title = TITLE_HOME;
    }
  };

  private onFileDrop = ({ files }: FileDropEvent) => {
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      this.openBulk(Array.from(files));
    } else {
      const file = files[0];
      this.openEditor(file);
    }
  };

  private onIntroPickFile = (file: File) => {
    this.openEditor(file);
  };

  private onIntroPickFiles = (files: File[]) => {
    if (files.length > 1) {
      this.openBulk(files);
    } else if (files.length === 1) {
      this.openEditor(files[0]);
    }
  };

  private showSnack = (
    message: string,
    options: SnackOptions = {},
  ): Promise<string> => {
    if (!this.snackbar) throw Error('Snackbar missing');
    return this.snackbar.showSnackbar(message, options);
  };

  private onPopState = () => {
    const hasFile = Boolean(this.state.file);
    const isEditorOpen = location.pathname === ROUTE_EDITOR && hasFile;
    const isBulkOpen = location.pathname === ROUTE_BULK;
    if (location.pathname === ROUTE_EDITOR && !hasFile) {
      history.replaceState(null, '', '/');
    }
    this.updateTitle(isEditorOpen, isBulkOpen, this.state.file);
    this.setState({ isEditorOpen, isBulkOpen });
  };

  private openEditor = (file?: File) => {
    const targetFile = file || this.state.file;
    if (!targetFile) return;

    const editorURL = new URL(location.href);
    editorURL.pathname = ROUTE_EDITOR;
    if (location.pathname !== ROUTE_EDITOR) {
      history.pushState(null, '', editorURL.href);
    }
    this.updateTitle(true, false, targetFile);
    this.setState({
      isEditorOpen: true,
      isBulkOpen: false,
      file: targetFile,
    });
  };

  private openBulk = (files?: File[]) => {
    const bulkURL = new URL(location.href);
    bulkURL.pathname = ROUTE_BULK;
    if (location.pathname !== ROUTE_BULK) {
      history.pushState(null, '', bulkURL.href);
    }
    this.updateTitle(false, true);
    this.setState({
      isBulkOpen: true,
      isEditorOpen: false,
      bulkFiles: files && files.length > 0 ? files : this.state.file ? [this.state.file] : [],
    });
  };

  private goHome = () => {
    const homeURL = new URL(location.href);
    homeURL.pathname = '/';
    if (location.pathname !== '/') {
      history.pushState(null, '', homeURL.href);
    }
    this.updateTitle(false, false);
    this.setState({
      isBulkOpen: false,
      isEditorOpen: false,
    });
  };

  render(
    {}: Props,
    { file, bulkFiles, isEditorOpen, isBulkOpen, Compress, BulkOptimize, awaitingShareTarget }: State,
  ) {
    const showSpinner =
      awaitingShareTarget ||
      (isEditorOpen && !Compress) ||
      (isBulkOpen && !BulkOptimize);

    return (
      <div class={style.app}>
        <file-drop onfiledrop={this.onFileDrop} class={style.drop} multiple>
          {showSpinner ? (
            <loading-spinner class={style.appLoader} />
          ) : isBulkOpen ? (
            BulkOptimize && (
              <BulkOptimize
                initialFiles={bulkFiles}
                showSnack={this.showSnack}
                onBackToSingle={(f) => this.openEditor(f)}
                onHome={this.goHome}
              />
            )
          ) : isEditorOpen && file ? (
            Compress && (
              <Compress
                file={file}
                showSnack={this.showSnack}
                onBack={this.goHome}
                onOpenBulk={() => this.openBulk([file])}
              />
            )
          ) : (
            <Intro
              onFile={this.onIntroPickFile}
              onFiles={this.onIntroPickFiles}
              onOpenBulk={() => this.openBulk()}
              showSnack={this.showSnack}
            />
          )}
          <snack-bar ref={linkRef(this, 'snackbar')} />
        </file-drop>
      </div>
    );
  }
}
