function initMobileNavToggle() {
        const nav = document.querySelector(".nav-sm");
        const openBtn = document.querySelector(".nav-sm-toggler");
        const closeBtn = document.querySelector(".close_btn");

        if (!nav || !openBtn || !closeBtn) return;

        openBtn.addEventListener("click", () => {
            nav.classList.remove("-right-full");
            nav.classList.add("right-0");
        });

        closeBtn.addEventListener("click", () => {
            nav.classList.remove("right-0");
            nav.classList.add("-right-full");
        });
}

function initDropdownToggles() {
        const dropdownTriggers = document.querySelectorAll(".dropdown > div");

        dropdownTriggers.forEach(trigger => {
            const parentLi = trigger.parentElement;
            const dropdownList = parentLi.querySelector("ul");

            trigger.addEventListener("click", () => {
                // Close all other dropdowns
                document.querySelectorAll(".dropdown ul").forEach(ul => {
                    if (ul !== dropdownList) {
                        ul.style.maxHeight = "0px";
                    }
                });

                // Toggle this dropdown
                const isOpen = dropdownList.style.maxHeight && dropdownList.style.maxHeight !== "0px";
                dropdownList.style.maxHeight = isOpen ? "0px" : dropdownList.scrollHeight + "px";
            });
        });
}

function initButtonDropdowns() {
        const buttonDropdowns = document.querySelectorAll(".nav-sm-btn-dropdown");

        buttonDropdowns.forEach(dropdown => {
            const button = dropdown.querySelector("button");
            const list = dropdown.querySelector("ul");

            button.addEventListener("click", () => {
                
                document.querySelectorAll(".nav-sm-btn-dropdown ul").forEach(ul => {
                    if (ul !== list) ul.style.maxHeight = "0px";
                });

                const isOpen = list.style.maxHeight && list.style.maxHeight !== "0px";
                list.style.maxHeight = isOpen ? "0px" : list.scrollHeight + "px";
            });
        });
    }
function showDropdown(panel, trigger) {
  panel.classList.add("visible", "opacity-100", "translate-y-0");
  panel.classList.remove("opacity-0", "translate-y-5", "invisible");
  trigger.style.color = "#be811a";
}

function hideDropdown(panel, trigger) {
  panel.classList.remove("visible", "opacity-100", "translate-y-0");
  panel.classList.add("opacity-0", "translate-y-5", "invisible");
  trigger.style.color = "#fff";
}

function initLargeScreenDropdowns() {
  const dropdowns = document.querySelectorAll(".nav-lg-dropdown, .nav-lg-btn-dropdown");

  dropdowns.forEach(dropdown => {
    // `.nav-lg-dropdown`: trigger is div:first-child
    // `.nav-lg-btn-dropdown`: trigger is button
    const trigger = dropdown.classList.contains("nav-lg-btn-dropdown")
      ? dropdown.querySelector("button")
      : dropdown.querySelector("div:first-child");

    const panel = dropdown.querySelector("div.absolute") || dropdown.querySelector("div:nth-child(2)");

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      const isOpen = panel.classList.contains("visible");

      // Close all dropdowns
      dropdowns.forEach(other => {
        const otherTrigger = other.classList.contains("nav-lg-btn-dropdown")
          ? other.querySelector("button")
          : other.querySelector("div:first-child");
        const otherPanel = other.querySelector("div.absolute") || other.querySelector("div:nth-child(2)");
        hideDropdown(otherPanel, otherTrigger);
      });

      // Open this one if it was closed
      if (!isOpen) {
        showDropdown(panel, trigger);
      }
    });
  });

  // Click outside to close all
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-lg-dropdown") && !e.target.closest(".nav-lg-btn-dropdown")) {
      dropdowns.forEach(dropdown => {
        const trigger = dropdown.classList.contains("nav-lg-btn-dropdown")
          ? dropdown.querySelector("button")
          : dropdown.querySelector("div:first-child");
        const panel = dropdown.querySelector("div.absolute") || dropdown.querySelector("div:nth-child(2)");
        hideDropdown(panel, trigger);
      });
    }
  });
}


