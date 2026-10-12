const main = document.querySelector('#main');
let slideTimer;
let disposeSlideshow = () => {};
let observers = [];
let scrollCleanup = () => {};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const profile = {
  intro: '视觉传达设计专业硕士，平面设计师。深耕品牌视觉体系搭建、大型项目主视觉设计与空间视觉延展，擅长从品牌商业目标推导视觉策略，具备从概念到落地的全链路设计能力，输出兼具市场效力与专业质感的方案。能力覆盖品牌系统、信息可视化、动态影像及AI生成等，持续突破商业设计的审美边界与传播效能',
  introEn: 'A master’s candidate in Visual Communication Design and a graphic designer. I build brand visual systems, key visuals for large-scale projects, and spatial graphics. Translating business objectives into visual strategy, I take projects from concept to production, combining commercial impact with refined execution. My practice spans brand systems, information visualization, motion design, and AI generation, continually exploring new aesthetic and communicative possibilities in commercial design.',
  about: '视觉传达设计专业硕士，实战型平面设计师。精通主视觉设计、空间视觉设计、品牌全案设计、信息设计、字体设计等内容，熟练掌握各类设计制造工艺、设计规范与生产标准，可独立完成从需求对接至成品交付落地的全流程，精准把控设计品质，高效输出高完成度、高质量的作品。',
  aboutEn: 'A master’s candidate in Visual Communication Design and a practice-driven graphic designer. My expertise encompasses key visuals, spatial graphics, comprehensive brand design, information design, and typography. With a thorough understanding of fabrication techniques, design specifications, and production standards, I independently manage the entire process—from briefing to final delivery—maintaining precise quality control and delivering highly resolved, high-quality work efficiently.',
  email: '1647123948@qq.com', phone: '13372529802', wechat: 'SanMuDesign', location: '浙江 杭州',
  // Add the supplied portrait here when it is available, e.g. 'assets/portrait.jpg'.
  portrait: 'assets/portrait.png'
};
const awards = [
  ['第三届全国大学生美术作品展 入展', 'Selected — 3rd National Exhibition of Fine Art by University Students'],
  ['第十届未来之星全国大学生作品展 入展', 'Selected — 10th Future Stars National University Student Exhibition'],
  ['白金创意国际大学生平面设计大赛 铜奖', 'Bronze Award — Platinum Originality International University Students Graphic Design Competition'],
  ['山西设计奖 银奖', 'Silver Award — Shanxi Design Award'],
  ['中国大学生计算机设计大赛 国家级一等奖', 'National First Prize — Chinese Collegiate Computing Competition'],
  ['东方设计奖 · 全国高校创新设计大赛 国家级一等奖 ×2', '2 National First Prizes — Oriental Design Award · National University Innovation Design Competition'],
  ['全国大学生广告艺术大赛 ×2（国家级二等奖、国家级优秀奖）', 'National Second Prize & National Excellence Award — National College Student Advertising Art Competition'],
  ['米兰设计周高校设计作品展 ×2（国家级二等奖、国家级三等奖）', 'National Second & Third Prizes — Milan Design Week · University Design Exhibition'],
  ['未来设计师 · 全国高校数字艺术设计大赛 国家级二等奖 ×3', '3 National Second Prizes — Future Designer · National University Digital Art & Design Awards'],
  ['米兰设计周高校设计作品展 省级一等奖 ×2', '2 Provincial First Prizes — Milan Design Week · University Design Exhibition'],
  ['未来设计师 · 全国高校数字艺术设计大赛 省级一等奖 ×3', '3 Provincial First Prizes — Future Designer · National University Digital Art & Design Awards'],
  ['浙江省大学生计算机设计大赛 省级一等奖', 'Provincial First Prize — Zhejiang Collegiate Computing Competition'],
  ['浙江省大学生广告创意设计竞赛 ×2（省级二等奖、省级三等奖）', 'Provincial Second & Third Prizes — Zhejiang University Student Advertising & Creative Design Competition'],
  ['东方创意之星 省级三等奖', 'Provincial Third Prize — Oriental Creative Star'],
  ['更多奖项正在收获中......', 'More recognition is on the way......']
];
const capabilities = [
  ['主视觉/空间视觉','Key Visuals / Spatial Graphics'], ['信息可视化传达','Information Visualization'],
  ['品牌全套视觉','Brand Visual Systems'], ['字体设计','Typography'], ['版式编排','Editorial Layout'],
  ['插图艺术','Illustration'], ['Ui/Ux设计','UI / UX Design'], ['交互设计','Interaction Design'],
  ['动态动效影像','Motion Design & Film'], ['AI生成','AI Generation']
];
const software = ['Adobe Illustrator','Adobe Photoshop','Adobe InDesign','Figma','Adobe Premiere Pro','Adobe After Effects','Processing','AI softwares'];
const experience = [
  ['2023/10–2023/12','杭州赫塞文化有限公司','品牌设计师','为正泰集团设计了一系列品牌视觉，包括包装、主视觉等设计，并制作各类海报、动态动效视频。最后进行各类效果图、衍生品的设计制作。'],
  ['2024/04–2024/07','杭州安吉九亩生态农业有限公司','市场部设计师','高效输出视觉概念稿及品牌视觉策略，进行完整的品牌全套视觉设计。'],
  ['2026/06–2026/09','时空节拍（杭州）科技有限公司','AI平面设计师','负责公司主视觉与空间视觉设计，输出主视觉、空间视觉、品牌全套视觉、信息图表及动态动效等设计内容。']
];
function home() {
  return `<section class="hero hero-v2">
    <div class="hero-images" aria-hidden="true">${heroProjects.map((p,i)=>`<div class="hero-slide ${i===0?'visible':''}" data-project="${p.id}" data-background="${heroImageSource(p)}" ${i===0?`style="background-image:url('${heroImageSource(p)}')"`:""}></div>`).join('')}</div>
    <div class="hero-bios"><p class="bio-en" lang="en">${profile.introEn}</p><p class="bio-cn">${profile.intro}</p></div>
    <div class="hero-identity">
      <div class="name-area"><div class="name-print-group" data-print><h1 class="print-line">SanMu<span class="registered">®</span></h1><div class="cn-name-row"><h2 class="hero-cn print-line">林俊杰</h2><p class="name-discipline">主视觉 / 信息传达 / 字体设计</p></div></div>
      <address class="hero-contact"><div><span>邮箱/Email：</span><a href="mailto:${profile.email}">${profile.email}</a></div><div><span>电话/Phone：</span><a href="tel:${profile.phone}">${profile.phone}</a></div><div><span>地址/Location：</span><span>${profile.location}</span></div></address></div>
      <aside class="hero-awards"><h2>部分奖项荣誉</h2><ul><li>第三届全国大学生美术作品展</li><li>第十届未来之星全国大学生作品展</li><li>白金创意国际大学生平面设计大赛</li><li>中国大学生计算机设计大赛</li><li>全国大学生广告艺术大赛</li><li>米兰设计周高校设计作品展</li><li>未来设计师全国高校设计大赛</li></ul></aside>
    </div>
    <nav class="hero-actions" aria-label="探索作品与设计师"><a href="#/work"><span>查看作品</span><small>View Works</small><i aria-hidden="true">↗</i></a><a href="#/about"><span>关于设计师</span><small>About Designer</small><i aria-hidden="true">↗</i></a><a href="#/contact"><span>联系设计师</span><small>Contact Designer</small><i aria-hidden="true">↗</i></a></nav>
    <div class="hero-bottom"><a class="scroll-link mono" href="#selected">SCROLL TO EXPLORE <span>↓</span></a><div class="slide-controls"><span id="slide-number" class="mono">01 / ${String(heroProjects.length).padStart(2,'0')}</span><div class="slide-buttons">${heroProjects.map((p,n)=>`<button aria-label="背景作品 ${n+1}：${p.title}" aria-pressed="${n===0}" class="${n===0?'active':''}" data-slide="${n}"></button>`).join('')}</div><button class="pause-btn" id="pause-slide" aria-label="暂停背景轮播">暂停</button></div></div>
  </section><section id="selected"><div class="section-intro"><div><p class="eyebrow">01 / SELECTED WORK</p><h2>精选作品</h2></div><a class="text-link" href="#/work">全部作品 <span>↗</span></a></div><div class="works-grid featured-grid fixed-columns" id="home-grid">${projectColumns(featuredColumns)}</div><div class="selected-footer"><p class="project-preview-note">更多作品期待您的品鉴......</p><a class="text-link" href="#/work"><span class="link-label">查看完整作品集</span><span class="link-arrow" aria-hidden="true">↗</span></a></div></section><section class="home-outro"><p>好的设计，<br><span>从一次对话开始。</span></p><a class="text-link" href="#/contact"><span class="link-label">保持联系</span><span class="link-arrow" aria-hidden="true">↗</span></a></section>`;
}
function startSlideshow() {
  const slides=[...document.querySelectorAll('.hero-slide')];
  const buttons=[...document.querySelectorAll('[data-slide]')];
  const pause=document.querySelector('#pause-slide');
  let current=0, paused=reducedMotion.matches, disposed=false, request=0;
  disposeSlideshow=()=>{disposed=true;request++;clearInterval(slideTimer)};
  async function show(index) {
    if (disposed || index===current) return;
    const ticket=++request;
    const slide=slides[index];
    if (!slide.dataset.loaded) {
      const image=new Image();image.decoding='async';image.src=slide.dataset.background;
      try { await image.decode(); } catch { return; }
      if (disposed || ticket!==request) return;
      slide.style.backgroundImage=`url('${slide.dataset.background}')`;
      slide.dataset.loaded='true';
    }
    slides[current].classList.remove('visible');buttons[current].classList.remove('active');buttons[current].setAttribute('aria-pressed','false');
    current=index;slides[current].classList.add('visible');buttons[current].classList.add('active');buttons[current].setAttribute('aria-pressed','true');
    document.querySelector('#slide-number').textContent=`${String(current+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }
  function setTimer() {
    clearInterval(slideTimer);
    if (!paused) slideTimer=setInterval(()=>{if(!document.hidden)show((current+1)%slides.length)},6500);
    pause.textContent=paused?'播放':'暂停';pause.setAttribute('aria-label',paused?'播放背景轮播':'暂停背景轮播');
  }
  buttons.forEach(button=>button.onclick=()=>{show(Number(button.dataset.slide));setTimer()});
  pause.onclick=()=>{paused=!paused;request++;setTimer()};
  setTimer();
}

const projects = suppliedProjects;
const featuredProjects = ['xianyuanzhi','zhongguozhimai','xunmai','kanjianzhongguo','caomuyan','sanfu','dongtinglihei'].map(id=>projects.find(p=>p.id===id));
const featuredColumns = [featuredProjects.slice(0,3),featuredProjects.slice(3)];
const portfolioColumns = [
  ['xianyuanzhi','zhongguozhimai','caomuyan','dongtinglihei','yuyin'],
  ['meiyu-activity','meiyu-exhibition','xunmai','kanjianzhongguo','youyunti','sanfu','suyuanshijing']
].map(ids=>ids.map(id=>projects.find(p=>p.id===id)));
const heroProjects = ['xianyuanzhi','xunmai','caomuyan','dongtinglihei','zhongguozhimai','kanjianzhongguo'].map(id=>projects.find(p=>p.id===id));
const categories = [['all','全部作品'],['keyvisual','主视觉设计'],['information','信息可视化'],['brand','品牌设计'],['spatial','空间视觉'],['type','字体设计'],['editorial','书籍版式'],['uiux','Ui/Ux设计'],['other','其他']];
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function card(p) {
  return featuredCard(p);
}
function projectColumns(columns) {
  return columns.map(column=>`<div class="project-column">${column.map(card).join('')}</div>`).join('');
}
function featuredCard(p) {
  const cover=p.cardCover || p.gallery[0];
  return `<div class="project-reveal reveal-item" data-project="${p.id}"><a class="project-card original-work featured-card" href="#/project/${p.id}" aria-label="查看${escapeHtml(p.title)}">
    <div class="image-wrap artwork-protected">${artworkImage(cover.src,cover.alt,cardImageSizes)}</div>
    <span class="card-arrow" aria-hidden="true">↗</span>
    <div class="card-meta"><div class="featured-title"><h3>${escapeHtml(p.title)}</h3><p class="caption-en" lang="en">${escapeHtml(p.english)}</p></div>
      <div class="featured-info"><p class="caption-category">${p.label} — ${p.year}</p><p class="caption-en" lang="en">${p.labelEnglish} — ${p.year}</p><p class="caption-client">${escapeHtml(p.featuredClient)}</p><p class="caption-en" lang="en">${escapeHtml(p.featuredClientEnglish)}</p></div>
    </div></a></div>`;
}
function portfolio(category='all') {
  if(!categories.some(c=>c[0]===category)) category='all';
  const filtered=projects.filter(p=>category==='all'||p.category===category);
  return `<section class="inner-page portfolio-page"><div class="page-heading"><div><p class="eyebrow">02 / PORTFOLIO</p><h1 class="page-title">作品，是我的表达。<br><span>Selected works.</span></h1></div><p class="aside">从视觉策略到落地呈现，<br>在不同媒介中探索设计的可能。</p></div><nav class="filters" aria-label="作品类别">${categories.map(([id,label])=>`<a href="#/work${id==='all'?'':'/'+id}" class="${category===id?'selected':''}" ${category===id?'aria-current="page"':''}>${label}<small>${String(id==='all'?projects.length:projects.filter(p=>p.category===id).length).padStart(2,'0')}</small></a>`).join('')}</nav><div class="works-grid portfolio-grid ${category==='all'?'fixed-columns':''}" aria-label="${categories.find(c=>c[0]===category)[1]}">${category==='all'?projectColumns(portfolioColumns):filtered.map(card).join('')}</div>${filtered.length?'<p class="project-preview-note">更多作品期待您的品鉴......</p>':'<div class="works-empty"><p class="empty-title">此类别作品整理中</p><p class="empty-title-en" lang="en">Works in this category are being curated.</p><span class="empty-note">新的设计项目即将呈现</span><span class="empty-note-en" lang="en">New design projects are coming soon.</span></div>'}</section>`;
}
function about() {
  const portrait=profile.portrait?artworkImage(profile.portrait,'林俊杰个人照片','(max-width: 700px) 270px, 310px',true,'portrait'):'<div class="portrait-placeholder"><span>个人照片</span><small>PORTRAIT / 待补充</small></div>';
  return `<section class="inner-page about-page"><div class="page-heading"><div><p class="eyebrow">01 / ABOUT ME</p><h1 class="page-title">保持好奇。<br><span>让想法生长。</span></h1></div><p class="aside">视觉传达设计专业硕士<br>主视觉 / 空间视觉 / 品牌设计</p></div>
    <div class="about-lead"><div class="about-identity"><div class="portrait-wrap artwork-protected reveal-item" data-repeat>${portrait}</div><div class="about-name reveal-item" data-repeat><span class="about-wordmark">SanMu</span><small>林俊杰</small><span class="mono">THOUGHTFUL BY DESIGN.</span></div></div><div class="about-copy"><h2>在秩序中寻找变化，<br>在日常中发现灵感。</h2><p class="about-cn">${profile.about}</p><p class="about-en" lang="en">${profile.aboutEn}</p></div></div>
    <section class="capability-section"><div class="capability-content"><h2>综合设计素质<small>COMPREHENSIVE DESIGN EXPERTISE</small></h2><h3>设计能力 <span>DESIGN CAPABILITIES</span></h3><div class="capability-matrix">${capabilities.map(([cn,en])=>`<div><span>${cn}</span><small lang="en">${en}</small></div>`).join('')}</div><h3>设计软件 <span>DESIGN SOFTWARE</span></h3><div class="software-matrix">${software.map((name,i)=>`<div><span class="mono">${String(i+1).padStart(2,'0')}</span>${name}</div>`).join('')}</div></div></section>
    <section class="resume-section"><h2>教育经历<small>EDUCATION</small></h2><div><article class="resume-item"><time>2021–2025</time><div><h3>杭州师范大学 / 本科</h3><p>视觉传达设计</p></div></article><article class="resume-item"><time>2025–2028</time><div><h3>杭州师范大学 / 硕士</h3><p>视觉传达设计专硕</p></div></article></div></section>
    <section class="resume-section"><h2>实习路径<small>EXPERIENCE</small></h2><div>${experience.map(([date,company,role,description])=>`<article class="resume-item"><time>${date}</time><div><h3>${company}</h3><p class="role-title">${role}</p><p>${description}</p></div></article>`).join('')}</div></section>
    <section class="resume-section"><h2>获奖荣誉<small>RECOGNITION</small></h2><div class="award-list">${awards.map(([cn,en])=>`<article class="award-item"><h3>${cn}</h3><p lang="en">${en}</p></article>`).join('')}</div></section></section>`;
}
function contact() {
  return `<section class="inner-page contact-page"><p class="eyebrow">03 / GET IN TOUCH</p><h1 class="page-title">Let's talk<span style="color:var(--white)">.</span></h1><p class="contact-intro">诚盼实习契机，愿共筑高质量视觉方案。</p><div class="contact-row"><span class="label">邮箱/Email</span><a class="contact-value" href="mailto:${profile.email}">${profile.email}</a><span class="plus" aria-hidden="true">↗</span></div><div class="contact-row"><span class="label">微信/Wechat</span><p class="contact-value">${profile.wechat}</p><span class="plus" aria-hidden="true">↗</span></div><div class="contact-row"><span class="label">电话/Phone</span><a class="contact-value" href="tel:${profile.phone}">${profile.phone}</a><span class="plus" aria-hidden="true">↗</span></div></section>`;
}
function projectGallery(p) {
  const images=[...p.gallery].sort((a,b)=>a.number-b.number);
  const portraitCount=images.filter(img=>img.height>img.width).length;
  const rows=[];
  let pair=[];
  const flush=()=>{if(pair.length){rows.push({portrait:true,images:pair});pair=[]}};
  images.forEach(img=>{
    if(img.height>img.width){pair.push(img);if(pair.length===2)flush()}
    else{flush();rows.push({portrait:false,images:[img]})}
  });
  flush();
  return `<div class="project-gallery">${rows.map(row=>`<div class="gallery-row ${row.portrait?(portraitCount===1?'single-portrait-row':'portrait-row'):'landscape-row'}">${row.images.map(img=>`<div class="gallery-image artwork-protected" data-number="${img.number}">${artworkImage(img.src,img.alt,row.portrait&&portraitCount!==1?'46vw':'92vw')}</div>`).join('')}</div>`).join('')}</div>`;
}
function detail(id) {
  const p=projects.find(item=>item.id===id);
  if(!p)return `<section class="inner-page"><h1 class="page-title">未找到这个作品</h1><a class="text-link" href="#/work">返回全部作品 ↗</a></section>`;
  const next=projects[(projects.indexOf(p)+1)%projects.length];
  const facts=[['服务客户',p.client],...(p.support?[['支持单位',p.support]]:[]),['创作时间',p.year],['作品类别',p.label]];
  const title=escapeHtml(p.title).replace('——','<span class="project-title-sub">——')+(p.title.includes('——')?'</span>':'');
  return `<article class="inner-page project-detail" data-project="${p.id}">
    <a class="back-link" href="#/work/${p.category}">← 返回${p.label}</a>
    <div class="detail-top">
      <div class="detail-heading-grid">
        <div class="project-heading"><h1 class="page-title">${title}</h1><p class="project-title-en" lang="en">${escapeHtml(p.english)}</p></div>
        <dl class="project-facts">${facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>
      </div>
      <div class="detail-description">
        <p class="project-description-cn" lang="zh-CN">${escapeHtml(p.intro)}</p>
        <p class="project-description-en" lang="en">${escapeHtml(p.introEn)}</p>
      </div>
      ${p.awards.length?`<ul class="project-awards" aria-label="作品奖项">${p.awards.map((award,i)=>`<li><span class="award-cn">${escapeHtml(award)}</span><span class="award-en" lang="en">${escapeHtml(p.awardsEnglish[i])}</span></li>`).join('')}</ul>`:''}
    </div>
    ${projectGallery(p)}
    <a class="detail-next" href="#/project/${next.id}"><div><small>NEXT PROJECT / 下一个作品</small><strong>${escapeHtml(next.title)}</strong></div><span>↗</span></a>
  </article>`;
}

function fitProjectAwards() {
  main.querySelectorAll('.project-awards li').forEach(award=>{
    award.style.fontSize='';
    const style=getComputedStyle(award);
    const available=award.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
    const cn=award.querySelector('.award-cn'),en=award.querySelector('.award-en');
    let size=parseFloat(style.fontSize);
    const contentHeight=()=>cn.getBoundingClientRect().height+en.getBoundingClientRect().height+parseFloat(getComputedStyle(en).marginTop);
    while(contentHeight()>available+.25 && size>9){size-=.25;award.style.fontSize=`${size}px`;}
  });
}
let awardResizeFrame;
window.addEventListener('resize',()=>{cancelAnimationFrame(awardResizeFrame);awardResizeFrame=requestAnimationFrame(fitProjectAwards)});

function clearPageEffects() {
  disposeSlideshow();
  clearInterval(slideTimer);
  observers.forEach(observer=>observer.disconnect());
  observers=[];
  scrollCleanup();
  scrollCleanup=()=>{};
}
function setupMotion() {
  if(reducedMotion.matches || !('IntersectionObserver' in window)) {
    main.classList.remove('motion-ready');
    const actions=main.querySelector('.hero-actions');
    if(actions) actions.inert=false;
    return;
  }
  main.classList.add('motion-ready');
  const revealObserver=new IntersectionObserver(entries=>{
    let sequence=0;
    entries.forEach(entry=>{
      if(entry.isIntersecting) {
        entry.target.style.setProperty('--reveal-delay',`${Math.min(sequence++*110,220)}ms`);
        entry.target.classList.add('is-visible');
        if(!entry.target.hasAttribute('data-repeat')) revealObserver.unobserve(entry.target);
      } else if(entry.target.hasAttribute('data-repeat')) entry.target.classList.remove('is-visible');
    });
  },{threshold:.06,rootMargin:'0px 0px -24px 0px'});
  main.querySelectorAll('.reveal-item').forEach(element=>revealObserver.observe(element));
  observers.push(revealObserver);
  const printGroup=main.querySelector('[data-print]');
  if(printGroup) {
    const printObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      entry.target.classList.toggle('is-printed',entry.isIntersecting);
    }),{threshold:.18});
    printObserver.observe(printGroup);
    observers.push(printObserver);
  }
  const actions=main.querySelector('.hero-actions');
  if(actions) {
    let pending=false;
    const update=()=>{
      pending=false;
      const rect=actions.getBoundingClientRect();
      const visible=window.scrollY>18 && rect.bottom>70 && rect.top<window.innerHeight-15;
      actions.classList.toggle('is-visible',visible);
      actions.inert=!visible;
    };
    const onScroll=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    scrollCleanup=()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
    update();
  }
}
function route() {
  const hash=location.hash;
  if(hash==='#selected' && main.dataset.page==='home') {
    document.querySelector('#selected').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});
    return;
  }
  if(hash==='#main'&&main.children.length){main.focus();return}
  const selected=hash==='#selected';
  const parts=(selected?'':hash.replace(/^#\/?/,'')).split('/');
  let page=parts[0]||'home';
  if(!['home','work','about','contact','project'].includes(page))page='home';
  // Keep the filter strip in place when switching categories.
  const filterChange=page==='work'&&main.dataset.page==='work';
  const previousScroll=window.scrollY;
  const filterScroll=main.querySelector('.filters')?.scrollLeft||0;
  clearPageEffects();
  main.classList.remove('motion-ready');
  main.dataset.page=page;
  const active=page==='project'?'work':page;
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const match=a.dataset.nav===active;
    a.classList.toggle('active',match);
    if(match)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
  main.innerHTML=page==='work'?portfolio(parts[1]):page==='about'?about():page==='contact'?contact():page==='project'?detail(parts[1]):home();
  const imageObserver=loadArtworkNearViewport();
  if(imageObserver) observers.push(imageObserver);
  fitProjectAwards();
  if(page==='home')startSlideshow();
  document.title=({home:'首页',about:'关于我',work:'作品集',contact:'联系',project:projects.find(p=>p.id===parts[1])?.title}[page]||'首页')+' — SanMu 林俊杰';
  window.scrollTo({top:filterChange?previousScroll:0,behavior:'instant'});
  setupMotion();
  if(filterChange){
    const filters=main.querySelector('.filters');
    filters.scrollLeft=filterScroll;
    filters.querySelector('.selected')?.focus({preventScroll:true});
  } else main.focus({preventScroll:true});
  if(selected)requestAnimationFrame(()=>document.querySelector('#selected').scrollIntoView({behavior:'instant'}));
}
window.addEventListener('hashchange',route);
reducedMotion.addEventListener('change',()=>{clearPageEffects();setupMotion();if(main.dataset.page==='home')startSlideshow()});
route();
