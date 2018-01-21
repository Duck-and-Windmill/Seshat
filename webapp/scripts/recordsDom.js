mdc.autoInit();

var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#basic-tab-bar'));
var panels = document.querySelector('.panels');

dynamicTabBar.tabs.forEach(function(tab) {
    tab.preventDefaultOnClick = true;
});

function updatePanel(index) {
    var activePanel = panels.querySelector('.panel.active');
    if (activePanel) {
        activePanel.classList.remove('active');
    }
    var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
    if (newActivePanel) {
        newActivePanel.classList.add('active');
    }
}

dynamicTabBar.listen('MDCTabBar:change', function ({detail: tabs}) {
    var nthChildIndex = tabs.activeTabIndex;

    updatePanel(nthChildIndex);
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'MEOWMEOW!'
    }
});
