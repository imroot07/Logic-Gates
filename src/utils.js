function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

let hasFocus = true;

window.onblur = () => {
  hasFocus = false;
};
window.onfocus = () => {
  hasFocus = true;
};
function getHasFocus() {
  return hasFocus;
}

export { uuidv4, getHasFocus };
