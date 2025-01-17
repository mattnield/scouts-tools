/* eslint-disable @typescript-eslint/no-explicit-any */
import HeaderDropdown from '@/components/HeaderDropdown';

export default async function HomePage() {

  return (
    <div>
      <header style={{ padding: '16px', background: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
        <HeaderDropdown />
      </header>
      <main style={{ padding: '16px' }}>
        <h1>Scouts Tools</h1>
      </main>
    </div>
  );
}