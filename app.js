// VSPO Member data with correct colors
const members = [
    {"name_jp": "花芽すみれ", "name_en": "Kaga Sumire", "color": "#b0c4de"},
    {"name_jp": "花芽なずな", "name_en": "Kaga Nazuna", "color": "#fabedc"},
    {"name_jp": "小雀とと", "name_en": "Kogara Toto", "color": "#f5eb4a"},
    {"name_jp": "一ノ瀬うるは", "name_en": "Ichinose Uruha", "color": "#4182fa"},
    {"name_jp": "胡桃のあ", "name_en": "Kurumi Noa", "color": "#ffdbfe"},
    {"name_jp": "兎咲ミミ", "name_en": "Tosaki Mimi", "color": "#c7b2d6"},
    {"name_jp": "空澄セナ", "name_en": "Asumi Sena", "color": "#ffffff"},
    {"name_jp": "橘ひなの", "name_en": "Tachibana Hinano", "color": "#fa96c8"},
    {"name_jp": "英リサ", "name_en": "Hanabusa Lisa", "color": "#d1de79"},
    {"name_jp": "如月れん", "name_en": "Kisaragi Ren", "color": "#be2152"},
    {"name_jp": "神成きゅぴ", "name_en": "Kaminari Qpi", "color": "#ffd23c"},
    {"name_jp": "八雲べに", "name_en": "Yakumo Beni", "color": "#85cab3"},
    {"name_jp": "藍沢エマ", "name_en": "Aizawa Ema", "color": "#b4f1f9"},
    {"name_jp": "紫宮るな", "name_en": "Shinomiya Runa", "color": "#d6adff"},
    {"name_jp": "猫汰つな", "name_en": "Nekota Tsuna", "color": "#ff3652"},
    {"name_jp": "白波らむね", "name_en": "Shiranami Ramune", "color": "#8eced9"},
    {"name_jp": "小森めと", "name_en": "Komori Meto", "color": "#fba03f"},
    {"name_jp": "夢野あかり", "name_en": "Yumeno Akari", "color": "#ff998d"},
    {"name_jp": "夜乃くろむ", "name_en": "Yano Kuromu", "color": "#909ec8"},
    {"name_jp": "紡木こかげ", "name_en": "Tsumugi Kokage", "color": "#5195e1"},
    {"name_jp": "千燈ゆうひ", "name_en": "Sendo Yuuhi", "color": "#ed784a"},
    {"name_jp": "蝶屋はなび", "name_en": "Choya Hanabi", "color": "#ea5506"},
    {"name_jp": "甘結もか", "name_en": "Amayui Moka", "color": "#eca0aa"}
];

// Application state
let memberState = {};
let draggedElement = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeMemberState();
    renderMemberPool();
    setupEventListeners();
    updateAllCounts();
    updateTierWidths();
});

// Initialize member state
function initializeMemberState() {
    members.forEach((member, index) => {
        memberState[index] = {
            tier: 'pool',
            isMember: false,
            ...member
        };
    });
}

// Calculate text color based on background brightness
function getTextColor(hexColor) {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Parse RGB values
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate brightness using luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return black for light backgrounds, white for dark backgrounds
    return brightness > 128 ? '#000000' : '#ffffff';
}

// Create member card element
function createMemberCard(memberIndex) {
    const member = memberState[memberIndex];
    const card = document.createElement('div');
    card.className = `member-card ${member.isMember ? 'is-member' : ''}`;
    card.draggable = true;
    card.dataset.memberIndex = memberIndex;
    card.style.backgroundColor = member.color;
    card.style.color = getTextColor(member.color);
    
    card.innerHTML = `
        <div class="member-name-jp">${member.name_jp}</div>
        <div class="member-name-en">${member.name_en}</div>
        <div class="member-checkbox-container">
            <input type="checkbox" 
                   class="member-checkbox" 
                   id="member-${memberIndex}"
                   ${member.isMember ? 'checked' : ''}>
            <label for="member-${memberIndex}" class="member-checkbox-label">會員</label>
        </div>
    `;
    
    // Add drag event listeners
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    // Add checkbox event listener
    const checkbox = card.querySelector('.member-checkbox');
    checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        toggleMemberStatus(memberIndex);
    });
    
    return card;
}

// Render member pool
function renderMemberPool() {
    const memberPool = document.getElementById('memberPool');
    memberPool.innerHTML = '';
    
    Object.keys(memberState).forEach(memberIndex => {
        if (memberState[memberIndex].tier === 'pool') {
            const card = createMemberCard(memberIndex);
            memberPool.appendChild(card);
        }
    });
}

// Render tier
function renderTier(tierNumber) {
    const tierContent = document.getElementById(`tier-${tierNumber}`);
    tierContent.innerHTML = '';
    
    Object.keys(memberState).forEach(memberIndex => {
        if (memberState[memberIndex].tier === tierNumber.toString()) {
            const card = createMemberCard(memberIndex);
            tierContent.appendChild(card);
        }
    });
}

// Update tier width based on member count
function updateTierWidths() {
    for (let i = 1; i <= 5; i++) {
        const tierContent = document.getElementById(`tier-${i}`);
        const memberCount = Object.values(memberState).filter(member => member.tier === i.toString()).length;
        const baseWidth = 200;
        const memberWidth = 140;
        const calculatedWidth = baseWidth + (memberCount * memberWidth);
        
        // Apply width to the entire tier container
        const tier = tierContent.closest('.tier');
        tier.style.width = `${Math.max(calculatedWidth, 300)}px`; // Minimum width of 300px
    }
}

