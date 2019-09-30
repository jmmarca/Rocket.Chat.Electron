import { ipcRenderer } from 'electron';
import { setupErrorHandling } from './errorHandling';
import i18n from './i18n';
import setupContextMenuPreload from './preload/contextMenu';
import setupEventsPreload from './preload/events';
import setupJitsiPreload from './preload/jitsi';
import setupLinksPreload from './preload/links';
import setupNotificationsPreload from './preload/notifications';
import setupSidebarPreload from './preload/sidebar';
import setupSpellcheckingPreload from './preload/spellchecking';
import setupTitleChangePreload from './preload/titleChange';
import setupUserPresencePreload from './preload/userPresence';

setupErrorHandling('preload');
setupContextMenuPreload();
setupEventsPreload();
setupJitsiPreload();
setupLinksPreload();
setupNotificationsPreload();
setupSidebarPreload();
setupSpellcheckingPreload();
setupTitleChangePreload();
setupUserPresencePreload();

window.reloadServer = () => ipcRenderer.sendToHost('reload-server');
window.i18n = i18n;

ipcRenderer.on("change-userlogin", function (event, data) {
    if ($('iframe').length > 0) {
        let url = $('iframe').attr('src');
        let userNameVar = "&username=" + data.user;
        if (url.indexOf(userNameVar) == -1 && url.indexOf('3030/login') != -1) {
            $('iframe').attr('src', url + userNameVar);
        }
    }
});
