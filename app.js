// Application Data
const appData = {
  company: {
    name: "BrokersKart",
    tagline: "Your Trusted Real Estate Partner in Bangalore",
    services: ["Buy", "Sell", "Rent", "Micro Investment"],
    contact: {
      phone: "+91 80 4567 8900",
      email: "info@brokerskart.com",
      address: "Brigade Road, Bangalore, Karnataka 560001"
    }
  },
  propertyTypes: ["Individual House", "Flat", "Villa", "Land"],
  locations: ["Whitefield", "Electronic City", "Sarjapur Road", "Hebbal", "Koramangala", "Indiranagar", "JP Nagar", "Bannerghatta Road"],
  featuredProperties: [
    {
      id: 1,
      title: "Luxury 3BHK Apartment",
      location: "Whitefield",
      price: "₹1.2 Cr",
      type: "Flat",
      area: "1650 sq ft",
      description: "Modern apartment with premium amenities"
    },
    {
      id: 2,
      title: "Independent Villa",
      location: "Sarjapur Road",
      price: "₹2.8 Cr",
      type: "Villa",
      area: "3200 sq ft",
      description: "Spacious villa with garden and parking"
    },
    {
      id: 3,
      title: "2BHK Ready to Move",
      location: "Electronic City",
      price: "₹85 Lakh",
      type: "Flat",
      area: "1200 sq ft",
      description: "Ready to move apartment near IT parks"
    },
    {
      id: 4,
      title: "Plot for Sale",
      location: "Devanahalli",
      price: "₹45 Lakh",
      type: "Land",
      area: "1800 sq ft",
      description: "DTCP approved plot with clear title"
    },
    {
      id: 5,
      title: "Luxury Penthouse",
      location: "Koramangala",
      price: "₹3.5 Cr",
      type: "Flat",
      area: "2800 sq ft",
      description: "Premium penthouse with city views"
    },
    {
      id: 6,
      title: "Row House",
      location: "Yelahanka",
      price: "₹1.8 Cr",
      type: "Villa",
      area: "2400 sq ft",
      description: "Modern row house in gated community"
    }
  ],
  microInvestment: {
    minimumInvestment: "₹10 Lakh",
    expectedReturns: "9-17%",
    features: ["Regulated by SEBI", "Professional Management", "Diversified Portfolio", "Low Entry Barrier"],
    opportunities: [
      {
        name: "Commercial Complex - Whitefield",
        minInvestment: "₹10 Lakh",
        expectedReturn: "12%",
        duration: "3-5 years"
      },
      {
        name: "IT Park - Electronic City",
        minInvestment: "₹15 Lakh",
        expectedReturn: "14%",
        duration: "5-7 years"
      },
      {
        name: "Residential Township - Sarjapur",
        minInvestment: "₹12 Lakh",
        expectedReturn: "11%",
        duration: "4-6 years"
      }
    ]
  },
  testimonials: [
    {
      name: "Rajesh Kumar",
      role: "Software Engineer",
      text: "BrokersKart helped me find my dream home in Whitefield. Their micro investment option allowed me to diversify my portfolio.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Business Owner",
      text: "Excellent service! They sold my property in Electronic City within 2 months at the best market price.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Investment Banker",
      text: "The REIT micro investment platform is fantastic. Great returns with professional management.",
      rating: 5
    }
  ]
};

// DOM Elements
let currentSection = 'home';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  renderFeaturedProperties();
  renderInvestmentOpportunities();
  renderTestimonials();
  initializeForms();
  initializeTabs();
  initializeMobileMenu();
  initializeSearchAndFilters();
  animateOnScroll();
});

// Navigation Functions
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('href').substring(1);
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show the correct section
      showSection(targetSection);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  
  // Handle hero CTA buttons
  const exploreBtn = document.querySelector('.hero__cta .btn--primary');
  const investBtn = document.querySelector('.hero__cta .btn--outline');
  
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('buy');
      updateActiveNavLink('buy');
    });
  }
  
  if (investBtn) {
    investBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('investment');
      updateActiveNavLink('investment');
    });
  }
  
  // Handle search button in hero
  const heroSearchBtn = document.querySelector('.hero__search .btn--primary');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePropertySearch();
    });
  }
}

