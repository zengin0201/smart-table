export function initFiltering(elements, indexes) {
    const sellerSelect = elements.seller; 
   
    if (sellerSelect && indexes.sellers) {
        sellerSelect.innerHTML = '<option value="">All Sellers</option>';
        Object.values(indexes.sellers).forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            sellerSelect.appendChild(option);
        });
    }

    return () => true;
}
