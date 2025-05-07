/**
 * Handles dropdown menu interactions for both desktop (hover) and mobile (click).
 * Also includes logic for filtering and displaying suppliers on browse-suppliers.html,
 * with improved keyword search functionality.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Dropdown Handler ---
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return; // Skip if no dropdown menu found
        const button = dropdown.querySelector('button');

        // Add click listener for mobile toggle
        if (button) {
            button.addEventListener('click', (event) => {
                // Only activate click toggle on smaller screens (mobile)
                if (window.innerWidth < 768) { // Tailwind's 'md' breakpoint
                    event.stopPropagation(); // Prevent click from closing menu immediately
                    const isHidden = menu.style.display === 'none' || menu.style.display === '';
                    // Close other open dropdowns first
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        if (m !== menu) m.style.display = 'none';
                    });
                    // Toggle the current menu
                    menu.style.display = isHidden ? 'block' : 'none';
                }
            });
        }
    });

    // Add global click listener to close dropdowns when clicking outside (mobile)
    document.addEventListener('click', (event) => {
        if (window.innerWidth < 768) {
            let clickedInsideDropdown = false;
            dropdowns.forEach(dropdown => {
                if (dropdown.contains(event.target)) clickedInsideDropdown = true;
            });
            // If the click was outside any dropdown, close all menus
            if (!clickedInsideDropdown) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
            }
        }
    });

    // Reset dropdown display on resize to desktop view so CSS hover takes over
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
             document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = '');
        }
    });

    // --- Supplier Filtering Logic (for browse-suppliers.html) ---

    const supplierGrid = document.getElementById('supplier-grid');
    if (supplierGrid) {
        const allSuppliers = [
            // Photo & Video
            { id: 1, name: "Juan Dela Cruz Photo", category: "photo-video", location: "Quezon City", price: 85000, rating: 4.9, reviews: 120, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Juan+Photo", verified: true, idVerified: false },
            { id: 2, name: "Candid Moments Studio", category: "photo-video", location: "Makati", price: 70000, rating: 4.7, reviews: 85, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Candid+Moments", verified: false, idVerified: true },
            { id: 3, name: "Cinematic Dreams Video", category: "photo-video", location: "Pasig", price: 95000, rating: 4.8, reviews: 110, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Cinematic+Video", verified: true, idVerified: false },
            { id: 4, name: "Timeless Snaps PH", category: "photo-video", location: "Alabang", price: 72000, rating: 4.6, reviews: 70, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Timeless+Snaps", verified: true, idVerified: false },
            { id: 5, name: "Reel Moments Films", category: "photo-video", location: "Quezon City", price: 78000, rating: 4.9, reviews: 99, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Reel+Moments", verified: false, idVerified: true },
            { id: 6, name: "Metro Photo Hub", category: "photo-video", location: "BGC, Taguig", price: 90000, rating: 4.7, reviews: 150, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Metro+Hub", verified: true, idVerified: false },
            { id: 7, name: "Light & Lens Creatives", category: "photo-video", location: "Mandaluyong", price: 75000, rating: 4.8, reviews: 92, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Light+Lens", verified: true, idVerified: false },
            { id: 8, name: "Storyteller Films PH", category: "photo-video", location: "Manila", price: 82000, rating: 4.9, reviews: 105, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Storyteller", verified: false, idVerified: true },
            { id: 9, name: "Pixel Perfect Images", category: "photo-video", location: "Makati", price: 79000, rating: 4.7, reviews: 77, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Pixel+Perfect", verified: true, idVerified: false },
            { id: 10, name: "Forever Yours Photography", category: "photo-video", location: "Paranaque", price: 83000, rating: 4.9, reviews: 135, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Forever+Yours", verified: true, idVerified: false },
            { id: 11, name: "Motion Arts Video", category: "photo-video", location: "Quezon City", price: 88000, rating: 4.8, reviews: 101, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Motion+Arts", verified: true, idVerified: false },
            { id: 12, name: "Moments by Maria", category: "photo-video", location: "Pasay", price: 62000, rating: 4.9, reviews: 65, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Maria+Moments", verified: false, idVerified: true },
            // Catering
            { id: 13, name: "Manila Catering Co.", category: "catering", location: "Manila", price: 120000, rating: 4.5, reviews: 95, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Manila+Catering", verified: true, idVerified: true },
            { id: 14, name: "QC Banquet Services", category: "catering", location: "Quezon City", price: 95000, rating: 4.6, reviews: 115, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=QC+Banquet", verified: true, idVerified: false },
            { id: 21, name: "Tagaytay Catering Pros", category: "catering", location: "Tagaytay", price: 150000, rating: 4.7, reviews: 88, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Tagaytay+Cater", verified: true, idVerified: false },
            // Venues
            { id: 15, name: "The Garden Oasis", category: "venue", location: "Tagaytay", price: 250000, rating: 4.9, reviews: 210, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Garden+Oasis", verified: true, idVerified: true },
            { id: 16, name: "Seaside Pavilion", category: "venue", location: "Batangas", price: 300000, rating: 4.8, reviews: 180, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Seaside+Pav", verified: true, idVerified: false },
            { id: 22, name: "Elegant Events Venue", category: "venue", location: "Makati", price: 400000, rating: 4.9, reviews: 150, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Elegant+Venue", verified: true, idVerified: true },
            // Planners
            { id: 17, name: "Perfect Day Planners", category: "planners", location: "Makati", price: 55000, rating: 5.0, reviews: 75, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Perfect+Day", verified: true, idVerified: true },
            { id: 23, name: "Dream Day Coordination", category: "planners", location: "Quezon City", price: 48000, rating: 4.8, reviews: 65, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Dream+Day", verified: false, idVerified: true },
            // Decor
            { id: 18, name: "Bloom & Grow Florist", category: "decor", location: "Quezon City", price: 30000, rating: 4.7, reviews: 55, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Bloom+Grow", verified: false, idVerified: true },
            { id: 24, name: "Rustic Charm Decor", category: "decor", location: "Tagaytay", price: 40000, rating: 4.9, reviews: 72, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Rustic+Decor", verified: true, idVerified: false },
            // Formal Wear
            { id: 19, name: "Bridal Boutique Manila", category: "formal-wear", location: "Manila", price: 45000, rating: 4.6, reviews: 40, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Bridal+Boutique", verified: true, idVerified: false },
            // Music
            { id: 20, name: "Harmony Strings Quartet", category: "music", location: "Metro Manila", price: 25000, rating: 4.9, reviews: 60, imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=Harmony+Strings", verified: true, idVerified: true },
        ];

        const keywordInput = document.getElementById('filter-keyword');
        const categorySelect = document.getElementById('filter-category');
        const locationInput = document.getElementById('filter-location');
        const priceSelect = document.getElementById('filter-price');
        const sortBySelect = document.getElementById('sort-by');
        const applyFiltersBtn = document.getElementById('apply-filters-btn');
        const resultsInfo = document.getElementById('results-info');
        const noResultsMessage = document.getElementById('no-results-message');

        function filterAndRenderSuppliers() {
            const keyword = keywordInput.value.toLowerCase().trim();
            const category = categorySelect.value;
            const locationFilter = locationInput.value.toLowerCase().trim();
            const priceRange = priceSelect.value;
            const sortBy = sortBySelect.value;

            let searchTerms = [];
            if (keyword) {
                searchTerms = keyword.split(/\s+/).filter(term => term.length > 0);
            }

            let filteredSuppliers = allSuppliers.filter(supplier => {
                let relevanceScore = 0;
                let keywordMatch = true;

                if (searchTerms.length > 0) {
                    const supplierNameLower = supplier.name.toLowerCase();
                    keywordMatch = searchTerms.some(term => supplierNameLower.includes(term));
                    relevanceScore = searchTerms.reduce((score, term) => {
                        return score + (supplierNameLower.includes(term) ? 1 : 0);
                    }, 0);
                }
                supplier.relevanceScore = relevanceScore;

                const categoryMatch = !category || supplier.category === category;
                const locationMatch = !locationFilter || supplier.location.toLowerCase().includes(locationFilter);

                let priceMatch = true;
                if (priceRange) {
                    switch (priceRange) {
                        case '<50k': priceMatch = supplier.price < 50000; break;
                        case '50k-100k': priceMatch = supplier.price >= 50000 && supplier.price <= 100000; break;
                        case '100k-200k': priceMatch = supplier.price > 100000 && supplier.price <= 200000; break;
                        case '>200k': priceMatch = supplier.price > 200000; break;
                    }
                }
                return keywordMatch && categoryMatch && locationMatch && priceMatch;
            });

            filteredSuppliers.sort((a, b) => {
                switch (sortBy) {
                    case 'relevance':
                        if (b.relevanceScore !== a.relevanceScore) {
                            return b.relevanceScore - a.relevanceScore;
                        }
                        return b.rating - a.rating;
                    case 'rating': return b.rating - a.rating;
                    case 'price_asc': return a.price - b.price;
                    case 'price_desc': return b.price - a.price;
                    case 'name_asc': return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
                    default: return 0;
                }
            });

            renderSupplierGrid(filteredSuppliers);
            updateResultsInfo(filteredSuppliers.length, allSuppliers.length);
        }

        function renderSupplierGrid(suppliers) {
            supplierGrid.innerHTML = '';
            if (suppliers.length === 0) {
                noResultsMessage.classList.remove('hidden');
            } else {
                noResultsMessage.classList.add('hidden');
                suppliers.forEach(supplier => {
                    const cardHTML = `
                        <div class="bg-white rounded-xl shadow-lg overflow-hidden group border border-transparent hover:border-teal-300 flex flex-col transition duration-200 ease-in-out">
                            <div class="relative">
                                <img src="${supplier.imageUrl}" alt="${supplier.name}" class="w-full h-44 object-cover group-hover:scale-105 transition duration-300" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/64748b?text=Image+Error';">
                                ${supplier.verified ? '<span class="absolute top-2 left-2 inline-block bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">✨ Verified</span>' : ''}
                                ${supplier.idVerified && !supplier.verified ? '<span class="absolute top-2 left-2 inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full shadow">👤 ID Verified</span>' : ''}
                                <button class="absolute top-2 right-2 p-1.5 bg-white/70 rounded-full text-gray-600 hover:text-teal-500 hover:bg-white backdrop-blur-sm transition duration-150" aria-label="Add to Wishlist">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                                </button>
                            </div>
                            <div class="p-4 flex flex-col flex-grow">
                                <h3 class="font-semibold text-lg text-gray-900 mb-1 truncate group-hover:text-teal-600">${supplier.name}</h3>
                                <p class="text-sm text-gray-500 mb-2 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span class="truncate">${supplier.location}</span>
                                </p>
                                <div class="flex items-center mb-3">
                                    <span class="text-yellow-400">⭐</span>
                                    <span class="ml-1 text-sm font-semibold text-gray-800">${supplier.rating.toFixed(1)}</span>
                                    <span class="ml-1.5 text-sm text-gray-500">(${supplier.reviews} Reviews)</span>
                                </div>
                                <p class="text-base font-semibold text-gray-800 mb-4 flex-grow">Est. Package: ₱${supplier.price.toLocaleString()}+</p>
                                <a href="#" class="block w-full text-center mt-auto py-2.5 px-4 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition duration-200">View Details</a>
                            </div>
                        </div>
                    `;
                    supplierGrid.innerHTML += cardHTML;
                });
            }
        }

        function updateResultsInfo(filteredCount, totalCount) {
            resultsInfo.innerHTML = `Showing <span class="font-semibold">${filteredCount}</span> of <span class="font-semibold">${totalCount}</span> suppliers`;
        }

        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', filterAndRenderSuppliers);
        }
        if (sortBySelect) {
            sortBySelect.addEventListener('change', filterAndRenderSuppliers);
        }
        if (keywordInput) {
             keywordInput.addEventListener('input', filterAndRenderSuppliers); // Or use debounce for better performance
        }
        if (categorySelect) {
             categorySelect.addEventListener('change', filterAndRenderSuppliers);
        }
        if (locationInput) {
             locationInput.addEventListener('input', filterAndRenderSuppliers); // Or use debounce
        }
        if (priceSelect) {
             priceSelect.addEventListener('change', filterAndRenderSuppliers);
        }

        filterAndRenderSuppliers(); // Initial render
    }

}); // End DOMContentLoaded
