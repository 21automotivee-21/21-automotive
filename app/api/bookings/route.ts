import { DEPOSIT_AMOUNT, getDb, isAuthorizedAdmin } from "@/lib/db";
import { validateBooking, type BookingBody } from "@/lib/validation";

// ---------------------------------------------------------------------------
// Deposit handling — deliberately NOT a real payment integration.
//
// This project has no payment processor credentials (Stripe, etc). Rather than
// build a fake card-entry form — which would either collect real card numbers
// insecurely or silently pretend to charge people — a deposit request is
// stored as an intent. Staff follow up with a real, secure payment link
// (e.g. a genuine Stripe Checkout link) once a Stripe account is connected.
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const errors = validateBooking(body);
  if (errors.length) {
    return Response.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  const depositRequested = Boolean(body.depositRequested);

  const result = getDb()
    .prepare(
      `INSERT INTO bookings
        (vehicle_id, vehicle_name, name, email, phone, preferred_date, preferred_time, message, deposit_requested, deposit_amount, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      body.vehicleId || null,
      body.vehicleName || null,
      body.name!.trim(),
      body.email!.trim(),
      body.phone!.trim(),
      body.date!.trim(),
      body.time || null,
      body.message || null,
      depositRequested ? 1 : 0,
      depositRequested ? DEPOSIT_AMOUNT : 0,
      "pending_confirmation",
    );

  return Response.json(
    {
      id: Number(result.lastInsertRowid),
      status: "pending_confirmation",
      depositRequested,
      depositAmount: depositRequested ? DEPOSIT_AMOUNT : 0,
      message: depositRequested
        ? `Request received. A member of our team will send a secure payment link to collect the $${DEPOSIT_AMOUNT} refundable deposit and confirm your appointment.`
        : "Request received. A member of our team will confirm your appointment shortly.",
    },
    { status: 201 },
  );
}

export async function GET(request: Request) {
  if (!isAuthorizedAdmin(request)) {
    return Response.json({ error: "Unauthorized. Pass header x-admin-key." }, { status: 401 });
  }

  const rows = getDb().prepare(`SELECT * FROM bookings ORDER BY created_at DESC`).all();
  return Response.json({ count: rows.length, bookings: rows });
}
