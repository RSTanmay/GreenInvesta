document.getElementById("stockForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const peg = Number(document.getElementById("peg").value);
  const roce = Number(document.getElementById("roce").value);
  const growth = Number(document.getElementById("growth").value);
  const debt = Number(document.getElementById("debt").value);
  const fcf = document.getElementById("fcf").value;
  const promoter = Number(document.getElementById("promoter").value);

  let score = 0;
  let reasons = [];
const breakdown = calculateScore({
  peg,
  growth,
  roce,
  debt
});
let risk = "High";

if (debt < 0.5 && growth > 12 && fcf === "yes") {
  risk = "Low";
} else if (debt < 1 && growth > 8) {
  risk = "Medium";
}

localStorage.setItem("risk", risk);


localStorage.setItem("breakdown", JSON.stringify(breakdown));

  // PEG
  if (peg < 1) { score += 20; reasons.push("Attractive valuation (PEG < 1)"); }
  else if (peg < 1.5) { score += 15; reasons.push("Reasonable valuation"); }
  else { score += 5; reasons.push("Expensive valuation"); }

  // ROCE
  if (roce > 20) { score += 20; reasons.push("Excellent capital efficiency"); }
  else if (roce > 15) { score += 15; reasons.push("Good capital efficiency"); }
  else { score += 5; reasons.push("Weak capital efficiency"); }

  // Growth
  if (growth > 15) { score += 15; reasons.push("Strong revenue growth"); }
  else if (growth > 10) { score += 10; reasons.push("Moderate revenue growth"); }
  else { score += 5; reasons.push("Low revenue growth"); }

  // Debt
  if (debt < 0.5) { score += 15; reasons.push("Low debt level"); }
  else if (debt < 1) { score += 10; reasons.push("Manageable debt"); }
  else { reasons.push("High debt risk"); }

  // Free Cash Flow
  if (fcf === "yes") { score += 15; reasons.push("Positive free cash flow"); }
  else { reasons.push("Negative free cash flow"); }

  // Promoter Holding
  if (promoter > 50) { score += 15; reasons.push("Strong promoter confidence"); }
  else if (promoter > 35) { score += 10; reasons.push("Decent promoter holding"); }
  else { reasons.push("Low promoter holding"); }

  let verdict = "AVOID";
  if (score >= 80) verdict = "INVEST";
  else if (score >= 60) verdict = "HOLD";
  


  localStorage.setItem("score", score);
  localStorage.setItem("verdict", verdict);
  localStorage.setItem("reasons", JSON.stringify(reasons));

  window.location.href = "result.html";
});
function calculateScore(inputs) {
  let valuation = 0;
  let growthScore = 0;
  let profitability = 0;
  let health = 0;

  // Valuation (PEG)
  if (inputs.peg < 1) valuation = 25;
  else if (inputs.peg < 1.5) valuation = 15;
  else valuation = 5;

  // Growth
  if (inputs.growth > 15) growthScore = 25;
  else if (inputs.growth > 10) growthScore = 15;
  else growthScore = 5;

  // Profitability (ROCE)
  if (inputs.roce > 20) profitability = 25;
  else if (inputs.roce > 15) profitability = 15;
  else profitability = 5;

  // Financial Health (Debt)
  if (inputs.debt < 0.5) health = 25;
  else if (inputs.debt < 1) health = 15;
  else health = 5;

  return {
    valuation,
    growth: growthScore,
    profitability,
    health,
    total: valuation + growthScore + profitability + health
  };
}


