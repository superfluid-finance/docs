import BN from "bn.js";

export const formatRate = (rate, period) => {
  let v;
  const rateInBn = new BN(rate);
  switch (period) {
    case "minute":
      v = rateInBn.mul(new BN(60));
      break;
    case "hour":
      v = rateInBn.mul(new BN(60)).mul(new BN(60));
      break;
    case "day":
      v = rateInBn.mul(new BN(60)).mul(new BN(60)).mul(new BN(24));
      break;
    case "week":
      v = rateInBn
        .mul(new BN(60))
        .mul(new BN(60))
        .mul(new BN(24))
        .mul(new BN(7));
      break;
    case "month":
      v = rateInBn
        .mul(new BN(60))
        .mul(new BN(60))
        .mul(24)
        .mul(new BN(365).div(new BN(12)));
      break;
    default:
      v = rate;
  }
  return v;
};

export const formatRateToSeconds = (rate, period) => {
  let v;

  const rateInBn = new BN(rate);
  switch (period) {
    case "minute":
      v = rateInBn.div(60);
      break;
    case "hour":
      v = rateInBn.div(60).div(60);
      break;
    case "day":
      v = rateInBn.div(60).div(60).div(24);
      break;
    case "week":
      v = rateInBn.div(60).div(60).div(24).div(7);
      break;
    case "month":
      v = rateInBn
        .div(60)
        .div(60)
        .div(24)
        .div(new BN(365).div(new BN(12)));
      break;
    default:
      v = rate;
  }
  return v;
};
