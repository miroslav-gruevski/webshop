/**
 * Content Service
 * 
 * Handles all CMS/content-related API operations.
 * Currently uses hardcoded data - will connect to CMS or content API.
 * 
 * @module lib/api/services/content
 */

import { apiClient, type ApiResponse } from '../client';

// =============================================================================
// TYPES
// =============================================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface FAQCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface JobListing {
  id: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  department: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  closingDate?: string;
  active: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    salesEmail: string;
    supportEmail: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
}

// =============================================================================
// MOCK DATA
// TODO: [BACKEND] Remove when CMS is connected
// =============================================================================

/**
 * Mock team members
 * TODO: [BACKEND] Team data will be fetched from CMS
 */
const MOCK_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Matt Evans',
    role: 'Managing Director',
    bio: 'Leading ECS with a passion for providing excellent security solutions and service.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Evans-1024x683.jpg',
    order: 1,
  },
  {
    id: '2',
    name: 'Dan Cope',
    role: 'Director',
    bio: 'Driving innovation and quality across all ECS operations and services.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Dan-Cope--1024x683.jpg',
    order: 2,
  },
  {
    id: '3',
    name: 'Karen Evans',
    role: 'HR Manager',
    bio: 'Building and nurturing our talented team of security professionals.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Karen-Evans-1024x683.jpg',
    order: 3,
  },
  {
    id: '4',
    name: 'Darren Ross',
    role: 'Project Manager',
    bio: 'Ensuring smooth project delivery from consultation to completion.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Darren-Ross-1024x683.jpg',
    order: 4,
  },
  {
    id: '5',
    name: 'Barry Whittick',
    role: 'Installation Manager',
    bio: 'Overseeing our expert installation team with precision and care.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Barry-Whittick-1024x683.jpg',
    order: 5,
  },
  {
    id: '6',
    name: 'Matt Barlow',
    role: 'Service Manager',
    bio: 'Managing 24/7 maintenance and aftercare support for all clients.',
    image: 'https://ecssystems.co.uk/wp-content/uploads/2023/03/ECS-Team-Matt-Barlow-1024x683.jpg',
    order: 6,
  },
];

/**
 * Mock testimonials
 * TODO: [BACKEND] Testimonials will be fetched from CMS or reviews API
 */
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Facilities Manager',
    company: 'Meridian Business Park',
    content: 'ECS Systems transformed our access control across 12 buildings. The installation was seamless, and their ongoing support has been exceptional.',
    rating: 5,
    featured: true,
  },
  {
    id: '2',
    name: 'James Harrison',
    role: 'Operations Director',
    company: 'Crown Hotels Group',
    content: 'The SALTO system has revolutionised how we manage guest access. Mobile keys have been a hit with our guests.',
    rating: 5,
    featured: true,
  },
  {
    id: '3',
    name: 'Dr. Amanda Foster',
    role: 'Principal',
    company: 'Westbrook Academy',
    content: 'Safety is our top priority. ECS provided a comprehensive solution that gives us complete control over who enters our premises.',
    rating: 5,
    featured: true,
  },
];

/**
 * Mock FAQs
 * TODO: [BACKEND] FAQs will be fetched from CMS
 */
const MOCK_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What types of electronic locks do you offer?',
    answer: 'We offer a comprehensive range of SALTO electronic locks including the XS4 series for doors, Neo cylinders for retrofitting, locker locks, padlocks, and wall readers.',
    category: 'products',
    order: 1,
  },
  {
    id: '2',
    question: 'Do you provide installation services?',
    answer: 'Yes, we offer professional installation services carried out by our team of certified engineers. We handle everything from single door installations to large multi-site deployments.',
    category: 'installation',
    order: 1,
  },
  {
    id: '3',
    question: 'What support do you offer after installation?',
    answer: 'We provide comprehensive aftercare including 24/7 emergency response, scheduled maintenance, system health checks, and remote support.',
    category: 'support',
    order: 1,
  },
];

/**
 * Mock job listings
 * TODO: [BACKEND] Jobs will be fetched from CMS or job board API
 */
