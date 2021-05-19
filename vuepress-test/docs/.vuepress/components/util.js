export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        // 1000 / 60 = 16.67 模拟window.requestAnimationFrame更新帧的频率
        return window.setTimeout(callback, 16.67);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }

  scroll(from, to, step);
}

/**
 * Returns the scrolling parent of the given element
 * @param {Element} element
 * @returns {Element} scroll parent
 */
export function getScrollParent(element) {
  if (!element) {
    return document;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
    case '#document':
      return element.ownerDocument;
  }

  // Firefox want us to check `-x` and `-y` variations as well
  const { overflow, overflowX, overflowY } = getComputedStyle(element, null);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(element.parentNode);
}