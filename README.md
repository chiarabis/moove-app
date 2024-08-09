# MOOVE
Una app di micromobilità condivisa sviluppata in TypeScript.

---
## Modellazione 
Attraverso la definizione di interfacce e classi ho rappresentato i tre componenti del sistema: mezzo, utente e città.

### Interfacce:
1. Interfaccia IMezzo per rappresentare i mezzi di trasporto (bici, scooter, monopattini elettrici).
- Proprietà: ID univoco, tipo (se bici, scooter o monopattino), stato (se il mezzo è disponibile o in uso), l'utente assegnato se è in uso, se è stato aggiunto da un utente o no e la tariffa oraria.
- Metodi: `assegnaUtente(utente: IUtente): void` per assegnare un mezzo a un utente specifico, `getTariffaGiornaliera(): number` e `getTariffaMensile(): number` per calcolare rispettivamente il costo giornaliero e mensile.
```typescript
interface IMezzo {
    id: string;
    tipo: string;
    statoDisponibile: boolean;
    utenteAssegnato?: IUtente;
    aggiuntoDaUtente: boolean;
    tariffaOraria: number;

    getTariffaGiornaliera(): number;
    getTariffaMensile(): number;
    assegnaUtente(utente: IUtente): void;
}
```
2. Interfaccia IUtente per rappresentare gli utenti del servizio.
- Proprietà: nome, cognome, email e metodo di pagamento preferito.
- Metodo: `prenotaMezzo(mezzo: IMezzo): void` per prenotare un mezzo.
```typescript
interface IUtente{
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;

    prenotaMezzo(mezzo: IMezzo): void;
}
```
3. Interfaccia ICitta per rappresentare appunto le città in cui Moove opera.
- Proprietà: nome della città ed elenco dei mezzi disponibili (IMezzo[]).
- Metodi: `aggiungiMezzo(mezzo: IMezzo): void` e `rimuoviMezzo(id: string): void` per aggiungere e rimuovere i mezzi.
```typescript
interface ICitta{
    nome: string;
    mezziDisponibili: IMezzo[];

    aggiungiMezzo(mezzo: IMezzo): void;
    rimuoviMezzo(id: string): void;
}
```
### Classi:
Ho implementato poi le classi Mezzo, Utente e Citta, che rispettivamente implementano le interfacce IMezzo, IUtente, e ICitta.

- Classe Mezzo: gestisce le informazioni di ciascun mezzo e l'assegnazione agli utenti.
- Classe Utente: gestisce le informazioni degli utenti e la facoltà di prenotare mezzi.
- Classe Citta: rappresenta una città specifica, gestisce i mezzi disponibili in quella città e l'aggiunta e la rimozione di nuovi mezzi.
```typescript
class Mezzo implements IMezzo{
    id: string;
    tipo: string;
    statoDisponibile: boolean;
    utenteAssegnato?: IUtente;
    aggiuntoDaUtente: boolean;
    tariffaOraria: number;

    constructor(id: string, tipo: string, tariffaOraria: number, aggiuntoDaUtente: boolean = false){
        this.id = id;
        this.tipo = tipo;
        this.statoDisponibile = true;
        this.aggiuntoDaUtente = aggiuntoDaUtente;
        this.tariffaOraria = tariffaOraria;
    }

    getTariffaGiornaliera(): number {
        return this.tariffaOraria * 24 * 0.4;
    }

    getTariffaMensile(): number {
        return this.getTariffaGiornaliera() * 30 * 0.4;
    }

    assegnaUtente(utente: IUtente): void {
        if(this.statoDisponibile){
            this.utenteAssegnato = utente;
            this.statoDisponibile = false;
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è stato assegnato a ${utente.nome} ${utente.cognome}.`);
        }else{
            console.log(`Il mezzo ${this.tipo} con ID ${this.id} è disponibile.`)
        }
    }
}
```
```typescript
class Utente implements IUtente{
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;

