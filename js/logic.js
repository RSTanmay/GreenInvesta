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
