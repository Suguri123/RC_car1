// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById("theme-toggle");
    const lightIcon = themeToggleBtn.querySelector(".theme-icon-light");
    const darkIcon = themeToggleBtn.querySelector(".theme-icon-dark");

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcons(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcons(newTheme);
    });

    function updateThemeIcons(theme) {
        if (theme === "dark") {
            lightIcon.style.display = "none";
            darkIcon.style.display = "inline-block";
        } else {
            lightIcon.style.display = "inline-block";
            darkIcon.style.display = "none";
        }
    }

    // Sidebar Navigation Logic
    const menuItems = document.querySelectorAll(".menu-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const currentSectionTitle = document.getElementById("current-section-title");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active class from all menu items
            menuItems.forEach(i => i.classList.remove("active"));
            
            // Add active class to clicked menu item
            item.classList.add("active");

            // Hide all tab contents
            tabContents.forEach(tab => {
                tab.classList.remove("active");
            });

            // Show current tab content
            const targetId = item.getAttribute("data-target");
            const targetTab = document.getElementById(targetId);
            if (targetTab) {
                targetTab.classList.add("active");
            }

            // Update Header Title
            const menuText = item.querySelector("span").textContent;
            currentSectionTitle.textContent = menuText;
        });
    });

    // Copy to Clipboard Logic
    const copyButtons = document.querySelectorAll(".btn-copy");
    copyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const sourceId = btn.getAttribute("data-source");
            const codeContentElement = document.getElementById(sourceId);
            if (codeContentElement) {
                const codeText = codeContentElement.textContent;
                
                navigator.clipboard.writeText(codeText)
                    .then(() => {
                        showToast("📋 코드가 클립보드에 복사되었습니다!");
                    })
                    .catch(err => {
                        console.error("복사 실패: ", err);
                        showToast("❌ 복사에 실패했습니다.");
                    });
            }
        });
    });

    // Download .ino File Logic
    const downloadButtons = document.querySelectorAll(".btn-download");
    downloadButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const sourceId = btn.getAttribute("data-source");
            const filename = btn.getAttribute("data-filename") || "sketch.ino";
            const codeContentElement = document.getElementById(sourceId);
            
            if (codeContentElement) {
                const codeText = codeContentElement.textContent;
                downloadFile(filename, codeText);
            }
        });
    });

    function downloadFile(filename, text) {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast(`💾 ${filename} 다운로드 시작!`);
    }

    // Toast Notification Creator
    function showToast(message) {
        // Remove existing toast if it exists
        const existingToast = document.querySelector(".copy-toast");
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement("div");
        toast.className = "copy-toast";
        toast.innerHTML = `<span>${message}</span>`;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    }
});
