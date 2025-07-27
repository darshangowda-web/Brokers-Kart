// Application Data
const appData = {
  company: {
    name: "BrokersKart",
    tagline: "Your Trusted Real Estate Partner in Bangalore",
    services: ["Buy", "Sell", "Rent", "Micro Investment"],
    contact: {
      phone: "+91 80 4567 8900",
      email: "info@brokerskart.com",
      address: "123 Brigade Road, Bangalore - 560001"
    }
  },
  propertyTypes: ["Individual House", "Flat", "Villa", "Land"],
  locations: ["Whitefield", "Electronic City", "Sarjapur Road", "HSR Layout", "Koramangala", "Indiranagar", "JP Nagar", "BTM Layout"],
  featuredProperties: [
    {
      id: 1,
      title: "Luxury 3BHK Apartment in Whitefield",
      location: "Whitefield",
      price: "₹1.2 Crore",
      type: "Flat",
      area: "1650 sq ft",
      bedrooms: "3 BHK",
      description: "Modern apartment with premium amenities near IT parks"
    },
    {
      id: 2,
      title: "Independent Villa in Sarjapur Road",
      location: "Sarjapur Road",
      price: "₹2.8 Crore",
      type: "Villa",
      area: "3200 sq ft", 
      bedrooms: "4 BHK",
      description: "Spacious villa with garden and premium facilities"
    },
    {
      id: 3,
      title: "Ready to Move 2BHK in Electronic City",
      location: "Electronic City",
      price: "₹85 Lakh",
      type: "Flat",
      area: "1200 sq ft",
      bedrooms: "2 BHK",
      description: "Ready to move apartment perfect for IT professionals"
    },
    {
      id: 4,
      title: "Plot for Sale in HSR Layout",
      location: "HSR Layout",
      price: "₹65 Lakh",
      type: "Land",
      area: "1800 sq ft",
      bedrooms: "N/A",
      description: "DTCP approved plot with clear title in prime location"
    },
    {
      id: 5,
      title: "Luxury Penthouse in Koramangala",
      location: "Koramangala",
      price: "₹3.5 Crore",
      type: "Flat",
      area: "2800 sq ft",
      bedrooms: "4 BHK",
      description: "Premium penthouse with city views and modern amenities"
    },
    {
      id: 6,
      title: "Row House in Indiranagar",
      location: "Indiranagar",
      price: "₹1.8 Crore",
      type: "Villa",
      area: "2400 sq ft",
      bedrooms: "3 BHK",
      description: "Modern row house in gated community with all facilities"
    }
  ],
  microInvestmentOptions: [
    {
      name: "Bangalore Tech Parks REIT",
      minInvestment: "₹10 Lakh",
      expectedReturn: "8-12% annually",
      type: "Commercial Office Spaces",
      locations: ["Electronic City", "Whitefield", "Outer Ring Road"]
    },
    {
      name: "Premium Residential REIT",
      minInvestment: "₹15 Lakh", 
      expectedReturn: "6-10% annually",
      type: "Luxury Residential",
      locations: ["Koramangala", "Indiranagar", "HSR Layout"]
    }
  ],
  testimonials: [
    {
      name: "Rajesh Kumar",
      role: "Software Engineer", 
      text: "BrokersKart helped me find the perfect apartment in Electronic City. Professional and transparent service.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Investment Advisor",
      text: "I invested ₹20 lakhs through their micro investment program. Excellent returns and professional management.", 
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Business Owner",
      text: "Sold my villa in Sarjapur Road within 6 weeks at the best market price. Highly recommend BrokersKart.",
      rating: 5
    }
  ]
};

// Global Variables
let currentSection = 'home';
let selectedUserType = null;
let selectedAuthMethod = null;

// Service image configuration
const serviceConfig = {
  buy: {
    icon: '🏠',
    title: 'BUY',
    color: '#1FB8CD'
  },
  sell: {
    icon: '💰',
    title: 'SELL', 
    color: '#FFC185'
  },
  rent: {
    icon: '🔑',
    title: 'RENT',
    color: '#B4413C'
  },
  investment: {
    icon: '📈',
    title: 'INVEST',
    color: '#5D878F'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing BrokersKart application...');
  initializeNavigation();
  initializeModals();
  renderFeaturedProperties();
  renderInvestmentOpportunities();
  renderTestimonials();
  initializeForms();
  initializeTabs();
  initializeMobileMenu();
  initializeSearchAndFilters();
  handleServiceImages();
  
  // Ensure home is shown by default
  showSection('home');
});

