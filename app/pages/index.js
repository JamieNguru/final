import Layout from '../components/layouts/Layout';
import Hero from '../components/sections/Hero';
import Benefits from '../components/sections/Benefits';
import Empower from '../components/sections/Empower';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <Empower />
    </Layout>
  );
}