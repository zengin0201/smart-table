export function initFiltering(vipadashki, spiskiImen) {
    const sellerSelect = vipadashki.searchBySeller;
    if (sellerSelect && spiskiImen.sellers) {
        Object.values(spiskiImen.sellers).forEach(imya => {
            const option = document.createElement('option');
            option.value = imya;
            option.textContent = imya;
            sellerSelect.appendChild(option);
        });
    }

    
    return (danniePoslePoiska, pamyat, sobitie) => {
        return danniePoslePoiska.filter(stroka => {
            if (pamyat.seller && stroka.seller !== pamyat.seller) return false;
            if (pamyat.customer) {
                const cust = stroka.customer ? stroka.customer.toLowerCase() : '';
                if (!cust.includes(pamyat.customer.toLowerCase())) return false;
            }
            if (pamyat.date) {
                const dt = stroka.date || '';
                if (!dt.includes(pamyat.date)) return false;
            }
            const limitOt = Number(pamyat.totalFrom) || -Infinity;
            const limitDo = Number(pamyat.totalTo) || Infinity;
            
            if (stroka.total < limitOt || stroka.total > limitDo) return false;

            return true;
        });
    }
}