// Handle Service Images with Enhanced Fallback
function handleServiceImages() {
  console.log('Setting up service images...');
  const serviceImages = document.querySelectorAll('.service-image');
  
  serviceImages.forEach((img, index) => {
    // Set up the error handler immediately
    img.onerror = function() {
      handleServiceImageError(this, Object.keys(serviceConfig)[index]);
    };
    
    // Also check if image is already broken
    if (img.complete && img.naturalHeight === 0) {
      handleServiceImageError(img, Object.keys(serviceConfig)[index]);
    }
  });
}

// Enhanced Service Image Error Handler
function handleServiceImageError(img, serviceType) {
  console.log('Image failed to load for service:', serviceType);
  
  if (!serviceConfig[serviceType]) {
    console.error('Unknown service type:', serviceType);
    return;
  }
  
  // Hide the broken image
  img.style.display = 'none';
  
  // Check if fallback already exists
  const container = img.parentNode;
  if (container.querySelector('.service-image-fallback')) {
    console.log('Fallback already exists for:', serviceType);
    return;
  }
  
  // Create enhanced fallback
  const fallback = document.createElement('div');
  fallback.className = 'service-image-fallback';
  fallback.style.background = `linear-gradient(135deg, ${serviceConfig[serviceType].color}, ${adjustBrightness(serviceConfig[serviceType].color, -20)})`;
  
  fallback.innerHTML = `
    <div class="fallback-content">
      <div class="fallback-icon">${serviceConfig[serviceType].icon}</div>
      <div class="fallback-text">${serviceConfig[serviceType].title}</div>
    </div>
  `;
  
  // Add hover effect
  fallback.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
  });
  
  fallback.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  container.appendChild(fallback);
  console.log('Fallback created for:', serviceType);
}

// Utility function to adjust color brightness
function adjustBrightness(hexColor, percent) {
  const num = parseInt(hexColor.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Make handleServiceImageError available globally for HTML onerror attribute
window.handleServiceImageError = handleServiceImageError;

// Modal Functions
function initializeModals() {
  console.log('Initializing modals...');
  
  const signupBtn = document.getElementById('signup-btn');
  const loginBtn = document.getElementById('login-btn');
  
  if (signupBtn) {
    console.log('Sign up button found, adding event listener');
    signupBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Sign up button clicked - opening modal');
      openModal('signup-modal-step1');
      return false;
    });
  } else {
    console.error('Sign up button not found');
  }
  
  if (loginBtn) {
    console.log('Login button found, adding event listener');
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Login button clicked');
      alert('Login functionality will be implemented soon. Please sign up to create an account.');
      return false;
    });
  } else {
    console.error('Login button not found');
  }
  
  // Initialize signup form
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }
  
  // Add click handlers for modal overlays
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    }
  });
  
  // Prevent event bubbling on modal content
  document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
}

function openModal(modalId) {
  console.log('Opening modal:', modalId);
  // Close all other modals first
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('hidden');
  });
  
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    console.log('Modal opened successfully');
  } else {
    console.error('Modal not found:', modalId);
  }
}

function closeModal(modalId) {
  console.log('Closing modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    console.log('Modal closed successfully');
  }
}

function selectUserType(userType) {
  console.log('User type selected:', userType);
  selectedUserType = userType;
  const step2Title = document.getElementById('step2-title');
  
  if (step2Title) {
    step2Title.textContent = userType === 'customer' ? 'Customer Sign Up' : 'Agent Sign Up';
  }
  
  closeModal('signup-modal-step1');
  openModal('signup-modal-step2');
}

function selectAuthMethod(method) {
  console.log('Auth method selected:', method);
  selectedAuthMethod = method;
  
  if (method === 'google') {
    alert('Google Sign Up integration will be available soon. Please use Manual Sign Up for now.');
    return;
  }
  
  if (method === 'manual') {
    const step3Title = document.getElementById('step3-title');
    const agentFields = document.getElementById('agent-fields');
    
    if (step3Title) {
      step3Title.textContent = selectedUserType === 'customer' ? 
        'Customer Registration' : 'Agent Registration';
    }
    
    if (agentFields) {
      if (selectedUserType === 'agent') {
        agentFields.classList.remove('hidden');
        // Make agent fields required
        const agentInputs = agentFields.querySelectorAll('input, select');
        agentInputs.forEach(input => {
          input.setAttribute('required', 'required');
        });
      } else {
        agentFields.classList.add('hidden');
        // Remove required from agent fields
        const agentInputs = agentFields.querySelectorAll('input, select');
        agentInputs.forEach(input => {
          input.removeAttribute('required');
        });
      }
    }
    
    closeModal('signup-modal-step2');
    openModal('signup-modal-step3');
  }
}

