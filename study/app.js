(function () {
  "use strict";
  const F = window.BloodSamplingFlow;
  const C = window.BLOOD_SAMPLING_CONFIG;
  const home = document.getElementById("home-view");
  const view = document.getElementById("route-view");
  const main = document.getElementById("main");
  let storage = null;
  try { storage = window.localStorage; } catch { /* 教材のみの利用は可能 */ }
  let state = F.fresh();
  let storageOk = true;
  const labels = ["同意・事前質問", "1つ目の体験", "中間質問", "2つ目の体験", "事後質問"];
  const back = '<a class="back-link" href="#/">案内ページに戻る</a>';
  const esc = text => String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const link = (url, label, extra = "") => '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer" ' + extra + ">" + esc(label) + "</a>";
  const documents = () => '<ul class="link-list"><li>' + link(C.explanationUrl, "資料1：研究協力依頼書") + "</li><li>" + link(C.researcherCommitmentsUrl, "資料2：研究者の遵守事項") + "</li></ul>";
  function reloadState() {
    if (!storageOk) return false;
    const result = F.read(storage);
    if (!result.ok || (state.step > 0 && (result.state.step < state.step || JSON.stringify(result.state.order) !== JSON.stringify(state.order)))) {
      storageOk = false;
      return false;
    }
    state = result.state;
    return true;
  }
  function persist(next) {
    if (!F.save(storage, next)) { storageOk = false; return false; }
    state = next;
    return true;
  }
  function study() {
    return back + "<h1>研究の説明と参加手順</h1><p>研究題目：" + esc(C.researchTitle) + "</p>" +
      "<p>まず、次の2つの資料をお読みください。参加への同意は、この先のGoogleフォームで確認します。</p>" + documents() +
      "<p>参加は任意です。参加しない場合・途中で中止した場合も不利益はありません。学生証番号はGoogleフォームでのみ収集し、回答の対応付けと同意撤回時の特定に使用します。案内ページには入力・保存しません。</p>" +
      "<section><h2>進め方</h2><ol><li>同意・事前質問フォームを開き、送信します。</li><li>この案内ページに戻り、送信済みのチェックを入れて、体験順を表示します。</li><li>指定された1つ目のモードを体験し、中間質問に回答します。</li><li>2つ目のモードを体験し、事後質問に回答します。</li></ol>" +
      "<p>フォームと教材は別タブで開きます。フォームは送信完了画面が出たことを確認してください。終了したフォームや教材のタブは閉じ、この案内ページに戻ってください。</p>" +
      "<p class=\"note\">案内ページは、フォームの送信や教材の完了を自動判定できません。各段階の確認は、ご自身で行っていただきます。</p>" +
      "<p>体験順は、2つの順番から各50％の確率で一度抽選します。参加人数が同数になるとは限りません。</p>" +
      "<p>最初からSafariやChromeなどの通常のブラウザで開き、最後まで同じ端末・同じブラウザで進めてください。ブラウザ内に順番と進行状況だけを保存するため、プライベートブラウズや保存データの削除は避けてください。別端末・別ブラウザには引き継がれません。</p>" +
      '<p><a class="primary-link" href="#/participate">同意・事前質問へ進む／途中から再開する</a></p><p><a href="#/learn">研究には参加せず教材のみを利用する</a></p></section>';
  }
  function learn() {
    return back + "<h1>教材のみ利用する</h1><p>研究への同意、学生証番号の入力、質問への回答は不要です。教材のメニューで、使いたいモードを選んでください。</p>" +
      '<p>' + link(C.learningUrl, "教材を開く（別タブ）", 'class="primary-link"') + "</p>" +
      "<ul><li>「シミュレーションモード」：音声・動画・案内に沿って復習します。</li><li>「ゲームモード」：操作や回答を自分で選んで復習します。</li></ul>" +
      "<p>スマートフォンでは画面を横向きにし、音声が聞こえる環境でご利用ください。</p>";
  }
  function withdrawal() {
    return back + "<h1>同意の撤回について</h1><p>体験や回答は、いつでも中止できます。送信済みの回答を研究から取り除くことを希望する場合は、2026年12月31日までに、同意撤回書に署名し、山下までメールで提出してください。</p>" +
      "<p>ブラウザを閉じたり、この案内ページの保存データを消したりしても、送信済みの回答は削除されません。</p><p>匿名化処理が完了した後（2027年1月1日以降）は、個人の回答を特定できなくなるため、データの削除・撤回に対応できません。</p>" +
      "<p>" + link(C.withdrawalUrl, "資料7：同意撤回書（PDF）") + '</p><p>提出先・お問い合わせ：<a href="mailto:' + esc(C.researcherEmail) + '">' + esc(C.researcherEmail) + "</a></p>" + documents();
  }
  function progress() {
    return '<ol class="progress" aria-label="研究参加の手順">' + labels.map((label, i) => '<li' + (i === state.step ? ' class="current" aria-current="step"' : "") + ">" + label + (i < state.step ? "（終了を自己確認済み）" : i === state.step ? "（現在）" : "") + "</li>").join("") + "</ol>";
  }
  function orderPanel() {
    if (!state.order) return '<p class="order-info">体験順は、同意・事前質問の送信後に決まります。</p>';
    return '<p class="order-info">あなたの体験順<strong data-testid="assigned-order">' + F.names[state.order[0]] + " → " + F.names[state.order[1]] + "</strong></p>";
  }
  function controls(label, next) {
    return '<label class="check-label"><input id="step-confirm" type="checkbox"><span>' + label + '</span></label><button id="next-step" data-step="' + state.step + '" disabled>' + next + '</button><p class="note">上のリンクを開き、終了を確認してからチェックを入れてください。</p>';
  }
  function body() {
    if (state.step === 5) return "<h2>ご協力ありがとうございました</h2><p>最後のフォームの送信完了画面を確認できていれば、研究参加は終了です。このページの表示自体は、回答の受信を保証するものではありません。</p>" +
      '<p><a href="#/learn">今後も教材を復習に利用する</a></p><p><a href="#/withdrawal">同意の撤回について</a></p>';
    const openAttrs = 'class="primary-link" data-action="open-step" data-step="' + state.step + '"';
    if (state.step === 0) return "<h2>同意・事前質問</h2><p>資料1・2を読んだうえで、フォームの説明に従って回答してください。対象条件や同意についてもフォームで確認します。</p>" + documents() +
      "<p>知識確認問題10問と、学年・学習経験等についての質問があります。</p><p>" + link(C.preFormUrl, "同意・事前質問フォームを開く", openAttrs) + "</p>" +
      controls("対象条件を満たし、研究参加に同意して事前質問を送信しました。送信完了画面を確認しました。", "体験順を表示する") +
      '<p><a href="#/learn">同意せず教材のみを利用する</a></p>';
    const mode = state.order[state.step <= 2 ? 0 : 1];
    if (state.step === 1 || state.step === 3) {
      const menu = mode === "simulation" ? "シミュレーションモード" : "ゲームモード";
      return "<h2>" + (state.step === 1 ? "1つ目" : "2つ目") + "：" + F.names[mode] + "</h2><p>教材を開いたら、メニューの<strong>「" + menu + "」</strong>を選んでください。モードは自動では選択されません。</p><p>" +
        link(C.learningUrl, "教材を開く（" + menu + "を選択）", openAttrs) +
        "</p><p>スマートフォンは横向きにしてください。体験後はこの案内ページに戻ります。</p>" +
        controls("指定されたモードの体験を終了しました（途中で中止した場合も含みます）。", state.step === 1 ? "中間質問へ進む" : "事後質問へ進む");
    }
    return "<h2>" + (state.step === 2 ? "中間質問" : "事後質問") + "</h2><p>直前に体験した<strong>" + F.names[mode] + "</strong>について回答してください。学生証番号は、事前質問と同じ番号を入力してください。</p>" +
      "<p>" + (state.step === 2 ? "知識確認問題10問と、1つ目のモードの評価に回答します。送信するまでは2つ目のモードを始めないでください。" : "2つ目のモードの評価と、両方を比べた感想に回答します。ここでは知識確認問題はありません。") + "</p><p>" +
      link(state.step === 2 ? C.intermediateFormUrl : C.postFormUrl, state.step === 2 ? "中間質問フォームを開く" : "事後質問フォームを開く", openAttrs) +
      "</p>" + controls("回答を送信し、フォームの送信完了画面を確認しました。", state.step === 2 ? "2つ目の体験へ進む" : "終了する");
  }
  function participate() {
    if (!storageOk) return back + '<h1>進行状況を確認できません</h1><p role="alert">保存データが読み取れないか、このブラウザでは保存できません。順番を変えて再開しないよう、研究の進行を停止しています。すでに参加中の方は、元のブラウザに戻るか、山下までお問い合わせください。</p><p>初めて参加する方は、通常のブラウザで開いてください。</p><p><a href="#/learn">教材のみ利用する</a></p>';
    return back + "<h1>研究参加の手順</h1>" + progress() + orderPanel() +
      '<div class="step-content" data-testid="step-' + state.step + '">' + body() + "</div>" +
      '<p class="note">リンクは別タブで開きます。終了後、このページへ戻って次へ進んでください。送信・体験完了は自動判定していません。</p>' +
      '<p class="storage-note">同じブラウザ内に、順番と現在の段階だけを保存します。学生証番号・回答・操作ログはこのページでは収集しません。別端末や別ブラウザでは続きから再開できません。</p><p><a href="#/withdrawal">中止・同意の撤回について</a></p>';
  }
  function updateButton() {
    const button = document.getElementById("next-step");
    if (button) button.disabled = !storageOk || !state.opened || !document.getElementById("step-confirm")?.checked;
  }
  function render(focus = true) {
    const route = location.hash.startsWith("#/") ? location.hash.slice(2) : "";
    const routes = { study, learn, participate, withdrawal };
    const isHome = !routes[route];
    home.hidden = !isHome;
    view.hidden = isHome;
    document.getElementById("resume-home").hidden = !storageOk || state.step === 0;
    document.body.dataset.page = isHome ? "home" : route;
    document.title = (isHome ? "採血手技学習教材・研究のご案内" : { study: "研究の説明と参加手順", learn: "教材のみ利用する", participate: "研究参加の手順", withdrawal: "同意の撤回について" }[route]) + "｜SchoolOfNursing";
    if (!isHome) view.innerHTML = routes[route]();
    document.getElementById("step-confirm")?.addEventListener("change", updateButton);
    if (focus && (location.hash.startsWith("#/") || !location.hash)) { window.scrollTo(0, 0); main.focus({ preventScroll: true }); }
  }
  view.addEventListener("click", event => {
    const opener = event.target.closest('[data-action="open-step"]');
    if (opener) {
      const expected = Number(opener.dataset.step);
      if (!reloadState() || state.step !== expected || !persist(F.markOpened(state, expected))) { event.preventDefault(); render(); return; }
      updateButton();
    }
    const button = event.target.closest("#next-step");
    if (!button) return;
    const expected = Number(button.dataset.step);
    const confirmed = document.getElementById("step-confirm")?.checked === true;
    if (!reloadState() || state.step !== expected || !state.opened || !confirmed) { render(); return; }
    let bit;
    if (!state.order) {
      try { const value = new Uint32Array(1); window.crypto.getRandomValues(value); bit = value[0] & 1; }
      catch { document.getElementById("live-status").textContent = "体験順を決められませんでした。山下までお問い合わせください。"; return; }
    }
    persist(F.advance(state, expected, confirmed, bit));
    render();
    document.getElementById("live-status").textContent = storageOk ? (state.step === 5 ? "すべての手順が終了しました。" : labels[state.step] + "へ進みました。") : "保存できないため、進行を停止しました。";
  });
  window.addEventListener("hashchange", () => { reloadState(); render(); });
  window.addEventListener("storage", event => { if (event.key === F.KEY || event.key === null) { reloadState(); render(false); } });
  window.addEventListener("pageshow", () => { reloadState(); render(false); });
  reloadState();
  render(false);
})();
