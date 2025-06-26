// VSPO 成員資料 (頭像更新，名稱修正)
const members = [
    {"name_jp": "花芽すみれ", "name_en": "Kaga Sumire", "color": "#b0c4de", "avatar": "https://pbs.twimg.com/profile_images/1912465565295263744/ZXjbYmGJ_400x400.jpg"},
    {"name_jp": "花芽なずな", "name_en": "Kaga Nazuna", "color": "#fabedc", "avatar": "https://pbs.twimg.com/profile_images/1907435057507430400/KvnnxOFy_400x400.jpg"},
    {"name_jp": "小雀とと", "name_en": "Kogara Toto", "color": "#f5eb4a", "avatar": "https://pbs.twimg.com/profile_images/1912783899312480256/-FXzc0rz_400x400.jpg"},
    {"name_jp": "一ノ瀬うるは", "name_en": "Ichinose Uruha", "color": "#4182fa", "avatar": "https://pbs.twimg.com/profile_images/1753117533664940032/NP-aP5RZ_400x400.jpg"},
    {"name_jp": "胡桃のあ", "name_en": "Kurumi Noah", "color": "#ffdbfe", "avatar": "https://pbs.twimg.com/profile_images/1907727455085015045/PBwEYx6D_400x400.jpg"},
    {"name_jp": "兎咲ミミ", "name_en": "Tosaki Mimi", "color": "#c7b2d6", "avatar": "https://pbs.twimg.com/profile_images/1879507811631300608/QT2dXtta_400x400.jpg"},
    {"name_jp": "空澄セナ", "name_en": "Asumi Sena", "color": "#a8d8ff", "avatar": "https://pbs.twimg.com/profile_images/1907001131273961472/Z4UhnFux_400x400.jpg"},
    {"name_jp": "橘ひなの", "name_en": "Tachibana Hinano", "color": "#fa96c8", "avatar": "https://pbs.twimg.com/profile_images/1618233947422621696/fEHyhcnK_400x400.jpg"},
    {"name_jp": "英リサ", "name_en": "Hanabusa Lisa", "color": "#d1de79", "avatar": "https://pbs.twimg.com/profile_images/1874097043301699584/zi7RmmP3_400x400.jpg"},
    {"name_jp": "如月れん", "name_en": "Kisaragi Ren", "color": "#be2152", "avatar": "https://pbs.twimg.com/profile_images/1847305606274932736/LBEG7ICH_400x400.jpg"},
    {"name_jp": "神成きゅぴ", "name_en": "Kaminari Qpi", "color": "#ffd23c", "avatar": "https://pbs.twimg.com/profile_images/1862078851930828800/63fGuJI2_400x400.jpg"},
    {"name_jp": "八雲べに", "name_en": "Yakumo Beni", "color": "#85cab3", "avatar": "https://pbs.twimg.com/profile_images/1921182407862218753/bheaA8c3_400x400.jpg"},
    {"name_jp": "藍沢エマ", "name_en": "Aizawa Ema", "color": "#b4f1f9", "avatar": "https://pbs.twimg.com/profile_images/1881204018262974464/rn9wukHW_400x400.jpg"},
    {"name_jp": "紫宮るな", "name_en": "Shinomiya Runa", "color": "#d6adff", "avatar": "https://pbs.twimg.com/profile_images/1839045768423817216/549FecAA_400x400.jpg"},
    {"name_jp": "猫汰つな", "name_en": "Nekota Tsuna", "color": "#ff3652", "avatar": "https://pbs.twimg.com/profile_images/1874123390812119041/LHG2STEC_400x400.jpg"},
    {"name_jp": "白波らむね", "name_en": "Shiranami Ramune", "color": "#8eced9", "avatar": "https://pbs.twimg.com/profile_images/1924698687097470978/OO-oOylq_400x400.jpg"},
    {"name_jp": "小森めと", "name_en": "Komori Met", "color": "#fba03f", "avatar": "https://pbs.twimg.com/profile_images/1868231900919369728/SRXuyYfq_400x400.jpg"},
    {"name_jp": "夢野あかり", "name_en": "Yumeno Akari", "color": "#ff998d", "avatar": "https://pbs.twimg.com/profile_images/1804138636423892995/8e6VfxvB_400x400.jpg"},
    {"name_jp": "夜乃くろむ", "name_en": "Yano Kuromu", "color": "#909ec8", "avatar": "https://pbs.twimg.com/profile_images/1934848178534404099/duv55ZOx_400x400.jpg"},
    {"name_jp": "紡木こかげ", "name_en": "Tsumugi Kokage", "color": "#5195e1", "avatar": "https://pbs.twimg.com/profile_images/1769316534248439808/UoI5e3Lt_400x400.jpg"},
    {"name_jp": "千燈ゆうひ", "name_en": "Sendo Yuuhi", "color": "#ed784a", "avatar": "https://pbs.twimg.com/profile_images/1785226750089433088/mrijg6NS_400x400.jpg"},
    {"name_jp": "蝶屋はなび", "name_en": "Choya Hanabi", "color": "#ea5506", "avatar": "https://pbs.twimg.com/profile_images/1851908795443916800/iOVHANSX_400x400.jpg"},
    {"name_jp": "甘結もか", "name_en": "Amayui Moka", "color": "#eca0aa", "avatar": "https://pbs.twimg.com/profile_images/1851908799499767813/WO_pmLid_400x400.jpg"}
];

