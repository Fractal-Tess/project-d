import Form from './Form';

export default function Page() {
  return (
    <section className="container mx-auto flex flex-1 flex-col items-center justify-center rounded-md gap-y-4">
      <h1 className="text-4xl font-extrabold tracking-wider">Login</h1>
      <Form />
    </section>
  );
}