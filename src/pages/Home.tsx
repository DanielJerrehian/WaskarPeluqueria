import Hero from '../components/Hero'
import Services from '../components/Services'
import Barbers from '../components/Barbers'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import EmailSignup from '../components/EmailSignup'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Barbers />
      <Gallery />
      <Location />
      <EmailSignup />
    </>
  )
}