// Update member counts
function updateAllCounts() {
    // Update tier counts
    for (let i = 1; i <= 5; i++) {
        const count = Object.values(memberState).filter(member => member.tier === i.toString()).length;
        const tierElement = document.querySelector(`.tier[data-tier="${i}"] .member-count`);
        if (tierElement) {
            tierElement.textContent = `(${count})`;
        }
    }
    
    // Update pool count
    const poolCount = Object.values(memberState).filter(member => member.tier === 'pool').length;
    const poolCountElement = document.getElementById('poolCount');
    if (poolCountElement) {
        poolCountElement.textContent = `(${poolCount})`;
    }
    
    // Update tier widths
    updateTierWidths();
}

// Toggle member status
function toggleMemberStatus(memberIndex) {
    memberState[memberIndex].isMember = !memberState[memberIndex].isMember;
    
    // Find and update all instances of this member card
    const allCards = document.querySelectorAll(`[data-member-index="${memberIndex}"]`);
    allCards.forEach(card => {
        const checkbox = card.querySelector('.member-checkbox');
        if (memberState[memberIndex].isMember) {
            card.classList.add('is-member');
            checkbox.checked = true;
        } else {
            card.classList.remove('is-member');
            checkbox.checked = false;
        }
    });
}

// Drag and drop handlers
function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.memberIndex);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    // Only remove drag-over if we're actually leaving the element
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    this.classList.remove('drag-over');
    
    if (!draggedElement) return false;
    
    const memberIndex = draggedElement.dataset.memberIndex;
    let targetTier = 'pool';
    
    // Determine target tier based on drop zone
    if (this.id === 'memberPool') {
        targetTier = 'pool';
    } else if (this.classList.contains('tier-content')) {
        // Find the parent tier element and get its data-tier attribute
        const tierElement = this.closest('[data-tier]');
        if (tierElement) {
            targetTier = tierElement.dataset.tier;
        }
    } else if (this.dataset.tier) {
        targetTier = this.dataset.tier;
    }
    
    // Get the source tier for re-rendering
    const sourceTier = memberState[memberIndex].tier;
    
    // Update member state
    memberState[memberIndex].tier = targetTier;
    
    // Re-render affected areas
    if (sourceTier === 'pool') {
        renderMemberPool();
    } else {
        renderTier(parseInt(sourceTier));
    }
    
    if (targetTier === 'pool') {
        renderMemberPool();
    } else {
        renderTier(parseInt(targetTier));
    }
    
    // Force update counts after DOM changes
    setTimeout(() => {
        updateAllCounts();
    }, 10);
    
    return false;
}

// Setup event listeners
function setupEventListeners() {
    // Setup drop zones for tier contents
    const tierContents = document.querySelectorAll('.tier-content');
    tierContents.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDrop);
    });
    
    // Setup drop zone for member pool
    const memberPool = document.getElementById('memberPool');
    memberPool.addEventListener('dragover', handleDragOver);
    memberPool.addEventListener('dragenter', handleDragEnter);
    memberPool.addEventListener('dragleave', handleDragLeave);
    memberPool.addEventListener('drop', handleDrop);
    
    // Setup control buttons
    document.getElementById('resetBtn').addEventListener('click', resetRanking);
    document.getElementById('randomBtn').addEventListener('click', randomAssignment);
    document.getElementById('exportBtn').addEventListener('click', exportScreenshot);
    
    // Setup date input
    const dateInput = document.getElementById('dateInput');
    dateInput.addEventListener('blur', function() {
        // Validate date format
        const datePattern = /^\[\d{4}\/\d{2}\/\d{2}\]$/;
        if (!datePattern.test(this.textContent)) {
            this.textContent = '[2025/05/30]';
        }
    });
}

// Reset ranking
function resetRanking() {
    Object.keys(memberState).forEach(memberIndex => {
        memberState[memberIndex].tier = 'pool';
        memberState[memberIndex].isMember = false;
    });
    
    renderMemberPool();
    for (let i = 1; i <= 5; i++) {
        renderTier(i);
    }
    updateAllCounts();
}

// Random assignment
function randomAssignment() {
    const memberIndices = Object.keys(memberState);
    const tiers = ['1', '2', '3', '4', '5'];
    
    // Shuffle members
    for (let i = memberIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memberIndices[i], memberIndices[j]] = [memberIndices[j], memberIndices[i]];
    }
    
    // Assign to tiers randomly
    memberIndices.forEach((memberIndex, index) => {
        if (Math.random() > 0.2) { // 80% chance to assign to a tier
            const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
            memberState[memberIndex].tier = randomTier;
        } else {
            memberState[memberIndex].tier = 'pool';
        }
        
        // Random member status
        memberState[memberIndex].isMember = Math.random() > 0.7; // 30% chance
    });
    
    renderMemberPool();
    for (let i = 1; i <= 5; i++) {
        renderTier(i);
    }
    updateAllCounts();
}

// Export screenshot
function exportScreenshot() {
    const exportBtn = document.getElementById('exportBtn');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = '匯出中...';
    exportBtn.disabled = true;
    
    const rankingContainer = document.getElementById('rankingContainer');
    
    html2canvas(rankingContainer, {
        backgroundColor: '#fcfcf9',
        scale: 2,
        useCORS: true,
        allowTaint: true
    }).then(function(canvas) {
        // Create download link
        const link = document.createElement('a');
        link.download = `VSPO排名_${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL();
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    }).catch(function(error) {
        console.error('Export failed:', error);
        alert('匯出失敗，請稍後再試');
        
        // Reset button
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    });
}