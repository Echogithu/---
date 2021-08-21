var invoice = [
  {
    customer: "BigGo",
    performances: [
      {
        playID: "hamlet",
        audience: 55
      },
      {
        playID: "as-like",
        audience: 35
      },
      {
        playID: "othello",
        audience: 40
      }
    ]
  }
];

var plays = {
  hamlet: {
    name: "hamlet",
    type: "tragedy"
  },
  "as-like": {
    name: "As You Like It",
    type: "comedy"
  },
  othello: {
    name: "othello",
    type: "tragedy"
  }
};

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credits for every ten comedy attendees
    // 每十名喜剧观众加一个额外学分
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    } seats\n)`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;

  return result;
}

function amountFor(aPerformance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
    case "tragedy":
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`Unknown type: ${playFor(aPerformance).type}`);
  }
  return result;
}

console.log(statement(invoice[0], plays));