// 應用程式狀態
let memberState = {};
let draggedElement = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeMemberState();
    renderAll();
    setupEventListeners();
});

function initializeMemberState() {
    const savedState = localStorage.getItem('vspoTierState');
    if (savedState) {
        memberState = JSON.parse(savedState);
        // 合併新成員資料，保留舊的排序和會員狀態
        members.forEach((member, index) => {
            if (memberState[index]) {
                memberState[index].name_jp = member.name_jp;
                memberState[index].name_en = member.name_en;
                memberState[index].color = member.color;
                memberState[index].avatar = member.avatar;
            } else {
                memberState[index] = { id: index, tier: 'pool', isMember: false, ...member };
            }
        });
    } else {
         members.forEach((member, index) => {
            memberState[index] = { id: index, tier: 'pool', isMember: false, ...member };
        });
    }
}

function saveState() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        const tier = zone.id === 'memberPool' ? 'pool' : zone.id.split('-')[1];
        zone.querySelectorAll('.member-card').forEach(card => {
            const memberIndex = card.dataset.memberIndex;
            if(memberState[memberIndex]) {
               memberState[memberIndex].tier = tier;
            }
        });
    });
    localStorage.setItem('vspoTierState', JSON.stringify(memberState));
}

function getTextColor(hexColor) {
    if (!hexColor) return '#000000';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
}

function createMemberCard(memberIndex) {
    const member = memberState[memberIndex];
    const card = document.createElement('div');
    card.className = `member-card ${member.isMember ? 'is-member' : ''}`;
    card.draggable = true;
    card.dataset.memberIndex = memberIndex;
    card.style.backgroundColor = member.color;
    card.style.color = getTextColor(member.color);
    
    card.innerHTML = `
        <img src="${member.avatar}" alt="${member.name_jp} avatar" class="member-avatar" onerror="this.style.display='none'">
        <div class="member-info">
            <div class="member-name-jp">${member.name_jp}</div>
            <div class="member-name-en">${member.name_en}</div>
        </div>
        <div class="member-checkbox-container">
            <img src="${member.avatar}" class="member-checkbox" id="member-${memberIndex}" ${member.isMember ? 'checked' : ''}>
        </div>
    `;
    
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    card.addEventListener('touchstart', handleTouchStart, {passive: true});
    
    card.querySelector('.member-star').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMemberStatus(memberIndex);
    });
    
    return card;
}

function renderAll() {
    const memberOrder = {};
    // 儲存當前順序
    document.querySelectorAll('.drop-zone').forEach(zone => {
        const tierId = zone.id;
        memberOrder[tierId] = [...zone.querySelectorAll('.member-card')].map(c => c.dataset.memberIndex);
    });

    document.querySelectorAll('.drop-zone').forEach(zone => zone.innerHTML = '');
    
    // 按照儲存的順序或預設狀態渲染
    Object.keys(memberState).forEach(memberIndex => {
         const member = memberState[memberIndex];
         if (!member) return;
         const card = createMemberCard(memberIndex);
         const tier = member.tier;
         const containerId = tier === 'pool' ? 'memberPool' : `tier-${tier}`;
         const container = document.getElementById(containerId);
         if(container) container.appendChild(card);
    });

    // 恢復順序
    Object.keys(memberOrder).forEach(tierId => {
        const container = document.getElementById(tierId);
        if (container) {
             memberOrder[tierId].forEach(memberIndex => {
                 const card = container.querySelector(`.member-card[data-member-index="${memberIndex}"]`);
                 if(card) container.appendChild(card);
             });
        }
    });

    updateAllCounts();
}

