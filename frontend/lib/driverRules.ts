export type VerificationStatus = "pending" | "verified" | "rejected";

export type AssignableDriver = {
  verification_status: VerificationStatus;
  phone_verified?: boolean | null;
};

export function canAssignShipments(driver: AssignableDriver) {
  return driver.verification_status === "verified" && driver.phone_verified === true;
}

