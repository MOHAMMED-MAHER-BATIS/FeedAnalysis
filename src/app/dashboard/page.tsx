export default function DashboardPage() {
  return (
    <main
      style={{
        background: "var(--color-primary-100)",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: " 90vw",
          height: "500 px",
          backgroundColor: "var(--color-primary-700)",
          borderRadius: "10px",
          padding: "20px",
          color: "white",
        }}
      >
        <h1>Dashboard</h1>
        <p>User created successfully.</p>
      </div>
    </main>
  );
}
