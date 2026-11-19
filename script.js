const paperImages = [
  { path: "pic/1.jpg", text: "Stop stopping yourself." },
  { path: "pic/2.jpg", text: "Pressure makes diamonds." },
  { path: "pic/3.jpg", text: "Train insane or remain the same." },
  { path: "pic/4.jpg", text: "The only limit is your mind." },
  { path: "pic/5.jpg", text: "Start working on that damn dream." },
  { path: "pic/6.jpg", text: "لا تقلص أهدافك، زد مجهودك. Don't shrink your goals. Increase your efforts." },
  { path: "pic/7.jpg", text: "أن الله لا يخيب عبداً تفاءل به خيراً", lang: "ar" },
  { path: "pic/8.jpg", text: "ولعل الله أرادها أن تأتي متأخرة، فتأتي أعظم وأكرم", lang: "ar" },
  { path: "pic/9.jpg", text: "قوي التوكل لا يهزم وملح الدعاء لا يخذل", lang: "ar" },
  { path: "pic/10.jpg", text: "Don't stop when you're tired. Stop when you're done." },
  { path: "pic/11.jpg", text: "Comfort kills more dreams than failure ever will." },
  { path: "pic/12.jpg", text: "合気道. The more you sweat in practice, the less you bleed in battle." },
  { path: "pic/13.jpg", text: "The future is bright." },
  { path: "pic/14.jpg", text: "Be a doer." },
  { path: "pic/15.jpg", text: "Force yourself. (Do what needs to be done.)" },
  { path: "pic/16.jpg", text: "حتى وإن بدت السماء بعيدة، إن الذي فوق السماء قريب. فارفع يديك إلى الإله مناجياً، إن الجروح مع الدعاء تطيب.", lang: "ar" },
  { path: "pic/17.jpg", text: "You don't need more time, you need less distractions." },
  { path: "pic/18.jpg", text: "It's what you do in the dark that puts you in the light." },
  { path: "pic/19.jpg", text: "Stick to the plan. Not your mood." },
  { path: "pic/20.jpg", text: "It's you vs you." },
  { path: "pic/21.jpg", text: "The fears we don't face become our limits. — Robin Sharma" },
  { path: "pic/22.jpg", text: "Action cures fear!" },
  { path: "pic/23.jpg", text: "A graph labeled Fear rises while thinking, then drops sharply while doing." },
  { path: "pic/24.jpg", text: "You can't use an old map to explore a new world. — Albert Einstein" },
  { path: "pic/25.jpg", text: "A calm sea never made a skilled sailor." },
  { path: "pic/26.jpg", text: "Maybe you don't realize how good you're doing because you keep raising the bar." },
  { path: "pic/27.jpg", text: "The art of not being ready and doing it anyways will take you so far." },
  { path: "pic/28.jpg", text: "وفي السماء رزقكم وما توعدون", lang: "ar" },
];

const slips = [...document.querySelectorAll(".slip")];
const prompt = document.querySelector("#prompt");
const reveals = document.querySelector(".reveals");
const notes = document.querySelector(".notes");
const available = [...paperImages];
let pickCount = 0;

for (const slip of slips) {
  const index = Math.floor(Math.random() * available.length);
  const [{ path, text, lang }] = available.splice(index, 1);
  const note = document.getElementById(slip.getAttribute("aria-controls"));
  const label = slip.querySelector(".slip-label");
  const color = label.textContent;
  const art = new Image();
  art.alt = text;
  art.src = path;
  if (lang) art.lang = lang;

  slip.addEventListener("click", () => {
    if (pickCount >= 2 || slip.getAttribute("aria-expanded") === "true") return;

    pickCount++;
    slip.setAttribute("aria-expanded", "true");
    slip.setAttribute("aria-disabled", "true");
    slip.setAttribute("aria-label", `${color} paper, opened`);
    label.textContent = "Opened";

    note.append(art);
    notes.prepend(note);
    note.hidden = false;
    reveals.hidden = false;
    if (pickCount === 1) prompt.textContent = "One more to go.";

    if (pickCount === 2) {
      prompt.hidden = true;
      const remaining = slips.find((button) => button.getAttribute("aria-expanded") === "false");
      remaining.disabled = true;

      if (matchMedia("(max-width: 759px)").matches) {
        const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
        reveals.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
      }
    }
  });
}