function goBackToStep1() {
  closeModal('signup-modal-step2');
  openModal('signup-modal-step1');
}

function goBackToStep2() {
  closeModal('signup-modal-step3');
  openModal('signup-modal-step2');
}

function handleSignupSubmit(e) {
  e.preventDefault();
  console.log('Signup form submitted');
  
  const formData = new FormData(e.target);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  // Validate password match
  if (data.password !== data.confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Validate mobile number (Indian format)
  const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  if (!mobileRegex.test(data.mobile.replace(/\s+/g, ''))) {
    alert('Please enter a valid Indian mobile number.');
    return;
  }
  
  // Validate terms acceptance
  if (!data.terms) {
    alert('Please accept the Terms & Conditions to continue.');
    return;
  }
  
  // Simulate successful registration
  console.log('Registration data:', { ...data, userType: selectedUserType });
  
  closeModal('signup-modal-step3');
  
  const successMessage = selectedUserType === 'customer' ? 
    'Welcome to BrokersKart! Your customer account has been created successfully. You can now explore properties and investment opportunities.' :
    'Welcome to BrokersKart! Your agent account has been created successfully. Our team will verify your credentials and activate your account within 24 hours.';
  
  alert(successMessage);
  
  // Reset form and variables
  e.target.reset();
  selectedUserType = null;
  selectedAuthMethod = null;
}

// Navigation Functions
function initializeNavigation() {
  console.log('Initializing navigation...');
  const navLinks = document.querySelectorAll('.nav__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const targetSection = this.getAttribute('href').substring(1);
      console.log('Navigation clicked:', targetSection);
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show the correct section
      showSection(targetSection);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      return false;
    });
  });
  
  // Handle logo click
  const logo = document.querySelector('.header__logo .logo-text');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Logo clicked');
      showSection('home');
      updateActiveNavLink('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    });
  }
  
  // Handle hero CTA buttons
  const exploreBtn = document.querySelector('.hero__cta .btn--primary');
  const investBtn = document.querySelector('.hero__cta .btn--outline');
  
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Explore button clicked');
      showSection('buy');
      updateActiveNavLink('buy');
      return false;
    });
  }
  
  if (investBtn) {
    investBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Invest button clicked');
      showSection('investment');
      updateActiveNavLink('investment');
      return false;
    });
  }
  
  // Handle search button in hero
  const heroSearchBtn = document.querySelector('.hero__search .btn--primary');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handlePropertySearch();
      return false;
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
  console.log('Showing section:', sectionId);
  
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
  
  appData.featuredProperties.slice(0, 6).forEach(property => {
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
        <span>🛏️ ${property.bedrooms}</span>
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
  
  appData.microInvestmentOptions.forEach(opportunity => {
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
        <span>Type:</span>
        <strong>${opportunity.type}</strong>
      </div>
      <div class="detail-item">
        <span>Locations:</span>
        <strong>${opportunity.locations.join(', ')}</strong>
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
      learnMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const services = ['buy', 'sell', 'rent', 'investment'];
        console.log('Learn more clicked for service:', services[index]);
        showSection(services[index]);
        updateActiveNavLink(services[index]);
        return false;
      });
    }
  });
  
  // View All Properties button
  const viewAllBtn = document.querySelector('.featured-properties .btn--lg');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      showSection('buy');
      updateActiveNavLink('buy');
      return false;
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
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
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
      
      return false;
    });
  });
}

// Mobile Menu Functions
function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
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
    buySearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleBuySearch();
      return false;
    });
  }
  
  // Rental search
  const rentalSearchBtn = document.querySelector('.rental-search .btn--primary');
  if (rentalSearchBtn) {
    rentalSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleRentalSearch();
      return false;
    });
  }
}

function handleBuySearch() {
  const filters = document.querySelectorAll('#buy .filters-row select');
  const selectedFilters = {};
  
  filters.forEach(select => {
    if (select.value) {
      selectedFilters[select.options[0].text] = select.value;
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
window.openModal = openModal;
window.closeModal = closeModal;
window.selectUserType = selectUserType;
window.selectAuthMethod = selectAuthMethod;
window.goBackToStep1 = goBackToStep1;
window.goBackToStep2 = goBackToStep2;

// Export functions for potential future use
window.BrokersKartApp = {
  showSection,
  handlePropertySearch,
  calculateReturns,
  renderFeaturedProperties,
  renderInvestmentOpportunities,
  renderTestimonials,
  updateActiveNavLink,
  openModal,
  closeModal,
  handleServiceImageError
};