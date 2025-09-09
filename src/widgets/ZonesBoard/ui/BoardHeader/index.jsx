export function BoardHeader({ children }) {
  return (
    <div className="header">
      <h2 style={{ margin: 0 }}>Temperature Manager</h2>
      {children}
    </div>
  );
}
