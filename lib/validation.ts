const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isFilled(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export type BookingBody = {
  vehicleId?: string | null;
  vehicleName?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string | null;
  message?: string | null;
  depositRequested?: boolean;
};

export function validateBooking(body: BookingBody): string[] {
  const errors: string[] = [];
  if (!isFilled(body.name)) errors.push("name is required");
  if (!isFilled(body.email) || !EMAIL_RE.test(body.email)) errors.push("a valid email is required");
  if (!isFilled(body.phone)) errors.push("phone is required");
  if (!isFilled(body.date)) errors.push("preferred date is required");
  return errors;
}

export type FinanceBody = {
  vehicleId?: string | null;
  vehicleName?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  budgetRange?: string;
  estCarPrice?: unknown;
  estDownPayment?: unknown;
  estMonthlyPayment?: unknown;
};

export function validateFinanceApp(body: FinanceBody): string[] {
  const errors: string[] = [];
  if (!isFilled(body.name)) errors.push("name is required");
  if (!isFilled(body.email) || !EMAIL_RE.test(body.email)) errors.push("a valid email is required");
  if (!isFilled(body.phone)) errors.push("phone is required");
  if (!isFilled(body.budgetRange)) errors.push("budget is required");
  return errors;
}

export function toNumberOrNull(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}
