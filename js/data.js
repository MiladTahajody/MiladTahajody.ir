/* Portfolio data - edit freely. The order of the lines = the order on the page (also inside a filtered view).
   Every project is one line with these items, in this order:
   [ title, tagline (or ''), category, deliverable, tools, link, language, optional image file name ]
   - category = the main tag. The filter chips above the portfolio are built from it automatically ("All" is first and selected by default).
     Write exactly the same text for projects that belong together, e.g. 'Mobile App Design'. A new category text creates a new chip;
     chips follow the order in which categories first appear in this list. About 5-7 categories keep the chip row tidy.
   - image: images/portfolio/<title in lowercase with hyphens>.webp, ratio 3:2 (Hamro -> hamro.webp, Select Your Villa -> select-your-villa.webp).
     The optional 8th item replaces that file name (without .webp).
   - all text is plain text (HTML tags are not interpreted). Put a backslash before an apostrophe inside text: 'Chef\'s Menu'.
   Example: ['My App', 'Short tagline (or empty)', 'Mobile App Design', 'Mobile App · Prototyped Mockups', 'Figma', 'https://link', 'EN'] */
window.PORTFOLIO = [
  ['Digital Menus', 'Cafés | Restaurants | Fast-Food | Bakeries', 'Web Responsive', 'Web Responsive / Mobile', 'Idea - Design - Development', 'https://digitalmenus.ir', 'English / Farsi'],
  ['Select Your Villa', 'Inclusive Villa Design Service', 'Web Responsive', 'Web Responsive / Mobile / Dashboard Panel', 'Analysis - Design', 'https://xd.adobe.com/view/b9dfe331-6dc2-40b3-ac0d-9e2f4a151242-ec8c/?fullscreen', 'English'],
  ['Hamro', 'Social Network', 'Mobile App', 'Mobile App / Android / IOS', 'Analysis - ReDesign', 'https://xd.adobe.com/view/9b6723b4-136c-4e1a-9fe0-b9fae221753d-ce34/?fullscreen', 'Farsi'],
  ['Hakim', 'Medicine | Health', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Analysis - Design', 'https://xd.adobe.com/view/6376ab50-4d57-4197-829d-80eaa0c1cd2a-3625/?fullscreen', 'Farsi'],
  ['Tiber', 'Buy | Sell | Exchange', 'Mobile App', 'Mobile App / Android / IOS', 'Analysis - Design', 'https://xd.adobe.com/view/41e093a5-cc33-4b46-8596-8f43a235b119-14b3/?fullscreen', 'Farsi'],
  ['Taraz', 'Financial Management and Accounting', 'Dashboard Panel', 'Web Dashboard Panel', 'Idea - Analysis - Design', 'https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/?fullscreen', 'Farsi'],
  ['Tabib', 'Medical Patient Management', 'Dashboard Panel', 'Web Dashboard Panel', 'Idea - Analysis - Design', 'https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/screen/c5c75202-90e3-4f24-be12-f5535381a80d/?fullscreen', 'Farsi'],
  ['Soren', 'Internal Organizational Messenger', 'Dashboard Panel', 'Web Dashboard Panel', 'Idea - Analysis - Design', 'https://xd.adobe.com/view/2696415a-49f6-4d5b-8889-6b77e8f41302-73c5/screen/14f1a1e5-ef37-4064-88c2-926e3cc94e31/?fullscreen', 'Farsi'],
  ['Enroute', 'Pilot | Aviation', 'Dashboard Panel', 'Apple iPad Application', 'Analysis - ReDesign', 'https://xd.adobe.com/view/d015f5b2-d32d-470a-9ab9-b48f297ace66-8546/?fullscreen', 'English'],
  ['Enroute Crew', 'Flight Crew | Aviation', 'Mobile App', 'Mobile App / Android / IOS', 'Analysis - Design', 'https://xd.adobe.com/view/fd4af447-7704-4afd-89b7-4a9bde95d803-a819/?fullscreen', 'English'],
  ['Never-Q', 'Cafés Online Order', 'Mobile App', 'Mobile App / Android / IOS', 'Analysis - Design', 'https://xd.adobe.com/view/8bff1583-5d13-42dc-bc43-e6627f19953e-deac/?fullscreen', 'English'],
  ['Neu', 'E-Wallet', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Analysis - Design', 'https://www.figma.com/proto/zk8uELJedQFoneZaczBXL2/E-Wallet---Neu---Dark?node-id=98-451&viewport=2173%2C892%2C0.23407575488090515&scaling=contain', 'English'],
  ['Date Picker', 'Persian Component', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Analysis - Design', 'https://xd.adobe.com/view/1586ca3d-6bd4-4365-9073-a0663d72685e-40d5/?fullscreen', 'Farsi'],
  ['F.Soldier', 'Military services', 'Dashboard Panel', 'Web Dashboard Panel', 'Analysis - Design', 'https://xd.adobe.com/view/c1356dd0-8a81-4b4d-9b26-77c3656e7a3a-9466/screen/62bc5cf0-ad57-41f0-afb4-13b6d067278e?fullscreen', 'Farsi'],
  ['Binary', 'Landing Page', 'Web Responsive', 'Web PWA / Landing Page', 'Idea - ReDesign', 'https://xd.adobe.com/view/9a0ca49c-651f-4251-a877-59d8e89b4e5a-cf5f/?fullscreen', 'English'],
  ['Vortech', 'Login Page', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Design', 'https://xd.adobe.com/view/6216c3db-0a1b-4782-acc6-a6e29ca8d389-3745/?fullscreen', 'English'],
  ['Twilight', 'Dark | Light | Concept', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Design', 'https://xd.adobe.com/view/1bf9cb89-6a81-4150-aaf1-826a1d92d40b-4eaa/?fullscreen', 'English'],
  ['IKnow App', 'CRM Mobile App', 'Mobile App', 'Mobile App / Android / IOS', 'Analysis - Design', 'https://xd.adobe.com/view/be1fbf07-5ddc-4e68-b220-c2213e986a25-eb4c/screen/53b9c164-ca88-4335-9889-b8c6d5096b8f?fullscreen', 'Farsi'],
  ['IKnow Web', 'CRM Web PWA', 'Web Responsive', 'Mobile App / Android / IOS', 'Analysis - Design', 'https://xd.adobe.com/view/b0dae1b2-cef5-43e1-b960-3e0fdff85587-e589/screen/23ccc5af-2f35-428f-a74e-af9b9c08617c?fullscreen', 'Farsi'],
  ['Meeting', 'Web PWA', 'Web Responsive', 'Mobile App / Android / IOS', 'Idea - Design', 'https://xd.adobe.com/view/9f960776-cd16-415d-62d4-fcd9acc42b74-e9a7/?fullscreen', 'English'],
  ['Melkam', 'Real Estate', 'Mobile App', 'Mobile App / Android / IOS', 'Idea - Design', 'https://xd.adobe.com/view/094a644c-42f1-4d39-8ca4-fd0a35089059-5c19/?fullscreen', 'Farsi'],
  ['Milad Tahajody', 'Business Card', 'Branding', 'Personal Website', 'Idea - Design - Print', 'https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-2&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0', 'English'],
  ['Digital Menu', 'Business Card', 'Branding', 'Business Website', 'Idea - Design - Print', 'https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-3&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0', 'English'],
  ['Coach Maya', 'Business Card', 'Branding', 'Crossfit / Fitness', 'Idea - Design - Print', 'https://www.figma.com/proto/tINKz99Fj7A2Pcii81aD6S/Business-Cards?node-id=1-4&p=f&viewport=303%2C471%2C0.14&t=Ynv7ZQBYzIreSKLJ-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&hotspot-hints=0', 'English']
];
