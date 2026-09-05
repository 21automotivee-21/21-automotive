import Link from "next/link";

export default function VehicleNotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <span className="eyebrow">Vehicle</span>
        <h1>We couldn&rsquo;t find that vehicle</h1>
        <p className="lead">
          It may have sold.{" "}
          <Link href="/inventory" style={{ color: "var(--color-accent)" }}>
            Browse the full inventory
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
