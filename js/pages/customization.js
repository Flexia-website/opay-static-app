function renderCustomizationPage(container) {
  let activeTab = "color";
  let iconSearch = "";
  const colorOptions = [
    { color: "#34C759", name: "Green" },
    { color: "#FF3B30", name: "Red" },
    { color: "#007AFF", name: "Blue" },
    { color: "#FF9500", name: "Orange" },
    { color: "#AF52DE", name: "Purple" },
    { color: "#FF2D55", name: "Pink" },
    { color: "#5AC8FA", name: "Light Blue" },
    { color: "#FFCC00", name: "Yellow" },
  ];
  const buttonTypes = [
    { key: "profile", label: "Profile Photo", description: "Your profile image in the top left corner", section: "Profile" },
    { key: "app-logo", label: "App Logo", description: "Your logo shown on the launch splash screen and app branding", section: "Profile" },
    { key: "help", label: "Help Button", description: "Help button in the top right corner", section: "Header Buttons" },
    { key: "qrcode", label: "QR Code Button", description: "QR code button in the top right corner", section: "Header Buttons" },
    { key: "notifications", label: "Notifications Button", description: "Notifications bell icon in the top right corner", section: "Header Buttons" },
    { key: "toopay", label: "To OPay", description: "OPay transfer quick action button", section: "Quick Actions" },
    { key: "tobank", label: "To Bank", description: "Bank transfer quick action button", section: "Quick Actions" },
    { key: "withdraw", label: "Withdraw", description: "Withdraw funds quick action button", section: "Quick Actions" },
    { key: "airtime", label: "Airtime", description: "Airtime service button", section: "Main Services" },
    { key: "data", label: "Data", description: "Data service button", section: "Main Services" },
    { key: "betting", label: "Betting", description: "Betting service button", section: "Main Services" },
    { key: "tv", label: "TV", description: "TV subscription service button", section: "Main Services" },
    { key: "safebox", label: "Safebox", description: "Safebox service button", section: "Main Services" },
    { key: "loan", label: "Loan", description: "Loan service button", section: "Main Services" },
    { key: "invitation", label: "Invitation", description: "Invitation/referral banner icon on the dashboard", section: "Main Services" },
    { key: "more", label: "More", description: "More button in the bottom-right quick actions row", section: "Main Services" },
    { key: "friday-bonus", label: "Friday Bonus", description: "Friday Bonus icon on the Rewards page", section: "Rewards Page" },
    { key: "refer-friends", label: "Refer Friends", description: "Refer Friends icon on the Rewards page", section: "Rewards Page" },
    { key: "play4achild", label: "Play4aChild", description: "Play4aChild icon on the Rewards page", section: "Rewards Page" },
    { key: "voucher-pack", label: "Voucher Pack", description: "Voucher Pack icon on the Rewards page", section: "Rewards Page" },
    { key: "daily-bonus-1", label: "Daily Bonus Icon 1", description: "Cash icon for the first Daily Bonus row", section: "Rewards Page" },
    { key: "daily-bonus-2", label: "Daily Bonus Icon 2", description: "Cash icon for the second Daily Bonus row", section: "Rewards Page" },
    { key: "daily-bonus-3", label: "Daily Bonus Icon 3", description: "Cash icon for the third Daily Bonus row", section: "Rewards Page" },
    { key: "inv-share", label: "Share Step Icon", description: "\"Share invitation link/code\" step icon on the Invitation page", section: "Invitation Page" },
    { key: "inv-check", label: "Transacts Step Icon", description: "\"Friend transacts\" step icon on the Invitation page", section: "Invitation Page" },
    { key: "inv-banknote", label: "Reward Step Icon", description: "\"Receive rewards\" step icon on the Invitation page", section: "Invitation Page" },
    { key: "svc-aliexpress", label: "AliExpress", description: "AliExpress tile on the All Service page", section: "All Service — E-commerce" },
    { key: "svc-gift-cards", label: "Gift Cards", description: "Gift Cards tile on the All Service page", section: "All Service — E-commerce" },
    { key: "svc-chowdeck", label: "Chowdeck", description: "Chowdeck tile on the All Service page", section: "All Service — E-commerce" },
    { key: "svc-remit", label: "Remit", description: "Remit tile on the All Service page", section: "All Service — International" },
    { key: "svc-electricity", label: "Electricity", description: "Electricity tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-solar", label: "Solar", description: "Solar tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-products-services", label: "Products and Services", description: "Products and Services tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-school-exam", label: "School & Exam", description: "School & Exam tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-internet-services", label: "Internet Services", description: "Internet Services tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-financial-services", label: "Financial Services", description: "Financial Services tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-invoice-payments", label: "Invoice Payments", description: "Invoice Payments tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-aid-grants", label: "Aid Grants and Donations", description: "Aid Grants and Donations tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-religious", label: "Religious", description: "Religious tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-government-payments", label: "Government Payments", description: "Government Payments tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-embassies", label: "Embassies", description: "Embassies tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-tv-others", label: "TV(Others)", description: "TV(Others) tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-shopping", label: "Shopping", description: "Shopping tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-online-shopping", label: "Online Shopping", description: "Online Shopping tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-merchant-payments", label: "Merchant Payments", description: "Merchant Payments tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-blackberry", label: "Blackberry", description: "Blackberry tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-paychoice", label: "PayChoice", description: "PayChoice tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-commerce-retail", label: "Commerce Retail Trade", description: "Commerce Retail Trade tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-prepaid-card", label: "Prepaid Card Services", description: "Prepaid Card Services tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-international-airtime", label: "International Airtime", description: "International Airtime tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-transport-toll", label: "Transport & Toll", description: "Transport & Toll tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-travel-hotel", label: "Travel & Hotel", description: "Travel & Hotel tile on the All Service page", section: "All Service — Bills Payment" },
    { key: "svc-owealth", label: "OWealth", description: "OWealth tile on the All Service page", section: "All Service — Finance" },
    { key: "svc-fixed", label: "Fixed", description: "Fixed tile on the All Service page", section: "All Service — Finance" },
    { key: "svc-safebox", label: "SafeBox", description: "SafeBox tile on the All Service page", section: "All Service — Finance" },
    { key: "svc-targets", label: "Targets", description: "Targets tile on the All Service page", section: "All Service — Finance" },
    { key: "svc-spend-save", label: "Spend & Save", description: "Spend & Save tile on the All Service page", section: "All Service — Finance" },
    { key: "svc-daily-checkin", label: "Daily Check-In", description: "Daily Check-In tile on the All Service page", section: "All Service — Rewards" },
    { key: "svc-play4achild", label: "Play4aChild", description: "Play4aChild tile on the All Service page", section: "All Service — Rewards" },
    { key: "svc-refer-earn", label: "Refer & Earn", description: "Refer & Earn tile on the All Service page", section: "All Service — Rewards" },
    { key: "svc-physical-card", label: "Physical Card", description: "Physical Card tile on the All Service page", section: "All Service — Others" },
    { key: "svc-virtual-card", label: "Virtual Card", description: "Virtual Card tile on the All Service page", section: "All Service — Others" },
  ];

  function render() {
    const { primaryColor, buttonImages, profilePhoto, profilePhotoSize, networkImages } = Stores.customization.get();
    const grouped = {};
    buttonTypes.forEach((b) => {
      grouped[b.section] = grouped[b.section] || [];
      grouped[b.section].push(b);
    });

    container.innerHTML = `
    <div style="min-height:100vh;background:#f9fafb;padding-bottom:4rem;">
      <div style="background:white;padding:1rem;display:flex;align-items:center;gap:0.5rem;">
        <button id="cust-back" style="background:none;border:none;border-radius:9999px;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;">${Icon("arrow-left", { size: 20 })}</button>
        <h1 style="font-size:1.125rem;font-weight:700;margin:0;">Appearance</h1>
      </div>

      <div style="padding:1rem;">
        <div style="display:flex;background:#f3f4f6;border-radius:0.5rem;padding:4px;margin-bottom:1rem;">
          <button id="tab-color" style="flex:1;padding:0.5rem;border-radius:0.375rem;border:none;font-weight:500;background:${activeTab === "color" ? "white" : "transparent"};box-shadow:${activeTab === "color" ? "0 1px 2px rgb(0 0 0 / 0.1)" : "none"};">Color</button>
          <button id="tab-images" style="flex:1;padding:0.5rem;border-radius:0.375rem;border:none;font-weight:500;background:${activeTab === "images" ? "white" : "transparent"};box-shadow:${activeTab === "images" ? "0 1px 2px rgb(0 0 0 / 0.1)" : "none"};">Images</button>
          <button id="tab-icons" style="flex:1;padding:0.5rem;border-radius:0.375rem;border:none;font-weight:500;background:${activeTab === "icons" ? "white" : "transparent"};box-shadow:${activeTab === "icons" ? "0 1px 2px rgb(0 0 0 / 0.1)" : "none"};">Icons</button>
        </div>

        ${
          activeTab === "color"
            ? `<div class="card" style="padding:1rem;">
            <h3 style="font-weight:500;margin:0 0 1rem;display:flex;align-items:center;gap:0.5rem;">${Icon("palette", { size: 20, class: "" })} Choose Primary Color</h3>
            <div class="grid" style="grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:1rem;">
              ${colorOptions
                .map(
                  (c) => `
                <button data-color="${c.color}" style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;background:none;border:none;">
                  <div style="width:3rem;height:3rem;border-radius:9999px;background:${c.color};border:${primaryColor === c.color ? "3px solid #111827" : "none"};"></div>
                  <span style="font-size:0.75rem;">${c.name}</span>
                </button>`
                )
                .join("")}
            </div>
            <label style="display:block;font-size:0.875rem;font-weight:500;margin-bottom:0.5rem;">Custom Color</label>
            <input id="custom-color-input" type="color" value="${primaryColor}" style="width:100%;height:3rem;border-radius:0.5rem;border:1px solid hsl(var(--border));" />
          </div>`
            : activeTab === "images"
            ? `<div style="display:flex;flex-direction:column;gap:1.25rem;">
            ${Object.entries(grouped)
              .map(
                ([section, items]) => `
              <div class="card" style="padding:1rem;">
                <h3 style="font-weight:600;margin:0 0 1rem;">${section}</h3>
                ${items
                  .map((b) => {
                    const currentImage = b.key === "profile" ? profilePhoto : buttonImages[b.key];
                    return `
                  <div style="margin-bottom:1rem;">
                    <div class="flex justify-between items-center" style="margin-bottom:0.5rem;">
                      <h4 style="font-weight:500;margin:0;">${b.label}</h4>
                      ${
                        currentImage
                          ? `<button data-reset="${b.key}" style="font-size:0.75rem;display:flex;align-items:center;gap:4px;color:#ef4444;background:none;border:none;">${Icon("refresh-cw", { size: 12, class: "" })} Reset</button>`
                          : ""
                      }
                    </div>
                    <p style="font-size:0.875rem;color:#6b7280;margin:0 0 0.75rem;">${b.description}</p>
                    <div class="flex items-center" style="gap:0.75rem;">
                      ${
                        currentImage
                          ? `<div style="width:4rem;height:4rem;border-radius:${b.key === 'profile' ? '9999px' : '0.5rem'};${b.key === 'profile' ? '' : 'overflow:hidden;'}flex-shrink:0;background:#f3f4f6;display:flex;align-items:center;justify-content:center;"><img src="${currentImage}" alt="${b.label}" style="width:100%;height:100%;object-fit:${b.key === 'profile' ? 'contain' : 'cover'};" /></div>`
                          : ""
                      }
                      <label style="flex:1;cursor:pointer;">
                        <div style="border:2px dashed #d1d5db;border-radius:0.5rem;padding:1rem;text-align:center;">
                          ${Icon("upload", { size: 20, class: "" })}
                          <p style="font-size:0.875rem;color:#6b7280;margin:4px 0 0;">Click to upload an image</p>
                        </div>
                        <input type="file" accept="image/*" data-upload="${b.key}" style="display:none;" />
                      </label>
                    </div>
                    ${
                      b.key === "profile"
                        ? `<div style="margin-top:0.75rem;">
                          <div class="flex justify-between items-center" style="margin-bottom:0.4rem;">
                            <span style="font-size:0.8125rem;color:#6b7280;">Icon Size</span>
                            <span id="profile-size-value" style="font-size:0.8125rem;font-weight:600;color:#111827;">${Math.round((profilePhotoSize || 1) * 100)}%</span>
                          </div>
                          <input id="profile-size-slider" type="range" min="0.5" max="3" step="0.1" value="${profilePhotoSize || 1}" style="width:100%;" />
                        </div>`
                        : ""
                    }
                  </div>`;
                  })
                  .join("")}
              </div>`
              )
              .join("")}

            <div class="card" style="padding:1rem;">
              <h3 style="font-weight:600;margin:0 0 0.25rem;">Network Logos</h3>
              <p style="font-size:0.8125rem;color:#6b7280;margin:0 0 1rem;">Replace the MTN, Airtel, GLO, T2 Mobile, and VITEL logos shown on the Airtime and Data pages.</p>
              ${window.NETWORKS.map((n) => {
                const currentImage = networkImages[n.id];
                return `
              <div style="margin-bottom:1rem;">
                <div class="flex justify-between items-center" style="margin-bottom:0.5rem;">
                  <h4 style="font-weight:500;margin:0;">${n.name}</h4>
                  ${
                    currentImage
                      ? `<button data-network-reset="${n.id}" style="font-size:0.75rem;display:flex;align-items:center;gap:4px;color:#ef4444;background:none;border:none;">${Icon("refresh-cw", { size: 12, class: "" })} Reset</button>`
                      : ""
                  }
                </div>
                <div class="flex items-center" style="gap:0.75rem;">
                  <div style="width:3.25rem;height:3.25rem;border-radius:9999px;overflow:hidden;flex-shrink:0;background:${n.color};display:flex;align-items:center;justify-content:center;color:${n.textColor};font-weight:800;">
                    ${currentImage ? `<img src="${currentImage}" alt="${n.name}" style="width:100%;height:100%;object-fit:cover;" />` : n.name.charAt(0)}
                  </div>
                  <label style="flex:1;cursor:pointer;">
                    <div style="border:2px dashed #d1d5db;border-radius:0.5rem;padding:0.75rem;text-align:center;">
                      ${Icon("upload", { size: 18, class: "" })}
                      <p style="font-size:0.8125rem;color:#6b7280;margin:4px 0 0;">Upload logo</p>
                    </div>
                    <input type="file" accept="image/*" data-network-upload="${n.id}" style="display:none;" />
                  </label>
                </div>
              </div>`;
              }).join("")}
            </div>
          </div>`
            : ""
        }

        ${
          activeTab === "icons"
            ? `<div class="card" style="padding:1rem;">
            <h3 style="font-weight:600;margin:0 0 0.75rem;">Edit Icons</h3>
            <p style="font-size:0.8125rem;color:#6b7280;margin:0 0 0.75rem;">Replace any icon app-wide with your own picture, or paste raw SVG shape markup. Saved to your device only. A picture always takes priority over pasted SVG.</p>
            <input id="icon-search" type="text" placeholder="Search icons..." value="${iconSearch}" style="width:100%;padding:0.5rem 0.75rem;border:1px solid hsl(var(--border));border-radius:0.5rem;margin-bottom:1rem;box-sizing:border-box;" />
            <div style="display:flex;flex-direction:column;gap:0.75rem;max-height:60vh;overflow-y:auto;">
              ${(() => {
                const pinned = ["home", "star", "trending-up", "credit-card", "more-horizontal", "wallet", "target", "vault", "lock", "piggy-bank", "settings", "shield-check", "fingerprint", "user", "bell", "eye", "eye-off"];
                const rest = window.ALL_ICON_KEYS.filter((k) => !pinned.includes(k));
                const ordered = [...pinned.filter((k) => window.ALL_ICON_KEYS.includes(k)), ...rest];
                const footerHints = {
                  "home": "Footer: Home tab",
                  "star": "Footer: Rewards tab",
                  "trending-up": "Footer: Finance tab",
                  "credit-card": "Footer: Cards tab",
                  "more-horizontal": "Footer: Me tab",
                  "wallet": "Finance page: OWealth tile",
                  "target": "Finance page: Targets tile",
                  "vault": "Finance page: SafeBox tile",
                  "lock": "Finance page: Fixed tile",
                  "piggy-bank": "Finance page: Spend & Save tile",
                  "settings": "Finance page: top-right settings",
                  "shield-check": "Finance page: footer note icon",
                };
                return ordered
                  .filter((k) => k.includes(iconSearch.toLowerCase()))
                  .map((key) => {
                  const custom = getCustomIcons();
                  const customImages = getCustomIconImages();
                  const isCustomSvg = !!custom[key];
                  const isCustomImage = !!customImages[key];
                  const isCustom = isCustomSvg || isCustomImage;
                  const hint = footerHints[key];
                  return `
                <div style="border:1px solid hsl(var(--border));border-radius:0.5rem;padding:0.75rem;">
                  <div class="flex items-center justify-between" style="margin-bottom:0.5rem;">
                    <div class="flex items-center" style="gap:0.5rem;">
                      <div style="width:2.25rem;height:2.25rem;border-radius:0;background:#f3f4f6;display:flex;align-items:center;justify-content:center;">${Icon(key, { size: 20 })}</div>
                      <div>
                        <div style="display:flex;align-items:center;gap:0.5rem;">
                          <span style="font-weight:500;font-size:0.875rem;">${key}</span>
                          ${isCustomImage ? `<span style="font-size:0.6875rem;background:#dbeafe;color:#2563eb;padding:2px 6px;border-radius:9999px;">picture</span>` : isCustomSvg ? `<span style="font-size:0.6875rem;background:#dcfce7;color:#16a34a;padding:2px 6px;border-radius:9999px;">custom svg</span>` : ""}
                        </div>
                        ${hint ? `<span style="font-size:0.6875rem;color:#9ca3af;">${hint}</span>` : ""}
                      </div>
                    </div>
                    ${isCustom ? `<button data-icon-reset="${key}" style="font-size:0.75rem;color:#ef4444;background:none;border:none;">Reset</button>` : ""}
                  </div>

                  <label style="display:block;cursor:pointer;margin-bottom:0.5rem;">
                    <div style="border:1px dashed #d1d5db;border-radius:0;padding:0.5rem;text-align:center;font-size:0.75rem;color:#6b7280;">
                      ${Icon("upload", { size: 14, class: "" })} Upload picture for this icon
                    </div>
                    <input type="file" accept="image/*" data-icon-image="${key}" style="display:none;" />
                  </label>

                  <textarea data-icon-key="${key}" rows="2" placeholder="or paste SVG: <path d=&quot;...&quot;/>" style="width:100%;box-sizing:border-box;font-family:monospace;font-size:0.75rem;padding:0.5rem;border:1px solid hsl(var(--border));border-radius:0.375rem;resize:vertical;">${isCustomSvg ? custom[key] : ""}</textarea>
                  <button data-icon-save="${key}" style="margin-top:0.5rem;font-size:0.8125rem;background:#111827;color:white;border:none;border-radius:0.375rem;padding:0.375rem 0.75rem;">Save SVG</button>
                </div>`;
                  })
                  .join("");
              })()}
            </div>
          </div>`
            : ""
        }
      </div>
    </div>`;

    container.querySelector("#cust-back").addEventListener("click", () => navigate("/me"));
    container.querySelector("#tab-color").addEventListener("click", () => {
      activeTab = "color";
      render();
    });
    container.querySelector("#tab-images").addEventListener("click", () => {
      activeTab = "images";
      render();
    });
    container.querySelector("#tab-icons").addEventListener("click", () => {
      activeTab = "icons";
      render();
    });

    container.querySelectorAll("[data-color]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Stores.customization.set({ primaryColor: btn.dataset.color });
        render();
      });
    });
    const customColorInput = container.querySelector("#custom-color-input");
    if (customColorInput) {
      customColorInput.addEventListener("input", () => {
        Stores.customization.set({ primaryColor: customColorInput.value });
      });
    }

    container.querySelectorAll("[data-upload]").forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const url = evt.target.result;
          const key = input.dataset.upload;
          if (key === "profile") {
            Stores.customization.set({ profilePhoto: url });
            toast.success("Profile photo updated successfully");
          } else {
            Stores.customization.setButtonImage(key, url);
            toast.success(`${key} image updated successfully`);
          }
          render();
        };
        reader.readAsDataURL(file);
      });
    });
    container.querySelectorAll("[data-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.reset;
        if (key === "profile") {
          Stores.customization.set({ profilePhoto: "" });
        } else {
          Stores.customization.resetButtonImage(key);
        }
        render();
      });
    });
    const profileSizeSlider = container.querySelector("#profile-size-slider");
    if (profileSizeSlider) {
      profileSizeSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        const label = container.querySelector("#profile-size-value");
        if (label) label.textContent = Math.round(val * 100) + "%";
        Stores.customization.set({ profilePhotoSize: val });
      });
    }
    container.querySelectorAll("[data-network-upload]").forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const key = input.dataset.networkUpload;
        const reader = new FileReader();
        reader.onload = (evt) => {
          Stores.customization.setNetworkImage(key, evt.target.result);
          toast.success(`${key} logo updated successfully`);
          render();
        };
        reader.readAsDataURL(file);
      });
    });
    container.querySelectorAll("[data-network-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Stores.customization.resetNetworkImage(btn.dataset.networkReset);
        render();
      });
    });

    const iconSearchInput = container.querySelector("#icon-search");
    if (iconSearchInput) {
      iconSearchInput.addEventListener("input", () => {
        iconSearch = iconSearchInput.value;
        render();
      });
    }
    container.querySelectorAll("[data-icon-save]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.iconSave;
        const textarea = container.querySelector(`[data-icon-key="${key}"]`);
        setCustomIcon(key, textarea.value);
        toast.success(`"${key}" icon updated`);
        render();
      });
    });
    container.querySelectorAll("[data-icon-image]").forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const key = input.dataset.iconImage;
        const reader = new FileReader();
        reader.onload = (evt) => {
          setCustomIconImage(key, evt.target.result);
          toast.success(`"${key}" icon picture updated`);
          render();
        };
        reader.readAsDataURL(file);
      });
    });
    container.querySelectorAll("[data-icon-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.iconReset;
        resetCustomIconImage(key);
        resetCustomIcon(key);
        toast.success(`"${key}" icon reset to default`);
        render();
      });
    });
  }

  render();
}

window.renderCustomizationPage = renderCustomizationPage;
