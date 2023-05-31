export const fixCallsign = (callsign: string): string => {
  // Find the first set of numbers in the callsign
  const regex = /\d+/;
  const match = callsign.match(regex);

  // Check if any number is found
  if (match) {
    // Get the first number found
    const number = match[0];

    // Add a "+" sign if not present
    const fixedCallsign = `+${number}`;

    return fixedCallsign;
  }

  return "";
};

export const extractPhoneNumber = (phoneNumber: string): string => {
  const numericPart = phoneNumber.replace(/\D/g, "");
  return numericPart;
};
