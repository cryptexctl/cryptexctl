function updateLoadingCounter() {
    const resources = window.performance.getEntriesByType('resource');
    const totalResources = resources.length;
    const loadedResources = resources.filter(resource => resource.responseEnd > 0).length;
    const remainingResources = totalResources - loadedResources;

    if (remainingResources === 0) {
        document.getElementById('loading_items-remain').textContent = ``;
    } else {
        document.getElementById('loading_items-remain').textContent = `${remainingResources} items remaining to load.`;
    }
}

const updateLoadingInterval = setInterval(updateLoadingCounter, 100);

function stopLoading() {
    clearInterval(updateLoadingInterval);
    clearInterval()
    const body = document.getElementById('main');
    const overlay = document.getElementById('loading-menu');
    overlay.style.transition = 'opacity 0.2s ease';
    overlay.style.opacity = 0;
    overlay.style.visibility = 'hidden';
    body.classList.add('loaded');
    overlay.style.display = 'none';
}

function kk() {
    const resources = window.performance.getEntriesByType('resource');
    const totalResources = resources.length;
    const loadedResources = resources.filter(resource => resource.responseEnd > 0).length;
    const remainingResources = totalResources - loadedResources;
    if (remainingResources > 0) {
        console.log(`Waiting for ${remainingResources} resources to load.`);
        return false;
    }
    if (localStorage.getItem('skip_loading') === 'true') {
        stopLoading();
    } else {
        setTimeout(function() {
            stopLoading();
        }, 1300);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    return true;

}

window.addEventListener("DOMContentLoaded", (event) => {
    kk();
})