import Form from './Form';

export default function Page() {
  return (
    <section className="container mx-auto flex flex-1 flex-col items-center justify-center gap-y-4 rounded-md">
      <h1 className="text-4xl font-extrabold tracking-wider">Register</h1>
      <Form />
    </section>
  );
}
