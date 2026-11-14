// Live pictures of the admin panel for "Settings → Admin settings".
// Each picture is a small copy of one admin page. Every text on it is a box you can type in (AT = editable text).
// Any text of a group that is not placed on a picture is still listed under it ("আরও লেখা"), so nothing is lost.
export function ADM_MOCKS(AT, E) {
  const btn = (t, cls = '') => `<span class="am-b ${cls}">${AT(t)}</span>`;
  const ico = (c) => `<i class="fa-solid fa-${c}"></i>`;
  const pg = (name, icon, body) => ({ name, icon, body });
  const side = `<div class="am-side"><div class="am-brand"><b>${E('রুকন প্রস্তুতি')}</b><small>${AT('অ্যাডমিন প্যানেল')}</small></div>
    <div class="am-grp">${AT('ওয়েবসাইটের হোম বাটন')}</div>
    <div class="am-nav">${ico('book-open')}<span>${E('সিলেবাস দেখুন')}</span></div><div class="am-nav">${ico('book-open')}<span>${E('রুকন প্রস্তুতি')}</span></div>
    <div class="am-add">${ico('plus')} ${AT('নতুন হোম বাটন')}</div><div class="am-add gold">${ico('rotate-left')} ${AT('"সিলেবাস দেখুন" ফিরিয়ে আনুন')}</div>
    <div class="am-grp">${AT('ব্যবস্থাপনা')}</div>
    <div class="am-nav">${ico('palette')}<span>${AT('রঙের কম্বিনেশন')}</span></div><div class="am-nav">${ico('users')}<span>${AT('ইউজার ও অ্যাক্টিভিটি')}</span></div><div class="am-nav on">${ico('gear')}<span>${AT('সেটিংস')}</span></div>
    <div class="am-foot">${ico('arrow-up-right-from-square')} ${AT('সাইট দেখুন')}</div></div>
    <div class="am-top">${ico('bars')}<b>${AT('মেনু')}</b></div>`;
  const tools = `<div class="am-card"><div class="am-cap">${AT('ওয়েবসাইটে যেমন দেখায়')}</div>
    <div class="am-row"><div class="am-arrows"><span title="${E('উপরে সরান')}">${ico('arrow-up')}</span><span title="${E('নিচে সরান')}">${ico('arrow-down')}</span></div><div class="am-fakebtn">${E('বাটনের নাম')}</div><div class="am-edit">${ico('pen')} ${AT('এডিট')}</div></div>
    <div class="am-tips"><small>${AT('উপরে সরান')}</small><small>${AT('নিচে সরান')}</small><small>${AT('কার্ড উপরে')}</small><small>${AT('কার্ড নিচে')}</small><small>${AT('ক্লিক করে ভেতরে ঢুকুন')}</small><small>${AT('নাম বদলান ও সরান')}</small></div>
    <div class="am-pills">${btn('লুকান')}${btn('আবার দেখান')}${btn('লুকানো')}${btn('মুছুন', 'bad')}</div>
    <div class="am-empty">${AT('এখনো কিছু নেই')}</div><div class="am-empty">${AT('কোনো হোম বাটন নেই')}</div><div class="am-empty">${AT('খালি — ক্লিক করে যোগ করুন')}</div>
    <div class="am-wide">${ico('plus')} ${AT('যোগ করুন')}</div></div>`;
  const addStep = `<div class="am-modal"><div class="am-mh">${ico('plus')} ${AT('কী যোগ করবেন?')}</div>
    <div class="am-tile"><div class="am-thumb"></div><div><b>${AT('শুধু লেখা')}</b><small>${AT('ক্লিক করার কিছু নেই')}</small></div></div>
    <div class="am-tile"><div class="am-thumb"></div><div><b>${AT('খোলা যায়')}</b><small>${AT('ক্লিক করলে ভেতরে খোলে')}</small></div></div></div>
    <div class="am-modal"><div class="am-mh">${ico('plus')} ${AT('কী খুলবে?')}</div>
    ${[['বই', '১ ২ ৩ নম্বরে বসে। ভেতরে পরিচিতি ও ৫টি বাটন।'], ['পেজ', 'ক্লিকে পরিচিতি ও ৫টি বাটন খোলে।'], ['লেখা', 'ক্লিকে সরাসরি লেখাটি খোলে।'], ['তালিকা', 'ক্লিকে কার্ড খোলে। ভেতরে লেখা বা পেজের সারি।']].map(([a, b]) => `<div class="am-tile"><div class="am-thumb"></div><div><b>${AT(a)}</b><small>${AT(b)}</small></div></div>`).join('')}
    <div class="am-pills">${btn('পেছনে', 'ghost')}</div></div>
    <div class="am-modal"><div class="am-mh">${AT('নতুন পেজ')} · ${AT('নতুন লেখা')} · ${AT('নতুন')}</div>
    <div class="am-page"><div class="am-card2"><div class="am-ph">${AT('কার্ডের নাম')}</div><div class="am-ph row">${AT('সারির নাম')}<small>${AT('ছোট লেখা (ঐচ্ছিক)')}</small></div></div></div>
    <div class="am-ph soft">${AT('বাটনের নাম')}</div><div class="am-ph soft">${AT('বন্ধনীর লেখা (ঐচ্ছিক)')}</div><div class="am-ph soft">${AT('পেজের নাম')} · ${AT('লেখার নাম')}</div>
    <div class="am-seg"><span>${AT('ভেতরে')}</span><b>${AT('লেখা')}</b><b>${E('পেজ')}</b></div><div class="am-ph soft">${AT('ভেতরের কার্ডের নাম')}</div>
    <div class="am-wide">${ico('plus')} ${AT('যোগ করুন')}</div></div>`;
  const panel = `<div class="am-card"><div class="am-bar"><span class="am-b prim">${ico('pen')} ${AT('নাম ও বিবরণ')}</span><span class="am-sp"></span>${btn('উপরে')}${btn('নিচে')}${btn('লুকান')}${btn('লুকানো — দেখান')}${btn('মুছুন', 'bad')}</div>
    <div class="am-ph">${AT('নাম')}</div><div class="am-ph">${AT('ছোট লেখা')}</div><div class="am-ph">${AT('বন্ধনীর লেখা')}</div><div class="am-ph">${AT('কার্ডের নাম')}</div><div class="am-ph">${AT('ভেতরের কার্ড')}</div>
    <div class="am-cap">${AT('ক্লিক করলে কী হবে')}</div>
    ${[['শুধু লেখা', 'ক্লিকে কিছু হয় না'], ['পেজ', 'পরিচিতি ও ৫টি বাটন'], ['লেখা', 'সরাসরি লেখা খোলে'], ['তালিকা', 'ভেতরে লেখার সারি'], ['খণ্ড', 'ভেতরে পেজের সারি']].map(([a, b], i) => `<div class="am-mode"><i>${i + 1}</i><div><b>${AT(a)}</b><small>${AT(b)}</small></div></div>`).join('')}
    <div class="am-cap">${AT('খুলুন ও নাম বদলান')} · ${AT('নতুন সিলেবাস বাটন')}</div>
    <div class="am-info"><div class="am-ph">${AT('বইয়ের নাম')}</div><div class="am-ph">${AT('তথ্যের নাম')}</div><div class="am-ph">${AT('মান')}</div><div class="am-ph soft">${AT('যেমন ৪০০')} · ${AT('যেমন ৩০০')} · ${AT('এখানে লিখুন')}</div>${btn('সরান')}${btn('আরো তথ্য যোগ করুন', 'ghost')}${btn('খণ্ড যোগ করুন', 'ghost')}${btn('লেখা যোগ করুন', 'ghost')}</div>
    <div class="am-wide">${ico('floppy-disk')} ${AT('সেভ করুন')}</div></div>`;
  const note = `<div class="am-card"><div class="am-cap">${AT('পড়ার লেখা')} · ${AT('নোটের লেখা')}</div>
    <div class="am-help">${AT('নিচের বক্সে সরাসরি লিখুন, অথবা ওয়ার্ড/অন্য জায়গা থেকে কপি করে পেস্ট করুন।')}</div><div class="am-help">${AT('উপরের ট্যাব (হোম, ইনসার্ট, লেআউট ...) থেকে বড় লেখা, রং, ছবি, টেবিল ইত্যাদি দিন।')}</div>
    <div class="am-help">${AT('শেষে নিচের সবুজ')} <b>${AT('সেভ')}</b> ${AT('বাটন (বা Ctrl+S) চাপুন।')}</div>
    <div class="am-modal"><div class="am-mh">${AT('সূচিপত্র সেভ করুন')}</div><div class="am-pills">${btn('সব টিক')}${btn('বাতিল', 'ghost')}</div></div></div>`;
  const editor = `<div class="am-card"><div class="am-tbar">${btn('বড় শিরোনাম')}${btn('ছোট শিরোনাম')}${btn('প্যারাগ্রাফ')}<span class="am-ic">B I U</span><span class="am-ic">${ico('align-left')} ${ico('align-center')}</span><span class="am-ic">${ico('list-ul')} ${ico('list-ol')}</span>${btn('সাইজ')}${btn('রং')}${btn('কলাম')}${btn('ডিফল্ট সাইজ')}${btn('সূচিপত্র', 'prim')}</div>
    <div class="am-menu">${btn('সূচিপত্র তৈরি করুন', 'ghost')}${btn('সূচিপত্র বন্ধ করুন', 'ghost')}${btn('সূচিপত্র চালু করুন', 'ghost')}</div>
    <div class="am-tbar sub"><b>${AT('কলাম')}</b>${btn('টেবিল')}${btn('প্রস্থ')}${btn('সারি')}</div>
    <div class="am-help">${AT('কলাম ও সারি বেছে নিন:')} · ${AT('স্বয়ংক্রিয় সাইজ (১-২০):')}</div><div class="am-ph soft">${AT('এখানে লেখা পেস্ট করুন বা লিখুন...')}</div></div>`;
  const colors = `<div class="am-card"><div class="am-cap">${AT('এক রং বেছে নিন')}</div><div class="am-dots"><i></i><i></i><i></i><i></i><i></i></div><div class="am-cap">${AT('চারটি রং আলাদা করে')}</div>
    ${['১. পেজের পেছন', '২. হেডার ও কার্ড', '৩. হাইলাইট', '৪. লেখা ও ব্যাজ'].map((t, i) => `<div class="am-role"><i class="c${i}"></i><b>${AT(t)}</b></div>`).join('')}
    <div class="am-pills">${btn('এখনই চালু করুন', 'prim')}${btn('বক্সে রাখুন', 'ghost')}</div>
    <div class="am-cap">${AT('সেভ করা কম্বিনেশন')}</div><div class="am-help">${AT('প্রতি ২৪ ঘণ্টায় রং নিজে নিজে বদলাবে')}</div><div class="am-pills">${btn('ডিফল্ট ৫টি ফিরিয়ে আনুন', 'ghost')}</div></div>`;
  const users = `<div class="am-stats"><div><small>${AT('মোট ইউজার')}</small><b>১২</b></div><div><small>${AT('আজ সক্রিয়')}</small><b>৩</b></div><div><small>${AT('৭ দিনে সক্রিয়')}</small><b>৮</b></div><div><small>${AT('মোট নোট খোলা')}</small><b>৪৮</b></div></div>
    <div class="am-card"><div class="am-cap">${AT('শেষ ৭ দিনের সক্রিয়তা')}</div><div class="am-cap">${AT('সবচেয়ে বেশি পড়া নোট')}</div><div class="am-empty">${AT('এখনো কেউ কিছু পড়েনি')}</div></div>
    <div class="am-card"><div class="am-ph soft">${AT('নাম বা ইমেইল দিয়ে খুঁজুন...')}</div><div class="am-tips"><small>${AT('সব')}</small><small>${AT('আজ সক্রিয়')}</small><small>${AT('৭ দিনে সক্রিয়')}</small><small>${AT('নিষ্ক্রিয়')}</small></div><div class="am-tips"><small>${AT('শেষ লগইন')}</small><small>${AT('বেশি নোট পড়েছে')}</small><small>${AT('বেশি টানা দিন')}</small><small>${AT('নতুন যোগ দিয়েছে')}</small></div>
    <div class="am-user"><b>${AT('(নাম নেই)')}</b><small>${AT('যোগ দিয়েছে')} · ${AT('খোলা নোট')} · ${AT('সক্রিয় দিন')} · ${AT('টানা দিন')}</small></div><div class="am-empty">${AT('কোনো ইউজার নেই')}</div><div class="am-empty">${AT('কেউ লগইন করলে এখানে দেখা যাবে')}</div></div>
    <div class="am-modal"><div class="am-mh">${AT('ইউজার')}</div><div class="am-kv"><small>${AT('মোট খোলা')}</small></div>
    <div class="am-pills">${btn('নতুন পাসওয়ার্ড দিন')}${btn('ইউজার মুছুন', 'bad')}</div><div class="am-cap">${AT('কোন কোন বই খুলেছে')} · ${AT('বার')}</div></div>`;
  const sets = `<div class="am-card"><div class="am-tabs"><div class="on">${ico('globe')}<div><b>${AT('অ্যাপ সেটিংস')}</b><small>${AT('সাইটের নাম, কার্ড ও সব লেখা')}</small></div></div><div>${ico('font')}<div><b>${AT('লেখার ধরন')}</b><small>${AT('ফন্ট, আকার ও ধরন')}</small></div></div><div>${ico('screwdriver-wrench')}<div><b>${AT('অ্যাডমিন সেটিংস')}</b><small>${AT('এই প্যানেলের সব লেখা')}</small></div></div></div>
    <div class="am-ph soft">${AT('খুঁজুন...')}</div><div class="am-pills">${btn('আগের অবস্থায় ফেরান', 'ghost')}</div></div>
    <div class="am-card"><div class="am-ph soft">${AT('অ্যাপের নাম')}</div><div class="am-ph soft">${AT('ছোট লাইন (না লিখলে দেখাবে না)')}</div><div class="am-cap">${AT('কার্ডের নামের তালিকা')} · ${AT('নতুন নাম')}</div></div>
    <div class="am-card"><div class="am-cap">${AT('ফন্ট বাছুন')}</div><div class="am-cap">${AT('লেখার ধরন')}</div><div class="am-tips"><small>${AT('মোটা-পাতলা')}</small><small>${AT('অক্ষরের ফাঁক')}</small></div><div class="am-tips"><small>${AT('আগের মতো')}</small><small>${AT('সাধারণ')}</small><small>${AT('মাঝারি')}</small><small>${AT('বোল্ড')}</small><small>${AT('স্বাভাবিক')}</small><small>${AT('একটু ফাঁকা')}</small><small>${AT('বেশি ফাঁকা')}</small></div></div>`;
  return { 'সাইডবার': side, 'ওয়েবসাইট এডিট পেজ': tools, 'যোগ করুন উইন্ডো': addStep, 'এডিট প্যানেল': panel, 'নোট ও ট্যাব': note, 'নোট এডিটর': editor, 'রঙ পেজ': colors, 'ইউজার পেজ': users, 'সেটিংস পেজ': sets, _pg: pg };
}