// table tabs
const forex = [
  {
    symbol: "EUR/USD",
    bid: "1.03602",
    ask: "1.03700",
    high: "1.04329",
    low: "1.03493",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "GBP/USD",
    bid: "1.23889",
    ask: "1.24032",
    high: "1.24707",
    low: "1.23825",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "USD/JPY",
    bid: "155.04000",
    ask: "155.25900",
    high: "155.21000",
    low: "154.42400",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "USD/CHF",
    bid: "0.91042",
    ask: "0.91175",
    high: "0.91147",
    low: "0.90702",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "NZD/USD",
    bid: "0.56102",
    ask: "0.56649",
    high: "0.56830",
    low: "0.56079",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "USD/CAD",
    bid: "1.45338",
    ask: "1.45443",
    high: "1.45566",
    low: "1.43692",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "EUR/JPY",
    bid: "160.75100",
    ask: "160.80900",
    high: "161.49400",
    low: "160.17000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "GBP/JPY",
    bid: "192.24400",
    ask: "192.54200",
    high: "193.02000",
    low: "191.58700",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "AUDCAD",
    bid: "0.90163",
    ask: "0.90492",
    high: "0.90388",
    low: "0.89905",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "AUDCHF",
    bid: "0.56503",
    ask: "0.56743",
    high: "0.56827",
    low: "0.56501",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "AUDJPY",
    bid: "96.22900",
    ask: "96.56300",
    high: "96.92100",
    low: "96.02300",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "AUDNZD",
    bid: "1.10102",
    ask: "1.10406",
    high: "1.10342",
    low: "1.10068",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "AUDUSD",
    bid: "0.62020",
    ask: "0.62309",
    high: "0.62617",
    low: "0.62020",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "CADCHF",
    bid: "0.62606",
    ask: "0.62765",
    high: "0.63141",
    low: "0.62551",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "CADJPY",
    bid: "106.70500",
    ask: "106.80900",
    high: "107.70500",
    low: "106.43900",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "CHFJPY",
    bid: "170.16900",
    ask: "170.45700",
    high: "170.62100",
    low: "169.48800",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "EURAUD",
    bid: "1.66808",
    ask: "1.66830",
    high: "1.67062",
    low: "1.66409",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  }
];
const commodities = [
  {
    symbol: "Crude Oil WTI",
    bid: "73.35100",
    ask: "73.48100",
    high: "73.38100",
    low: "71.64400",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "Brent Oil",
    bid: "76.22100",
    ask: "76.39000",
    high: "76.33300",
    low: "75.02900",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "Natural Gas",
    bid: "3.05300",
    ask: "3.10800",
    high: "3.09600",
    low: "2.99100",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  }
];
const indices = [
  {
    symbol: "DAX30",
    bid: "21615.23000",
    ask: "21626.33000",
    high: "21813.80000",
    low: "21602.23000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "NASDAQ",
    bid: "21463.65000",
    ask: "21467.55000",
    high: "21857.67000",
    low: "21427.05000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "Dow Jones",
    bid: "44567.15000",
    ask: "44574.75000",
    high: "45095.80000",
    low: "44526.95000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "S&P 500",
    bid: "6039.29000",
    ask: "6042.15000",
    high: "6121.61000",
    low: "6031.86000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "FTSE",
    bid: "8639.65000",
    ask: "8647.75000",
    high: "8699.35000",
    low: "8634.15000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph"><div style="padding: 20px; border-radius: 10px;"><canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas></div></div>`,
    tradeLink: "#"
  }
];
const energies = [
  {
    symbol: "XAU/USD",
    bid: "2796.00000",
    ask: "2800.23000",
    high: "2817.07000",
    low: "2790.87000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "XPD/USD",
    bid: "1012.34000",
    ask: "1021.79000",
    high: "1026.16000",
    low: "981.58000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "XPT/USD",
    bid: "964.97000",
    ask: "998.70000",
    high: "985.21000",
    low: "963.16000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "XAG/USD",
    bid: "31.30000",
    ask: "31.35700",
    high: "31.70100",
    low: "31.16300",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129" style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  }
];

const cfds = [
  {
    symbol: "MSFT",
    bid: "414.87000",
    ask: "415.21000",
    high: "420.49000",
    low: "414.84000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "AAPL",
    bid: "235.72500",
    ask: "236.04500",
    high: "246.92500",
    low: "233.30500",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "GOOGL",
    bid: "203.95000",
    ask: "204.30000",
    high: "205.32000",
    low: "201.37000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "META",
    bid: "688.68500",
    ask: "689.66500",
    high: "704.66500",
    low: "685.17500",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "BABA",
    bid: "98.64000",
    ask: "99.04000",
    high: "102.25000",
    low: "98.00000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "AMZN",
    bid: "237.15000",
    ask: "238.35000",
    high: "239.69000",
    low: "236.30000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "NVDA",
    bid: "119.89000",
    ask: "120.17000",
    high: "127.72000",
    low: "119.06000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "ADS",
    bid: "253.66000",
    ask: "254.70000",
    high: "259.08000",
    low: "253.57000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "EBAY",
    bid: "67.19000",
    ask: "67.73000",
    high: "67.75000",
    low: "66.91000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  },
  {
    symbol: "KO",
    bid: "63.31000",
    ask: "63.62000",
    high: "63.77000",
    low: "63.23000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div>
    </div>`,
    tradeLink: "#"
  }
];

