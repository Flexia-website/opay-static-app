// Bank logos mapping
const BANK_LOGOS = {
  "GTB": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23003366' width='100' height='100'/%3E%3Ctext x='50' y='60' font-size='40' font-weight='bold' fill='white' text-anchor='middle' letter-spacing='2'%3EGTB%3C/text%3E%3C/svg%3E",
  "Access Bank": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23D41159' width='100' height='100'/%3E%3C/svg%3E",
  "First Bank": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234A90E2' width='100' height='100'/%3E%3C/svg%3E",
  "UBA": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23EC1C24' width='100' height='100'/%3E%3C/svg%3E",
  "Stanbic IBTC": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23003478' width='100' height='100'/%3E%3C/svg%3E",
  "FCMB": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23004B93' width='100' height='100'/%3E%3C/svg%3E",
  "Zenith Bank": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23001E6C' width='100' height='100'/%3E%3C/svg%3E",
  "MTN": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23FFCC00'/%3E%3Ctext x='50' y='62' font-family='Arial' font-weight='900' font-size='32' fill='%23000' text-anchor='middle'%3EMTN%3C/text%3E%3C/svg%3E",
  "Airtel": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23EF2B2D'/%3E%3C/svg%3E",
  "Glo": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2300A651'/%3E%3C/svg%3E",
  "9Mobile": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23006F3A'/%3E%3C/svg%3E"
};

