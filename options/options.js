'use strict';

const sidebarContentSelect = document.getElementById('sidebar-content');

function populateSelect(filterText = '') {
    sidebarContentSelect.innerHTML = '';
    filterText = filterText.toLowerCase();
    // loop through domainsList and add options that match filterText
    domainsList.forEach(function(domain) {
        if (domain.name.toLowerCase().includes(filterText) || domain.url.toLowerCase().includes(filterText)) {
            const option = document.createElement('option');
            option.value = domain.key;  // use key as the stored value
            option.textContent = domain.name;
            sidebarContentSelect.appendChild(option);
        }
    });
}

function saveOptions(content) {
    browser.storage.local.set({
        sidebarContent: content
    });
}

function updateUI(res) {
    // populate the select list with all domains
    populateSelect();
    // set the selected value to the stored value or default to 'chatgpt'
    sidebarContentSelect.value = res.sidebarContent || 'chatgpt';
}

function restoreOptions() {
    browser.storage.local.get("sidebarContent")
        .then(updateUI)
        .catch(error => {
            console.error(`Error: ${error}`);
        });
}

function changeHandler() {
    saveOptions(sidebarContentSelect.value);
}

sidebarContentSelect.addEventListener("change", changeHandler);
document.addEventListener("DOMContentLoaded", restoreOptions);