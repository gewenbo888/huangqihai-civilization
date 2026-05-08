// Huangqihai Civilization · 黄旗海文明
// Plain JS · template literals throughout for CJK safety

(function () {
  "use strict";

  const root = document.documentElement;
  const LANG_KEY = "hqh-lang";
  const THEME_KEY = "hqh-theme";

  // ─── Lang / theme ────────────────────────────────────────────────
  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    document.querySelectorAll(".lang-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.langSet === lang);
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
      const v = el.getAttribute(`data-${lang}-placeholder`);
      if (v) el.placeholder = v;
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.themeSet === theme);
    });
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.langSet));
  });
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.addEventListener("click", () => applyTheme(b.dataset.themeSet));
  });
  try {
    const sl = localStorage.getItem(LANG_KEY); if (sl) applyLang(sl);
    const st = localStorage.getItem(THEME_KEY); if (st) applyTheme(st);
  } catch (_) {}

  // ─── Module 01 · Basin cards ─────────────────────────────────────
  const basinCards = [
    {
      kicker: ["Hydrology", "水文"],
      titleEn: "A closed terminal basin",
      titleZh: "封闭的内陆终端盆地",
      bodyEn: `Huangqihai has no outlet. Water enters through several seasonal streams from the surrounding piedmont and leaves only by evaporation. This makes lake area a direct readout of moisture balance — when rainfall exceeds evaporation, the lake grows; when it does not, the lake shrinks within decades.`,
      bodyZh: `黄旗海无外流出口。水自周围山前数条季节性溪流进入,仅通过蒸发离开。湖面面积因此成为水平衡的直接读数——降水大于蒸发时湖面扩张;反之,数十年内即可萎缩。`
    },
    {
      kicker: ["Tectonics", "构造"],
      titleEn: "A graben between two ranges",
      titleZh: "两山间的地堑",
      bodyEn: `The basin is a Cenozoic fault graben — a down-dropped block between the Yin Mountains south and the Greater Khingan piedmont northeast. Its flat floor and steep margins shape every settlement pattern: villages cluster on terraces just above the lake&apos;s historical maximum, where soils are workable and the lake remains in view.`,
      bodyZh: `盆地为新生代断陷地堑——位于南面阴山与东北面大兴安岭山前之间的下沉地块。其平坦盆底与陡峭边缘塑造了所有聚落格局:村落聚集于湖体历史高水位以上的台地——土壤可耕,湖体可见。`
    },
    {
      kicker: ["Vegetation", "植被"],
      titleEn: "Steppe meets forest meets reed",
      titleZh: "草原、森林、苇荡的交点"
,
      bodyEn: `Around 5500 BP the basin held three vegetation belts in close contact: typical steppe grass on the highlands, mixed broadleaf forest on the eastern slopes, and reed-marsh wetlands fringing the lake. Each belt offered a different resource set; settlements at the basin floor could exploit all three within a day&apos;s walk.`,
      bodyZh: `距今约 5500 年时,盆地内存在三条紧密相邻的植被带:高地的典型草原,东坡的混交阔叶林,以及湖滨的苇沼湿地。每条带提供不同的资源谱;盆底聚落可在一日步程内利用全部三种。`
    },
    {
      kicker: ["Why basins", "为何是盆地"],
      titleEn: "Basins concentrate the right things",
      titleZh: "盆地恰好把对的要素聚拢",
      bodyEn: `A closed basin concentrates water, sediment, organic matter, and human attention into a small area. It also concentrates risk — drought, salinization, freezing — which forces the population either to disperse or to invent. This trade-off is structural to basin civilizations from Lake Titicaca to the Tarim.`,
      bodyZh: `封闭盆地把水、沉积物、有机质与人类注意力集中于一小片土地之内,也把风险集中起来——干旱、盐渍化、冰冻——这迫使人口要么分散,要么发明。从的的喀喀湖到塔里木,这是盆地文明的结构性权衡。`
    }
  ];
  function renderBasinCards() {
    const host = document.getElementById("basinCards");
    if (!host) return;
    host.innerHTML = basinCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderBasinCards();

  // ─── Module 02 · Miaozigou artifact grid + cards ─────────────────
  const artifacts = [
    {
      titleEn: "Painted pottery jar",
      titleZh: "彩陶罐",
      subEn: "Ceramics · ~5000 BP",
      subZh: "陶器 · 距今约 5000 年",
      descEn: `Red and black geometric bands on a buff body. Stylistically transitional between Yangshao and local northern traditions.`,
      descZh: `橙黄陶胎上绘红黑几何带。风格在仰韶与本地北方传统之间过渡。`,
      svg: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="56" rx="22" ry="20" fill="#c8842c" stroke="#ece5d3" stroke-width="1"/><path d="M22,42 Q40,32 58,42" fill="none" stroke="#ece5d3" stroke-width="1.4"/><path d="M22,48 L58,48" stroke="#1a2820" stroke-width="2.2"/><path d="M22,54 Q26,58 30,54 Q34,58 38,54 Q42,58 46,54 Q50,58 54,54 Q58,58 60,54" fill="none" stroke="#1a2820" stroke-width="1.2"/><rect x="32" y="34" width="16" height="6" fill="#c8842c" stroke="#ece5d3" stroke-width="0.8"/></svg>`
    },
    {
      titleEn: "Stone grinding slab",
      titleZh: "石磨盘",
      subEn: "Tools · millet processing",
      subZh: "工具 · 粟谷加工",
      descEn: `Saddle-shaped sandstone with paired hand-stone. Direct evidence of foxtail and broomcorn millet as the dominant grain staples.`,
      descZh: `鞍形砂岩磨盘配磨棒。直接证据指向粟与黍为主导谷物。`,
      svg: `<svg viewBox="0 0 80 80"><ellipse cx="40" cy="55" rx="30" ry="10" fill="#7d7e6e" stroke="#ece5d3" stroke-width="1"/><ellipse cx="40" cy="50" rx="28" ry="6" fill="#5a5a4d"/><ellipse cx="40" cy="38" rx="14" ry="5" fill="#a3a08a" stroke="#ece5d3" stroke-width="0.8"/></svg>`
    },
    {
      titleEn: "Semi-subterranean house",
      titleZh: "半地穴式房址",
      subEn: "Architecture · winter-warm",
      subZh: "建筑 · 御寒"
,
      descEn: `Pit floors 0.3–0.8 m deep, central hearth, post-holes for thatched roof. Standard northern Neolithic dwelling design.`,
      descZh: `地穴下挖 0.3–0.8 米,中央灶坑,柱洞支撑草顶。北方新石器标准居址形制。`,
      svg: `<svg viewBox="0 0 80 80"><rect x="10" y="50" width="60" height="14" fill="#3a2c1e"/><polygon points="6,50 40,18 74,50" fill="#5a4530" stroke="#ece5d3" stroke-width="1"/><polygon points="6,50 40,18 74,50" fill="none" stroke="#c8842c" stroke-width="0.8"/><circle cx="40" cy="58" r="4" fill="#c8842c"/></svg>`
    },
    {
      titleEn: "Burial assemblage",
      titleZh: "墓葬组合",
      subEn: "Ritual · cemetery",
      subZh: "礼仪 · 墓地",
      descEn: `Single inhumations in oblong pits, supine extended posture, painted-pottery jars near the head. Some burials with bone ornaments.`,
      descZh: `长方形竖穴单人葬,仰身直肢,头侧置彩陶罐。部分随葬骨饰。`,
      svg: `<svg viewBox="0 0 80 80"><rect x="14" y="22" width="52" height="40" fill="#1a2820" stroke="#ece5d3" stroke-width="1"/><rect x="20" y="28" width="40" height="28" fill="#3a2c1e"/><line x1="40" y1="28" x2="40" y2="56" stroke="#d6c9a8" stroke-width="1.2"/><circle cx="40" cy="32" r="2.5" fill="#d6c9a8"/><ellipse cx="50" cy="36" rx="3" ry="2" fill="#c8842c"/></svg>`
    },
    {
      titleEn: "Bone awl",
      titleZh: "骨锥",
      subEn: "Tools · hide-working",
      subZh: "工具 · 制革"
,
      descEn: `Polished long-bone splinters used for piercing leather. Implies textile and leather production well before the Bronze Age.`,
      descZh: `磨制长骨片,用于穿刺皮革。表明青铜时代之前已有皮革与纤维加工。`,
      svg: `<svg viewBox="0 0 80 80"><polygon points="38,12 44,12 42,68 40,68" fill="#d6c9a8" stroke="#ece5d3" stroke-width="0.8"/><circle cx="41" cy="14" r="3" fill="#d6c9a8" stroke="#ece5d3" stroke-width="0.8"/></svg>`
    },
    {
      titleEn: "Animal bone (sheep, pig, deer)",
      titleZh: "动物骨骼(羊、猪、鹿)",
      subEn: "Faunal · mixed economy",
      subZh: "动物群 · 混合经济",
      descEn: `Domestic pig and sheep dominate; wild cervids supplement. The faunal mix is the strongest single argument that this was a coupled herding-and-farming economy, not a pure farming village.`,
      descZh: `家猪与家羊为主,野生鹿科补充。这一动物组合是判定该社会为农牧耦合经济(而非纯农耕村落)的最强单项证据。`,
      svg: `<svg viewBox="0 0 80 80"><path d="M14,52 C14,38 26,30 36,32 C44,34 48,40 52,40 C60,40 66,46 64,54 C62,60 56,62 50,60 C44,58 38,62 30,60 C22,58 14,58 14,52 Z" fill="#d6c9a8" stroke="#ece5d3" stroke-width="0.8"/><circle cx="22" cy="48" r="2" fill="#1a2820"/><path d="M50,40 L52,30 L56,30" stroke="#d6c9a8" stroke-width="1.2" fill="none"/></svg>`
    },
    {
      titleEn: "Jade-like ornament",
      titleZh: "类玉饰品",
      subEn: "Exchange · long-distance",
      subZh: "交换 · 长距离"
,
      descEn: `Small green-stone disks and pendants. Raw material likely sourced from over 200 km away, indicating embedded long-distance exchange.`,
      descZh: `小型绿石圆片与坠饰。原料可能来自二百公里以外,表明已嵌入长距离交换网络。`,
      svg: `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="22" fill="#5fa8a8" stroke="#ece5d3" stroke-width="1"/><circle cx="40" cy="40" r="8" fill="#1a2820"/></svg>`
    },
    {
      titleEn: "Hearth & ash pit",
      titleZh: "灶坑与灰坑",
      subEn: "Domestic feature",
      subZh: "居址遗迹",
      descEn: `Charcoal-rich pits adjacent to dwellings — used for cooking, refuse, and occasional ritual deposits. Ash composition records the local fuelwood economy.`,
      descZh: `紧邻居室的富碳坑——兼作炊煮、垃圾、偶有仪式埋藏之用。灰分组成记录了当地的燃料-林木经济。`,
      svg: `<svg viewBox="0 0 80 80"><rect x="14" y="14" width="52" height="52" fill="#1a2820" stroke="#ece5d3" stroke-width="1"/><circle cx="40" cy="40" r="18" fill="#3a2418"/><circle cx="40" cy="40" r="11" fill="#c8842c" opacity="0.6"/><circle cx="40" cy="40" r="6" fill="#c44a4a"/></svg>`
    }
  ];
  function renderArtifacts() {
    const host = document.getElementById("artifactGrid");
    if (!host) return;
    host.innerHTML = artifacts.map(a => `
      <div class="artifact">
        <div class="ico">${a.svg}</div>
        <div class="title"><span lang="en">${a.titleEn}</span><span lang="zh">${a.titleZh}</span></div>
        <div class="sub"><span lang="en">${a.subEn}</span><span lang="zh">${a.subZh}</span></div>
        <div class="desc"><span lang="en">${a.descEn}</span><span lang="zh">${a.descZh}</span></div>
      </div>
    `).join("");
  }
  renderArtifacts();

  const miaozigouCards = [
    {
      kicker: ["Settlement structure", "聚落结构"],
      titleEn: "Clustered, not nucleated",
      titleZh: "簇状,而非高度核化",
      bodyEn: `Miaozigou is one in a regional cluster of contemporaneous sites — neighbouring villages within a day&apos;s walk. There is no obvious "central place" of the kind seen in slightly later Longshan urbanism. The settlement geometry suggests cooperation among peers rather than hierarchy under a single big village.`,
      bodyZh: `庙子沟为区域聚落群中的一员——相邻村落均在一日步程之内。没有明显的"中心地"——这种结构稍晚才在龙山城市化中出现。聚落几何形态表明同辈协作,而非单一大村下的等级。`
    },
    {
      kicker: ["Subsistence", "生计"],
      titleEn: "Millet plus herds plus hunt",
      titleZh: "粟黍 + 畜牧 + 狩猎",
      bodyEn: `Carbonized seeds, faunal assemblages, and tool wear all converge: foxtail and broomcorn millet were the staple grain; pig and sheep were the staple meat; deer and wild fowl supplemented. The economy was diversified by design, not by accident — a structural hedge against the basin&apos;s climate volatility.`,
      bodyZh: `炭化种子、动物骨骼组合与工具使用痕迹三者一致:粟与黍为主粮;家猪与家羊为主肉;鹿与水鸟为补充。这种经济多样化并非偶然,而是设计性地对冲盆地气候波动的结构性策略。`
    },
    {
      kicker: ["Cemetery", "墓地"],
      titleEn: "Hundreds of burials, modest stratification",
      titleZh: "数百座墓葬,层级温和",
      bodyEn: `Excavated burials run into the hundreds. Grave goods are differentiated — some burials contain multiple painted pots and ornaments, others almost nothing — but the gap is much narrower than at contemporary Hongshan ceremonial centers. The cemetery reads as a society with mild rank, not yet stratified into chiefly elites.`,
      bodyZh: `已发掘墓葬以百计。随葬品已分化——一些墓含多件彩陶与饰品,另一些几乎空无一物——但差距远小于同期红山礼仪中心。墓地呈现的是已有温和分级、但尚未形成酋邦化精英的社会。`
    },
    {
      kicker: ["End of occupation", "废弃"],
      titleEn: "Faded, not destroyed",
      titleZh: "渐隐,而非被毁",
      bodyEn: `There is no destruction layer at Miaozigou. Occupation thins through several centuries and the site is eventually left. This pattern matches a regional drying and re-organization of population — the same signal seen in lake-level proxies — rather than catastrophic warfare.`,
      bodyZh: `庙子沟未见毁灭层。聚落于数百年间逐渐变薄,最终废弃。该模式与区域干化和人口重组相吻合(湖面代用指标显示同一信号),而非剧烈战争所致。`
    }
  ];
  function renderMiaozigouCards() {
    const host = document.getElementById("miaozigouCards");
    if (!host) return;
    host.innerHTML = miaozigouCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderMiaozigouCards();

  // ─── Module 03 · Comparison table ────────────────────────────────
  const compRows = [
    ["Settlement", "聚落",
      "Nucleated villages on river terraces", "河阶上的核化村落",
      "Loose clusters around lake shore", "湖滨的松散村群",
      "Wet-rice paddy hamlets, water-engineered", "稻作湿田,水利工程"],
    ["Staple", "主食",
      "Millet, increasing wheat in late Neolithic", "粟黍,晚期渐入麦",
      "Millet + sheep + pig + game", "粟 + 羊 + 猪 + 野味",
      "Wet rice, fish, taro", "稻、鱼、芋"],
    ["Mobility", "流动性",
      "Low to moderate", "低至中",
      "Moderate to high", "中至高",
      "Low (paddy infrastructure anchors people)", "低(水田基建拴住人口)"],
    ["Climate exposure", "气候暴露",
      "Moderate (river buffer)", "中(河流缓冲)",
      "High (closed basin, drought-prone)", "高(封闭盆地,易旱)",
      "Moderate (monsoon variability)", "中(季风波动)"],
    ["External contacts", "对外联系",
      "Mostly intra-Yellow-River", "以黄河流域内部为主",
      "Steppe, loess plateau, forest belt", "草原、黄土、森林三向",
      "Coastal, riverine, southward", "沿海、沿江、向南"],
    ["Ritual scale", "礼仪规模",
      "Hierarchical centers (Taosi etc.)", "层级化中心(陶寺等)",
      "Modest cemeteries, painted pottery", "适度墓地,彩陶丰富",
      "Ancestor-house complexes", "宗祠—家屋复合"],
    ["Trajectory after 4.2 ka", "4200 年后走向",
      "Re-organization into proto-states", "重组为原始国家",
      "Population thinning, frontier mosaic", "人口稀薄,边疆碎化",
      "Continued rice intensification", "稻作持续集约化"]
  ];
  function renderCompTable() {
    const tbody = document.querySelector(".comp-table tbody");
    if (!tbody) return;
    tbody.innerHTML = compRows.map(r => `
      <tr>
        <td><span lang="en">${r[0]}</span><span lang="zh">${r[1]}</span></td>
        <td><span lang="en">${r[2]}</span><span lang="zh">${r[3]}</span></td>
        <td><span lang="en">${r[4]}</span><span lang="zh">${r[5]}</span></td>
        <td><span lang="en">${r[6]}</span><span lang="zh">${r[7]}</span></td>
      </tr>
    `).join("");
  }
  renderCompTable();

  // ─── Module 05 · Network cards ───────────────────────────────────
  const networkCards = [
    {
      kicker: ["Yangshao 仰韶", "5000–3000 BCE"],
      titleEn: "Loess heartland, painted-pottery core",
      titleZh: "黄土核心,彩陶腹地",
      bodyEn: `Yangshao villages spread across the central loess plateau. Their painted-pottery aesthetic — fish motifs, geometric bands, anthropomorphic faces — reaches Huangqihai by stylistic diffusion. Miaozigou pottery is not Yangshao, but it is in conversation with Yangshao.`,
      bodyZh: `仰韶村落遍布黄土高原中部。其彩陶美学——鱼纹、几何带、人面纹——以风格扩散方式抵达黄旗海。庙子沟的陶器并非仰韶,但与仰韶处于持续对话之中。`
    },
    {
      kicker: ["Hongshan 红山", "4500–3000 BCE"],
      titleEn: "Northeast jade-and-altar complex",
      titleZh: "东北玉与坛的复合体",
      bodyEn: `Hongshan to the east-northeast develops monumental ritual architecture (altars, "goddess temple") and elaborate jade carving. Miaozigou shares jade-like ornaments with Hongshan but does not produce monumental ritual centers. It sits inside the Hongshan exchange sphere as a partner, not a subordinate.`,
      bodyZh: `位于东北方的红山发展出纪念性礼仪建筑(祭坛、"女神庙")与精细玉雕。庙子沟与红山共享类玉饰品,但并未产出纪念性礼仪中心。它作为伙伴,而非附庸,位于红山交换圈之内。`
    },
    {
      kicker: ["Longshan 龙山", "3000–1900 BCE"],
      titleEn: "Walled towns and proto-urbanism",
      titleZh: "城邑与原始城市",
      bodyEn: `Longshan, slightly later than Miaozigou&apos;s peak, marks the rise of rammed-earth walled towns across the lower Yellow River. The northern frontier basin does not follow this trajectory — wall-building requires the labor concentration that the basin&apos;s mobile-mixed economy never produces.`,
      bodyZh: `龙山稍晚于庙子沟全盛期,标志夯土城邑沿黄河下游兴起。北方边疆盆地并未追随此轨迹——筑城所需的劳动力集中,在盆地的流动-混合经济中始终未能形成。`
    },
    {
      kicker: ["Miaozigou complex 庙子沟系", "3500–2800 BCE"],
      titleEn: "A regional culture in its own right",
      titleZh: "其自身意义上的区域文化",
      bodyEn: `Archaeologists today recognize a distinct Miaozigou-Daihai complex with its own pottery typology, settlement pattern, and burial conventions. It is not a sub-variant of Yangshao; it is a regional culture that participated in the wider northern Neolithic web on its own terms.`,
      bodyZh: `今日考古学已承认存在独立的庙子沟—岱海文化复合体,有其自身的陶器类型学、聚落模式与葬俗。它并非仰韶的亚型,而是以自身条件参与北方新石器更广网络的区域文化。`
    }
  ];
  function renderNetwork() {
    const host = document.getElementById("networkCards");
    if (!host) return;
    host.innerHTML = networkCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderNetwork();

  // ─── Module 06 · Steppe ↔ agriculture cards ──────────────────────
  const steppeCards = [
    {
      kicker: ["Coupling", "耦合"],
      titleEn: "Wool south, grain north",
      titleZh: "毛南下,粮北上",
      bodyEn: `Pastoralists produce protein, fat, fiber, and traction at low population density. Farmers produce calories at high density. When the two systems trade — and they almost always do — both gain in dietary stability and material range. The Huangqihai zone is one of the earliest places in East Asia where this coupling is archaeologically visible.`,
      bodyZh: `牧民在低密度下生产蛋白、脂肪、纤维与畜力;农民在高密度下生产卡路里。两者交换——几乎总是交换——双方都在膳食稳定性与物质多样性上获益。黄旗海是东亚最早可在考古上看到这一耦合的地方之一。`
    },
    {
      kicker: ["Innovation", "创新"],
      titleEn: "Why frontiers innovate faster",
      titleZh: "边疆为何创新更快"
,
      bodyEn: `Two reasons. First, contact zones import multiple toolkits side by side, so combinations are easier. Second, frontier societies face higher volatility, which selects for adaptable practice over inherited prestige. The bronze-age innovations later credited to "China" or "the steppe" alone often took shape in zones like this.`,
      bodyZh: `两点原因。其一,接触地带并列输入多套工具集,组合更易出现;其二,边疆社会面对更高波动性,因此对可适应的实践——而非继承的威望——施以选择。后来归功于"中国"或"草原"单方的青铜创新,常常正是在此类地带成形。`
    },
    {
      kicker: ["Friction", "摩擦"],
      titleEn: "Conflict is the default mode of contact",
      titleZh: "冲突是接触的默认模式",
      bodyEn: `Cooperation between mobile and settled populations is fragile. Drought tips it. Demographic surge tips it. New military technology tips it. The historical pattern in this corridor — repeated steppe-frontier wars from the Han to the Ming — has roots already visible in the Neolithic record: bone arrowheads, fortified storage, abrupt occupational shifts.`,
      bodyZh: `流动人群与定居人群的合作脆弱。旱灾会打破它,人口激增会打破它,新军事技术会打破它。该走廊上自汉至明反复发生的草原边塞战争,其根脉已可在新石器记录中看到:骨镞、加固储藏、突变的占用层。`
    },
    {
      kicker: ["Hybrid", "混合"],
      titleEn: "What a hybrid civilization actually looks like",
      titleZh: "混合型文明的实际样貌",
      bodyEn: `Not a clean blend. A patchwork. Some villages tilt agricultural; some drift seasonally with herds; some specialize in brokerage. Pottery in one village imitates a southern style; in the next village, a northeastern one. Hybrid civilizations are heterogeneous on the inside even when they look unified from outside.`,
      bodyZh: `并非干净的混合,而是斑驳的拼贴。一些村落偏农,一些随畜群季节迁移,另一些专司中介。同一区域内甲村陶器仿南风,乙村仿东北风。混合型文明从外看似统一,内部却高度异质。`
    }
  ];
  function renderSteppeCards() {
    const host = document.getElementById("steppeCards");
    if (!host) return;
    host.innerHTML = steppeCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderSteppeCards();

  // ─── Module 07 · Ritual cards ────────────────────────────────────
  const ritualCards = [
    {
      kicker: ["Burial", "葬制"],
      titleEn: "The body as social text",
      titleZh: "身体作为社会文本",
      bodyEn: `Body posture, head orientation, grave goods placement — none are random. At Miaozigou, supine extended posture with head toward the lake suggests a relationship between the dead and the basin&apos;s defining feature. Frontier societies often anchor identity to landscape because populations move; the landscape stays.`,
      bodyZh: `躯体姿势、头向、随葬品位置——皆非随机。庙子沟仰身直肢、头向湖体的葬法暗示死者与盆地核心地标的关系。边疆社会因人口流动,常将身份锚定于地景;地景不动。`
    },
    {
      kicker: ["Pottery symbolism", "陶器象征"],
      titleEn: "Symbols travel; meanings localize",
      titleZh: "符号会迁移,意义会本地化",
      bodyEn: `A geometric band on a Miaozigou pot shares formal vocabulary with Yangshao pottery 600 km away. But the same motif placed at a different position — under the lip versus around the belly — likely carried different local meanings. Style is portable; semantics is rooted.`,
      bodyZh: `庙子沟陶器的几何带与六百公里外的仰韶陶器共享形式词汇。但同一母题在不同位置——口沿之下与腹部周围——很可能负载不同的本地意义。形式是便携的,语义是根植的。`
    },
    {
      kicker: ["Ancestor cult", "祖先崇拜"],
      titleEn: "The cemetery as durable address",
      titleZh: "墓地作为持久地址",
      bodyEn: `In a mobile society, the cemetery is what proves you have a claim here. It is the institution that survives the seasonal round. Miaozigou&apos;s investment in a sustained, formally arranged cemetery is itself an argument that this was a society laying long-term territorial claim, not casually passing through.`,
      bodyZh: `对流动社会而言,墓地是证明你在此地拥有归属的东西——是能挺过季节循环的制度。庙子沟对持续而规整的墓地的投入,本身即在论证:这是一个奠定长期地缘主张的社会,而非随意经过。`
    },
    {
      kicker: ["Sacred landscape", "神圣地景"],
      titleEn: "The lake as horizon",
      titleZh: "湖体作为地平"
,
      bodyEn: `In closed basins the lake is visible from almost everywhere. It becomes the horizon — the thing one orients to. We do not have direct evidence of lake-related ritual at Miaozigou, but settlement orientation, burial direction, and later (Bronze Age and historic) cult sites in the same basin all point to a sustained sacralization of the water itself.`,
      bodyZh: `封闭盆地内湖体几乎处处可见,因而成为人们朝向的"地平"。庙子沟尚无直接的湖体崇拜证据,但聚落朝向、墓向、以及同一盆地内更晚(青铜时代与历史时期)的祭祀址,皆指向对水体本身的持久神圣化。`
    }
  ];
  function renderRitualCards() {
    const host = document.getElementById("ritualCards");
    if (!host) return;
    host.innerHTML = ritualCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderRitualCards();

  // ─── Module 08 · Simulator ───────────────────────────────────────
  const climates = {
    midHolocene: { en: "Mid-Holocene optimum (warm-wet)", zh: "全新世中期最适宜(暖湿)", base: { settle: 75, herd: 55, grain: 80, exchange: 65, risk: 30, ritual: 60 } },
    drying:      { en: "Late Neolithic drying", zh: "新石器晚期干化",                     base: { settle: 55, herd: 65, grain: 55, exchange: 60, risk: 60, ritual: 65 } },
    event42ka:   { en: "4.2 ka aridification crisis", zh: "4200 年干旱事件",              base: { settle: 30, herd: 55, grain: 30, exchange: 50, risk: 85, ritual: 75 } },
    bronzeFront: { en: "Bronze Age frontier mosaic", zh: "青铜时代边疆斑块",               base: { settle: 50, herd: 75, grain: 45, exchange: 75, risk: 60, ritual: 60 } },
    historic:    { en: "Imperial-era frontier", zh: "帝国时期边塞",                       base: { settle: 60, herd: 55, grain: 60, exchange: 70, risk: 55, ritual: 50 } }
  };
  const dimLabels = [
    ["settle",   "Settlement density",     "聚落密度"],
    ["herd",     "Pastoral capacity",      "畜牧承载"],
    ["grain",    "Grain capacity",         "谷物承载"],
    ["exchange", "External exchange",      "对外交换"],
    ["risk",     "Volatility / risk",      "波动 / 风险"],
    ["ritual",   "Ritual elaboration",     "礼仪精细度"]
  ];

  function fillSimSelects() {
    const sel = document.getElementById("simClimate");
    sel.innerHTML = Object.keys(climates).map(k =>
      `<option value="${k}">${climates[k].en} · ${climates[k].zh}</option>`
    ).join("");
  }
  fillSimSelects();

  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }

  function runSim() {
    const cKey = document.getElementById("simClimate").value;
    const rain = +document.getElementById("simRain").value;
    const lake = +document.getElementById("simLake").value;
    const mix  = +document.getElementById("simMix").value;
    const move = +document.getElementById("simMove").value;
    const c = climates[cKey];

    const grain = clamp(c.base.grain + (rain - 50) * 0.4 + (lake - 50) * 0.2 + (50 - mix) * 0.3);
    const herd  = clamp(c.base.herd + (mix - 50) * 0.4 + (50 - rain) * 0.2 + (move - 50) * 0.15);
    const settle = clamp(c.base.settle + (rain - 50) * 0.3 + (lake - 50) * 0.3 - (move - 50) * 0.25 + (grain - 50) * 0.15);
    const exchange = clamp(c.base.exchange + (move - 50) * 0.4 + (mix - 50) * 0.2);
    const risk = clamp(c.base.risk + (50 - rain) * 0.4 + (50 - lake) * 0.3 - (move - 50) * 0.2);
    const ritual = clamp(c.base.ritual + risk * 0.15 + exchange * 0.1 - 10);

    const scores = { settle, herd, grain, exchange, risk, ritual };
    const bars = dimLabels.map(d => `
      <div class="bar">
        <span><span lang="en">${d[1]}</span><span lang="zh">${d[2]}</span></span>
        <span class="meter"><i style="width:${scores[d[0]]}%"></i></span>
        <span class="v">${scores[d[0]]}</span>
      </div>
    `).join("");
    document.getElementById("simBars").innerHTML = bars;

    const en = `Climate <strong>${c.en}</strong>. Rainfall ${rain}, lake ${lake}, herd-grain mix ${mix}, mobility ${move}. Settlement density ${settle}, herd ${herd}, grain ${grain}, exchange ${exchange}, risk ${risk}, ritual ${ritual}. Notice the trade-off: high mobility raises exchange and lowers risk, but compresses settlement density. Frontier societies live inside this trade.`;
    const zh = `气候 <strong>${c.zh}</strong>。降水 ${rain},湖面 ${lake},农牧比 ${mix},流动性 ${move}。聚落 ${settle},牧 ${herd},粮 ${grain},交换 ${exchange},风险 ${risk},礼仪 ${ritual}。注意权衡:高流动性提升交换、降低风险,但压缩聚落密度。边疆社会一直在这个权衡内运转。`;
    document.getElementById("simReadout").innerHTML = `<span lang="en">${en}</span><span lang="zh">${zh}</span>`;
  }
  ["simClimate", "simRain", "simLake", "simMix", "simMove"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", runSim);
    el.addEventListener("change", runSim);
  });
  runSim();

  // ─── Module 09 · Long-term history cards ─────────────────────────
  const historyCards = [
    {
      kicker: ["Bronze Age", "青铜时代"],
      titleEn: "From Miaozigou complex to bronze pastoralists",
      titleZh: "从庙子沟系到青铜牧民",
      bodyEn: `After 4.2 ka, the basin&apos;s population thins and reorganizes. By the second millennium BCE, bronze tools and animal-style art appear in the region. The successor population is more pastorally weighted than Miaozigou — a structural drift driven by the longer-term drying.`,
      bodyZh: `4200 年事件后,盆地人口稀薄并重组。公元前二千纪,青铜工具与动物纹艺术出现于该区域。后继人群较庙子沟更偏牧——长期干化驱动的结构性漂移。`
    },
    {
      kicker: ["Han · Northern Wei", "汉 · 北魏"],
      titleEn: "Imperial frontier installations",
      titleZh: "帝国边疆设施"
,
      bodyEn: `From the Han onward, the basin sits inside the imperial frontier defense system. Walls, garrisons, agricultural colonies are layered onto the earlier mosaic. Northern Wei (4–6th c. CE) used nearby Datong as capital, treating the basin as a strategic forward zone.`,
      bodyZh: `自汉以降,盆地纳入帝国边防体系。城障、戍卒、屯田叠加于早期斑块之上。北魏(公元 4–6 世纪)以邻近大同为都,视该盆地为战略前沿区。`
    },
    {
      kicker: ["Ming · Qing", "明 · 清"],
      titleEn: "Wall, market, league",
      titleZh: "长城、马市、盟旗",
      bodyEn: `Ming Great Wall logistics ran south of the basin; horse markets and tribute routes ran across it. Under the Qing, the area was organized into the Mongol league-banner system, codifying the same ecological frontier into administrative terms — pastoral north, agricultural south, controlled traffic between.`,
      bodyZh: `明长城后勤线在盆地之南;马市与朝贡路线贯穿其上。清代将该地区编入蒙古盟旗体系,把相同的生态边疆以行政术语固定下来——北牧南农、流动受控。`
    },
    {
      kicker: ["Modern", "当代"],
      titleEn: "Reclamation, retreat, restoration",
      titleZh: "开垦、退耕、修复",
      bodyEn: `Twentieth-century reclamation pushed agriculture into marginal grassland; in recent decades the reverse — Grain-for-Green programs, ecological retreat, partial lake restoration — has taken hold. The basin is once again being re-ecologized, this time deliberately. The frontier is still in motion.`,
      bodyZh: `二十世纪开垦把农业推入边缘草原;近几十年发生逆转——退耕还草、生态修复、湖体局部恢复。盆地正在被重新生态化,而这一次出于有意为之。边疆仍在移动。`
    }
  ];
  function renderHistory() {
    const host = document.getElementById("historyCards");
    if (!host) return;
    host.innerHTML = historyCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderHistory();

  // ─── Module 10 · Frontier theory cards ───────────────────────────
  const theoryCards = [
    {
      kicker: ["Thesis", "命题"],
      titleEn: "Cores assimilate; frontiers invent",
      titleZh: "核心同化;边疆发明",
      bodyEn: `A core has scale, surplus, and centralized memory — strong drivers of refinement, weak drivers of novelty. A frontier has neither scale nor inherited prestige; it has heterogeneity. Heterogeneity is the cheap precondition for combinatorial invention.`,
      bodyZh: `核心拥有规模、剩余与集中化记忆——精炼的强驱动,新颖的弱驱动。边疆既无规模,也无继承的威望,它拥有的是异质性。异质性是组合性发明最廉价的前提条件。`
    },
    {
      kicker: ["Cases", "案例"],
      titleEn: "Where the historical evidence points",
      titleZh: "历史证据所指",
      bodyEn: `Bronze metallurgy: contact zone between agricultural Mesopotamia and pastoral Eurasia. Wheel: Pontic steppe between farming Europe and pastoral Asia. Mounted archery: contact between settled and steppe. Paper money: Song Sichuan, on the empire&apos;s edge with merchant networks. Pattern: not the cores, the contact zones.`,
      bodyZh: `青铜冶金:农耕美索不达米亚与游牧欧亚的接触带。车轮:在农耕欧洲与游牧亚洲之间的庞蒂草原。骑射:定居与草原的接触带。纸币:宋代四川,帝国边缘的商人网络。模式:并非核心,而是接触地带。`
    },
    {
      kicker: ["Boundary condition", "边界条件"],
      titleEn: "Frontiers can also be killing fields",
      titleZh: "边疆也可是屠宰场"
,
      bodyEn: `The romantic version of frontier theory imagines bustling exchange. The real version includes raids, disease pools, asymmetric collapse. Frontiers innovate fastest precisely when contact is fierce; the cost is borne by the people in the contact zone. We hold both sides of this in view.`,
      bodyZh: `边疆理论的浪漫版想象热闹交换;真实版包括劫掠、疾病池、不对称崩溃。边疆创新最快之时正值接触最烈之时;代价由接触地带的人承担。我们同时持守这两面。`
    },
    {
      kicker: ["Implication", "推论"],
      titleEn: "What this means for reading Miaozigou",
      titleZh: "对庙子沟的解读意涵",
      bodyEn: `Miaozigou is not a backwater. It is also not the secret origin of anyone. It is one well-preserved instance of a contact-zone society doing what contact-zone societies do — combining, hedging, ritualizing, eventually thinning when conditions break. Read at this register, the site stops being marginal and becomes informative.`,
      bodyZh: `庙子沟不是落后地带,也不是任何群体的秘密起源。它是一个保存良好的接触地带社会案例,做着接触地带社会一直在做的事——组合、对冲、仪礼化、当条件破裂时最终变薄。在此频率上阅读,该遗址不再边缘,而是富于信息。`
    }
  ];
  function renderTheory() {
    const host = document.getElementById("theoryCards");
    if (!host) return;
    host.innerHTML = theoryCards.map(c => `
      <div class="card">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }
  renderTheory();

  // ─── AI archaeologist ────────────────────────────────────────────
  const aiCanned = [
    {
      qEn: "What kind of place was Huangqihai 5500 years ago?",
      qZh: "5500 年前的黄旗海是怎样的地方?",
      aEn: `<p><em>Archaeologist · environmental sketch</em></p>
        <p>A shallow, slightly saline lake of perhaps 100–200 km² at its Mid-Holocene high stand, surrounded by reed marshes, watered by several seasonal streams off the Yin Mountains and the southern Greater Khingan piedmont.</p>
        <p>Around the lake: open steppe to the north, mixed broadleaf forest on the eastern slopes, loess-piedmont grassland to the south. A traveller standing at Miaozigou would have seen — within a day&apos;s walk — at least three radically different ecologies. That is the basin&apos;s defining gift, and its defining trap.</p>
        <p>Climatically, this was the wettest the basin had been in millennia. Within a thousand years the trend reversed.</p>`,
      aZh: `<p><em>考古学家 · 环境素描</em></p>
        <p>一个浅咸水湖,在全新世中期最高水位时面积或在 100–200 平方公里之间,湖周苇沼遍布,由阴山与大兴安岭南麓的若干季节性溪流补给。</p>
        <p>湖周:北为开阔草原,东坡为混交阔叶林,南为黄土山前草地。站在庙子沟的旅人,一日步程之内可见至少三种迥异生态。这是盆地的赠礼,也是其陷阱。</p>
        <p>气候上,这是该盆地数千年中最湿润的时段。一千年后,趋势逆转。</p>`
    },
    {
      qEn: "What did people at Miaozigou eat?",
      qZh: "庙子沟人吃什么?",
      aEn: `<p><em>Archaeologist · subsistence answer</em></p>
        <p>The carbonized seed assemblage is dominated by foxtail millet (<em>Setaria italica</em>) and broomcorn millet (<em>Panicum miliaceum</em>) — the staple grains of northern China at this period. No rice, no wheat at this stage.</p>
        <p>The animal bones tell a coupled story: domestic pig and domestic sheep dominate, with deer and small game adding seasonally. Stable-isotope work in comparable northern sites suggests millet-fed pig — i.e. animals being supported by the agricultural system, not roaming wild.</p>
        <p>So: millet porridge, pork, mutton, occasional deer. A diet that hedges against any single failure mode.</p>`,
      aZh: `<p><em>考古学家 · 生计答复</em></p>
        <p>炭化种子组合以粟(<em>Setaria italica</em>)与黍(<em>Panicum miliaceum</em>)为主——为该时期中国北方主粮。此阶段无稻、无麦。</p>
        <p>动物骨骼讲述耦合故事:家猪与家羊为主,鹿与小型猎物季节性补充。可比北方遗址的稳定同位素研究表明,家猪以粟饲养——亦即动物受农业系统支撑,而非自由觅食。</p>
        <p>因此:粟黍粥、猪肉、羊肉、偶有鹿肉。这是对单一失败模式的对冲性膳食。</p>`
    },
    {
      qEn: "Why did Miaozigou fade?",
      qZh: "庙子沟为何衰落?",
      aEn: `<p><em>Archaeologist · multi-causal answer</em></p>
        <p>There is no destruction layer. The site simply thins through several centuries and is left. The leading hypothesis, supported by lake-sediment cores and contemporaneous evidence across north Asia, is regional drying culminating in the 4.2 ka aridification event.</p>
        <p>What does drying do to a basin society? Three things at once: <strong>(a)</strong> the lake contracts, exposing salty flats and shrinking the wetland resource; <strong>(b)</strong> millet harvests become more variable; <strong>(c)</strong> grasslands shift, favoring more mobile herding strategies.</p>
        <p>The response is not collapse — it is reorganization. Population thins, becomes more pastoral, the fixed-village settlement pattern of Miaozigou no longer fits. The successor culture is recognizably descended from this one, just with different geometry.</p>`,
      aZh: `<p><em>考古学家 · 多因答复</em></p>
        <p>遗址未见毁灭层,而是数百年间逐渐变薄、最终废弃。主流假说由湖泊岩芯与北亚同期证据支撑:区域干化,最终于 4200 年事件达到顶点。</p>
        <p>干化对盆地社会做什么?三件事同时发生:<strong>(a)</strong> 湖体收缩,盐滩外露,湿地资源减少;<strong>(b)</strong> 粟黍收成波动加大;<strong>(c)</strong> 草原带迁移,有利于更流动的牧业策略。</p>
        <p>回应不是崩溃,而是重组。人口稀薄,更偏牧业,庙子沟那种定居村落格局不再适配。后继文化在血脉上仍可识别为此一脉相承,只是几何形态不同。</p>`
    },
    {
      qEn: "Was Miaozigou a sub-variant of Yangshao?",
      qZh: "庙子沟是仰韶的亚型吗?",
      aEn: `<p><em>Archaeologist · taxonomic answer</em></p>
        <p>Older mid-twentieth-century literature sometimes treated it that way. The current consensus is no — Miaozigou belongs to a regional culture (often called Miaozigou-Daihai complex) that is in conversation with Yangshao but distinct from it.</p>
        <p>Markers of the difference: pottery typology (Miaozigou jars have specific rim and body conventions), settlement pattern (lake-rim cluster, not loess-terrace nucleated village), faunal economy (much higher pastoral component), burial conventions. Take any one of these in isolation and you might call it Yangshao-influenced; take them together and the local signal is unmistakable.</p>
        <p>The interesting question stops being &quot;is it Yangshao?&quot; and becomes &quot;what kind of culture was it?&quot; That is what Module 5 maps.</p>`,
      aZh: `<p><em>考古学家 · 分类学答复</em></p>
        <p>20 世纪中期较早文献有时如此处理。当前共识是:不是——庙子沟属于一个区域文化(常称庙子沟—岱海文化复合体),与仰韶有对话但与其有别。</p>
        <p>差异标志:陶器类型学(庙子沟陶罐有特定的口沿与器体规范)、聚落形态(湖滨村群,而非黄土阶地核化村落)、动物经济(牧业成分更高)、葬俗。任取其一可称仰韶影响;诸特征合起来,本地信号就难以忽视。</p>
        <p>有趣的问题已不再是"它是不是仰韶",而是"它是怎样的文化"。模块 5 即在描绘这一点。</p>`
    },
    {
      qEn: "What does this site mean for the &quot;origin of Chinese civilization&quot; debate?",
      qZh: `此遗址对"中华文明起源"之辩有何意义?`,
      aEn: `<p><em>Archaeologist · meta-answer</em></p>
        <p>Two reframings, both unfashionable in different directions.</p>
        <p>First: there is no single origin point. The mid-twentieth-century &quot;monogenesis&quot; story (Yellow River → everything) has been replaced by an archaeology of multiple regional cultures interacting — Yangshao, Hongshan, Liangzhu, Daxi, Dawenkou, Miaozigou. Civilization in this region emerges polycentrically, then fuses, then cycles.</p>
        <p>Second: the northern frontier zone, including Huangqihai, was not a recipient of southern culture. It was a contributor. Pastoral knowledge, animal-style art, certain metalworking traditions, possibly elements of script-precursor symbolism — all flow southward at points. Treating the basin as a colonized periphery flattens its actual role.</p>
        <p>So: Miaozigou is a small piece of a polycentric, bidirectional story. It is not the origin of Chinese civilization. It is one of the places Chinese civilization came from.</p>`,
      aZh: `<p><em>考古学家 · 元层答复</em></p>
        <p>两种皆不讨巧的重构,方向相反。</p>
        <p>其一:不存在单一起源点。20 世纪中期"一元起源"叙事(黄河 → 一切)已被多区域文化互动的考古学所取代——仰韶、红山、良渚、大溪、大汶口、庙子沟。该地区的文明以多中心方式出现,继而融合,继而循环。</p>
        <p>其二:北方边疆带(含黄旗海)并非南方文化的被殖者。它是贡献者。牧业知识、动物纹艺术、某些金属工艺、可能的符号前身要素——都在某些时刻南下流动。把盆地当作被殖民的外围,会抹平其真实角色。</p>
        <p>因此:庙子沟是一个多中心、双向故事中的一小片。它不是中华文明的起源。它是中华文明从其中走出来的地方之一。</p>`
    }
  ];

  function renderPrompts() {
    const host = document.getElementById("aiPrompts");
    if (!host) return;
    host.innerHTML = aiCanned.map((c, i) => `
      <button class="ai-prompt" data-idx="${i}">
        <span lang="en">${c.qEn}</span><span lang="zh">${c.qZh}</span>
      </button>
    `).join("");
    host.querySelectorAll(".ai-prompt").forEach(b => {
      b.addEventListener("click", () => {
        const idx = +b.dataset.idx;
        const c = aiCanned[idx];
        document.getElementById("aiOutput").innerHTML =
          `<span lang="en">${c.aEn}</span><span lang="zh">${c.aZh}</span>`;
      });
    });
  }
  renderPrompts();

  function freeTextAnswer(qRaw) {
    const q = qRaw.toLowerCase();
    const lang = root.getAttribute("data-lang") || "en";

    const matches = [];
    aiCanned.forEach(c => {
      const en = c.qEn.toLowerCase();
      const zh = c.qZh;
      let score = 0;
      en.split(/\s+/).forEach(w => { if (w.length > 3 && q.includes(w)) score++; });
      [...zh].forEach(ch => { if (q.includes(ch)) score++; });
      if (score) matches.push({ c, score });
    });
    matches.sort((a, b) => b.score - a.score);
    if (matches.length && matches[0].score >= 2) {
      return lang === "zh" ? matches[0].c.aZh : matches[0].c.aEn;
    }

    const topics = [
      { kw: ["pottery", "彩陶", "陶器"],
        en: `Miaozigou pottery is mostly handmade, low-fired, and decorated with red and black geometric bands on a buff body. Its closest stylistic conversation partner is Yangshao to the south, but the rim and body conventions are local. Pottery is the single most diagnostic class of artifact — that is why archaeologists weight it so heavily.`,
        zh: `庙子沟陶器多为手制低温烧造,橙黄陶胎上绘红黑几何带。其风格对话最近者为南方的仰韶,但口沿与器体规范本地化。陶器是单项最具诊断价值的器类——这是考古学家如此倚重之故。` },
      { kw: ["climate", "气候", "drought", "干旱"],
        en: `The Mid-Holocene optimum (~7–5 ka BP) was warm and wet across north Asia; lake levels at Huangqihai sat near their highest. After ~5 ka the trend reverses, accelerating into the global 4.2 ka aridification. Lake-sediment cores at Daihai and Huangqihai both record this signal cleanly.`,
        zh: `全新世中期最适宜期(距今 7000–5000 年)在北亚普遍温暖湿润;黄旗海湖面接近最高。约 5000 年后趋势逆转,加速演变为全球性的 4200 年干旱事件。岱海与黄旗海岩芯均干净记录这一信号。` },
      { kw: ["jade", "玉"],
        en: `Jade-like green-stone ornaments at Miaozigou are smaller and less elaborate than Hongshan jade, but their existence at all is significant: it implies long-distance procurement networks, since the raw stone is not local to the basin.`,
        zh: `庙子沟的类玉绿石饰品体量与精度均不及红山玉器,但其存在本身已具意义:它意味着长距离原料采办网络——因为该石材非盆地本地所产。` },
      { kw: ["hongshan", "红山"],
        en: `Hongshan was a contemporaneous neighbour to the northeast, famous for its monumental ritual landscape (altars, the &quot;goddess temple&quot;) and exquisite jade. Miaozigou shares some material vocabulary with Hongshan but does not produce monumental ritual centers — the two cultures are cousins, not parent-and-child.`,
        zh: `红山是同时期的东北邻居,以纪念性礼仪景观(祭坛、"女神庙")与精美玉器著称。庙子沟与红山共享部分物质词汇,但未产出纪念性礼仪中心——两者是表亲,而非亲子。` }
    ];
    for (const t of topics) {
      if (t.kw.some(k => q.includes(k.toLowerCase()))) {
        return lang === "zh" ? `<p><em>考古学家 · 主题答复</em></p><p>${t.zh}</p>` : `<p><em>Archaeologist · topic answer</em></p><p>${t.en}</p>`;
      }
    }

    return lang === "zh"
      ? `<p><em>考古学家 · 一般答复</em></p>
         <p>这一问题没有直接对应的预设回答。我可以从环境、生计、葬俗、外部联系四个维度重新组合,但不会越过证据虚构断言。</p>
         <p>把问题落实到具体器类、具体年代或具体邻近文化,我能给出更结构化的回答。</p>`
      : `<p><em>Archaeologist · general answer</em></p>
         <p>I do not have a directly matching canned answer. I can re-combine across four dimensions — environment, subsistence, burial, external contact — but I will not invent claims past the evidence.</p>
         <p>Ground the question in a specific artifact class, period, or neighbouring culture and I can give a more structured answer.</p>`;
  }

  document.getElementById("aiSend").addEventListener("click", () => {
    const v = document.getElementById("aiInput").value.trim();
    if (!v) return;
    document.getElementById("aiOutput").innerHTML = freeTextAnswer(v);
  });
  document.getElementById("aiInput").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("aiSend").click();
  });

})();
