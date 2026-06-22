const crossing = document.getElementById("crossing");
const allySide = document.getElementById("allySide");
const mirrorStrip = document.getElementById("mirrorStrip");
const leftWord = document.getElementById("leftWord");
const rightWord = document.getElementById("rightWord");
const progressBar = document.getElementById("progressBar");
const captionTitle = document.getElementById("captionTitle");
const captionText = document.getElementById("captionText");

const kws = [
    document.getElementById("kw1"),
    document.getElementById("kw2"),
    document.getElementById("kw3"),
    document.getElementById("kw4")
];

window.addEventListener("scroll", () => {
    const rect = crossing.getBoundingClientRect();
    const max = crossing.offsetHeight - innerHeight;
    const p = Math.min(Math.max(-rect.top / max, 0), 1);

    const frameW = Math.min(1180, innerWidth * 0.88);
    const mirrorX = -180 + p * (frameW + 260);

    mirrorStrip.style.transform = `translateX(${mirrorX}px)`;

    const reveal = Math.min(Math.max((p - 0.08) / 0.78, 0), 1) * 100;

    allySide.style.clipPath = `inset(0 ${100 - reveal}% 0 0)`;

    leftWord.style.transform = `
        translateX(${p * 7}vw)
        translateY(${p * -3}vh)
    `;

    rightWord.style.transform = `
        translateX(${p * -8}vw)
        translateY(${p * 3}vh)
    `;

    if (p > 0.55) {
        leftWord.textContent = "ALLY";
        rightWord.textContent = "VIEW";

        captionTitle.textContent = "Le regard devient allié.";

        captionText.textContent =
            "La représentation ne cherche plus à posséder l’image : elle reconnaît une présence, une mémoire et une individualité.";
    } else {
        leftWord.textContent = "FE";
        rightWord.textContent = "GAZE";

        captionTitle.textContent = "Le regard traverse l’image.";

        captionText.textContent =
            "Le miroir ne répète pas l’image : il transforme la perception et fait apparaître une troisième lecture.";
    }

    kws.forEach((kw, i) => {
        const d = i % 2 === 0 ? 1 : -1;

        kw.style.opacity = p > 0.18 ? 1 : 0.35;

        kw.style.transform = `
            translate(${d * p * 28}px, ${-p * 16}px)
        `;
    });

    progressBar.style.height = `${p * 100}%`;
});