const css = {
  root: document.querySelector(':root'),
  get: function (varName) {
    return getComputedStyle(this.root).getPropertyValue(`--${varName}`);
  },
  set: function (varName, value) {
    this.root.style.setProperty(`--${varName}`, value);
  }
}