import {sortCollection} from "../lib/sort.js"; 

export function initSorting(zagolovkiKolonok) {
    return (danniePosleFiltra, pamyat, sobitie) => {
        
        if (sobitie && sobitie.name === 'sort') {
            const nazhatayaKolonka = sobitie.value;

            if (pamyat.sort === nazhatayaKolonka) {
                pamyat.order = pamyat.order === "asc" ? "desc" : "asc";
            } else {
                pamyat.sort = nazhatayaKolonka;
                pamyat.order = "asc";
            }

            Object.keys(zagolovkiKolonok).forEach(imyaKolonki => {
                const kolonka = zagolovkiKolonok[imyaKolonki];
                const napravlenie = (imyaKolonki === pamyat.sort) ? pamyat.order : null;
                if (kolonka) kolonka.dataset.value = napravlenie || "none";
            });
        }

        return sortCollection(danniePosleFiltra, pamyat.sort, pamyat.order);
    }
}
