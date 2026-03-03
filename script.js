let dialogueIndex = 0;
const dialogueLines = [
    "Player [Your Name] joined the game.",
    "[Your Name]: I finally found something better than Netherite...",
    "It's you."
];

function nextScreen(num) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(`screen-${num}`).classList.remove('hidden');
}

function handleDialogue() {
    dialogueIndex++;
    const textEl = document.getElementById('chat-text');
    const ingotEl = document.getElementById('ingot-zone');

    if (dialogueIndex < dialogueLines.length) {
        textEl.innerText = dialogueLines[dialogueIndex];
        if (dialogueIndex === 1) ingotEl.classList.remove('hidden');
    } else {
        nextScreen(3);
    }
}

// Drag and Drop Logic
let score = 0;
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const target = ev.target;

    if (target.getAttribute("data-req") === data && target.children.length === 0) {
        target.appendChild(document.getElementById(data));
        score++;
        if (score === 3) {
            setTimeout(() => {
                document.getElementById('result-slot').innerText = "📜";
                setTimeout(() => nextScreen(4), 1500);
            }, 500);
        }
    }
}

// No Button Dodge
let dodgeCount = 0;
function dodgeNo() {
    const btn = document.getElementById('no-btn');
    if (dodgeCount < 3) {
        const x = Math.random() * 400 + 50;
        const y = Math.random() * 300 + 50;
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
        dodgeCount++;
    } else {
        btn.classList.add('hidden');
        document.getElementById('sad-msg').classList.remove('hidden');
    }
}
