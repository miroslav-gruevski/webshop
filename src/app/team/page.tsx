import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export const metadata = {
  title: 'Our Team',
  description: 'Meet the dedicated team behind ECS Systems. Experts in fire safety and electronic access control.',
};

const team = [
  {
    name: 'Matt Evans',
    role: 'Managing Director',
    bio: 'Leading ECS with a passion for providing excellent security solutions and service.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Evans-1024x683.jpg',
  },
  {
    name: 'Dan Cope',
    role: 'Director',
    bio: 'Driving innovation and quality across all ECS operations and services.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Dan-Cope--1024x683.jpg',
  },
  {
    name: 'Karen Evans',
    role: 'HR Manager',
    bio: 'Building and nurturing our talented team of security professionals.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Karen-Evans-1024x683.jpg',
  },
  {
    name: 'Darren Ross',
    role: 'Project Manager',
    bio: 'Ensuring smooth project delivery from consultation to completion.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Darren-Ross-1024x683.jpg',
  },
  {
    name: 'Barry Whittick',
    role: 'Installation Manager',
    bio: 'Overseeing our expert installation team with precision and care.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Barry-Whittick-1024x683.jpg',
  },
  {
    name: 'Matt Barlow',
    role: 'Service Manager',
    bio: 'Managing 24/7 maintenance and aftercare support for all clients.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Barlow-1024x683.jpg',
  },
];

const values = [
  {
    title: 'Expertise',
    description: 'Our team holds industry certifications and undergoes continuous training to stay at the forefront of access control technology.',
  },
  {
    title: 'Dedication',
    description: 'We are committed to delivering exceptional results on every project, no matter the size or complexity.',
  },
  {
    title: 'Integrity',
    description: 'We build lasting relationships through honest communication and transparent business practices.',
  },
];

export default function TeamPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-primary text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            Our Team
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
            Meet the dedicated professionals who make ECS Systems the trusted name 
            in fire safety and electronic access control.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover scale-[1.8] object-top translate-y-[15%]"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
                <p className="text-foreground-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-12 text-center">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-foreground-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-foreground-muted mb-8">
            We are always looking for talented individuals who share our passion 
            for security and customer service.
          </p>
          <Link href="/careers">
            <Button size="lg">View Open Positions</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
