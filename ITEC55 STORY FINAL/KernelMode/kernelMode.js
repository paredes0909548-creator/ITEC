import cartCore from "../Cart/cartCore.js";
import systemCall from "./SystemCall/systemCall.js";
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

const CART_STORAGE_KEY = 'Cart';

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
        const parsed = rawCart ? JSON.parse(rawCart) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        writeKernelLog('WARN', `Failed to parse "${CART_STORAGE_KEY}" from localStorage`);
        return [];
    }
}

function getCartQuantitySummary(items) {
    const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    return {
        lineCount: items.length,
        totalQuantity
    };
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

        function logCartQuantity(sourceTag = 'CART_MEM') {
    const items = readStoredCartItems();
    const { lineCount, totalQuantity } = getCartQuantitySummary(items);
    writeKernelLog(
        sourceTag,
        `Cart quantity: ${totalQuantity} unit(s) across ${lineCount} item entry/entries`
    );
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

    function logCartQuantity(sourceTag = 'CART_MEM') {
    const items = readStoredCartItems();
    const { lineCount, totalQuantity } = getCartQuantitySummary(items);
    writeKernelLog(
        sourceTag,
        `Cart quantity: ${totalQuantity} unit(s) across ${lineCount} item entry/entries`
    );
}
});

window.addEventListener('storage', (event) => {
    if (event.key === CART_STORAGE_KEY) {
        logCartQuantity('CART_SYNC');
    }
});


/*Cart DISPLAYER */
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


/* TRANSACTION DISPLAYER */
const transactionInterface = document.getElementById('transactionInterface');
const transaction = systemCall.getProcess();
const processList = transaction.map((item)=>{
return `<hr>
        <ul class="transactionProcess">
            <li>arrival:        ${item.arrival}</li>
            <li>burst:          ${item.burst}</li>
            <li>cid:            ${item.cid}</li>
            <li>parentPid:      ${item.parentPid}</li>
            <li>pid:            ${item.pid}</li>
            <li>priority:       ${item.priority}</li>
            
            <ul>registers:${
                `<li>-ACC:${item.registers.ACC}</li>
                <li>-PC :${item.registers.PC} </li>
                <li>-SP :${item.registers.SP} </li>`}
            </ul>
            
            <li>remaining:      ${item.remaining}</li>
            <li>responseTime:   ${item.responseTime}</li>
            <ul>sharedResources:
                <li>-Memory:       ${item.sharedResources.memoryAddressSpace}</li>
                <li>-Shipping Fee: ${item.sharedResources.shippingFee}</li>
                <li>-Cart Items:   ${item.sharedResources.cartItems.map(c => 
                                                                        `<br>--Product #${c.productId} (x${c.quantity})`).join(', ')}</li>
            </ul>
            <li>state:          ${item.state}</li>
            <li>storyTitle:     ${item.storyTitle}</li>
            
            <ul>threads:      ${item.threads.map(thread => `
                                                            <li>-burst:           ${thread.burst}</li>
                                                            <li>-parentPid:       ${thread.parentPid}</li>
                                                            <li>-privateResources:${thread.privateResources}</li>
                                                            <li>-remaining:       ${thread.remaining}</li>
                                                            <li>-state:           ${thread.state}</li>
                                                            <li>-taskName:        ${thread.taskName}</li>
                                                            <li>-tid:             ${thread.tid}</li>
                                                            `).join('')}
            </ul>

            <li>turnaroundTime: ${item.turnaroundTime}</li>
            <li>waitingTime:    ${item.waitingTime}</li>
        </ul>
        <hr>`
}).join('');
transactionInterface.innerHTML=processList;



/* HISTORY DISPLAYER */
const historyInterface = document.getElementById('historyInterface');
const historyList = systemCall.getHistory();
const history = historyList.map((item)=>{
return `<hr>
        <ul>
            <ul>inventory:${item.inventory.map(item=> `<li>-ProductId:${item.productId}</li>
                                                       <li>-ProductName${item.name}</li>
                                                       <li>-Stocks:${item.stocks}</li>
                                                       <li>-Price${item.price}</li>`).join('')}
            </ul>
                
            <ul>kerneLog:${item.kernelLog.map(kernelLog=> `<li>-EventType${kernelLog.eventType}</li>
                                                           <li>-message${kernelLog.message}</li>
                                                           <li>-mode${kernelLog.mode}</li>
                                                           <li>-tick${kernelLog.tick}</li>
                                                           <li>-WhyReason${kernelLog.whyReason}</li>`).join('')}
            </ul>
         
            <li>label:${item.label}</li>
            <ul>ProcessQueue:${(item.processQueue || []).map(proc => `
                <li>
                      <strong>-PID #${proc.pid}</strong> — ${proc.storyTitle} [${proc.state}]
                    <ul>
                        <li>--CID: ${proc.cid} | Parent PID: ${proc.parentPid ?? 'None'} | Priority: ${proc.priority}</li>
                        <li>--Arrival: ${proc.arrival} | Burst: ${proc.burst} | Remaining: ${proc.remaining}</li>
                        <li>--Waiting: ${proc.waitingTime} | Turnaround: ${proc.turnaroundTime} | Response: ${proc.responseTime ?? 'Pending'}</li>
                        <li>--Registers: PC=${proc.registers.PC}, SP=${proc.registers.SP}, ACC=${proc.registers.ACC}</li>
                        <li>--Shared Resources: Memory=${proc.sharedResources.memoryAddressSpace}, Shipping=₱${proc.sharedResources.shippingFee}</li>
                        <li>--Threads (${proc.threads?.length || 0}):

                            <ul>
                            ${(proc.threads || []).map(t => `
                              <li>
                                TID #${t.tid}: ${t.taskName} — State: ${t.state} | Burst: ${t.remaining}/${t.burst} | SP: ${t.privateResources.stackPointer}
                              </li>`).join('')}
                            </ul>
                        </li>
                    </ul>
                </li>`).join('')}
            </ul>
        
            <li>${item.tick}</li>
        </ul>
        <hr>
       `

}).join('');
historyInterface.innerHTML=history;
