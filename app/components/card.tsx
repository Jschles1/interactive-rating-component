export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-background w-full mx-6 p-6 md:w-[25.75rem]">
      {children}
    </div>
  );
}
