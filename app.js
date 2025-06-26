:root {
    /* 顏色變數 */
    --color-background: rgba(252, 252, 249, 1);
    --color-surface: rgba(255, 255, 253, 1);
    --color-text: rgba(19, 52, 59, 1);
    --color-text-secondary: rgba(98, 108, 113, 1);
    --color-primary: rgba(33, 128, 141, 1);
    --color-primary-hover: rgba(29, 116, 128, 1);
    --color-secondary: rgba(94, 82, 64, 0.12);
    --color-border: rgba(94, 82, 64, 0.2);
    --color-btn-primary-text: rgba(252, 252, 249, 1);
    --color-focus-ring: rgba(33, 128, 141, 0.4);

    /* 通用樣式 */
    --focus-ring: 0 0 0 3px var(--color-focus-ring);
    --font-family-base: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-size-xs: 11px;
    --font-size-sm: 12px;
    --font-size-base: 14px;
    --font-size-xl: 18px;
    --font-size-2xl: 20px;
    --font-size-3xl: 24px;
    --font-weight-medium: 500;
    --font-weight-semibold: 550;
    --font-weight-bold: 600;

    /* 間距 */
    --space-2: 2px;
    --space-4: 4px;
    --space-8: 8px;
    --space-12: 12px;
    --space-16: 16px;
    --space-24: 24px;
    --space-32: 32px;

    /* 圓角 */
    --radius-sm: 6px;
    --radius-base: 8px;
    --radius-lg: 12px;
    --radius-full: 9999px;

    /* 陰影 */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
    
    /* 動畫 */
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
    :root {
        --color-background: rgba(31, 33, 33, 1);
        --color-surface: rgba(38, 40, 40, 1);
        --color-text: rgba(245, 245, 245, 1);
        --color-text-secondary: rgba(167, 169, 169, 0.7);
        --color-primary: rgba(50, 184, 198, 1);
        --color-secondary: rgba(119, 124, 124, 0.15);
        --color-border: rgba(119, 124, 124, 0.3);
        --color-btn-primary-text: rgba(19, 52, 59, 1);
    }
}

/* 基礎樣式 */
html {
    font-family: var(--font-family-base);
    color: var(--color-text);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    touch-action: manipulation; /* 允許原生滾動，但防止干擾拖曳 */
}

body {
    margin: 0;
    padding: var(--space-16);
}

*, *::before, *::after {
    box-sizing: inherit;
}

/* 容器 */
.container {
    max-width: 1280px;
    margin: auto;
    padding: var(--space-16);
}

/* 標題 */
.app-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: var(--space-32);
    text-align: center;
}

.app-title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
}

/* 控制按鈕 */
.controls-section {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-24);
}
.controls {
    display: flex;
    gap: var(--space-12);
    flex-wrap: wrap;
}
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8) var(--space-16);
    border-radius: var(--radius-base);
    font-size: var(--font-size-base);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-standard);
    border: none;
}
.btn--primary {
    background: var(--color-primary);
    color: var(--color-btn-primary-text);
}
.btn--secondary {
    background: var(--color-secondary);
    color: var(--color-text);
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* 截圖區域 */
#captureArea {
    margin-bottom: var(--space-16);
}

/* 等級分類容器 */
.tiers-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
}

.tier {
    border-radius: var(--radius-lg);
    padding: var(--space-16);
    transition: all var(--duration-normal) var(--ease-standard);
}
.tier-1 { background-color: #8FCB8F; border-left: 6px solid #7AB37A; }
.tier-2 { background-color: #A3D9A5; border-left: 6px solid #8FCB8F; }
.tier-3 { background-color: #B1DFBB; border-left: 6px solid #A3D9A5; }
.tier-4 { background-color: #C0E7C0; border-left: 6px solid #B1DFBB; }
.tier-5 { background-color: #CDEBCC; border-left: 6px solid #C0E7C0; }

.tier.drag-over {
    transform: scale(1.01);
    box-shadow: var(--shadow-lg);
}

.tier-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-12);
}
.tier-header h3 {
    margin: 0;
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
}
.tier-header .member-count {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
}

.tier-content, .member-pool {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12);
    min-height: 85px;
    padding: var(--space-8);
    border-radius: var(--radius-base);
    transition: all var(--duration-fast) var(--ease-standard);
}
.tier-content {
     background-color: rgba(255, 255, 255, 0.3);
     border: 2px dashed rgba(255, 255, 255, 0.5);
}
.tier-content.drag-over {
    border-color: var(--color-primary);
    background-color: rgba(255, 255, 255, 0.5);
}

/* 未分類成員區 */
.member-pool-section {
    margin-top: var(--space-16);
    padding-top: var(--space-24);
    border-top: 2px solid var(--color-border);
}
.member-pool-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-16);
}
.member-pool-header h3 { margin: 0; font-size: var(--font-size-xl); }
.member-pool {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    min-height: 100px;
}

/* 成員名片 */
.member-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-8);
    width: 150px;
    height: 55px;
    padding: var(--space-8);
    border-radius: var(--radius-base);
    cursor: grab;
    transition: all var(--duration-fast) var(--ease-standard);
    user-select: none;
    touch-action: none; /* 防止在卡片上滑動時頁面滾動 */
    border: 3px solid transparent;
    box-shadow: var(--shadow-sm);
}
.member-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
.member-card.dragging {
    cursor: grabbing;
    opacity: 0.3;
}
.member-card.is-member::before {
    content: "";
    position: absolute;
    inset: -3px;
    border: 3px solid;
    border-image: linear-gradient(45deg, #FFD700, #D4AF37, #CFB53B) 1;
    z-index: 1;
    pointer-events: none;
    border-radius: inherit;
}

.member-avatar {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    object-fit: cover;
    flex-shrink: 0;
    background-color: #e0e0e0;
    pointer-events: none; /* 防止圖片干擾拖曳 */
}

.member-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    overflow: hidden;
    font-size: var(--font-size-xs);
    pointer-events: none;
}
.member-name-jp {
    font-weight: var(--font-weight-semibold);
    white-space: nowrap;
}
.member-name-en {
    opacity: 0.8;
    white-space: nowrap;
}
.member-checkbox-container {
    position: absolute;
    top: 2px;
    right: 2px;
}
.member-checkbox {
     width: 14px;
     height: 14px;
     cursor: pointer;
}

/* 響應式設計 */
@media (max-width: 768px) {
    body { padding: var(--space-8); }
    .container { padding: 0; }
    .app-title { font-size: var(--font-size-2xl); }
    .member-card { width: 140px; height: 50px; }
    .tier-content, .member-pool { justify-content: center; }
}
