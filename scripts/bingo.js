(function () {
  'use strict';

  var locale = document.documentElement.lang === 'en' ? 'en' : 'ja';
  var copy = locale === 'en' ? {
    defaultTitle: 'Bingo',
    sampleTitle: 'Setlist Bingo',
    free: 'FREE',
    cellLabel: function (row, column) { return 'Bingo row ' + row + ', column ' + column; },
    freeCellLabel: 'Free center space',
    resetTitle: 'Reset bingo card',
    resetMessage: 'This will remove every entry and mark. Continue?',
    sampleTitleDialog: 'Fill with a sample',
    sampleMessage: 'This will replace the current entries with a sample card. Continue?',
    cancel: 'Cancel',
    confirm: 'OK',
    resetDone: 'Card reset',
    sampleDone: 'Sample card added',
    nothingToShuffle: 'There are no entries to shuffle',
    shuffled: 'Entries shuffled',
    inputComplete: 'All spaces are filled',
    editStatus: function (filled, total) { return filled + '/' + total + ' filled · Edit mode'; },
    previewStatus: function (filled, total) { return 'Preview · ' + filled + '/' + total + ' filled'; },
    playStatus: function (lines, marked, total) {
      var label = lines === 1 ? 'line' : 'lines';
      return lines + ' bingo ' + label + ' · ' + marked + '/' + total + ' marked';
    },
    bingo: function (lines) {
      return lines === 1 ? 'Bingo! 1 completed line' : 'Bingo! ' + lines + ' completed lines';
    },
    linkCopied: 'Share link copied',
    copyPrompt: 'Copy this URL',
    sharedLoaded: 'Shared card loaded',
    invalidShare: 'The shared card could not be loaded',
    imageShared: 'Image shared',
    imageSaved: 'Image saved',
    exportFailed: 'The image could not be created',
    previewRegion: 'Finished bingo card preview',
    sample3: [
      'Opening song', 'New song', 'Solo',
      'Unit song', 'MC', 'Ballad',
      'Fan favorite', 'Cover song', 'Encore'
    ],
    sample5: [
      'Opening song', 'New song', 'Solo', 'Unit song', 'MC',
      'Ballad', 'Fan favorite', 'Cover song', 'Dance song', 'Acoustic',
      'Surprise guest', 'Costume change', 'Surprise song', 'Call and response', 'Medley',
      'Rare song', 'Debut song', 'Latest single', 'Theme song', 'Long MC',
      'Final song', 'Encore', 'Double encore', 'Photo time', 'Announcement'
    ]
  } : {
    defaultTitle: 'ビンゴ',
    sampleTitle: 'セトリビンゴ',
    free: 'FREE',
    cellLabel: function (row, column) { return 'ビンゴ' + row + '行' + column + '列の項目'; },
    freeCellLabel: '中央のFREEマス',
    resetTitle: 'ビンゴカードのリセット',
    resetMessage: '入力内容とマークがすべて削除されます。よろしいですか？',
    sampleTitleDialog: 'サンプルを入力',
    sampleMessage: '現在の入力内容をサンプルカードに置き換えます。よろしいですか？',
    cancel: 'キャンセル',
    confirm: 'OK',
    resetDone: 'リセットしました',
    sampleDone: 'サンプルを入力しました',
    nothingToShuffle: 'シャッフルする内容がありません',
    shuffled: 'シャッフルしました',
    inputComplete: 'すべて入力できました',
    editStatus: function (filled, total) { return filled + '/' + total + ' 入力済み · 編集モード'; },
    previewStatus: function (filled, total) { return '完成イメージ · ' + filled + '/' + total + ' 入力済み'; },
    playStatus: function (lines, marked, total) {
      return 'ビンゴ ' + lines + '列 · ' + marked + '/' + total + ' マーク済み';
    },
    bingo: function (lines) { return 'ビンゴ！ ' + lines + '列完成'; },
    linkCopied: '共有リンクをコピーしました',
    copyPrompt: 'このURLをコピーしてください',
    sharedLoaded: '共有カードを読み込みました',
    invalidShare: '共有カードを読み込めませんでした',
    imageShared: '画像を共有しました',
    imageSaved: '画像を保存しました',
    exportFailed: '画像を作成できませんでした',
    previewRegion: '完成したビンゴカードのプレビュー',
    sample3: [
      'オープニング曲', '新曲', 'ソロ曲',
      'ユニット曲', 'MC', 'バラード',
      '定番曲', 'カバー曲', 'アンコール'
    ],
    sample5: [
      'オープニング曲', '新曲', 'ソロ曲', 'ユニット曲', 'MC',
      'バラード', '定番曲', 'カバー曲', 'ダンス曲', 'アコースティック',
      'ゲスト登場', '衣装チェンジ', 'サプライズ曲', 'コール＆レスポンス', 'メドレー',
      'レア曲', 'デビュー曲', '最新シングル', 'テーマ曲', '長めのMC',
      '本編ラスト', 'アンコール', 'ダブルアンコール', '撮影タイム', '告知'
    ]
  };

  var BOARD_SIZES = [3, 5];
  var MAX_CELL_LENGTH = 40;
  var MAX_TITLE_LENGTH = 60;
  var STORAGE_KEY = 'bingo.saved.v1';
  var VALID_FONTS = ['system', 'pop', 'maru', 'zen', 'hachi'];

  var fontMap = {
    system: {
      primary: 'system-ui',
      fallback: 'system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans JP", sans-serif'
    },
    maru: {
      primary: 'Kosugi Maru',
      fallback: '"Kosugi Maru", "Hiragino Maru Gothic ProN", "Yu Gothic UI", sans-serif'
    },
    pop: {
      primary: 'Yusei Magic',
      fallback: '"Yusei Magic", "Hiragino Sans", "Yu Gothic", sans-serif'
    },
    zen: {
      primary: 'Zen Kurenaido',
      fallback: '"Zen Kurenaido", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif'
    },
    hachi: {
      primary: 'Hachi Maru Pop',
      fallback: '"Hachi Maru Pop", "Hiragino Maru Gothic ProN", "Yu Gothic UI", cursive'
    }
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  var boardEl = $('#board');
  var boardFrame = $('#boardFrame');
  var previewTitle = $('#previewTitle');
  var statusEl = $('#status');
  var titleInput = $('#title');
  var sizeSelect = $('#sizeSelect');
  var fontSelect = $('#fontSelect');
  var freeCenterInput = $('#freeCenter');
  var toast = $('#toast');
  var offscreenCanvas = $('#off');
  var firstInputTracked = false;
  var saveTimer = null;

  function createMatrix(size, value) {
    return Array.from({ length: size }, function () {
      return Array(size).fill(value);
    });
  }

  function createInitialState() {
    return {
      id: null,
      size: 3,
      cells: createMatrix(3, ''),
      marked: createMatrix(3, false),
      title: copy.defaultTitle,
      font: 'pop',
      freeCenter: false,
      version: 2,
      mode: 'edit'
    };
  }

  var state = createInitialState();

  function trackEvent(name, parameters) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, parameters || {});
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(function () {
      toast.classList.remove('show');
    }, 2000);
  }

  function showConfirm(title, message) {
    return new Promise(function (resolve) {
      var modal = $('#confirmModal');
      var modalTitle = $('#modalTitle');
      var modalMessage = $('#modalMessage');
      var confirmButton = $('#modalConfirm');
      var cancelButton = $('#modalCancel');
      var previousFocus = document.activeElement;

      modalTitle.textContent = title;
      modalMessage.textContent = message;
      cancelButton.textContent = copy.cancel;
      confirmButton.textContent = copy.confirm;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('show');
      cancelButton.focus();

      function cleanup(result) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        confirmButton.removeEventListener('click', onConfirm);
        cancelButton.removeEventListener('click', onCancel);
        modal.removeEventListener('click', onOverlayClick);
        document.removeEventListener('keydown', onKeyDown);
        if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
        resolve(result);
      }

      function onConfirm() { cleanup(true); }
      function onCancel() { cleanup(false); }
      function onOverlayClick(event) {
        if (event.target === modal) cleanup(false);
      }
      function onKeyDown(event) {
        if (event.key === 'Escape') {
          event.preventDefault();
          cleanup(false);
          return;
        }
        if (event.key !== 'Tab') return;
        if (event.shiftKey && document.activeElement === cancelButton) {
          event.preventDefault();
          confirmButton.focus();
        } else if (!event.shiftKey && document.activeElement === confirmButton) {
          event.preventDefault();
          cancelButton.focus();
        }
      }

      confirmButton.addEventListener('click', onConfirm);
      cancelButton.addEventListener('click', onCancel);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onKeyDown);
    });
  }

  var base64Url = {
    encode: function (value) {
      var bytes = new TextEncoder().encode(value);
      var binary = '';
      bytes.forEach(function (byte) { binary += String.fromCharCode(byte); });
      return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
    },
    decode: function (value) {
      var normalized = value.replaceAll('-', '+').replaceAll('_', '/');
      var padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
      var binary = atob(normalized + padding);
      var bytes = new Uint8Array(binary.length);
      for (var index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
      }
      return new TextDecoder().decode(bytes);
    }
  };

  function normalizeState(value) {
    if (!value || typeof value !== 'object') return null;

    var inferredSize = Array.isArray(value.cells) ? value.cells.length : 3;
    var size = BOARD_SIZES.includes(Number(value.size)) ? Number(value.size) : inferredSize;
    if (!BOARD_SIZES.includes(size)) size = 3;

    var cells = createMatrix(size, '');
    var marked = createMatrix(size, false);

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        if (Array.isArray(value.cells) && Array.isArray(value.cells[row])) {
          var cellValue = value.cells[row][column];
          if (typeof cellValue === 'string') cells[row][column] = cellValue.slice(0, MAX_CELL_LENGTH);
        }
        if (Array.isArray(value.marked) && Array.isArray(value.marked[row])) {
          marked[row][column] = value.marked[row][column] === true;
        }
      }
    }

    return {
      id: typeof value.id === 'string' ? value.id.slice(0, 100) : null,
      size: size,
      cells: cells,
      marked: marked,
      title: typeof value.title === 'string' && value.title.trim()
        ? value.title.slice(0, MAX_TITLE_LENGTH)
        : copy.defaultTitle,
      font: VALID_FONTS.includes(value.font) ? value.font : 'pop',
      freeCenter: value.freeCenter === true,
      version: 2,
      mode: 'edit'
    };
  }

  function loadFrom(value) {
    var normalized = normalizeState(value);
    if (!normalized) return false;
    state = normalized;
    titleInput.value = state.title;
    sizeSelect.value = String(state.size);
    fontSelect.value = state.font;
    freeCenterInput.checked = state.freeCenter;
    $('#edit').checked = true;
    $('#preview').checked = false;
    $('#play').checked = false;
    render();
    return true;
  }

  function serialize() {
    if (!state.id) {
      state.id = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : String(Date.now()) + '-' + Math.random().toString(16).slice(2);
    }
    return JSON.stringify({
      id: state.id,
      size: state.size,
      cells: state.cells,
      marked: state.marked,
      title: state.title,
      font: state.font,
      freeCenter: state.freeCenter,
      version: state.version
    });
  }

  function saveLocal() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, serialize());
      } catch (error) {
        // The tool remains usable when browser storage is unavailable.
      }
    }, 250);
  }

  function loadLocal() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) loadFrom(JSON.parse(saved));
    } catch (error) {
      // Ignore invalid or unavailable local storage.
    }
  }

  function centerIndex() {
    return Math.floor(state.size / 2);
  }

  function isFreeCell(row, column) {
    var center = centerIndex();
    return state.freeCenter && row === center && column === center;
  }

  function isEffectivelyMarked(row, column) {
    return isFreeCell(row, column) || state.marked[row][column];
  }

  function countCompletedLines() {
    var size = state.size;
    var completed = 0;

    for (var row = 0; row < size; row += 1) {
      var rowComplete = true;
      var columnComplete = true;
      for (var column = 0; column < size; column += 1) {
        rowComplete = rowComplete && isEffectivelyMarked(row, column);
        columnComplete = columnComplete && isEffectivelyMarked(column, row);
      }
      if (rowComplete) completed += 1;
      if (columnComplete) completed += 1;
    }

    var diagonalDown = true;
    var diagonalUp = true;
    for (var index = 0; index < size; index += 1) {
      diagonalDown = diagonalDown && isEffectivelyMarked(index, index);
      diagonalUp = diagonalUp && isEffectivelyMarked(index, size - index - 1);
    }
    if (diagonalDown) completed += 1;
    if (diagonalUp) completed += 1;

    return completed;
  }

  function updateStatus() {
    var filled = 0;
    var marked = 0;
    var total = state.size * state.size;

    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (isFreeCell(row, column) || state.cells[row][column].trim()) filled += 1;
        if (isEffectivelyMarked(row, column)) marked += 1;
      }
    }

    if (state.mode === 'edit') {
      statusEl.textContent = copy.editStatus(filled, total);
      statusEl.classList.remove('has-bingo');
      return;
    }

    if (state.mode === 'preview') {
      statusEl.textContent = copy.previewStatus(filled, total);
      statusEl.classList.remove('has-bingo');
      return;
    }

    var lines = countCompletedLines();
    statusEl.textContent = copy.playStatus(lines, marked, total);
    statusEl.classList.toggle('has-bingo', lines > 0);
  }

  function focusNextCell(currentIndex) {
    var inputs = Array.from(boardEl.querySelectorAll('textarea:not(:disabled)'));
    var current = inputs.indexOf(currentIndex);
    if (current >= 0 && current < inputs.length - 1) {
      inputs[current + 1].focus();
    } else {
      currentIndex.blur();
      showToast(copy.inputComplete);
    }
  }

  function focusFirstEmptyCell() {
    if (state.mode !== 'edit') return;
    var inputs = boardEl.querySelectorAll('textarea');
    for (var index = 0; index < inputs.length; index += 1) {
      if (!inputs[index].disabled && !inputs[index].value.trim()) {
        inputs[index].focus();
        return;
      }
    }
    var firstEnabled = boardEl.querySelector('textarea:not(:disabled)');
    if (firstEnabled) firstEnabled.focus();
  }

  function toggleMark(row, column) {
    if (isFreeCell(row, column)) return;
    var before = countCompletedLines();
    state.marked[row][column] = !state.marked[row][column];
    var after = countCompletedLines();
    saveLocal();
    render();
    var refreshedCell = boardEl.querySelector(
      '.cell[data-row="' + row + '"][data-column="' + column + '"]'
    );
    if (refreshedCell) refreshedCell.focus();
    if (after > before) {
      showToast(copy.bingo(after));
      trackEvent('bingo_line_completed', { board_size: state.size, completed_lines: after });
    }
  }

  function render() {
    var size = state.size;
    var previewing = state.mode === 'preview';
    var fontConfig = fontMap[state.font] || fontMap.pop;
    boardFrame.classList.toggle('is-preview', previewing);
    boardFrame.style.fontFamily = previewing ? fontConfig.fallback : '';
    previewTitle.textContent = state.title || copy.defaultTitle;
    previewTitle.setAttribute('aria-hidden', previewing ? 'false' : 'true');
    if (previewing) {
      boardFrame.setAttribute('role', 'img');
      boardFrame.setAttribute('aria-label', copy.previewRegion + ': ' + previewTitle.textContent);
    } else {
      boardFrame.removeAttribute('role');
      boardFrame.removeAttribute('aria-label');
    }
    boardEl.style.setProperty('--board-size', size);
    boardEl.dataset.size = String(size);
    boardEl.innerHTML = '';

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        (function (cellRow, cellColumn) {
          var free = isFreeCell(cellRow, cellColumn);
          var cellValue = state.cells[cellRow][cellColumn] || '';
          var filled = free || cellValue.trim() !== '';
          var marked = isEffectivelyMarked(cellRow, cellColumn);
          var cell = document.createElement('div');
          cell.className = 'cell' + (filled ? ' filled' : '') + (marked ? ' marked' : '') + (free ? ' free-cell' : '');
          cell.dataset.row = String(cellRow);
          cell.dataset.column = String(cellColumn);

          if (state.mode === 'play' && !free) {
            cell.setAttribute('role', 'button');
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('aria-pressed', state.marked[cellRow][cellColumn] ? 'true' : 'false');
            cell.setAttribute('aria-label', copy.cellLabel(cellRow + 1, cellColumn + 1));
          }

          var input = null;
          if (previewing) {
            var previewLabel = document.createElement('span');
            previewLabel.className = 'preview-cell-label';
            previewLabel.textContent = free ? copy.free : cellValue;
            cell.appendChild(previewLabel);
          } else {
            input = document.createElement('textarea');
            input.value = free ? copy.free : cellValue;
            input.maxLength = MAX_CELL_LENGTH;
            input.rows = 1;
            input.disabled = state.mode === 'play' || free;
            input.setAttribute('aria-label', free ? copy.freeCellLabel : copy.cellLabel(cellRow + 1, cellColumn + 1));
            if (state.mode === 'play') {
              input.setAttribute('aria-hidden', 'true');
              input.tabIndex = -1;
            }

            var composing = false;
            input.addEventListener('compositionstart', function () { composing = true; });
            input.addEventListener('compositionend', function () { composing = false; });
            input.addEventListener('input', function (event) {
              state.cells[cellRow][cellColumn] = event.target.value;
              cell.classList.toggle('filled', event.target.value.trim() !== '');
              if (!firstInputTracked && event.target.value.trim()) {
                firstInputTracked = true;
                trackEvent('bingo_first_input', { board_size: state.size });
              }
              saveLocal();
              updateStatus();
            });
            input.addEventListener('keydown', function (event) {
              if (event.key === 'Enter' && !composing) {
                event.preventDefault();
                focusNextCell(input);
              }
            });
            input.addEventListener('focus', function () { cell.classList.add('focused'); });
            input.addEventListener('blur', function () { cell.classList.remove('focused'); });
            cell.appendChild(input);
          }

          var mark = document.createElement('span');
          mark.className = 'mark';
          mark.setAttribute('aria-hidden', 'true');
          cell.appendChild(mark);

          cell.addEventListener('click', function () {
            if (state.mode === 'edit') {
              if (!free) input.focus();
            } else if (state.mode === 'play') {
              toggleMark(cellRow, cellColumn);
            }
          });
          cell.addEventListener('keydown', function (event) {
            if (state.mode === 'play' && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              toggleMark(cellRow, cellColumn);
            }
          });

          boardEl.appendChild(cell);
        })(row, column);
      }
    }

    updateStatus();
  }

  function setMode(mode) {
    state.mode = mode;
    render();
    saveLocal();
    if (mode === 'edit') {
      window.setTimeout(focusFirstEmptyCell, 80);
    } else if (mode === 'preview') {
      trackEvent('bingo_preview_opened', { board_size: state.size, font: state.font });
    } else {
      trackEvent('bingo_play_mode', { board_size: state.size, free_center: state.freeCenter });
      var firstPlayableCell = boardEl.querySelector('.cell[role="button"]');
      if (firstPlayableCell) firstPlayableCell.focus();
    }
  }

  function resizeMatrix(matrix, newSize, fallback) {
    var resized = createMatrix(newSize, fallback);
    var copySize = Math.min(matrix.length, newSize);
    for (var row = 0; row < copySize; row += 1) {
      for (var column = 0; column < copySize; column += 1) {
        resized[row][column] = matrix[row][column];
      }
    }
    return resized;
  }

  function setBoardSize(newSize) {
    if (!BOARD_SIZES.includes(newSize) || newSize === state.size) return;
    state.cells = resizeMatrix(state.cells, newSize, '');
    state.marked = resizeMatrix(state.marked, newSize, false);
    state.size = newSize;
    state.id = null;
    render();
    saveLocal();
    trackEvent('bingo_board_size_changed', { board_size: state.size });
  }

  async function resetBoard() {
    var confirmed = await showConfirm(copy.resetTitle, copy.resetMessage);
    if (!confirmed) return;
    state.cells = createMatrix(state.size, '');
    state.marked = createMatrix(state.size, false);
    state.title = copy.defaultTitle;
    state.id = null;
    titleInput.value = state.title;
    render();
    saveLocal();
    showToast(copy.resetDone);
    trackEvent('bingo_reset', { board_size: state.size });
  }

  async function fillSample() {
    var hasContent = state.cells.some(function (row) {
      return row.some(function (cell) { return cell.trim() !== ''; });
    });
    if (hasContent) {
      var confirmed = await showConfirm(copy.sampleTitleDialog, copy.sampleMessage);
      if (!confirmed) return;
    }

    var sample = state.size === 5 ? copy.sample5 : copy.sample3;
    state.cells = createMatrix(state.size, '');
    sample.forEach(function (value, index) {
      var row = Math.floor(index / state.size);
      var column = index % state.size;
      state.cells[row][column] = value;
    });
    state.marked = createMatrix(state.size, false);
    state.title = copy.sampleTitle;
    state.id = null;
    titleInput.value = state.title;
    render();
    saveLocal();
    showToast(copy.sampleDone);
    trackEvent('bingo_sample_filled', { board_size: state.size });
  }

  function shuffleCells() {
    var positions = [];
    var values = [];

    for (var row = 0; row < state.size; row += 1) {
      for (var column = 0; column < state.size; column += 1) {
        if (!isFreeCell(row, column) && state.cells[row][column].trim()) {
          positions.push([row, column]);
          values.push(state.cells[row][column]);
        }
      }
    }

    if (!values.length) {
      showToast(copy.nothingToShuffle);
      return;
    }

    for (var index = values.length - 1; index > 0; index -= 1) {
      var randomIndex = Math.floor(Math.random() * (index + 1));
      var temporary = values[index];
      values[index] = values[randomIndex];
      values[randomIndex] = temporary;
    }

    positions.forEach(function (position, index) {
      state.cells[position[0]][position[1]] = values[index];
    });
    state.marked = createMatrix(state.size, false);
    state.id = null;
    render();
    saveLocal();
    showToast(copy.shuffled);
    trackEvent('bingo_shuffled', { board_size: state.size });
  }

  function getCellLabel(row, column) {
    return isFreeCell(row, column) ? copy.free : (state.cells[row][column] || '').trim();
  }

  async function exportPng() {
    trackEvent('bingo_image_exported', { board_size: state.size, completed_lines: countCompletedLines() });

    var fontConfig = fontMap[state.font] || fontMap.pop;
    try {
      await Promise.race([
        document.fonts.load('80px "' + fontConfig.primary + '"'),
        new Promise(function (resolve) { window.setTimeout(resolve, 2500); })
      ]);
      await new Promise(function (resolve) { window.setTimeout(resolve, 100); });
    } catch (error) {
      // Canvas falls back to the local font stack.
    }

    var canvasSize = 2048;
    var topMargin = 180;
    var sideMargin = 80;
    var gridStroke = 8;
    var size = state.size;
    var gridSize = canvasSize - sideMargin * 2;
    var cellSize = gridSize / size;
    var gridTop = topMargin;
    var context = offscreenCanvas.getContext('2d');

    offscreenCanvas.width = canvasSize;
    offscreenCanvas.height = canvasSize + topMargin;
    context.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    context.fillStyle = '#111111';
    context.font = 'bold 120px ' + fontConfig.fallback;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(state.title || copy.defaultTitle, canvasSize / 2, topMargin / 2);

    context.strokeStyle = '#222222';
    context.lineWidth = gridStroke;
    context.lineCap = 'square';
    for (var line = 0; line <= size; line += 1) {
      var point = sideMargin + line * cellSize;
      context.beginPath();
      context.moveTo(sideMargin, gridTop + line * cellSize);
      context.lineTo(sideMargin + gridSize, gridTop + line * cellSize);
      context.stroke();
      context.beginPath();
      context.moveTo(point, gridTop);
      context.lineTo(point, gridTop + gridSize);
      context.stroke();
    }

    for (var row = 0; row < size; row += 1) {
      for (var column = 0; column < size; column += 1) {
        var x = sideMargin + column * cellSize;
        var y = gridTop + row * cellSize;
        var label = getCellLabel(row, column);
        if (label) {
          drawWrappedText(
            context,
            label,
            x,
            y,
            cellSize,
            cellSize,
            size === 5 ? 70 : 100,
            size === 5 ? 30 : 46,
            fontConfig.fallback
          );
        }
        if (isEffectivelyMarked(row, column)) drawMark(context, x, y, cellSize);
      }
    }

    offscreenCanvas.toBlob(async function (blob) {
      if (!blob) {
        showToast(copy.exportFailed);
        return;
      }
      var safeTitle = (state.title || 'bingo').replace(/[\/\\?%*:|"<>]/g, '-');
      var fileName = safeTitle + '_' + size + 'x' + size + '.png';
      var file = new File([blob], fileName, { type: 'image/png' });

      if (isMobileDevice() && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: state.title });
          showToast(copy.imageShared);
          return;
        } catch (error) {
          if (error && error.name === 'AbortError') return;
        }
      }
      downloadBlob(blob, fileName);
    }, 'image/png', 1);
  }

  function isMobileDevice() {
    var hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return hasTouch && window.innerWidth <= 900;
  }

  function drawMark(context, x, y, cellSize) {
    context.save();
    context.translate(x + cellSize / 2, y + cellSize / 2);
    context.rotate(-12 * Math.PI / 180);
    context.strokeStyle = '#ff3b3b';
    context.lineWidth = Math.max(10, cellSize * 0.03);
    context.shadowColor = 'rgba(255, 59, 59, 0.4)';
    context.shadowBlur = 12;
    context.shadowOffsetY = 4;
    context.beginPath();
    context.arc(0, 0, cellSize * 0.35, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  function wrapLines(context, text, maxWidth) {
    var tokens = locale === 'en' && text.includes(' ') ? text.split(/\s+/) : Array.from(text);
    var separator = locale === 'en' && text.includes(' ') ? ' ' : '';
    var lines = [];
    var current = '';

    tokens.forEach(function (token) {
      var candidate = current ? current + separator + token : token;
      if (current && context.measureText(candidate).width > maxWidth) {
        lines.push(current);
        current = token;
      } else {
        current = candidate;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  function drawWrappedText(context, text, x, y, width, height, baseSize, minimumSize, fontFamily) {
    var fontSize = baseSize;
    var lines = [];
    do {
      context.font = fontSize + 'px ' + fontFamily;
      lines = wrapLines(context, text, width * 0.88);
      if (lines.length * fontSize * 1.18 <= height * 0.88) break;
      fontSize -= 2;
    } while (fontSize > minimumSize);

    context.fillStyle = '#111111';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    var lineHeight = fontSize * 1.18;
    var startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach(function (line, index) {
      context.fillText(line, x + width / 2, startY + index * lineHeight);
    });
  }

  function downloadBlob(blob, fileName) {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 2000);
    showToast(copy.imageSaved);
  }

  async function shareLink() {
    var encoded = base64Url.encode(serialize());
    var url = window.location.origin + window.location.pathname + window.location.search + '#b=' + encoded;
    trackEvent('bingo_link_shared', { board_size: state.size, completed_lines: countCompletedLines() });
    try {
      await navigator.clipboard.writeText(url);
      showToast(copy.linkCopied);
    } catch (error) {
      window.prompt(copy.copyPrompt, url);
    }
  }

  function tryLoadFromUrl() {
    if (!window.location.hash.startsWith('#b=')) return;
    try {
      var encoded = window.location.hash.slice(3);
      var value = JSON.parse(base64Url.decode(encoded));
      if (!loadFrom(value)) throw new Error('Invalid card');
      showToast(copy.sharedLoaded);
    } catch (error) {
      showToast(copy.invalidShare);
    }
  }

  $('#edit').addEventListener('change', function () { setMode('edit'); });
  $('#preview').addEventListener('change', function () { setMode('preview'); });
  $('#play').addEventListener('change', function () { setMode('play'); });
  $('#sampleBtn').addEventListener('click', fillSample);
  $('#shuffleBtn').addEventListener('click', shuffleCells);
  $('#resetBtn').addEventListener('click', resetBoard);
  $('#exportPng').addEventListener('click', exportPng);
  $('#shareLink').addEventListener('click', shareLink);

  titleInput.addEventListener('input', function (event) {
    state.title = event.target.value || copy.defaultTitle;
    previewTitle.textContent = state.title;
    state.id = null;
    saveLocal();
  });
  sizeSelect.addEventListener('change', function (event) {
    setBoardSize(Number(event.target.value));
  });
  fontSelect.addEventListener('change', function (event) {
    state.font = VALID_FONTS.includes(event.target.value) ? event.target.value : 'pop';
    if (state.mode === 'preview') render();
    saveLocal();
  });
  freeCenterInput.addEventListener('change', function (event) {
    state.freeCenter = event.target.checked;
    state.id = null;
    render();
    saveLocal();
    trackEvent('bingo_free_center_changed', {
      board_size: state.size,
      free_center: state.freeCenter
    });
  });

  var relatedExternal = $('#relatedExternal');
  if (relatedExternal) {
    relatedExternal.addEventListener('click', function () {
      trackEvent('bingo_related_service_clicked', { destination: 'sanin_event_map' });
    });
  }

  loadLocal();
  render();
  tryLoadFromUrl();
  window.addEventListener('hashchange', tryLoadFromUrl);
  window.setTimeout(focusFirstEmptyCell, 100);
  $('#y').textContent = String(new Date().getFullYear());
})();
