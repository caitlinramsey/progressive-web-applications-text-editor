const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log('event' + event)
    event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove hidden class from button
    butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
    const startEvent = window.deferredPrompt;
    if (!startEvent) {
        return;
    }

    // Show prompt
    startEvent.prompt();

    // Reset the deferred prompt variable
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    console.log('install hit')
    window.deferredPrompt = null;
});
