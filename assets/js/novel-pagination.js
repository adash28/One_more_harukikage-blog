document.addEventListener("DOMContentLoaded", function() {
    // Only run on novel pages
    const postContent = document.querySelector('.post-content');
    // Check for 'novels' class on body or post-single (depending on implementation)
    const isNovel = document.body.classList.contains('type-novels') || 
                   document.querySelector('.post-single.novels') ||
                   window.location.pathname.includes('/novels/');
                   
    if (!postContent || !isNovel) return;

    // Filter valid content elements (paragraphs, headers, etc.)
    // We ignore script tags, style tags, and empty text nodes
    const paragraphs = Array.from(postContent.children).filter(el => {
        return !['SCRIPT', 'STYLE'].includes(el.tagName) && el.textContent.trim().length > 0;
    });

    // If content is short, don't paginate
    if (paragraphs.length < 20) return;

    const PARAGRAPHS_PER_PAGE = 20;
    const totalPages = Math.ceil(paragraphs.length / PARAGRAPHS_PER_PAGE);
    let currentPage = 1;

    // Create pages container
    const pagesContainer = document.createElement('div');
    pagesContainer.className = 'novel-pages-container';

    // Group paragraphs into pages
    for (let i = 0; i < totalPages; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'novel-page';
        pageDiv.style.display = i === 0 ? 'block' : 'none';
        pageDiv.dataset.page = i + 1;

        const start = i * PARAGRAPHS_PER_PAGE;
        const end = start + PARAGRAPHS_PER_PAGE;
        const pageParas = paragraphs.slice(start, end);

        // We need to move the actual elements, so we use appendChild
        pageParas.forEach(p => pageDiv.appendChild(p));
        pagesContainer.appendChild(pageDiv);
    }

    // Clear original content (but keep things we didn't move, like maybe some hidden inputs or scripts if any remained)
    // Actually, safest is to clear all and append our container
    postContent.innerHTML = '';
    postContent.appendChild(pagesContainer);

    // Create Pagination Controls
    const controls = document.createElement('div');
    controls.className = 'novel-pagination-controls';
    controls.innerHTML = `
        <button id="novel-prev" class="novel-pagination-btn" disabled>上一页</button>
        <span id="novel-page-info" class="novel-pagination-info">1 / ${totalPages}</span>
        <button id="novel-next" class="novel-pagination-btn">下一页</button>
    `;
    
    // Insert controls after content (before footer/nav)
    postContent.parentNode.insertBefore(controls, postContent.nextSibling);

    // Add Progress Bar at top
    const progressBar = document.createElement('div');
    progressBar.id = 'novel-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: var(--primary);
        width: ${(1/totalPages)*100}%;
        z-index: 9999;
        transition: width 0.3s;
    `;
    document.body.appendChild(progressBar);

    // Event Listeners
    // Use document-level delegation to ensure events work even if DOM updates
    const prevBtn = document.getElementById('novel-prev');
    const nextBtn = document.getElementById('novel-next');
    const pageInfo = document.getElementById('novel-page-info');

    function updatePage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;

        // Hide current
        const currentEl = pagesContainer.querySelector(`.novel-page[data-page="${currentPage}"]`);
        if (currentEl) currentEl.style.display = 'none';
        
        // Show new
        currentPage = newPage;
        const newEl = pagesContainer.querySelector(`.novel-page[data-page="${currentPage}"]`);
        if (newEl) newEl.style.display = 'block';

        // Update controls
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        if (pageInfo) pageInfo.textContent = `${currentPage} / ${totalPages}`;
        
        // Update progress bar
        if (progressBar) progressBar.style.width = `${(currentPage/totalPages)*100}%`;

        // Scroll to top of content
        const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
        const scrollTarget = postContent.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: scrollTarget > 0 ? scrollTarget : 0,
            behavior: 'smooth'
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => updatePage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updatePage(currentPage + 1));
});
