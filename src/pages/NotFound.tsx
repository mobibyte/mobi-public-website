export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg">Page Not Found</p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go to Home
      </a>
    </div>
  );
}
