'use strict';

async function setSidebarContent() {
    let contentKey = 'chatgpt'; // default
    try {
        const storedContent = await browser.storage.local.get("sidebarContent");
        contentKey = storedContent.sidebarContent || 'chatgpt';
    } catch (e) {
        console.error("Error getting stored sidebar content:", e);
    }

    let authuser = '';
    try {
        let res = await browser.storage.local.get('authuser');
        if ('authuser' in res) {
            authuser = encodeURIComponent(res.authuser);
        }
    } catch (e) {
        console.error('Error retrieving authuser from storage:', e);
    }

    var domainObj = getDomainByKey(contentKey);
    if (!domainObj) {
       domainObj = getDomainByKey("chatgpt");
    }
    let panelUrl = `https://${domainObj.url}`;
    if (authuser) {
        panelUrl += `/?authuser=${authuser}`;
    }
    
    document.getElementById('sidebar-frame').src = panelUrl;
}

setSidebarContent();

// notify background script when the sidebar panel is unloaded
window.addEventListener('unload', () => {
  browser.runtime.sendMessage({ sidebarClosed: true });
});