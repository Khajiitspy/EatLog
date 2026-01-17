export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200 p-8">
      {children}
    </div>
  );
}
