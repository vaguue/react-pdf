import dynamic from 'next/dynamic';

const PDF = dynamic(() => import('@/components/PDF'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PDF />
    </main>
  );
}