function updateActiveNavLink(sectionId) {
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
}

function showSection(sectionId) {
  // Hide all page sections
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    section.classList.add('hidden');
  });
  
  // Show/hide home-specific sections
  const homeSpecificSections = ['.hero', '.services', '.featured-properties', '.why-choose', '.testimonials'];
  
  if (sectionId === 'home') {
    // Show home sections
    homeSpecificSections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = 'block';
      }
    });
  } else {
    // Hide home sections
    homeSpecificSections.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = 'none';
      }
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
  }
  
  currentSection = sectionId;
}

// Property Functions
function renderFeaturedProperties() {
  const container = document.getElementById('featured-properties-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  appData.featuredProperties.forEach(property => {
    const propertyCard = createPropertyCard(property);
    container.appendChild(propertyCard);
  });
  
  // Also render in buy section
  const buyContainer = document.getElementById('buy-properties-grid');
  if (buyContainer) {
    buyContainer.innerHTML = '';
    appData.featuredProperties.forEach(property => {
      const propertyCard = createPropertyCard(property);
      buyContainer.appendChild(propertyCard);
    });
  }
}

function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card';
  
  card.innerHTML = `
    <div class="property-card__image">🏠</div>
    <div class="property-card__content">
      <h3 class="property-card__title">${property.title}</h3>
      <p class="property-card__location">📍 ${property.location}</p>
      <div class="property-card__price">${property.price}</div>
      <div class="property-card__details">
        <span>🏢 ${property.type}</span>
        <span>📐 ${property.area}</span>
      </div>
      <p class="property-card__description">${property.description}</p>
    </div>
  `;
  
  return card;
}

function handlePropertySearch() {
  const propertyType = document.getElementById('property-type-search')?.value;
  const location = document.getElementById('location-search')?.value;
  
  // Navigate to buy section
  showSection('buy');
  updateActiveNavLink('buy');
  
  // Show search results message
  if (propertyType || location) {
    console.log('Searching for:', { propertyType, location });
    alert(`Searching for ${propertyType || 'all property types'} in ${location || 'all locations'}`);
  } else {
    alert('Showing all available properties');
  }
}

// Investment Functions
function renderInvestmentOpportunities() {
  const container = document.getElementById('investment-opportunities');
  if (!container) return;
  
  container.innerHTML = '';
  
  appData.microInvestment.opportunities.forEach(opportunity => {
    const opportunityCard = createOpportunityCard(opportunity);
    container.appendChild(opportunityCard);
  });
}

function createOpportunityCard(opportunity) {
  const card = document.createElement('div');
  card.className = 'opportunity-card';
  
  card.innerHTML = `
    <h4>${opportunity.name}</h4>
    <div class="opportunity-details">
      <div class="detail-item">
        <span>Minimum Investment:</span>
        <strong>${opportunity.minInvestment}</strong>
      </div>
      <div class="detail-item">
        <span>Expected Return:</span>
        <strong>${opportunity.expectedReturn}</strong>
      </div>
      <div class="detail-item">
        <span>Duration:</span>
        <strong>${opportunity.duration}</strong>
      </div>
    </div>
    <button class="btn btn--primary btn--full-width" onclick="handleInvestNow('${opportunity.name}')">Invest Now</button>
  `;
  
  return card;
}

function handleInvestNow(opportunityName) {
  alert(`Thank you for your interest in ${opportunityName}. Our investment advisor will contact you within 24 hours to complete the process.`);
}