    constructor(nome: string, cognome: string, email: string, metodoPagamento: string){
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        if(mezzo.statoDisponibile){
            mezzo.assegnaUtente(this)
        }else{
            console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è già stato prenotato.`)
        }
    }
}
```
```typescript
class Citta implements ICitta{
    nome: string;
    mezziDisponibili: IMezzo[];

    constructor(nome: string, mezziDisponibili: IMezzo[] = []){
        this.nome = nome;
        this.mezziDisponibili = mezziDisponibili;
    }

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezziDisponibili.push(mezzo);
        console.log(`Il mezzo ${mezzo.tipo} con ID ${mezzo.id} è stato aggiunto a ${this.nome}`)
    }
    rimuoviMezzo(id: string): void {
        this.mezziDisponibili = this.mezziDisponibili.filter(mezzo => mezzo.id !== id);
        console.log(`Il mezzo con ID ${id} è stato rimosso da ${this.nome}`);
    }
}
```

---
## Configurazione delle dipendenze
1. Installazione di TypeScript `npm install --save-dev typescript`.
2. Installazione di Vite (o di un qualsiasi altro bundler ad esempio Webpack) per la risoluzione dei moduli `npm install --save-dev vite`.
3. Installazione dei tipi di Node.js `npm install --save-dev types@node`, in modo che TypeScript sappia che si sta lavorando in ambiente Node.js. È possibile così utilizzare *__dirname* e *path* nel file di configurazione di Vite.
> [!NOTE]
> Se non fosse già presente è necessario installare anche Node.js.

4. Nel *tsconfig.json* settare queste impostazioni:
```json
{
  "compilerOptions": {
    "target": "ES6",                                         
    "module": "ES6",                                     
    "rootDir": "./src",                                  
    "moduleResolution": "Node",
    "baseUrl": "./",                                  
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["node"],      //inclusione dei tipi di Node.js
    "outDir": "./dist",      //dove Vite scriverà i file di output
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,                       
    "strict": true,                                     
    "skipLibCheck": true                                 
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

5. Configurare il file *vite.config.ts*:
```typescript
import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
    root: './',        //la root del progetto (dove si trova index.html)
    base: './',
    resolve: {
        alias: {
        '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',    //directory di output per la build
        sourcemap: true,    //generazione di mappe di sorgenti per il debugging
        emptyOutDir: true,    //svuota la cartella dist prima della build
        rollupOptions: {
            input: './index.html',    //punto di ingresso principale
        },
    },
    server: {
        open: true,    //apre il browser in automatico
    },
});
```

6. Nel file *index.html* includere nello script il file di ingresso (nel mio caso è `app.ts`):
```html
<script src="./src/app.ts" type="module"></script>
```

7. Creazione di un file *netlify.toml* per configurare Netlify affinchè esegua il processo di build direttamente. In questo modo, Netlify compila i file TypeScript e li utilizza per il deploy senza la necessità di includere la cartella con i file compilati nel repository.
```toml
[build]
  command = "npm run build" #comando per compilare i file TypeScript
  publish = "dist" #cartella con i file compilati
```

---
## Struttura del progetto
> [!IMPORTANT]
> Vite si aspetta di trovare il file *index.html* nella root del progetto, mentre è consigliabile tenere tutti i file TypeScript, i componenti, le risorse e i fogli di stile in una cartella *src*.
```
.root
├── src
│    ├── assets
│    │       └── ... (risorse)
│    ├── styles
│    │       └── ... (CSS)   
│    ├── models
│    │       └── ... (moduli)
│    ├── utils
│    │       └── ... (moduli)
│    ├── app.ts //file di ingresso
│    └── main.ts
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── vite.config.ts
└── tsconfig.json
```

---
## Deploy
![Progetto senza titolo (8)](https://github.com/user-attachments/assets/f86d299d-cb2e-4f17-867c-c2552d523b5b)

[Clicca qui](https://mooveapp.netlify.app/) per vedere il progetto in live 🌐
_Deploy by Netlify_
