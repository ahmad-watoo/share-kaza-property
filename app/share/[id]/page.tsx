export default function SharePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Generating preview for property {params.id}...</h1>
    </div>
  );
}