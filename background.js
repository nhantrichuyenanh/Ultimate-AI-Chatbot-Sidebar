'use strict';

let currentSidebarContent = 'chatgpt'; // default
let isSidebarOpen = false;

async function updateSidebarPanel(contentKey) {
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
       // default to ChatGPT if not found
       domainObj = getDomainByKey("chatgpt");
    }
    let panelUrl = `https://${domainObj.url}`;
    if (authuser) {
        panelUrl += `/?authuser=${authuser}`;
    }

    browser.sidebarAction.setPanel({ panel: panelUrl });
}

// load stored sidebar content on startup and set initial panel
async function initializeSidebar() {
    const storedContent = await browser.storage.local.get("sidebarContent");
    currentSidebarContent = storedContent.sidebarContent || 'chatgpt';
    updateSidebarPanel(currentSidebarContent);
}
initializeSidebar();

// listen for changes from the options page
browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.sidebarContent) {
        currentSidebarContent = changes.sidebarContent.newValue;
        updateSidebarPanel(currentSidebarContent);
    }
});

// ensure the page action icon is visible on all tabs
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    browser.pageAction.show(tabId);
});

// listen for clicks on the page action button
browser.pageAction.onClicked.addListener((tab) => {
    if (isSidebarOpen) {
        // if the sidebar is open, close it
        browser.sidebarAction.close();
        isSidebarOpen = false;
    } else {
        // if the sidebar is closed, open it
        browser.sidebarAction.open();
        isSidebarOpen = true;
    }
});

// listen for messages from the sidebar
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.sidebarClosed) {
        isSidebarOpen = false;
    }
});