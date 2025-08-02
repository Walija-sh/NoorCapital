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





document.addEventListener("DOMContentLoaded", () => {
        initMobileNavToggle();
        initDropdownToggles();
        initButtonDropdowns();
        initLargeScreenDropdowns();
});