const cashEquities = [
  {
    symbol: "WTI Oil",
    bid: "73.35100",
    ask: "73.48100",
    high: "73.38100",
    low: "71.64400",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129" 
          style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "Gold USD",
    bid: "2796.00000",
    ask: "2800.23000",
    high: "2817.07000",
    low: "2790.87000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "Silver USD",
    bid: "31.30000",
    ask: "31.35700",
    high: "31.70100",
    low: "31.16300",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "EUR/USD",
    bid: "1.03602",
    ask: "1.03700",
    high: "1.04329",
    low: "1.03493",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "GBP/USD",
    bid: "1.23889",
    ask: "1.24032",
    high: "1.24707",
    low: "1.23825",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "JPY/USD",
    bid: "155.04000",
    ask: "155.25900",
    high: "155.21000",
    low: "154.42400",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "BTCUSD",
    bid: "101485.00000",
    ask: "101710.00000",
    high: "105951.00000",
    low: "101455.00000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "ETHUSD",
    bid: "3308.70000",
    ask: "3314.30000",
    high: "3435.50000",
    low: "3213.10000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "US30",
    bid: "44567.15000",
    ask: "44574.75000",
    high: "45095.80000",
    low: "44526.95000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  },
  {
    symbol: "DE30",
    bid: "21615.23000",
    ask: "21626.33000",
    high: "21813.80000",
    low: "21602.23000",
    graphHTML: `<div class="w-[86px] h-[49px] table-graph">
      <div style="padding: 20px; border-radius: 10px;">
        <canvas role="img" height="64" width="129"
         style="display: block; box-sizing: border-box; height: 43px; width: 86px;"></canvas>
      </div></div>`,
    tradeLink: "#"
  }
];


const tradingTabsData = {
  forex,
  commodities,
  indices,
  energies,
  sharesCfds:cfds,
  cashEquities
};
  const tabButtons = document.querySelectorAll(".products-list li");
  const tbody = document.querySelector(".investment_data_table tbody");

  function renderTableRows(tabName) {
    const rows = tradingTabsData[tabName] || [];

    tbody.innerHTML = ""; 

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      tr.className = "text-[13px] font-normal text-text-800 table-td";

      tr.innerHTML = `
        <td class="text-left"><p>${row.symbol}</p></td>
        <td class="text-left"><p>${row.bid}</p></td>
        <td class="text-left"><p>${row.ask}</p></td>
        <td class="text-left"><p>${row.high}</p></td>
        <td class="text-left"><p>${row.low}</p></td>
        <td class="text-left">${row.graphHTML}</td>
        <td class="text-left">
          <a target="_blank" class="button_border_btn_46__eL52N border_btn_46" href="${row.tradeLink}"><p>Trade</p></a>
        </td>
      `;
      tbody.appendChild(tr);
    });

     initCanvas('.investment_data_table canvas',strokeWidth=86)
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove bg-act from all
      tabButtons.forEach(b => b.classList.remove("bg-act", "text-[#fff]"));

      // Add bg-act to current
      btn.classList.add("bg-act", "text-[#fff]");

      // Get tab name based on button text
      const tabName = btn.textContent.trim().toLowerCase().replace(/\s+/g, "").replace("cfd", "Cfds");
      
      // Fix key if it’s "sharescfds" or others with caps
      const fixedKey = Object.keys(tradingTabsData).find(k => k.toLowerCase() === tabName);

      renderTableRows(fixedKey || "forex");
    });
  });

const initCanvas = (containerSelector = "canvas", strokeWidth = null) => {
  const canvases = document.querySelectorAll(containerSelector);

  canvases.forEach(canvas => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const desiredWidth = strokeWidth || canvas.clientWidth;
    const desiredHeight = canvas.clientHeight;

    // Ensure the canvas has enough drawing space
    canvas.width = Math.max(desiredWidth, canvas.clientWidth);
    canvas.height = desiredHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e5e7eb";

    // Always use passed strokeWidth exactly, even if canvas is larger
    const drawWidth = strokeWidth || canvas.width;

    // Draw line at center
    ctx.fillRect(0, (canvas.height - 2) / 2, drawWidth, 2);
  });
};







document.addEventListener("DOMContentLoaded", () => {
        initMobileNavToggle();
        initDropdownToggles();
        initButtonDropdowns();
        initLargeScreenDropdowns();
          renderTableRows("forex");
          initCanvas('.about-swiper-1 canvas')
          initCanvas('.investment_data_table canvas',strokeWidth=86)
});