function updateAllCounts() {
    let totalInTiers = 0;
    for (let i = 1; i <= 5; i++) {
        const count = document.querySelectorAll(`#tier-${i} .member-card`).length;
        totalInTiers += count;
        const tierEl = document.querySelector(`.tier[data-tier="${i}"] .member-count`);
        if(tierEl) tierEl.textContent = `(${count})`;
    }
    const poolCount = document.querySelectorAll(`#memberPool .member-card`).length;
    const poolCountEl = document.getElementById('poolCount');
    if(poolCountEl) poolCountEl.textContent = `(${poolCount})`;
}

function toggleMemberStatus(memberIndex) {
    memberState[memberIndex].isMember = !memberState[memberIndex].isMember;
    const card = document.querySelector(`.member-card[data-member-index="${memberIndex}"]`);
    if (card) {
        card.classList.toggle('is-member', memberState[memberIndex].isMember);
    }
    saveState();
}

function handleDragStart(e) {
    draggedElement = this;
    setTimeout(() => this.classList.add('dragging'), 0);
}
function handleDragEnd() {
    if(draggedElement) draggedElement.classList.remove('dragging');
    draggedElement = null;
    updateAllCounts();
    saveState();
}
function handleDragOver(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    if (dropZone.classList.contains('drop-zone')) {
         const afterElement = getDragAfterElement(dropZone, e.clientX);
         if (draggedElement) {
             if (afterElement == null) {
                dropZone.appendChild(draggedElement);
             } else {
                dropZone.insertBefore(draggedElement, afterElement);
             }
         }
    }
}

let activeTouchElement = null;
let touchStartTimer;

function handleTouchStart(e) {
    if(e.target.classList.contains('member-checkbox')) return;
    
    activeTouchElement = this;
    
    // 長按 200ms 後啟動拖曳
    touchStartTimer = setTimeout(() => {
        if (!activeTouchElement) return;

        draggedElement = activeTouchElement;
        draggedElement.classList.add('dragging');
        
        document.addEventListener('touchmove', handleTouchMove, {passive: false});
        document.addEventListener('touchend', handleTouchEnd, {passive: false});
        
        // 模擬第一次 move 事件來處理初始位置
        handleTouchMove(e);

    }, 200);

    // 如果手指放開或移動，則取消長按計時
    activeTouchElement.addEventListener('touchend', cancelLongPress, { once: true });
    activeTouchElement.addEventListener('touchmove', cancelLongPress, { once: true });
}

function cancelLongPress() {
     clearTimeout(touchStartTimer);
}

function handleTouchMove(e) {
    if (!draggedElement) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    const dropZone = findDropZone(currentX, currentY);
    
    if(dropZone) {
        const afterElement = getDragAfterElement(dropZone, currentX);
         if (afterElement == null) {
            dropZone.appendChild(draggedElement);
         } else {
            dropZone.insertBefore(draggedElement, afterElement);
         }
    }
}

function handleTouchEnd(e) {
    clearTimeout(touchStartTimer);
    if (!draggedElement) return;
    
    draggedElement.classList.remove('dragging');
    
    updateAllCounts();
    saveState();

    draggedElement = null;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
}

function findDropZone(x, y) {
    let targetZone = null;
    document.querySelectorAll('.drop-zone').forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            targetZone = zone;
        }
    });
    return targetZone;
}

function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.member-card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function setupEventListeners() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
    });
    
    document.getElementById('resetBtn').addEventListener('click', resetRanking);
    document.getElementById('exportBtn').addEventListener('click', exportScreenshot);
}

function resetRanking() {
    if (confirm('確定要重置所有排名嗎？這會清除儲存的紀錄。')) {
        localStorage.removeItem('vspoTierState');
        members.forEach((member, index) => {
            memberState[index] = { id: index, tier: 'pool', isMember: false, ...member };
        });
        renderAll();
    }
}

function exportScreenshot() {
    const btn = document.getElementById('exportBtn');
    btn.textContent = '匯出中...';
    btn.disabled = true;

    const captureArea = document.getElementById('captureArea');
    const tierContents = captureArea.querySelectorAll('.tier-content');
    tierContents.forEach(tc => tc.style.border = '2px dashed transparent');
    
    window.scrollTo(0, 0); // 確保從頂部開始截圖

    html2canvas(captureArea, {
        backgroundColor: getComputedStyle(document.body).backgroundColor,
        scale: 2, 
        useCORS: true,
        logging: false,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `VSPO排名_${new Date().toISOString().slice(0, 10)}.png`;
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => {
        console.error('匯出失敗:', error);
        alert('匯出失敗，請檢查瀏覽器主控台。');
    }).finally(() => {
        btn.textContent = '匯出排名截圖';
        btn.disabled = false;
        tierContents.forEach(tc => tc.style.border = '');
    });
}
