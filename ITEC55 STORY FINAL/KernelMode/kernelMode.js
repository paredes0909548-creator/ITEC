import cartCore from "../Cart/cartCore.js";
const modeToggleButton = document.getElementById('modeToggleButton');

modeToggleButton.addEventListener('click', ()=>{
    localStorage.setItem('mode', 1);
    window.location.replace('../index.html');
});
document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.optionButton');
    const childInterfaces = document.querySelectorAll('.childInterface');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            optionButtons.forEach(btn => btn.classList.remove('active'));
            childInterfaces.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');

            const targetId = button.dataset.target.trim();
            const targetInterface = document.getElementById(targetId);
            
            if (targetInterface) {
                targetInterface.classList.add('active');
            }
        });
    });
});

const CART_STORAGE_KEY = 'productStoreItem';

const logOutput = document.getElementById('kernelLogOutput');
const clearLogBtn = document.getElementById('clearLogBtn');
const navTabs = document.querySelectorAll('.optionButton');
const tabPanels = document.querySelectorAll('.tabPanel');

function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour12: false });
}

function writeKernelLog(tag, message) {
    if (!logOutput) return;

    const line = document.createElement('div');
    line.className = 'logLine';
    line.innerHTML = `<span class="logTime">[${getTimestamp()}]</span><span class="logTag">[${tag}]</span><span>${message}</span>`;

    logOutput.appendChild(line);
    logOutput.scrollTop = logOutput.scrollHeight;
}

function readStoredCartItems() {
    try {
        const rawCart = localStorage.getItem(CART_STORAGE_KEY);
        return rawCart ? JSON.parse(rawCart) : [];
    } catch {
        writeKernelLog('WARN', `Failed to parse "${CART_STORAGE_KEY}" from localStorage`);
        return [];
    }
}

// SIDEBAR NAVS
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        if (!targetId) return;

        navTabs.forEach(btn => btn.classList.toggle('active', btn === tab));

        tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === targetId);
        });

        writeKernelLog('NAV', `Switched active view to "${targetId}"`);

        if (targetId === 'cart' || targetId === 'tab-cart' || targetId.toLowerCase().includes('cart')) {
            const parsedCart = readStoredCartItems();
            writeKernelLog('CART_MEM', `Loaded ${parsedCart.length} item(s) from localStorage`);
        }
    });
});

clearLogBtn?.addEventListener('click', () => {
    if (logOutput) logOutput.innerHTML = '';
    writeKernelLog('SYS', 'Kernel log cleared');
});

// ALREADY LOADED WHEN SWITCHED TO KERNEL MODE
document.addEventListener('DOMContentLoaded', () => {
    writeKernelLog('BOOT', 'Kernel Mode initialized');
    writeKernelLog('ENV', 'Runtime: HTML/CSS/JS | DB target: MySQL');
});

const customerId = localStorage.getItem('userStatus');
const cartList = cartCore.getCart();
const cartInterface = document.getElementById('cartInterface');

const cartInfo = cartList.map((item) => {
return`
<div class="cartInfo" id="cartInfo">
<span>CustomerId: ${customerId}</span>
<span>ProductId: ${item.productId}</span>
<span>Quantity: ${item.quantity}</span>
<span>Price: ${item.price}</span>
</div>
`;
}).join('');
cartInterface.innerHTML = cartInfo;