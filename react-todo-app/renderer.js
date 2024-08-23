/* 테마 설정 */
document.getElementById('toggle-dark-mode').addEventListener('click',
    async () => {
        const isDarkMode = await window.darkMode.toggle()
        document.getElementById('toggle-dark-mode').innerHTML = isDarkMode ? 'Dark Mode' : 'Light Mode'
    })

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
})

/* 알림 - 렌더 프로세스에서 실행 */
const NOTIFICATION_TITLE = 'Electron app'
const NOTIFICATION_BODY = 'Reload'
// const CLICK_MESSAGE = 'Notification clicked!

new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclose = () => {
    console.log('Notification closed');
};
//     .onclick = () => { document.getElementById('output').innerText = CLICK_MESSAGE }