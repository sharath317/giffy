
// export function calculateData(data: []) {
//   let vCompare = 0;
//   const bigNumber = get(
//     data,
//     `data[${get(data, 'data.length', 1) - 1}]`,
//     []
//   )[1];
//   if (data.compare_lag > 0) {
//     const pos = data.data.length - (data.compare_lag + 1);
//     if (pos >= 0) {
//       const vAnchor = data.data[pos][1];
//       if (vAnchor !== 0) {
//         vCompare = (bigNumber - vAnchor) / Math.abs(vAnchor);
//       } else {
//         vCompare = 0;
//       }
//     }
//   }
//   return { bigNumber, vCompare };
// }

export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
