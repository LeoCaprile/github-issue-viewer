export default function Spin() {
  return (
    <div className="flex place-content-center bg-white">
      <span className="absolute h-6 w-6 block rounded-full border-4 border-t-transparent animate-spin border-white" />
    </div>
  );
}
