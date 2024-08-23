document.getElementById('toggle-dark-mode').addEventListener('click',
    async () => {
        const isDarkMode = await window.darkMode.toggle()
        document.getElementById('toggle-dark-mode').innerHTML = isDarkMode ? 'Dark Mode' : 'Light Mode'
    })

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
})