import { getDb, isAuthorizedAdmin } from "@/lib/db";
import { toNumberOrNull, validateFinanceApp, type FinanceBody } from "@/lib/validation";

export async function POST(request: Request) {
  let body: FinanceBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const errors = validateFinanceApp(body);
  if (errors.length) {
    return Response.json({ error: "Validation failed", details: errors }, { status: 422 });
  }

  const result = getDb()
    .prepare(
      `INSERT INTO finance_applications
        (vehicle_id, vehicle_name, name, email, phone, budget_range, est_car_price, est_down_payment, est_monthly_payment, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      body.vehicleId || null,
      body.vehicleName || null,
      body.name!.trim(),
      body.email!.trim(),
      body.phone!.trim(),
      body.budgetRange!.trim(),
      toNumberOrNull(body.estCarPrice),
      toNumberOrNull(body.estDownPayment),
      toNumberOrNull(body.estMonthlyPayment),
      "new",
    );

  return Response.json(
    {
      id: Number(result.lastInsertRowid),
      status: "new",
      message:
        "Application received. A financing specialist will reach out shortly to walk through your options — no credit check is run until you're ready.",
    },
    { status: 201 },
  );
}

export async function GET(request: Request) {
  if (!isAuthorizedAdmin(request)) {
    return Response.json({ error: "Unauthorized. Pass header x-admin-key." }, { status: 401 });
  }

  const rows = getDb()
    .prepare(`SELECT * FROM finance_applications ORDER BY created_at DESC`)
    .all();
  return Response.json({ count: rows.length, applications: rows });
}
