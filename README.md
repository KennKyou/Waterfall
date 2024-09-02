# Waterfall 類別

`Waterfall` 類別提供了一個可自訂的瀑布流佈局，用於動態排列圖片。

## 建構函式

### `new Waterfall(dom, options)`

創建一個 `Waterfall` 類別的實例。

#### 參數

- `dom` (string): 瀑布流容器的選擇器。
- `options` (Object): 瀑布流的配置選項。
    - `gap` (number): 圖片之間的間距。默認為 10。
    - `count` (number): 每行顯示的圖片數量。默認為 4。
    - `breakpoints` (Object): 用於響應式設計的斷點配置。

## 方法

### `init()`

初始化瀑布流。此方法應用選項、設置事件監聽器、設置圖片寬度、進行瀑布流佈局和懶加載圖片。

### `onLoad()`

處理窗口加載事件，更新瀑布流佈局。

### `onResize()`

處理窗口大小調整事件，更新瀑布流佈局。

### `updateLayout()`

更新瀑布流佈局。此方法應用選項、設置圖片寬度並重新排列圖片。

### `applyOptions()`

應用配置選項，包括處理斷點配置以進行響應式設計。

### `setImgWidth()`

設置每張圖片的寬度，以適應瀑布流佈局。

### `waterfall()`

執行瀑布流佈局算法，排列圖片以形成瀑布流效果。

### `lazyLoad()`

實現圖片懶加載功能，當圖片進入視口時加載圖片。

## 事件處理

Waterfall 類別處理以下事件：

- 窗口加載事件 (`load`)。
- 窗口大小調整事件 (`resize`)。

## 配置選項

Waterfall 類別可以接受以下配置選項：

- `gap` (number): 圖片之間的間距。默認為 10。
- `count` (number): 每行顯示的圖片數量。默認為 4。
- `breakpoints` (Object): 用於響應式設計的斷點配置。根據窗口寬度應用不同的選項。

## 範例用法

```javascript
const waterfall = new Waterfall('.waterfall-container', {
  gap: 15,
  count: 3,
  breakpoints: {
    768: { gap: 20, count: 2 },
    1024: { gap: 25, count: 4 }
  }
});
```

---

# Waterfall Class

The `Waterfall` class provides a customizable masonry layout for dynamically arranging images.

## Constructor

### `new Waterfall(dom, options)`

Creates an instance of the `Waterfall` class.

#### Parameters

- `dom` (string): Selector for the container element of the masonry layout.
- `options` (Object): Configuration options for the masonry layout.
    - `gap` (number): The gap between images. Default is 10.
    - `count` (number): The number of images per row. Default is 4.
    - `breakpoints` (Object): Configuration for responsive design breakpoints.

## Methods

### `init()`

Initializes the masonry layout. This method applies options, sets up event listeners, sets image widths, performs the masonry layout, and sets up lazy loading for images.

### `onLoad()`

Handles the window load event, updating the masonry layout.

### `onResize()`

Handles the window resize event, updating the masonry layout.

### `updateLayout()`

Updates the masonry layout. This method applies options, sets image widths, and rearranges images.

### `applyOptions()`

Applies the configuration options, including handling breakpoint configurations for responsive design.

### `setImgWidth()`

Sets the width of each image to fit the masonry layout.

### `waterfall()`

Executes the masonry layout algorithm, arranging images to form a waterfall effect.

### `lazyLoad()`

Implements lazy loading for images, loading images as they come into the viewport.

## Event Handling

The Waterfall class handles the following events:

- Window load event (`load`).
- Window resize event (`resize`).

## Configuration Options

The Waterfall class accepts the following configuration options:

- `gap` (number): The gap between images. Default is 10.
- `count` (number): The number of images per row. Default is 4.
- `breakpoints` (Object): Configuration for responsive design breakpoints. Applies different options based on the window width.

## Example Usage

```javascript
const waterfall = new Waterfall('.waterfall-container', {
  gap: 15,
  count: 3,
  breakpoints: {
    768: { gap: 20, count: 2 },
    1024: { gap: 25, count: 4 }
  }
});
```