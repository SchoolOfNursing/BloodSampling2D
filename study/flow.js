(function (root) {
  "use strict";
  const KEY = "bloodsampling.study.flow.v2";
  const names = Object.freeze({ simulation: "シミュレータモード", game: "ゲームモード" });
  const fresh = () => ({ version: 2, step: 0, order: null, opened: false });
  function valid(v) {
    if (!v || v.version !== 2 || !Number.isInteger(v.step) || v.step < 0 || v.step > 5 || typeof v.opened !== "boolean") return false;
    if (v.step === 0) return v.order === null;
    return Array.isArray(v.order) && v.order.length === 2 &&
      ((v.order[0] === "simulation" && v.order[1] === "game") || (v.order[0] === "game" && v.order[1] === "simulation"));
  }
  function clean(v) {
    if (!valid(v)) throw new TypeError("Invalid study state");
    return { version: 2, step: v.step, order: v.order ? [...v.order] : null, opened: v.opened };
  }
  function chooseOrder(bit) {
    if (bit !== 0 && bit !== 1) throw new TypeError("Random bit must be 0 or 1");
    return bit === 0 ? ["simulation", "game"] : ["game", "simulation"];
  }
  function read(storage) {
    try {
      const raw = storage.getItem(KEY);
      return { ok: true, state: raw === null ? fresh() : clean(JSON.parse(raw)) };
    } catch { return { ok: false, state: null }; }
  }
  function save(storage, v) {
    try {
      const raw = JSON.stringify(clean(v));
      storage.setItem(KEY, raw);
      return storage.getItem(KEY) === raw;
    } catch { return false; }
  }
  function markOpened(v, expectedStep) {
    const state = clean(v);
    return state.step === expectedStep && state.step < 5 ? { ...state, opened: true } : state;
  }
  function advance(v, expectedStep, confirmed, bit) {
    const state = clean(v);
    if (state.step !== expectedStep || !state.opened || confirmed !== true || state.step === 5) return state;
    return { version: 2, step: state.step + 1, order: state.order || chooseOrder(bit), opened: false };
  }
  const api = Object.freeze({ KEY, names, fresh, valid, clean, chooseOrder, read, save, markOpened, advance });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.BloodSamplingFlow = api;
})(typeof window !== "undefined" ? window : null);