const MOCK_JOBS: JobListing[] = [
  {
    id: '1',
    title: 'Field Service Engineer',
    location: 'London & South East',
    type: 'full-time',
    department: 'Service',
    description: 'Install, maintain, and repair electronic access control systems for our diverse client base.',
    requirements: ['Experience with access control systems', 'Clean driving licence', 'Customer service skills'],
    benefits: ['Company vehicle', 'Training provided', 'Pension scheme'],
    active: true,
  },
  {
    id: '2',
    title: 'Technical Support Specialist',
    location: 'Sidcup, Kent',
    type: 'full-time',
    department: 'Support',
    description: 'Provide technical support to clients via phone and remote access, troubleshooting system issues.',
    requirements: ['Technical aptitude', 'Excellent communication', 'Problem-solving skills'],
    benefits: ['Hybrid working', 'Training provided', 'Career progression'],
    active: true,
  },
];

// =============================================================================
// SERVICE IMPLEMENTATION
// =============================================================================

/**
 * Content Service
 * 
 * TODO: [BACKEND] Replace mock implementations with CMS API calls
 * TODO: [BACKEND] Consider using a headless CMS (Strapi, Contentful, Sanity)
 * TODO: [BACKEND] Endpoint: GET /api/content/team
 * TODO: [BACKEND] Endpoint: GET /api/content/testimonials
 * TODO: [BACKEND] Endpoint: GET /api/content/faqs
 * TODO: [BACKEND] Endpoint: GET /api/content/jobs
 * TODO: [BACKEND] Endpoint: GET /api/content/company-info
 */
export const contentService = {
  /**
   * Get team members
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<TeamMember[]>('/content/team')
   */
  async getTeam(): Promise<ApiResponse<TeamMember[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with CMS API call
    // =========================================================================
    await simulateNetworkDelay();
    
    return {
      data: MOCK_TEAM.sort((a, b) => a.order - b.order),
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get testimonials
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<Testimonial[]>('/content/testimonials')
   */
  async getTestimonials(featured?: boolean): Promise<ApiResponse<Testimonial[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with CMS API call
    // =========================================================================
    await simulateNetworkDelay();
    
    let testimonials = [...MOCK_TESTIMONIALS];
    
    if (featured !== undefined) {
      testimonials = testimonials.filter(t => t.featured === featured);
    }
    
    return {
      data: testimonials,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get FAQs
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<FAQ[]>('/content/faqs')
   */
  async getFAQs(category?: string): Promise<ApiResponse<FAQ[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with CMS API call
    // =========================================================================
    await simulateNetworkDelay();
    
    let faqs = [...MOCK_FAQS];
    
    if (category) {
      faqs = faqs.filter(f => f.category === category);
    }
    
    return {
      data: faqs.sort((a, b) => a.order - b.order),
      success: true,
    };
    // =========================================================================
  },

  /**
   * Get job listings
   * 
   * TODO: [BACKEND] Replace with: apiClient.get<JobListing[]>('/content/jobs')
   */
  async getJobs(active?: boolean): Promise<ApiResponse<JobListing[]>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with CMS API call
    // =========================================================================
    await simulateNetworkDelay();
    
    let jobs = [...MOCK_JOBS];
    
    if (active !== undefined) {
      jobs = jobs.filter(j => j.active === active);
    }
    
    return {
      data: jobs,
      success: true,
    };
    // =========================================================================
  },

  /**
   * Submit contact form
   * 
   * TODO: [BACKEND] Replace with: apiClient.post('/contact', data)
   * TODO: [BACKEND] Integrate with email service (SendGrid, AWS SES, etc.)
   */
  async submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse<void>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(1000);
    
    // TODO: [BACKEND] Form data will be sent to API
    // console.log('Contact form submitted:', data);
    
    return {
      data: undefined,
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
    };
    // =========================================================================
  },

  /**
   * Submit job application
   * 
   * TODO: [BACKEND] Replace with: apiClient.post('/jobs/:id/apply', data)
   * TODO: [BACKEND] Handle file upload for CV
   */
  async submitJobApplication(jobId: string, data: {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
    cvUrl?: string;
  }): Promise<ApiResponse<void>> {
    // TODO: [BACKEND] Remove mock implementation below
    // =========================================================================
    // MOCK IMPLEMENTATION - Replace with API call
    // =========================================================================
    await simulateNetworkDelay(1000);
    
    // TODO: [BACKEND] Application data will be sent to API
    // console.log('Job application submitted:', { jobId, ...data });
    
    return {
      data: undefined,
      success: true,
      message: 'Thank you for your application. We will review it and get back to you.',
    };
    // =========================================================================
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function simulateNetworkDelay(ms: number = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
