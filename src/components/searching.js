export function initSearching() {
    return (vseDannie, pamyat, sobitie) => {
        const iskomiyTekst = pamyat.search ? pamyat.search.toLowerCase() : '';
        
        if (!iskomiyTekst) return vseDannie;

        return vseDannie.filter(stroka => {
            const prodavec = stroka.seller ? stroka.seller.toLowerCase() : '';
            const pokupatel = stroka.customer ? stroka.customer.toLowerCase() : '';
            return prodavec.includes(iskomiyTekst) || pokupatel.includes(iskomiyTekst);
        });
    }
}
