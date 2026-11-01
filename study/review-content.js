/* 終了確認後の復習ルートでのみ読み込む。公開静的ファイルであり認証境界ではない。 */
window.BloodSamplingReviewData = Object.freeze({
  "version": 1,
  "questions": [
    {
      "number": 1,
      "title": "患者確認と採血前の説明",
      "question": "同姓同名の患者がいる病棟で採血を行う。指示箋に基づき採血管を準備し、訪室した。最初の対応として最も適切なのはどれか。",
      "answer": "患者自身に氏名等を答えてもらい、指示箋および採血管のラベルと照合したうえで、採血について説明し同意を得る",
      "explanation": "同姓同名の場合、氏名だけでは区別できません。患者さん自身に氏名などを答えてもらい、生年月日や患者IDなど施設で定めた複数の情報で照合します。ベッド番号や「はい」という返事だけで判断せず、採血の説明と同意も確認します。",
      "sources": [
        "identity"
      ]
    },
    {
      "number": 2,
      "title": "採血針の選択",
      "question": "成人の通常の静脈血採血を行う。血管は十分に確認でき、特別な指示はない。使用する針として最も適切なのはどれか。",
      "answer": "21G",
      "explanation": "この設問の条件と選択肢では21Gが正答です。授業で扱う一般的な成人の採血では21Gや22Gを用いますが、患者さんの血管や採血器具によって選択は変わります。「成人なら必ず21G」「23Gは使ってはいけない」という意味ではありません。",
      "sources": [
        "needles"
      ]
    },
    {
      "number": 3,
      "title": "シリンジと注射針の接続",
      "question": "採血用のシリンジに注射針を接続する。穿刺時に針先のカット面を確認しやすく、シリンジの目盛りも読み取りやすい状態として最も適切なのはどれか。",
      "answer": "シリンジの目盛りと針先のカット面を同じ側に向ける",
      "explanation": "目盛りとカット面を同じ側にそろえると、カット面を上にした状態で採血量も確認しやすくなります。本教材のシリンジと針を接続する際の確認点です。接続の強さだけでなく、向きにも注意します。",
      "sources": []
    },
    {
      "number": 4,
      "title": "採血する腕の選択",
      "question": "右利きの患者が「普段は左腕から採血しています」と話している。左右とも採血可能であり、点滴、麻痺、手術歴などの問題は確認されなかった。最も適切な対応はどれか。",
      "answer": "普段の採血側、患者の希望、腕の状態および血管の状態を確認し、適切であれば左腕を選ぶ",
      "explanation": "普段の採血側や希望を聞いたうえで、左右の腕と血管の状態から判断します。この条件では左腕を選べますが、「いつも左」「利き腕ではないから」という理由だけでは決めません。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 5,
      "title": "血管確認から穿刺までの順序",
      "question": "手指消毒をし、手袋を装着した。採血部位を決定して穿刺するまでの手順として、最も適切なのはどれか。",
      "answer": "駆血帯を巻く→患者に手を軽く握ってもらう→血管を確認する→穿刺部位を消毒する→乾燥を待つ→穿刺する",
      "explanation": "血管を確認してから消毒し、乾燥を待って穿刺します。消毒後に指で触れたり、乾燥前に穿刺したりすると、消毒した部位の清潔を保つという目的を満たせません。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 6,
      "title": "穿刺部位の消毒",
      "question": "穿刺予定部位を広い範囲で消毒した後、穿刺点を特に清潔に保つために行う対応として、最も適切なものはどれか。",
      "answer": "消毒綿を清潔な面に変えるように折り畳み、穿刺点をもう一度消毒して乾燥を待つ",
      "explanation": "本教材では、広い範囲の消毒後に綿の清潔な面へ変え、穿刺点を仕上げに消毒する2段階を扱います。使用した面を繰り返し当てず、消毒後は触れずに乾燥を待つことがポイントです。折り畳む手順をすべての消毒製品に一律に適用するものではありません。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 7,
      "title": "皮膚の伸展と穿刺方向",
      "question": "血管の走行を確認した後、皮膚を伸展して穿刺する。最も適切な方法はどれか。",
      "answer": "穿刺部位より末梢側で皮膚を伸展し、針先のカット面を上にして血管の走行に沿って進める",
      "explanation": "末梢側、つまり手首側から皮膚を伸展して血管を安定させます。カット面を上にし、血管を横切るのではなく走行に沿って針を進めます。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 8,
      "title": "駆血帯を外すタイミング",
      "question": "シリンジによる採血で必要量の血液を採取できた。次の対応として最も適切なのはどれか。",
      "answer": "必要量を採取したら、抜針する前に駆血帯を外す",
      "explanation": "駆血を解除して静脈内の圧を下げてから抜針することが大切です。抜針後や止血完了後まで駆血帯を巻いたままにせず、不要な駆血を長引かせません。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 9,
      "title": "抜針後の止血",
      "question": "抜針後、患者に圧迫を交代してもらう際の説明として最も適切なのはどれか。",
      "answer": "「腕を伸ばしたまま、穿刺部を親指でしっかり押さえてください」",
      "explanation": "腕を伸ばして穿刺部を直接圧迫します。肘を曲げて綿を挟んだり、穿刺部をこすったりする方法ではなく、圧迫を続けて止血を確認します。",
      "sources": [
        "phlebotomy"
      ]
    },
    {
      "number": 10,
      "title": "採血後の処理",
      "question": "必要量の採血が終了した後の処理として、最も適切なものはどれか。",
      "answer": "使用した針付きシリンジを速やかに針廃棄BOXへ廃棄し、指示箋の内容とラベルがあっているかを確認し、実施者のサインをする。手袋を外して手指衛生を行う",
      "explanation": "針刺しを防ぐため、使用済みの針をリキャップしたり、手で外したり、処置台に放置したりしません。採血管への分注など必要な処理を終えた針付きシリンジは、専用容器へ速やかに廃棄します。検体の照合と実施記録も行い、手袋を外した直後には手指衛生を行います。",
      "sources": [
        "sharps",
        "hands"
      ]
    }
  ],
  "sources": [
    {
      "id": "identity",
      "title": "WHO：Patient Identification（2007、PDF）",
      "url": "https://www.who.int/docs/default-source/integrated-health-services-%28ihs%29/psf/patient-safety-solutions/ps-solution2-patient-identification.pdf"
    },
    {
      "id": "needles",
      "title": "WHO：Blood-sampling systems（針の選択、2010）",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK138666/"
    },
    {
      "id": "phlebotomy",
      "title": "WHO：Best practices in phlebotomy（採血の基本手順、2010）",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK138665/"
    },
    {
      "id": "sharps",
      "title": "CDC：Standard Precautions（使用済み針の取扱い）",
      "url": "https://www.cdc.gov/infection-control/hcp/isolation-precautions/appendix-a-table-4.html"
    },
    {
      "id": "hands",
      "title": "CDC：Hand Hygiene for Healthcare Workers（手指衛生）",
      "url": "https://www.cdc.gov/clean-hands/hcp/clinical-safety/index.html"
    }
  ]
});