function calculateReturns() {
  const amountInput = document.getElementById('investment-amount');
  const returnInput = document.getElementById('expected-return'); 
  const periodInput = document.getElementById('investment-period');
  
  if (!amountInput || !returnInput || !periodInput) {
    console.error('Calculator inputs not found');
    return;
  }
  
  const amount = parseFloat(amountInput.value);
  const returnRate = parseFloat(returnInput.value);
  const period = parseInt(periodInput.value);
  
  if (!amount || !returnRate || !period) {
    alert('Please fill in all fields with valid numbers');
    return;
  }
  
  if (amount < 1000000) {
    alert('Minimum investment amount is ₹10 Lakh (1,000,000)');
    return;
  }
  
  // Simple compound interest calculation
  const compoundInterest = amount * Math.pow((1 + returnRate / 100), period);
  const totalReturns = compoundInterest - amount;
  
  // Display results
  const totalInvestmentEl = document.getElementById('total-investment');
  const totalReturnsEl = document.getElementById('total-returns');
  const totalValueEl = document.getElementById('total-value');
  const resultEl = document.getElementById('calculator-result');
  
  if (totalInvestmentEl) totalInvestmentEl.textContent = formatCurrency(amount);
  if (totalReturnsEl) totalReturnsEl.textContent = formatCurrency(totalReturns);
  if (totalValueEl) totalValueEl.textContent = formatCurrency(compoundInterest);
  if (resultEl) resultEl.classList.remove('hidden');
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Testimonials Functions
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  appData.testimonials.forEach(testimonial => {
    const testimonialCard = createTestimonialCard(testimonial);
    container.appendChild(testimonialCard);
  });
}

function createTestimonialCard(testimonial) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  
  const stars = '★'.repeat(testimonial.rating);
  
  card.innerHTML = `
    <p class="testimonial-text">"${testimonial.text}"</p>
    <div class="testimonial-author">${testimonial.name}</div>
    <div class="testimonial-role">${testimonial.role}</div>
    <div class="testimonial-rating">${stars}</div>
  `;
  
  return card;
}

// Form Functions
function initializeForms() {
  // Contact form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  // Sell form
  const sellForm = document.querySelector('.sell-form');
  if (sellForm) {
    sellForm.addEventListener('submit', handleSellForm);
  }
  
  // Service card "Learn More" buttons  
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    const learnMoreBtn = card.querySelector('.btn');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const services = ['buy', 'sell', 'rent', 'investment'];
        showSection(services[index]);
        updateActiveNavLink(services[index]);
      });
    }
  });
  
  // View All Properties button
  const viewAllBtn = document.querySelector('.featured-properties .btn--lg');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('buy');
      updateActiveNavLink('buy');
    });
  }
}

function handleContactForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Simulate form submission
  console.log('Contact form submitted:', data);
  alert('Thank you for your inquiry! We will contact you within 24 hours.');
  e.target.reset();
}

function handleSellForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Simulate form submission
  console.log('Sell form submitted:', data);
  alert('Thank you! Our expert will contact you within 24 hours with a free property valuation.');
  e.target.reset();
}

// Tab Functions
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(`${targetTab}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// Mobile Menu Functions
function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
}

// Search and Filter Functions
function initializeSearchAndFilters() {
  // Property search in buy section
  const buySearchBtn = document.querySelector('#buy .filters-row .btn--primary');
  if (buySearchBtn) {
    buySearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleBuySearch();
    });
  }
  
  // Rental search
  const rentalSearchBtn = document.querySelector('.rental-search .btn--primary');
  if (rentalSearchBtn) {
    rentalSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleRentalSearch();
    });
  }
}

function handleBuySearch() {
  const filters = document.querySelectorAll('#buy .filters-row select');
  const selectedFilters = {};
  
  filters.forEach(select => {
    if (select.value) {
      selectedFilters[select.previousElementSibling || 'filter'] = select.value;
    }
  });
  
  console.log('Buy search with filters:', selectedFilters);
  alert(`Searching properties with your selected criteria. Found ${appData.featuredProperties.length} matching properties.`);
}

function handleRentalSearch() {
  const filters = document.querySelectorAll('.rental-search select');
  const selectedFilters = {};
  
  filters.forEach(select => {
    if (select.value) {
      selectedFilters[select.options[0].text] = select.value;
    }
  });
  
  console.log('Rental search with filters:', selectedFilters);
  alert('Searching rental properties with your criteria. Our team will show you the best matches.');
}

// Animation Functions
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .property-card, .benefit-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Utility Functions
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Global functions for HTML onclick handlers
window.calculateReturns = calculateReturns;
window.handleInvestNow = handleInvestNow;

// Export functions for potential future use
window.BrokersKartApp = {
  showSection,
  handlePropertySearch,
  calculateReturns,
  renderFeaturedProperties,
  renderInvestmentOpportunities,
  renderTestimonials,
  updateActiveNavLink
};