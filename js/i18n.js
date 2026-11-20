(() => {
  const root = document.documentElement;
  let lang = 'en';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'fa' || q === 'en') localStorage.setItem('lang', q);
    lang = localStorage.getItem('lang') === 'fa' ? 'fa' : 'en';
  } catch (e) {}
  const sw = document.querySelector('.lang-sw');
  if (sw) {
    sw.dataset.cur = lang;
    sw.addEventListener('click', () => {
      try { localStorage.setItem('lang', lang === 'fa' ? 'en' : 'fa'); sessionStorage.setItem('langQuick', '1'); } catch (e) {}
      if (/[?&]lang=/.test(location.search)) history.replaceState(null, '', location.pathname + location.hash);
      location.reload();
    });
  }
  if (lang !== 'fa') return;

  root.lang = 'fa'; root.dir = 'rtl';
  const HEAD = {
 "title": "میلاد تهجدی | طراح ارشد UI/UX محصول و مشاور",
 "desc": "میلاد تهجدی، طراح UI/UX: طراحی رابط و تجربه کاربری، تحقیق کاربری (UX Research)، وب‌سایت، اپلیکیشن موبایل، داشبورد، PWA، منوی دیجیتال، کاتالوگ، لوگو، استیکر، کارت ویزیت و رزومه.",
 "kw": "طراح UI/UX, مشاور تجربه کاربری, محقق UX, طراحی رابط کاربری, طراحی تجربه کاربری, مشاوره UX, تحقیق کاربری, طراحی وب‌سایت, طراحی اپلیکیشن موبایل, طراحی داشبورد, طراحی PWA, طراحی وب‌اپلیکیشن پیشرو, طراحی منوی دیجیتال, منوی دیجیتال دوزبانه فارسی انگلیسی, طراحی کاتالوگ دیجیتال, طراحی لوگو, طراحی استیکر, طراحی کارت ویزیت, طراحی رزومه, رزومه سازگار با ATS, Figma, Adobe XD",
 "ogt": "میلاد تهجدی | طراح ارشد UI/UX و مشاور تجربه کاربری",
 "imgalt": "میلاد تهجدی، طراح ارشد UI/UX و مشاور تجربه کاربری"
};
  document.title = HEAD.title;
  const setMeta = (sel, v) => { const m = document.querySelector(sel); if (m) m.setAttribute('content', v); };
  setMeta('meta[name="description"]', HEAD.desc); setMeta('meta[name="keywords"]', HEAD.kw);
  setMeta('meta[property="og:title"]', HEAD.ogt); setMeta('meta[property="og:description"]', HEAD.desc); setMeta('meta[property="og:image:alt"]', HEAD.imgalt);
  setMeta('meta[name="twitter:title"]', HEAD.ogt); setMeta('meta[name="twitter:description"]', HEAD.desc); setMeta('meta[name="twitter:image:alt"]', HEAD.imgalt);
  if (sw) { sw.setAttribute('aria-label', 'تغییر زبان به انگلیسی (English)'); sw.title = 'English'; }

  const NODES = {
 "0": "۰",
 "Loading portfolio": "در حال بارگذاری نمونه‌کارها",
 "Intro": "معرفی",
 "Services": "خدمات",
 "Experience": "تجربیات",
 "Education": "تحصیلات",
 "Certificates": "گواهینامه‌ها",
 "Tools": "ابزارها",
 "Skills": "مهارت‌ها",
 "Portfolio": "نمونه‌کارها",
 "Contact": "تماس",
 "INTRO": "معرفی",
 "SERVICES": "خدمات",
 "EXPERIENCE": "تجربیات",
 "EDUCATION": "تحصیلات",
 "CERTIFICATES": "گواهینامه‌ها",
 "TOOLS": "ابزارها",
 "SKILLS": "مهارت‌ها",
 "PORTFOLIO": "نمونه‌کارها",
 "Milad": "میلاد",
 "Tahajody": "تهجدی",
 "Senior Product UI/UX Designer & Consultant": "مشاور و طراح ارشد UI/UX محصول",
 "Design is problem-solving, and I solve through continuous learning.": "طراحی یعنی حل مسئله، و من با یادگیری مستمر آن را حل می‌کنم.",
 "View portfolio": "مشاهده نمونه‌کارها",
 "Read my CV": "رزومه من را بخوانید",
 "Download CV (PDF)": "دانلود رزومه (PDF)",
 "Designing since 2008": "طراحی UI/UX از سال ۱۳۸۷",
 "Web · Mobile · PWA": "وب · موبایل · PWA",
 "Persian (Farsi) & English": "فارسی و انگلیسی",
 "Digital Menus ✦ Digital Catalogs ✦ UI/UX Design ✦ Website Design ✦ Mobile App Design ✦ Dashboard Panel Design ✦ User research ✦ Wireframes ✦ Prototyping ✦ Design systems ✦ Accessibility ✦ Fintech ✦ Healthcare ✦ E-commerce ✦ IoT ✦ Ai ✦": "کاتالوگ دیجیتال ✦ منوی دیجیتال قابل اسکن ✦ طراحی رابط و تجربه کاربری ✦ طراحی وبسایت ✦ طراحی اپلیکیشن موبایل ✦ طراحی پنل داشبورد کاربری ✦ تحقیقات کاربری ✦ وایرفریم ✦ پروتوتایپ ✦ دیزاین سیستم ✦ دسترسی پذیری ✦ فین‌ تک و تکنولوژی ✦ پزشکی و سلامت ✦ تجارت الکترونیک ✦ اینترنت اشیا ✦ هوش مصنوعی ✦",
 "User research ✦ Wireframes ✦ Prototyping ✦ Design systems ✦ Accessibility ✦ Fintech ✦ Healthcare ✦ E-commerce ✦ IoT ✦": "تحقیقات کاربری ✦ وایرفریم ✦ پروتوتایپ ✦ دیزاین سیستم ✦ دسترسی پذیری ✦ فین‌ تک و تکنولوژی ✦ پزشکی و سلامت ✦ تجارت الکترونیک ✦ اینترنت اشیا ✦",
 "What I can": "آنچه می‌توانم برای شما",
 "design": "طراحی",
 "for you.": "کنم.",
 "01": "۰۱",
 "Product UI/UX Design": "طراحی UI/UX محصول",
 "Research-informed interface and experience design: user flows, wireframes, prototypes and polished, developer-ready UI for web and mobile products.": "طراحی رابط و تجربه کاربری مبتنی بر تحقیق: جریان‌های کاربری، وایرفریم، پروتوتایپ و رابط کاربری دقیق و آماده تحویل به توسعه‌ دهنده برای محصولات وب و موبایل.",
 "02": "۰۲",
 "UX Consulting & Research": "مشاوره و تحقیق UX",
 "Usability audits, user interviews and testing, followed by clear, actionable recommendations that improve your product experience.": "ارزیابی کاربردپذیری، مصاحبه و آزمون با کاربران، و در پایان توصیه‌هایی روشن و عملی برای بهبود تجربه محصول شما.",
 "03": "۰۳",
 "Website Design": "طراحی وب‌سایت",
 "Responsive, conversion-focused websites and landing pages.": "وب‌سایت‌ها و لندینگ‌پیج‌های واکنش‌گرا و متمرکز بر تبدیل بازدیدکننده به مشتری.",
 "04": "۰۴",
 "Mobile App Design": "طراحی اپلیکیشن موبایل",
 "Native-feeling iOS and Android interfaces, from user flows to prototypes.": "رابط‌های iOS و اندروید با حس بومی (Native)، از جریان‌های کاربری تا پروتوتایپ.",
 "05": "۰۵",
 "Dashboard Design": "طراحی داشبورد",
 "Clear admin panels and data-heavy dashboards that are easy to read.": "پنل‌های مدیریت و داشبوردهای داده‌محور که خواندنشان آسان است.",
 "06": "۰۶",
 "Progressive Web App (PWA) Design": "طراحی وب‌اپلیکیشن پیشرو (PWA)",
 "Fast, installable web apps that feel like native apps.": "وب‌اپ‌های سریع و قابل نصب که حس اپلیکیشن بومی می‌دهند.",
 "07": "۰۷",
 "Digital Menu Design": "طراحی منوی دیجیتال",
 "Mobile-first digital menus for cafés and restaurants.": "منوهای دیجیتال موبایل‌محور برای کافه‌ها و رستوران‌ها.",
 "08": "۰۸",
 "Digital Catalog Design": "طراحی کاتالوگ دیجیتال",
 "Browsable product catalogs for web and mobile.": "کاتالوگ‌های محصول قابل‌مرور برای وب و موبایل.",
 "09": "۰۹",
 "Logo & Sticker Design": "طراحی لوگو و استیکر",
 "Memorable logo marks and brand identities, plus print-ready adhesive stickers and decals for glass, clothing, packaging and more.": "نشان‌های لوگو و هویت‌های برند ماندگار، به‌علاوه استیکر و برچسب‌های چسبی آماده چاپ برای شیشه، پوشاک، بسته‌بندی و موارد دیگر.",
 "10": "۱۰",
 "Business Card Design": "طراحی کارت ویزیت",
 "Print-ready business cards that carry your brand.": "کارت‌های ویزیت آماده چاپ که برند شما را به‌خوبی نشان می‌دهند.",
 "11": "۱۱",
 "CV & Resume Design": "طراحی رزومه (CV)",
 "Clean, modern CVs and resumes designed for readability, with an ATS-friendly version on request.": "رزومه‌های تمیز و مدرن با خوانایی بالا، با نسخه سازگار با ATS در صورت درخواست.",
 "Work experience": "سابقه کار",
 "+15 years, one thread:": "بیش از ۱۵ سال، یک مسیر:",
 "make it clear.": "روشن و ساده کردن.",
 "2019 — Now": "۱۳۹۹ — اکنون",
 "Senior Product UI/UX Designer & Consultant": "مشاور و طراح ارشد UI/UX محصول",
 "Web / Mobile / PWA": "وب / موبایل / PWA",
 "Freelance | Remote": "فریلنس | دورکار",
 "2016 — 2019": "۱۳۹۶ — ۱۳۹۹",
 "Ui/UX Designer Expert": "طراح متخصص UI/UX",
 "IT & Fintech Company": "شرکت فناوری اطلاعات و فین‌تک",
 "2 years & 6 months": "۲ سال و ۶ ماه",
 "2010 — 2016": "۱۳۹۰ — ۱۳۹۶",
 "Ui/UX Designer & Developer": "طراح و توسعه‌دهنده UI/UX",
 "Financial & Credit Institute": "مؤسسه مالی و اعتباری",
 "6 years": "۶ سال",
 "2009 — 2010": "۱۳۸۹ — ۱۳۹۰",
 "Web Designer & Developer": "طراح و توسعه‌دهنده وب",
 "Travel Agency": "آژانس هواپیمایی و مسافرتی",
 "1 year & 4 months": "۱ سال و ۴ ماه",
 "2008 — 2009": "۱۳۸۷ — ۱۳۸۹",
 "Designer & Programmer": "طراح و برنامه‌نویس",
 "Meteorological & Geological Equipment": "تجهیزات هواشناسی و زمین‌شناسی",
 "1 year": "۱ سال",
 "Academic": "سوابق",
 "background.": "تحصیلی.",
 "2017 — 2019": "۱۳۹۶ — ۱۳۹۸",
 "Master — Information Technology Engineering": "کارشناسی ارشد — مهندسی فناوری اطلاعات",
 "1st ranked": "رتبه اول",
 "Research based (UI/UX & Web Mining) | Total average score: 19.79 / 20": "پژوهش‌ محور (UI/UX و وب‌ ماینینگ) | معدل کل: ۱۹٫۷۹ از ۲۰",
 "Skills I learned:": "مهارت‌هایی که آموختم:",
 "2008 — 2010": "۱۳۸۷ — ۱۳۸۹",
 "Bachelor — Computer Software Engineering": "کارشناسی — مهندسی نرم‌افزار کامپیوتر",
 "2005 — 2007": "۱۳۸۴ — ۱۳۸۶",
 "Associate — ICT (Information & Communications Technology)": "کاردانی — فناوری اطلاعات و ارتباطات (ICT)",
 "2001 — 2005": "۱۳۸۰ — ۱۳۸۴",
 "Diploma — Mathematical Physics": "دیپلم — ریاضی فیزیک",
 "Always": "همیشه در حال",
 "learning,": "یادگیری،",
 "verified.": "و تایید شده.",
 "Badges": "نشان‌ها",
 "Show credential ↗": "مشاهده مدرک ↖",
 "Google": "گوگل",
 "UX Design Professional Certificates": "گواهینامه‌های حرفه‌ای طراحی تجربه کاربری",
 "Foundations of User Experience (UX) Design": "مبانی طراحی تجربه کاربری (UX)",
 "UX Design Process: Empathize, Define, and Ideate": "فرایند طراحی UX: همدلی، تعریف مسئله و ایده‌پردازی",
 "Build Wireframes and Low-Fidelity Prototypes": "ساخت وایرفریم و پروتوتایپ‌های کم‌جزئیات",
 "Conduct UX Research and Test Early Concepts": "انجام تحقیق UX و آزمون ایده‌های اولیه",
 "Create High-Fidelity Designs and Prototypes in Figma": "ساخت طرح‌ها و پروتوتایپ‌های پرجزئیات در Figma",
 "Responsive Web Design in Adobe XD": "طراحی وب واکنشگرا در Adobe XD",
 "Design a User Experience for Social Good": "طراحی تجربه کاربری برای خیر اجتماعی",
 "UXcel": "UXcel",
 "Professional Role Certificates": "گواهینامه‌های حرفه‌ای",
 "UXcel top ranked": "رتبه برتر UXcel",
 "UI Designer": "طراح رابط کاربری",
 "UX Designer": "طراح تجربه کاربری",
 "Product Designer": "طراح محصول",
 "Ui/UX Design Specialized Certificates": "گواهینامه‌های دوره‌های تخصصی UI/UX",
 "Ui/UX Design": "طراحی UI/UX",
 "Design Composition": "ترکیب‌بندی در طراحی",
 "Common Patterns": "الگوهای رایج",
 "AI in Ui/UX Design": "هوش مصنوعی در طراحی",
 "Service Design": "طراحی سرویس",
 "Mobile Design": "طراحی موبایل",
 "UX Research": "تحقیقات تجربه کاربری",
 "UX Writing": "نگارش تجربه کاربری",
 "Accessibility": "دسترسی پذیری",
 "Design Thinking": "تفکر طراحی",
 "Design Terminology": "اصطلاحات طراحی",
 "Designing Wireframes": "طراحی وایرفریم",
 "3D Design": "طراحی سه‌ بعدی",
 "HTML & CSS": "HTML و CSS",
 "Typography": "تایپوگرافی",
 "Design Workshop": "کارگاه‌های طراحی",
 "Color Psychology": "روانشناسی رنگها",
 "UI Components": " کامپوننتهای رابط کاربری",
 "More certificates": "گواهینامه‌های دیگر",
 "Sololearn":"سولولرن —",
 "— Python 3 & HTML 5":"Python 3 و HTML 5",
 "Unesco":"یونسکو —",
 "— National Award E-learning Seminar": "سمینار یادگیری الکترونیک (جایزه ملی)",
 "MFT":"مجتمع فنی تهران",
 "— CISCO CCNA & CCNP":"— سیسکو CCNP و CCNA",
 "The": "",
 "tools": "ابزارهایی",
 "I work with.": "که با آن‌ها کار می‌کنم.",
 "Design": "طراحی",
 "Research": "تحقیق",
 "AI": "هوش مصنوعی",
 "What I": "آنچه به یک تیم",
 "bring": "می‌آورم.",
 "to a team.": "",
 "Platforms & style": "پلتفرم‌ها و سبک",
 "Systems": "سیستم‌ها",
 "Platforms": "پلتفرم‌ها",
 "Design style": "سبک طراحی",
 "UX concepts": "مفاهیم UX",
 "UX methods": "روش‌های UX",
 "Soft skills": "مهارت‌های نرم",
 "General & development": "عمومی و توسعه",
 "General": "عمومی",
 "Front-End": "فرانت‌اند",
 "Back-End": "بک‌اند",
 "Other": "سایر",
 "Selected": "منتخب",
 "Portfolio.": "نمونه کارها",
 "24": "۲۴",
 "Contact": "تماس",
 "Let’s design something": "بیایید محصولی طراحی کنیم",
 "clear.": "کاربردی",
 "Have a product to design or improve? Call or message me and let’s talk.": "اگر محصول یا ایده ای برای طراحی یا بهبود دارید, برای من پیام بگذارید یا تماس بگیرید.",
 "Call": "تماس",
 "+98 0912 570 8694": "+۹۸ ۰۹۱۲ ۵۷۰ ۸۶۹۴",
 "WhatsApp": "واتس‌اپ",
 "Message me": "پیام بدهید",
 "Telegram": "تلگرام",
 "Chat with me": "با من گپ بزنید",
 "LinkedIn": "لینکدین",
 "Instagram": "اینستاگرام",
 "Behance": "بیهنس",
 "Dribbble": "دریبل",
 "Pinterest": "پینترست",
 "Facebook": "فیسبوک",
 "Threads": "تردز",
 "X": "اکس",
 "YouTube": "یوتیوب",
 "Milad Tahajody": "میلاد تهجدی",
 "CV (PDF)": "رزومه (PDF)",
 "Back to top": "بازگشت به بالا"
};
  const ATTRS = {
 "Sections": "بخش‌ها",
 "Primary": "ناوبری اصلی",
 "Intro": "معرفی",
 "Services": "خدمات",
 "Experience": "تجربه",
 "Education": "تحصیلات",
 "Certificates": "گواهینامه‌ها",
 "Tools": "ابزارها",
 "Skills": "مهارت‌ها",
 "Portfolio": "نمونه‌کارها",
 "Switch light / dark mode": "تغییر حالت روشن / تاریک",
 "Milad Tahajody": "میلاد تهجدی",
 "Portrait of Milad Tahajody": "پرتره میلاد تهجدی",
 "M.Sc. IT Engineering · 1st ranked|Google UX Design Certificate|UXcel Top Ranked": "کارشناسی ارشد مهندسی فناوری اطلاعات · رتبه اول|مدرک تخصصی طراحی UX گوگل|رتبه برتر UXcel",
 "Fashion & Clothing|ERP & CRM Systems|Healthcare & Medicine|Restaurant & Coffeeshop|Fintech & Cryptocurrency|Aviation & Flight Services|Travel & Tourism Agencies|Meteorological & Geological|Social Network & Entertainment|BI & E-Commerce|IoT for Smart Home & Car": "مد و پوشاک|سیستم‌های ERP و CRM|سلامت و پزشکی|رستوران و کافی‌شاپ|فین‌تک و ارز دیجیتال|هوانوردی و خدمات پروازی|آژانس‌های مسافرتی و گردشگری|هواشناسی و زمین‌شناسی|شبکه اجتماعی و سرگرمی|هوش تجاری و تجارت الکترونیک|اینترنت اشیا خانه و خودروی هوشمند",
 "E-learning|Database|Strategic Planning|ERP and CRM Systems|Knowledge Management|Needs Assessment Engineering|Data Warehousing and Data Mining|Process and Business Management|Information Technology Engineering|Software Development Management|Research and Article Writing Methods": "یادگیری الکترونیکی|پایگاه داده|برنامه‌ریزی راهبردی|سیستم‌های ERP و CRM|مدیریت دانش|مهندسی نیازسنجی|انبار داده و داده‌کاوی|مدیریت فرایند و کسب‌وکار|مهندسی فناوری اطلاعات|مدیریت توسعه نرم‌افزار|روش تحقیق و مقاله‌نویسی",
 "Google UX Design badge": "نشان Google UX Design",
 "UXcel Verified Designer badge": "نشان UXcel Verified Designer",
 "Desktop|Web|Mobile|Responsive PWA": "دسکتاپ|وب|موبایل|PWA واکنشگرا",
 "Minimal Design|Classic Design|Fantasy Design": "مینیمال|کلاسیک|فانتزی",
 "Wireframes|Mockups|Typography|Colorology|Interactions|Prototyping|Empathy Map|Personas|Design Thinking|User-Centered Design|Accessibility|Consistency|Usability|WCAG|User Pain Points|User Stories|User Journey Maps": "وایرفریم|موکاپ|تایپوگرافی|رنگ‌ شناسی|تعامل‌ها|پروتوتایپ|نقشه همدلی|پرسونا|تفکر طراحی|طراحی کاربرمحور|دسترسی پذیری|یکپارچگی|WCAG|نقاط درد کاربر|داستان‌های کاربر|نقشه سفر کاربر",
 "User Interview|Usability Testing|Tree Testing|Card Sorting|Information Architecture|User Research|User Flows|Design Process|Design Steps|Design Ideation|Design Scenario|Competitor Audits Research": "مصاحبه با کاربر|تست کاربردپذیری|تست ساختار درختی|دسته بندی کارتها|معماری اطلاعات|تحقیقات کاربری|جریان‌های کاربر|فرایند طراحی|مراحل طراحی|ایده‌پردازی|سناریوی طراحی|بررسی و تحلیل رقبا",
 "Time Management|Attention to Details|Teamwork|Soloworks|Leadership|Management|Collaboration|Communications|Individual Development|Self-Education|Organized|Creative|Thoughtful|Committed": "مدیریت زمان|دقت در جزئیات|کار تیمی|کار فردی|رهبری|مدیریت|همکاری|ارتباطات|رشد فردی|خودآموزی|منظم|خلاق|متفکر|متعهد",
 "AI|Internet Searching|Computer Science|Network": "هوش مصنوعی|جستجوی اینترنتی|علوم کامپیوتر|شبکه",
 "Filter portfolio by category": "فیلتر نمونه‌کارها بر اساس دسته‌بندی",
 "Copyright": "حق نشر",
 "Image preview": "پیشنمایش تصویر",
 "Close preview": "بستن پیشنمایش"
};
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const FD = '۰۱۲۳۴۵۶۷۸۹', pd = s => String(s).replace(/\d/g, d => FD[d]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('script,style,svg') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const k = norm(n.nodeValue), v = NODES[k]; if (v === undefined) return;   // '' = this English word has no Persian counterpart (word order differs)
    const raw = n.nodeValue, lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    if (/^\+[۰-۹]/.test(v)) { const b = document.createElement('bdi'); b.textContent = v; n.replaceWith(b); }   // phone number keeps its own direction
    else n.nodeValue = lead + v + trail;
  });
  const HTMLS = {
 "#work h2": "<em>نمونه کارهای</em> منتخب.",
 ".f-title": "بیایید محصولی <em>کاربردی</em> طراحی کنیم."
};   
  Object.keys(HTMLS).forEach(sel => { const el = document.querySelector(sel); if (el) el.innerHTML = HTMLS[sel]; });
  document.querySelectorAll('[aria-label],[title],[alt],[data-tags]').forEach(el => ['aria-label', 'title', 'alt', 'data-tags'].forEach(a => {
    const v = el.getAttribute(a); if (v && ATTRS[v]) el.setAttribute(a, ATTRS[v]);
  }));
  document.querySelectorAll('.n,#cur,#tot,#cnt-cur,#cnt-tot,#pct').forEach(el => { el.textContent = pd(el.textContent); });   

  window.PORTFOLIO = [
  ["Digital Menus", "کافه‌ها | رستوران‌ها | فست‌فود | نانوایی‌ها و قنادی‌ها", "وب واکنش‌گرا", "وب واکنش‌گرا / موبایل", "ایده - طراحی - توسعه", "https://digitalmenus.ir", "انگلیسی / فارسی", "digital-menus"],
  ["Select Your Villa", "خدمات جامع طراحی ویلا", "وب واکنش‌گرا", "وب واکنش‌گرا / موبایل / پنل داشبورد", "تحلیل - طراحی", "https://xd.adobe.com/view/b9dfe331-6dc2-40b3-ac0d-9e2f4a151242-ec8c/?fullscreen", "انگلیسی", "select-your-villa"],
  ["Hamro", "شبکه اجتماعی", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - بازطراحی", "https://xd.adobe.com/view/9b6723b4-136c-4e1a-9fe0-b9fae221753d-ce34/?fullscreen", "فارسی", "hamro"],
  ["Hakim", "پزشکی | سلامت", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - تحلیل - طراحی", "https://xd.adobe.com/view/6376ab50-4d57-4197-829d-80eaa0c1cd2a-3625/?fullscreen", "فارسی", "hakim"],
  ["Tiber", "خرید | فروش | مبادله", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - طراحی", "https://xd.adobe.com/view/41e093a5-cc33-4b46-8596-8f43a235b119-14b3/?fullscreen", "فارسی", "tiber"],
  ["Taraz", "مدیریت مالی و حسابداری", "پنل داشبورد", "پنل داشبورد وب", "ایده - تحلیل - طراحی", "https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/?fullscreen", "فارسی", "taraz"],
  ["Tabib", "مدیریت پزشکی بیماران", "پنل داشبورد", "پنل داشبورد وب", "ایده - تحلیل - طراحی", "https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/screen/c5c75202-90e3-4f24-be12-f5535381a80d/?fullscreen", "فارسی", "tabib"],
  ["Soren", "پیام‌رسان درون سازمانی", "پنل داشبورد", "پنل داشبورد وب", "ایده - تحلیل - طراحی", "https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/screen/14f1a1e5-ef37-4064-88c2-926e3cc94e31/?fullscreen", "فارسی", "soren"],
  ["Enroute", "خلبانی | هوانوردی", "پنل داشبورد", "اپلیکیشن iPad اپل", "تحلیل - بازطراحی", "https://xd.adobe.com/view/d015f5b2-d32d-470a-9ab9-b48f297ace66-8546/?fullscreen", "انگلیسی", "enroute"],
  ["Enroute Crew", "تیم پرواز | هوانوردی", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - طراحی", "https://xd.adobe.com/view/fd4af447-7704-4afd-89b7-4a9bde95d803-a819/?fullscreen", "انگلیسی", "enroute-crew"],
  ["Never-Q", "سفارش آنلاین کافه‌ها", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - طراحی", "https://xd.adobe.com/view/8bff1583-5d13-42dc-bc43-e6627f19953e-deac/?fullscreen", "انگلیسی", "never-q"],
  ["Neu", "کیف پول الکترونیکی", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - تحلیل - طراحی", "https://www.figma.com/proto/zk8uELJedQFoneZaczBXL2/E-Wallet---Neu---Dark?node-id=98-451&viewport=2173%2C892%2C0.23407575488090515&scaling=contain", "انگلیسی", "neu"],
  ["انتخابگر تاریخ", "کامپوننت فارسی", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - تحلیل - طراحی", "https://xd.adobe.com/view/1586ca3d-6bd4-4365-9073-a0663d72685e-40d5/?fullscreen", "فارسی", "date-picker"],
  ["F.Soldier", "خدمات نظام‌وظیفه", "پنل داشبورد", "پنل داشبورد وب", "تحلیل - طراحی", "https://xd.adobe.com/view/c1356dd0-8a81-4b4d-9b26-77c3656e7a3a-9466/screen/62bc5cf0-ad57-41f0-afb4-13b6d067278e?fullscreen", "فارسی", "f-soldier"],
  ["Binary", "لندینگ‌ پیج", "وب واکنش‌گرا", "وب‌اپلیکیشن PWA / لندینگ‌پیج", "ایده - بازطراحی", "https://xd.adobe.com/view/9a0ca49c-651f-4251-a877-59d8e89b4e5a-cf5f/?fullscreen", "انگلیسی", "binary"],
  ["Vortech", "صفحه ورود", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - طراحی", "https://xd.adobe.com/view/6216c3db-0a1b-4782-acc6-a6e29ca8d389-3745/?fullscreen", "انگلیسی", "vortech"],
  ["Twilight", "تیره | روشن | ایده مفهومی", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - طراحی", "https://xd.adobe.com/view/1bf9cb89-6a81-4150-aaf1-826a1d92d40b-4eaa/?fullscreen", "انگلیسی", "twilight"],
  ["IKnow App", "اپلیکیشن موبایل CRM", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - طراحی", "https://xd.adobe.com/view/be1fbf07-5ddc-4e68-b220-c2213e986a25-eb4c/screen/53b9c164-ca88-4335-9889-b8c6d5096b8f?fullscreen", "فارسی", "iknow-app"],
  ["IKnow Web", "وب‌ اپلیکیشن CRM (PWA)", "وب واکنش‌گرا", "اپلیکیشن موبایل / اندروید / iOS", "تحلیل - طراحی", "https://xd.adobe.com/view/b0dae1b2-cef5-43e1-b960-3e0fdff85587-e589/screen/23ccc5af-2f35-428f-a74e-af9b9c08617c?fullscreen", "فارسی", "iknow-web"],
  ["Meeting", "وب‌ اپلیکیشن (PWA)", "وب واکنش‌گرا", "اپلیکیشن موبایل / اندروید / iOS", "ایده - طراحی", "https://xd.adobe.com/view/9f960776-cd16-415d-62d4-fcd9acc42b74-e9a7/?fullscreen", "انگلیسی", "meeting"],
  ["Melkam", "املاک", "اپلیکیشن موبایل", "اپلیکیشن موبایل / اندروید / iOS", "ایده - طراحی", "https://xd.adobe.com/view/094a644c-42f1-4d39-8ca4-fd0a35089059-5c19/?fullscreen", "فارسی", "melkam"],
  ["میلاد تهجدی", "کارت ویزیت", "برندینگ", "وب‌سایت شخصی", "ایده - طراحی - چاپ", "https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-2&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0", "انگلیسی", "milad-tahajody"],
  ["Digital Menu", "کارت ویزیت", "برندینگ", "وب‌سایت کسب‌وکار", "ایده - طراحی - چاپ", "https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-3&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0", "انگلیسی", "digital-menu"],
  ["Coach Maya", "کارت ویزیت", "برندینگ", "کراس‌فیت / تناسب اندام", "ایده - طراحی - چاپ", "https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-4&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0", "انگلیسی", "coach-maya"]
];

  window.I18N = {
    digits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    all: 'همه',
    proto: 'مشاهده پروتوتایپ ↖',
    preview: name => 'پیش‌نمایش ' + name,
    zoom: 'بزرگ‌نمایی تصویر: ',
    zoomTip: 'برای بزرگ‌نمایی کلیک کنید یا لمس کنید',
    status: (n, all, label) => 'نمایش ' + pd(n) + ' پروژه' + (all ? '' : ' در دسته ' + label)
  };
})();
