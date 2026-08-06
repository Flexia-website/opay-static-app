function renderTransactionHistoryPage(container) {
  const { primaryColor } = Stores.customization.get();
  let openFilter = ""; // "" | "type" | "status"
  let statusFilter = "All Status";
  let typeFilter = "Transfer to";
  const statusOptions = ["All Status", "Successful", "Pending", "Failed", "To be paid", "Reversed"];
  const typeOptions = ["Transfer to", "Airtime", "Data", "Betting", "TV", "Bank Transfer", "Withdrawal"];

  function parseTxnDate(dateStr) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date() : d;
  }
  function parseAmount(amountStr) {
    return parseFloat(amountStr.replace(/[₦,+]/g, ""));
  }
  function formatMonthLabel(d) {
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  function render() {
    const { transactions: allTransactions } = Stores.transaction.get();
    const transactions = allTransactions.filter((t) => {
      const statusOk = statusFilter === "All Status" || t.status === statusFilter;
      const typeOk = typeFilter === "Transfer to" || t.type.toLowerCase().includes(typeFilter.toLowerCase());
      return statusOk && typeOk;
    });
    const map = new Map();
    for (const t of transactions) {
      const d = parseTxnDate(t.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!map.has(key)) map.set(key, { date: d, items: [], in: 0, out: 0 });
      const bucket = map.get(key);
      bucket.items.push(t);
      const amt = parseAmount(t.amount);
      if (amt >= 0) bucket.in += amt;
      else bucket.out += -amt;
    }
    const grouped = Array.from(map.values()).sort((a, b) => b.date - a.date);

    container.innerHTML = `
    <div style="min-height:100vh;background:#f9fafb;padding-bottom:4rem;">
      <header style="background:white;padding:0.75rem 1rem;display:flex;align-items:center;justify-content:space-between;">
        <div class="flex items-center" style="gap:0.75rem;">
          <button data-nav-back style="background:none;border:none;">${Icon("arrow-left", { size: 20 })}</button>
          <h1 style="font-size:1.125rem;font-weight:600;margin:0;">Transactions</h1>
        </div>
        <button id="download-btn" style="font-size:0.875rem;font-weight:500;background:none;border:none;color:${primaryColor};">Download</button>
      </header>

      <div class="grid" style="grid-template-columns:1fr 1fr;gap:0.75rem;padding:0.75rem 1rem;">
        <button id="filter-type-btn" style="background:${openFilter === "type" ? primaryColor + "17" : "#f3f4f6"};color:${openFilter === "type" ? primaryColor : "#374151"};border-radius:9999px;padding:0.625rem 1rem;display:flex;align-items:center;justify-content:space-between;font-size:0.875rem;font-weight:600;border:none;">
          ${typeFilter} ${Icon(openFilter === "type" ? "chevron-up" : "chevron-down", { size: 16, class: "" })}
        </button>
        <button id="filter-status-btn" style="background:${openFilter === "status" ? primaryColor + "17" : "#f3f4f6"};color:${openFilter === "status" ? primaryColor : "#374151"};border-radius:9999px;padding:0.625rem 1rem;display:flex;align-items:center;justify-content:space-between;font-size:0.875rem;font-weight:600;border:none;">
          ${statusFilter} ${Icon(openFilter === "status" ? "chevron-up" : "chevron-down", { size: 16, class: "" })}
        </button>
      </div>

      ${
        openFilter === "type"
          ? `<div style="background:white;padding:0.75rem 1rem 1rem;box-shadow:0 8px 16px -8px rgb(0 0 0 / 0.1);">
          <div style="display:flex;flex-wrap:wrap;gap:0.625rem;">
            ${typeOptions
              .map(
                (opt) => `
              <button data-type-opt="${opt}" style="padding:0.5rem 0.875rem;border-radius:9999px;font-size:0.8125rem;font-weight:600;border:none;background:${
                  typeFilter === opt ? primaryColor + "17" : "#f3f4f6"
                };color:${typeFilter === opt ? primaryColor : "#374151"};">${opt}</button>`
              )
              .join("")}
          </div>
        </div>`
          : ""
      }
      ${
        openFilter === "status"
          ? `<div style="background:white;padding:0.75rem 1rem 1rem;box-shadow:0 8px 16px -8px rgb(0 0 0 / 0.1);">
          <div style="display:flex;flex-wrap:wrap;gap:0.625rem;">
            ${statusOptions
              .map(
                (opt) => `
              <button data-status-opt="${opt}" style="padding:0.5rem 0.875rem;border-radius:9999px;font-size:0.8125rem;font-weight:600;border:none;background:${
                  statusFilter === opt ? primaryColor + "17" : "#f3f4f6"
                };color:${statusFilter === opt ? primaryColor : "#374151"};">${opt}</button>`
              )
              .join("")}
          </div>
        </div>`
          : ""
      }

      ${
        grouped.length === 0
          ? `<div class="card" style="margin:0 1rem;padding:2rem;text-align:center;">
          <p style="color:#6b7280;margin:0 0 0.75rem;">No transaction history</p>
          <button id="goto-dashboard" style="font-size:0.875rem;padding:0.5rem 1rem;border-radius:9999px;color:white;border:none;background:${primaryColor};">Go to Dashboard</button>
        </div>`
          : `<div style="padding:0 0.75rem;display:flex;flex-direction:column;gap:0.75rem;">
          ${grouped
            .map(
              (group) => `
            <section class="card" style="padding:1rem;">
              <div class="flex items-start justify-between" style="margin-bottom:0.75rem;">
                <div>
                  <div style="display:flex;align-items:center;gap:4px;font-size:1.125rem;font-weight:700;">
                    ${formatMonthLabel(group.date)} ${Icon("chevron-down", { size: 16, class: "" })}
                  </div>
                  <div class="flex items-center" style="gap:0.75rem;margin-top:4px;font-size:0.75rem;color:#6b7280;">
                    <span>In: <span style="color:#374151;">₦${group.in.toFixed(2)}</span></span>
                    <span>Out: <span style="color:#374151;">₦${group.out.toFixed(2)}</span></span>
                  </div>
                </div>
                <button style="color:white;font-size:0.75rem;font-weight:500;padding:0.375rem 1rem;border-radius:9999px;border:none;background:${primaryColor};">Analysis</button>
              </div>
              <div>
                ${group.items
                  .map((t, i) => {
                    const isPositive = !t.amount.trim().startsWith("-");
                    return `
                  <button data-tx="${t.id}" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0;${
                      i < group.items.length - 1 ? "border-bottom:1px solid #f3f4f6;" : ""
                    }background:none;border:none;text-align:left;">
                    <div class="flex items-center" style="gap:0.75rem;min-width:0;">
                      <div style="width:2.5rem;height:2.5rem;border-radius:9999px;background:${primaryColor}15;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <span style="color:${primaryColor};">${Icon(t.icon || "user", { size: 20 })}</span>
                      </div>
                      <div style="text-align:left;min-width:0;">
                        <p style="font-weight:500;font-size:0.875rem;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.type}</p>
                        <p style="font-size:0.75rem;color:#6b7280;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.date}</p>
                      </div>
                    </div>
                    <div style="text-align:right;flex-shrink:0;margin-left:0.5rem;">
                      <p style="font-weight:600;font-size:0.875rem;margin:0;color:${isPositive ? "#16a34a" : "#111827"};">${t.amount}</p>
                      <span style="display:inline-block;margin-top:4px;font-size:10px;color:#16a34a;background:#f0fdf4;padding:2px 8px;border-radius:0.25rem;">${t.status}</span>
                    </div>
                  </button>`;
                  })
                  .join("")}
              </div>
            </section>`
            )
            .join("")}
        </div>`
      }
    </div>`;

    const backBtn = container.querySelector("[data-nav-back]");
    if (backBtn) backBtn.addEventListener("click", () => navigate("/dashboard"));
    container.querySelector("#download-btn").addEventListener("click", handleDownload);
    container.querySelector("#filter-type-btn").addEventListener("click", () => {
      openFilter = openFilter === "type" ? "" : "type";
      render();
    });
    container.querySelector("#filter-status-btn").addEventListener("click", () => {
      openFilter = openFilter === "status" ? "" : "status";
      render();
    });
    container.querySelectorAll("[data-type-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        typeFilter = btn.dataset.typeOpt;
        openFilter = "";
        render();
      });
    });
    container.querySelectorAll("[data-status-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        statusFilter = btn.dataset.statusOpt;
        openFilter = "";
        render();
      });
    });
    const gotoDash = container.querySelector("#goto-dashboard");
    if (gotoDash) gotoDash.addEventListener("click", () => navigate("/dashboard"));
    container.querySelectorAll("[data-tx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const t = transactions.find((x) => x.id === btn.dataset.tx);
        if (t) showTxReceipt(t);
      });
    });
  }

  function showTxReceipt(t) {
    const isTransfer = /^transfer to/i.test(t.type) || /bank/i.test(t.type);
    showTransactionReceipt({
      amount: t.amount,
      success: t.status === "Successful",
      date: t.date,
      variant: isTransfer ? "tracker" : "badge",
      details: [
        { label: "Transaction Type", value: t.type },
        { label: "Transaction ID", value: t.id },
        { label: "Status", value: t.status },
      ],
      title: t.type,
      footerText: "Thank you for using OPay. Your trusted payment partner.",
      onClose: () => {},
    });
  }

  function handleDownload() {
    const { transactions } = Stores.transaction.get();
    if (transactions.length === 0) {
      toast.error("No transactions to download");
      return;
    }
    const rows = [["Date", "Type", "Amount", "Status"], ...transactions.map((t) => [t.date, t.type, t.amount, t.status])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded transactions.csv");
  }

  render();
}

window.renderTransactionHistoryPage = renderTransactionHistoryPage;
