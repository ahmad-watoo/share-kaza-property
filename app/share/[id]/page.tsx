import Redirector from "./Redirector";

export default function Page({ params }: { params: { id: string } }) {
  return <Redirector id={params.id} />;
}
