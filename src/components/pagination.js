import { getPages } from "../lib/utils.js";

export function initPagination(elementiUpravleniya) {
    return (otseyannieDannie, pamyat, sobitie) => {
        if (!pamyat.page) pamyat.page = 1;
        
        const vsegoStrok = otseyannieDannie.length;
        const skolkoPokazivat = Number(pamyat.rowsPerPage) || 10;
        const maksimalnayaStranica = Math.ceil(vsegoStrok / skolkoPokazivat) || 1;

        // Обработка кликов
        if (sobitie && sobitie.name) {
            if (sobitie.name === 'first') pamyat.page = 1;
            if (sobitie.name === 'prev' && pamyat.page > 1) pamyat.page -= 1;
            if (sobitie.name === 'next' && pamyat.page < maksimalnayaStranica) pamyat.page += 1;
            if (sobitie.name === 'last') pamyat.page = maksimalnayaStranica;
            if (sobitie.name === 'page') pamyat.page = Number(sobitie.value);
        }

        if (pamyat.page > maksimalnayaStranica) {
            pamyat.page = maksimalnayaStranica || 1;
        }

        const nishniyIndeks = (pamyat.page - 1) * skolkoPokazivat;
        const verhniyIndeks = nishniyIndeks + skolkoPokazivat;

        
        if (elementiUpravleniya.fromRow) elementiUpravleniya.fromRow.textContent = vsegoStrok === 0 ? 0 : nishniyIndeks + 1;
        if (elementiUpravleniya.toRow) elementiUpravleniya.toRow.textContent = Math.min(verhniyIndeks, vsegoStrok);
        if (elementiUpravleniya.totalRows) elementiUpravleniya.totalRows.textContent = vsegoStrok;

        
        if (elementiUpravleniya.pages) {
            const container = elementiUpravleniya.pages;
            container.innerHTML = ''; 
            
            const pagesArray = getPages(pamyat.page, maksimalnayaStranica, 5); 
            
            pagesArray.forEach(pageNum => {
                const label = document.createElement('label');
                label.className = 'pagination-button';
                if (pageNum === pamyat.page) label.classList.add('active'); 
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'page';
                input.value = pageNum;
                if (pageNum === pamyat.page) input.checked = true;
                
                const span = document.createElement('span');
                span.textContent = pageNum;
                
                label.appendChild(input);
                label.appendChild(span);
                container.appendChild(label);
            });
        }

        return otseyannieDannie.slice(nishniyIndeks, verhniyIndeks);
    }
}