function showTransactionReceipt({ amount, success = true, date, details = [], onClose, title = "Transaction Receipt", footerText, variant = "badge", recipientName, recipientIcon, receiptStyle = "legacy", bank = "OPay", recipientBank = "OPay", recipientAccount = "****" }) {
  const primaryColor = Stores.customization.get().primaryColor;
  const formattedAmount = amount.replace(/^[-+]/, "").replace(/^₦/, "").trim();

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "#f9fafb";
  overlay.style.zIndex = "1000";
  overlay.style.overflowY = "auto";
  overlay.style.maxWidth = "100vw";
  overlay.style.width = "100%";

  const statusColor = success ? "#10b981" : "#dc2626";

  const trackerSteps = [
    { label: "Payment successful", time: date },
    { label: "Processing by bank", time: date },
    { label: success ? "Received by bank" : "Failed", time: date },
  ];

  const isMTN = /^mtn$/i.test(title);
  const isAirtel = /^airtel$/i.test(title);
  const isGlo = /^glo$|^globe$/i.test(title);
  const is9mobile = /^9mobile$/i.test(title);
  const isBank = recipientIcon || (/bank/i.test(title) && !isMTN && !isAirtel && !isGlo && !is9mobile);

  let logoHtml = '';
  if (recipientIcon && isBank) {
    logoHtml = `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:white;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;overflow:hidden;border:1px solid #e5e7eb;"><img src="${recipientIcon}" loading="eager" decoding="async" referrerpolicy="no-referrer" style="width:100%;height:100%;object-fit:contain;padding:0.25rem;" onerror="handleBankLogoError(this)" /></div>`;
  } else if (isMTN) {
    logoHtml = `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:#FFCB05;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;font-weight:800;font-size:0.75rem;color:#111827;position:relative;">MTN<div style="position:absolute;border:2px solid #111827;width:2.2rem;height:2.2rem;border-radius:9999px;"></div></div>`;
  } else if (isAirtel) {
    logoHtml = `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:#FF0000;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;font-weight:800;font-size:1rem;color:white;">A</div>`;
  } else if (isGlo) {
    logoHtml = `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:#00A651;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;font-weight:800;font-size:0.875rem;color:white;">GLO</div>`;
  } else if (is9mobile) {
    logoHtml = `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:#00A9CE;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;font-weight:800;font-size:0.75rem;color:white;">9M</div>`;
  }

  // Receipt Style 1: Classic (Simple OPay style)
  const classicReceipt = `
    <header style="background:white;padding:0.75rem 1rem;display:flex;align-items:center;justify-content:space-between;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;border-bottom:1px solid #e5e7eb;">
      <div class="flex items-center" style="gap:0.75rem;">
        <button id="receipt-back" style="background:none;border:none;color:#111827;cursor:pointer;display:flex;align-items:center;">${Icon("chevron-left", { size: 20 })}</button>
        <h1 style="font-size:0.9375rem;font-weight:700;margin:0;color:#111827;">Share Receipt</h1>
      </div>
    </header>
    <div style="background:white;margin:15px;padding:24px 20px;border-radius:16px;border:1px solid #ebebeb;box-shadow:0 4px 10px rgba(0,0,0,0.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:5px;"><span style="color:${primaryColor};font-size:24px;font-weight:800;">O</span><span style="color:#151d52;font-size:22px;font-weight:700;">Pay</span></div>
        <div style="color:#333;font-size:14px;font-weight:400;">Transaction Receipt</div>
      </div>
      <div style="text-align:center;font-size:26px;font-weight:700;color:${primaryColor};margin-bottom:2px;">₦${formattedAmount}</div>
      <div style="text-align:center;font-size:14px;font-weight:500;color:${primaryColor};margin-bottom:6px;">${success ? "Successful" : "Failed"}</div>
      <div style="text-align:center;font-size:12px;color:#666;margin-bottom:20px;">${date}</div>
      <hr style="border:0;border-top:1px solid #f0f0f0;margin:12px 0;">
      ${details.length > 0 ? details.map(d => `<div style="display:flex;justify-content:space-between;margin-bottom:14px;"><span style="color:#777;font-weight:400;font-size:13px;">${d.label}</span><div style="text-align:right;max-width:72%;"><div style="font-weight:600;color:#111;font-size:14px;text-transform:uppercase;display:block;">${d.value}</div></div></div>`).join("") : ""}
    </div>
  `;

  // Receipt Style 2: Detailed (Bank transfer with progress)
  const detailedReceipt = `
    <div style="background:white;padding:15px 20px;display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:15px;">
        <button id="receipt-back" style="background:none;border:none;color:#333;cursor:pointer;display:flex;align-items:center;width:24px;height:24px;">${Icon("chevron-left", { size: 20 })}</button>
        <span style="font-size:16px;font-weight:500;color:#222;">Transaction Details</span>
      </div>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primaryColor}' stroke-width='2' style='cursor:pointer;' onclick="this.closest('[data-overlay]').remove();"><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
    </div>
    <div style="position:relative;overflow:visible;background:white;margin:15px;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      <div style="position:absolute;top:0;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background-color:#1a3365;overflow:hidden;">
        <img src="${BANK_LOGOS[recipientBank] || BANK_LOGOS['GTB']}" style="width:100%;height:100%;object-fit:contain;" onerror="this.src='${BANK_LOGOS['GTB']}';" />
      </div>
      <div style="text-align:center;margin-top:25px;margin-bottom:10px;font-weight:500;font-size:16px;color:#1a1a1a;">Transfer to ${recipientName || 'Recipient'}</div>
      <div style="text-align:center;font-size:32px;font-weight:700;letter-spacing:0.5px;color:#000;">₦${formattedAmount}</div>
      <div style="text-align:center;font-weight:500;margin-top:5px;font-size:15px;color:${primaryColor};display:flex;justify-content:center;align-items:center;gap:6px;">
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3'><path d='M20 6L9 17l-5-5'/></svg>
        ${success ? "Successful" : "Failed"}
      </div>
      <div style="background-color:#f4f6f8;border-radius:8px;padding:12px;margin-top:15px;font-size:11px;color:#555;text-align:center;line-height:1.4;">The recipient account is expected to be credited within 5 minutes, subject to notification by the bank.</div>
    </div>
    <div style="background:white;margin:15px;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      <div style="font-size:15px;font-weight:600;margin-bottom:15px;color:#1a1a1a;">Transaction Details</div>
      ${details.map(d => `<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;font-size:14px;"><span style="color:#666;flex-shrink:0;margin-right:15px;">${d.label}</span><div style="text-align:right;max-width:70%;"><span style="font-weight:500;color:#1a1a1a;display:block;">${d.value}</span></div></div>`).join("")}
    </div>
  `;

  // Receipt Style 3: Service (Airtime/Data with breakdown)
  const serviceReceipt = `
    <div style="background:white;padding:15px 20px;display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:15px;">
        <button id="receipt-back" style="background:none;border:none;color:#333;cursor:pointer;display:flex;align-items:center;width:24px;height:24px;">${Icon("chevron-left", { size: 20 })}</button>
        <span style="font-size:16px;font-weight:500;color:#222;">Transaction Details</span>
      </div>
      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${primaryColor}' stroke-width='2' style='cursor:pointer;' onclick="this.closest('[data-overlay]').remove();"><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
    </div>
    <div style="position:relative;overflow:visible;background:white;margin:15px;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      <div style="position:absolute;top:0;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background-color:${bank === 'MTN' ? '#FFCC00' : bank === 'Airtel' ? '#EF2B2D' : bank === 'Glo' ? '#00A651' : '#006F3A'};overflow:hidden;">
        <img src="${BANK_LOGOS[bank] || BANK_LOGOS['MTN']}" style="width:100%;height:100%;object-fit:contain;" onerror="this.src='${BANK_LOGOS['MTN']}';" />
      </div>
      <div style="text-align:center;margin-top:25px;margin-bottom:10px;font-weight:500;font-size:16px;color:#1a1a1a;">${bank}</div>
      <div style="text-align:center;font-size:32px;font-weight:700;letter-spacing:0.5px;color:#000;">₦${formattedAmount}</div>
      <div style="text-align:center;font-weight:500;margin-top:5px;font-size:15px;color:${primaryColor};display:flex;justify-content:center;align-items:center;gap:6px;">
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3'><path d='M20 6L9 17l-5-5'/></svg>
        ${success ? "Successful" : "Failed"}
      </div>
    </div>
    <div style="background:white;margin:15px;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      <div style="font-size:15px;font-weight:600;margin-bottom:15px;color:#1a1a1a;">Transaction Details</div>
      ${details.map(d => `<div style="display:flex;justify-content:space-between;font-size:14px;padding:6px 0;"><span style="color:#666;">${d.label}</span><span style="font-weight:500;color:#1a1a1a;">${d.value}</span></div>`).join("")}
    </div>
  `;

  const headerBlock = variant === "tracker" ? `
    <div style="text-align:center;padding:1.5rem 1rem 1rem;max-width:100%;width:100%;">
      ${logoHtml || `<div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:#1B1464;display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;overflow:hidden;">${recipientIcon ? `<img src="${recipientIcon}" style="width:100%;height:100%;object-fit:cover;" />` : `<span style="color:white;">${Icon("user", { size: 22 })}</span>`}</div>`}
      <p style="font-size:0.875rem;color:#111827;margin:0 0 0.75rem;font-weight:500;">${title}</p>
      <div style="font-size:1.5rem;font-weight:800;color:#111827;margin-bottom:0.5rem;letter-spacing:-0.01em;word-break:break-word;">₦${formattedAmount}</div>
      <div style="font-size:0.9375rem;font-weight:600;color:${statusColor};">${success ? "Successful" : "Failed"}</div>
    </div>
    <div class="card" style="margin:0 1rem 1rem;padding:1rem;background:white;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;">
        ${trackerSteps.map((step, i) => `
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative;">
          ${i > 0 ? `<div style="position:absolute;top:9px;right:50%;width:100%;height:2px;background:${success ? primaryColor : "#e5e7eb"};z-index:0;"></div>` : ""}
          <div style="width:1.25rem;height:1.25rem;border-radius:9999px;background:${success ? primaryColor : "#d1d5db"};display:flex;align-items:center;justify-content:center;color:white;z-index:1;position:relative;">
            ${Icon("check", { size: 11 })}
          </div>
          <span style="font-size:0.7rem;font-weight:600;color:#111827;text-align:center;margin-top:0.5rem;">${step.label}</span>
          <span style="font-size:0.65rem;color:#9ca3af;margin-top:2px;">${step.time}</span>
        </div>`).join("")}
      </div>
      <div style="background:#f9fafb;border-radius:0.5rem;padding:0.5rem 0.75rem;margin-top:1rem;font-size:0.7rem;color:#6b7280;line-height:1.4;">
        The recipient account is expected to be credited within 5 minutes, subject to notification by the bank.
      </div>
    </div>` : `
    <div style="text-align:center;padding:1.5rem 1rem 1rem;max-width:100%;width:100%;">
      <div style="width:3.25rem;height:3.25rem;border-radius:9999px;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 0.75rem;overflow:hidden;">
        ${recipientIcon ? `<img src="${recipientIcon}" style="width:100%;height:100%;object-fit:cover;" />` : `<span style="color:${primaryColor};">${Icon("check-circle", { size: 24 })}</span>`}
      </div>
      ${title ? `<p style="font-size:0.875rem;color:#111827;margin:0 0 0.75rem;font-weight:500;">${title.replace(/ (Successful|Purchase Successful|Deposit Successful|Successful!)$/i, "")}</p>` : ""}
      <div style="font-size:1.5rem;font-weight:800;color:#111827;margin-bottom:0.75rem;letter-spacing:-0.01em;word-break:break-word;">₦${formattedAmount}</div>
      <div class="flex items-center justify-center" style="gap:4px;">
        <span style="color:${statusColor};display:flex;">${Icon(success ? "check-circle" : "alert-circle", { size: 16 })}</span>
        <span style="font-size:0.875rem;font-weight:600;color:${statusColor};">${success ? "Successful" : "Failed"}</span>
      </div>
    </div>`;

  // Select receipt style
  let receiptContent = classicReceipt;
  if (receiptStyle === "detailed") {
    receiptContent = detailedReceipt;
  } else if (receiptStyle === "service") {
    receiptContent = serviceReceipt;
  } else {
    receiptContent = `
    <header style="background:white;padding:0.75rem 1rem;display:flex;align-items:center;justify-content:space-between;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;border-bottom:1px solid #e5e7eb;">
      <div class="flex items-center" style="gap:0.75rem;">
        <button id="receipt-back" style="background:none;border:none;color:#111827;cursor:pointer;display:flex;align-items:center;">${Icon("chevron-left", { size: 20 })}</button>
        <h1 style="font-size:0.9375rem;font-weight:700;margin:0;color:#111827;">Transaction Details</h1>
      </div>
      <span style="color:#10b981;display:flex;align-items:center;">${Icon("user", { size: 18 })}</span>
    </header>

    <div style="position:relative;margin:0;padding:0 1rem;margin-top:-1.5rem;">
      <div style="margin:0;overflow:visible;padding:0;position:relative;z-index:1;">
        ${headerBlock}
      </div>
    </div>`;
  }

  if (receiptStyle === "classic" || receiptStyle === "detailed" || receiptStyle === "service") {
    overlay.innerHTML = receiptContent + `
    <div style="display:flex;gap:10px;padding:0 15px;margin-top:15px;margin-bottom:30px;justify-content:center;">
      <button id="receipt-report" style="flex:1;padding:14px 20px;border-radius:50px;text-align:center;font-weight:600;font-size:15px;border:none;cursor:pointer;background-color:#e6f9ef;color:${primaryColor};" onclick="this.closest('[data-overlay]').remove();">Report Issue</button>
      <button id="receipt-done" style="flex:1;padding:14px 20px;border-radius:50px;text-align:center;font-weight:600;font-size:15px;border:none;cursor:pointer;background-color:${primaryColor};color:white;" onclick="alert('Share Receipt');">Share Receipt</button>
    </div>`;
  } else {
    overlay.innerHTML = receiptContent + `
    <div class="card" style="margin:0.75rem 1rem;padding:1rem;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;background:white;">
      ${details.slice(0, 2).length > 0 ? `
        <h3 style="font-size:0.875rem;font-weight:700;margin:0 0 0.75rem;color:#111827;">Recipient Details</h3>
        ${details.slice(0, 2).map((d, i) => `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:0.75rem 0;gap:1rem;${i < details.slice(0, 2).length - 1 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
            <div style="color:#6b7280;font-size:0.75rem;flex-shrink:0;font-weight:500;">${d.label}</div>
            <div style="text-align:right;font-weight:600;font-size:0.8125rem;color:#111827;">${d.value}</div>
          </div>
        `).join('')}
      ` : ''}
      
      ${details.length > 2 ? `
        <h3 style="font-size:0.875rem;font-weight:700;margin:1rem 0 0.75rem;color:#111827;">Transaction Details</h3>
        ${details.slice(2).map((d, i) => `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:0.75rem 0;gap:1rem;${i < details.slice(2).length - 1 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
            <div style="color:#6b7280;font-size:0.75rem;flex-shrink:0;font-weight:500;">${d.label}</div>
            <div style="text-align:right;font-weight:600;font-size:0.75rem;color:#111827;font-family:monospace;word-break:break-all;">${d.value}</div>
          </div>
        `).join('')}
      ` : ''}
    </div>

    ${footerText ? `<div style="margin:0 1rem 1rem;padding:0.5rem 1rem;font-size:0.7rem;color:#9ca3af;text-align:center;line-height:1.4;">${footerText}</div>` : ""}

    <div style="margin:1rem;display:flex;gap:0.75rem;">
      <button id="receipt-report" style="flex:1;padding:0.75rem;border-radius:0.75rem;font-weight:600;font-size:0.875rem;border:1px solid #e5e7eb;background:white;color:#111827;">Report Issue</button>
      <button id="receipt-done" style="flex:1;padding:0.75rem;border-radius:0.75rem;color:white;font-weight:600;font-size:0.875rem;border:none;background:${primaryColor};">Share Receipt</button>
    </div>`;
  }

  overlay.setAttribute("data-overlay", "true");
  document.body.appendChild(overlay);
  const close = () => {
    overlay.remove();
    if (onClose) onClose();
  };
  const backBtn = overlay.querySelector("#receipt-back");
  if (backBtn) backBtn.addEventListener("click", close);
  const doneBtn = overlay.querySelector("#receipt-done");
  if (doneBtn && (receiptStyle !== "classic" && receiptStyle !== "detailed" && receiptStyle !== "service")) {
    doneBtn.addEventListener("click", () => {
      showShareReceipt({ amount: formattedAmount, success, date, details, variant });
    });
  }
  overlay.querySelector("#receipt-report").addEventListener("click", () => {
    toast.success("Issue reported. Our team will review this transaction.");
  });
}

function showShareReceipt({ amount, success, date, details = [], title = "Transaction Receipt" }) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "#f9fafb";
  overlay.style.zIndex = "1100";
  overlay.style.overflowY = "auto";

  function renderDetailValue(value) {
    return String(value).split("<br/>").join("<br/>");
  }

  const watermarkTile = `<span style="display:inline-flex;align-items:center;gap:0.2rem;min-width:6rem;justify-content:center;padding:1.1rem 0.75rem;"><img src="./assets/opay-logo.png" alt="" style="width:14px;height:14px;object-fit:contain;opacity:0.9;" /><span style="color:#10b981;font-weight:800;font-size:0.9375rem;">Pay</span></span>`;
  const watermarkRows = Array.from({ length: 9 })
    .map((_, row) => `
      <div style="display:flex;white-space:nowrap;margin-left:${row % 2 === 0 ? '-2rem' : '-4rem'};">
        ${Array.from({ length: 6 }).map(() => watermarkTile).join("")}
      </div>`).join("");

  const watermarkHtml = `
    <div style="position:absolute;top:-10%;left:-10%;width:130%;height:130%;opacity:0.045;pointer-events:none;overflow:hidden;transform:rotate(-28deg);z-index:0;">
      ${watermarkRows}
    </div>`;

  overlay.innerHTML = `
    <header style="background:white;padding:0.875rem 1rem;display:flex;align-items:center;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;border-bottom:none;position:relative;z-index:10;">
      <button id="share-back" style="background:none;border:none;color:#111827;display:flex;align-items:center;gap:0.75rem;">
        ${Icon("chevron-left", { size: 22 })}
        <span style="font-size:1.0625rem;font-weight:600;color:#111827;">Share Receipt</span>
      </button>
    </header>

    <div style="padding:1.5rem 1rem;margin-top:0.5rem;position:relative;z-index:1;min-height:calc(100vh - 8rem);">
      <div id="receipt-capture" style="position:relative;background:white;border-radius:1rem;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);z-index:1;padding:2rem 1.5rem;">
        ${watermarkHtml}
        <div style="position:relative;z-index:2;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;">
            <div style="display:flex;align-items:center;gap:0.4rem;">
              <img src="./assets/opay-logo.png" alt="logo" style="width:28px;height:28px;object-fit:contain;flex-shrink:0;" />
              <span style="font-size:1.5rem;font-weight:900;color:#1C1D37;letter-spacing:-0.02em;">Pay</span>
            </div>
            <span style="font-size:0.9375rem;color:#6b7280;font-weight:500;">Transaction Receipt</span>
          </div>

          <div style="text-align:center;margin-bottom:2rem;">
            <div style="font-size:2.5rem;font-weight:800;color:#10b981;margin-bottom:0.5rem;letter-spacing:-0.01em;">₦${amount}</div>
            <div style="font-size:1.0625rem;color:#111827;margin-bottom:0.5rem;font-weight:600;">${success ? "Successful" : "Failed"}</div>
            <div style="font-size:0.875rem;color:#9ca3af;">${date}</div>
          </div>

          <div style="border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;padding:1.5rem 0;margin-bottom:1.5rem;">
            ${details.slice(0, 2).length > 0 ? `
              <div style="margin-bottom:${details.length > 2 ? '1.5rem' : '0'};">
                ${details.slice(0, 2).map((d, i) => `
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:${i > 0 ? '0.75rem 0' : '0'};${i < details.slice(0, 2).length - 1 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
                    <span style="font-size:0.8125rem;color:#6b7280;font-weight:500;">${d.label}</span>
                    <span style="font-size:0.9375rem;color:#111827;font-weight:700;text-align:right;max-width:55%;">${renderDetailValue(d.value)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            
            ${details.length > 2 ? `
              <div>
                ${details.slice(2).map((d, i) => `
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:0.75rem 0;${i < details.slice(2).length - 1 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
                    <span style="font-size:0.8125rem;color:#6b7280;font-weight:500;">${d.label}</span>
                    <span style="font-size:0.8125rem;color:#111827;font-weight:600;text-align:right;font-family:monospace;">${renderDetailValue(d.value)}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div style="font-size:0.75rem;color:#9ca3af;line-height:1.6;text-align:center;">
            Enjoy a better life with <img src="./assets/opay-logo.png" alt="" style="width:11px;height:11px;object-fit:contain;vertical-align:-1px;display:inline-block;" />Pay. Get free transfers, withdrawals, bill payments, instant loans, and good annual interest on your savings. <img src="./assets/opay-logo.png" alt="" style="width:11px;height:11px;object-fit:contain;vertical-align:-1px;display:inline-block;" />Pay is licensed by the Central Bank of Nigeria and insured by the NDIC.
          </div>
        </div>
      </div>
    </div>

    <div style="padding:1.5rem 1rem 2rem;display:flex;gap:1rem;justify-content:center;">
      <button id="share-as-image" style="background:none;border:1px solid #d1fae5;display:flex;align-items:center;justify-content:center;gap:0.5rem;color:#10b981;font-weight:600;font-size:0.875rem;cursor:pointer;padding:0.75rem 1.5rem;border-radius:0.5rem;">
        ${Icon("image", { size: 16 })} Share as image
      </button>
      <button id="share-as-pdf" style="background:none;border:1px solid #d1fae5;display:flex;align-items:center;justify-content:center;gap:0.5rem;color:#10b981;font-weight:600;font-size:0.875rem;cursor:pointer;padding:0.75rem 1.5rem;border-radius:0.5rem;">
        ${Icon("file-text", { size: 16 })} Share as PDF
      </button>
    </div>
    <div style="height:1rem;"></div>`;

  document.body.appendChild(overlay);

  overlay.querySelector("#share-back").addEventListener("click", () => overlay.remove());
  overlay.querySelector("#share-as-image").addEventListener("click", () => {
    downloadReceiptAsImage(overlay.querySelector("#receipt-capture"));
  });
  overlay.querySelector("#share-as-pdf").addEventListener("click", () => {
    printReceiptAsPdf(overlay.querySelector("#receipt-capture"));
  });
}

function downloadReceiptAsImage(node) {
  try {
    const rect = node.getBoundingClientRect();
    const scale = 2;
    const svgHtml = new XMLSerializer().serializeToString(
      (() => {
        const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        wrapper.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        wrapper.setAttribute("width", rect.width);
        wrapper.setAttribute("height", rect.height);
        const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        fo.setAttribute("width", "100%");
        fo.setAttribute("height", "100%");
        const clonedNode = node.cloneNode(true);
        clonedNode.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        fo.appendChild(clonedNode);
        wrapper.appendChild(fo);
        return wrapper;
      })()
    );
    const svgBlob = new Blob([svgHtml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Could not generate image");
          return;
        }
        const dlUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = dlUrl;
        a.download = `opay-receipt-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(dlUrl);
        toast.success("Receipt image downloaded");
      });
    };
    img.onerror = () => toast.error("Could not generate image on this device");
    img.src = url;
  } catch (e) {
    toast.error("Could not generate image on this device");
  }
}

function printReceiptAsPdf(node) {
  const printWindow = window.open("", "_blank", "width=420,height=720");
  if (!printWindow) {
    toast.error("Please allow pop-ups to share as PDF");
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>OPay Receipt</title>
        <style>
          body { margin: 0; padding: 1.5rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: white; }
        </style>
      </head>
      <body>${node.outerHTML}</body>
    </html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 300);
}

function showPinModal({ amount, recipientLabel, onConfirm, onCancel }) {
  const primaryColor = Stores.customization.get().primaryColor;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "1rem";
  overlay.innerHTML = `
    <div style="background:white;border-radius:0.75rem;padding:1rem;width:100%;max-width:20rem;position:relative;z-index:101;">
      <h3 style="font-size:1.125rem;font-weight:600;margin:0 0 1rem;">Enter Transaction PIN</h3>
      <p style="font-size:0.875rem;color:#6b7280;margin:0 0 1rem;">You are about to transfer ₦${amount} to ${recipientLabel}</p>
      <div style="position:relative;margin-bottom:1rem;">
        <div style="display:flex;gap:0.5rem;justify-content:center;">
          <div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:transparent;font-weight:700;" data-pin-digit="1">•</div>
          <div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:transparent;font-weight:700;" data-pin-digit="2">•</div>
          <div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:transparent;font-weight:700;" data-pin-digit="3">•</div>
          <div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;border:2px solid #d1d5db;display:flex;align-items:center;justify-content:center;font-size:1.25rem;color:transparent;font-weight:700;" data-pin-digit="4">•</div>
        </div>
        <input id="pin-input" type="hidden" maxlength="4" style="position:absolute;opacity:0;pointer-events:none;" />
      </div>
      <div class="flex" style="gap:0.5rem;">
        <button id="pin-cancel" style="flex:1;padding:0.5rem;border:1px solid hsl(var(--border));border-radius:0.5rem;background:white;font-weight:600;">Cancel</button>
        <button id="pin-confirm" style="flex:1;padding:0.5rem;border-radius:0.5rem;color:white;border:none;background:${primaryColor};font-weight:600;">Confirm</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const pinInput = overlay.querySelector("#pin-input");
  let pinValue = "";
  
  overlay.querySelector("#pin-cancel").addEventListener("click", () => {
    overlay.remove();
    if (onCancel) onCancel();
  });
  
  overlay.querySelector("#pin-confirm").addEventListener("click", () => {
    if (pinValue !== "0803") {
      alert("Incorrect PIN");
      pinValue = "";
      updatePinDisplay();
      return;
    }
    overlay.remove();
    onConfirm();
  });
  
  function updatePinDisplay() {
    overlay.querySelectorAll("[data-pin-digit]").forEach((el, i) => {
      el.textContent = i < pinValue.length ? "•" : "";
    });
  }
  
  openNumericKeypad({
    decimal: false,
    maxLength: 4,
    value: pinValue,
    onInput: (v) => {
      pinValue = v;
      updatePinDisplay();
    },
    onComplete: (v) => {
      pinValue = v;
      updatePinDisplay();
    },
    onClose: () => {}
  });
}

function showTransferProgress() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.innerHTML = `
    <div style="padding:1.5rem;border-radius:9999px;background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);">
      ${Icon("send", { size: 64, class: "animate-pulse" })}
    </div>
    <p style="color:white;margin-top:1rem;font-weight:500;">Sending money...</p>`;
  overlay.querySelectorAll("svg").forEach((s) => (s.style.color = "white"));
  document.body.appendChild(overlay);
  return () => overlay.remove();
}

function showConfirmationModal({ title, amount, details = [], onConfirm, onCancel, icon = "check-circle" }) {
  const primaryColor = Stores.customization.get().primaryColor;
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "1rem";
  overlay.style.zIndex = "1000";
  
  const detailsHtml = details.map(d => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid #f0f0f0;">
      <span style="font-size:0.875rem;color:#6b7280;">${d.label}</span>
      <span style="font-size:0.875rem;font-weight:600;color:#111827;">${d.value}</span>
    </div>
  `).join("");
  
  overlay.innerHTML = `
    <div style="background:white;border-radius:1rem;padding:1.5rem;width:100%;max-width:22rem;box-shadow:0 10px 40px rgba(0,0,0,0.15);">
      <div style="text-align:center;margin-bottom:1.5rem;">
        <div style="width:3rem;height:3rem;border-radius:9999px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;color:${primaryColor};">
          ${Icon(icon, { size: 24 })}
        </div>
        <h2 style="font-size:1rem;font-weight:700;margin:0 0 0.5rem;color:#111827;">${title}</h2>
        <div style="font-size:2rem;font-weight:800;color:#111827;margin-bottom:0.5rem;letter-spacing:-0.01em;">₦${amount}</div>
      </div>
      <div style="background:#f9fafb;border-radius:0.75rem;padding:1rem;margin-bottom:1.5rem;max-height:10rem;overflow-y:auto;">
        ${detailsHtml || '<p style="text-align:center;color:#9ca3af;font-size:0.875rem;margin:0;">Review details carefully before confirming</p>'}
      </div>
      <div class="flex" style="gap:0.75rem;">
        <button id="confirm-cancel" style="flex:1;padding:0.75rem;border:1.5px solid #d1d5db;border-radius:0.75rem;background:white;font-weight:600;font-size:0.9375rem;cursor:pointer;color:#111827;">Cancel</button>
        <button id="confirm-proceed" style="flex:1;padding:0.75rem;border-radius:0.75rem;color:white;border:none;background:${primaryColor};font-weight:600;font-size:0.9375rem;cursor:pointer;">Continue to PIN</button>
      </div>
    </div>`;
  
  document.body.appendChild(overlay);
  
  overlay.querySelector("#confirm-cancel").addEventListener("click", () => {
    overlay.remove();
    if (onCancel) onCancel();
  });
  
  overlay.querySelector("#confirm-proceed").addEventListener("click", () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  });
}

window.showTransactionReceipt = showTransactionReceipt;
window.showShareReceipt = showShareReceipt;
window.showConfirmationModal = showConfirmationModal;
window.showPinModal = showPinModal;
window.showTransferProgress = showTransferProgress;
