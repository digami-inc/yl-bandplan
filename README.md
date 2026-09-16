# YL Bandplan

Interaktīvs Latvijas radioamatieru frekvenču joslu plāns ar Latvijas normatīvo prasību un IARU Region 1 rekomendāciju attēlojumu.

Publiskā versija: https://bandplan.nakotne.com/

## Projekta izcelsme un turpinājums

Šis projekts ir turpinājums sākotnējam **bandplan.yl2.lv** projektam, ko izveidoja **YL3AME Kristaps**.

Sākotnējais repozitorijs:
https://gitea.kecom.lv/enkrs/bandplan.yl2.lv

Sākotnējā autora lapa:
https://yl3ame.hex.id.lv/

Esmu pārņēmis projekta turpmāku uzturēšanu ar mērķi saglabāt to aktuālu, pārbaudīt un strukturēt izmantotos datus, kā arī turpināt attīstīt lietotāja saskarni un funkcionalitāti Latvijas radioamatieriem.

Sākotnējā autora ieguldījums un projekta izcelsme tiek saglabāta un norādīta arī failā [NOTICE.md](NOTICE.md).

> Piezīme par licenci: sākotnējais autors ir devis atļauju projektu izmantot, modificēt un izplatīt ar atribūciju, taču sākotnējam projektam nav pievienota formāla atvērtā pirmkoda licence. Šis repozitorijs tādēļ neapgalvo MIT, GPL vai citas licences piemērošanu sākotnējam kodam.

## Datu avoti

Galvenie datu avoti:

- Latvijas Republikas MK noteikumi Nr. 257 par radioamatieru eksaminācijas apliecībām, radiostaciju atļaujām un radiostaciju lietošanu;
- Latvijas radiofrekvenču plāns;
- IARU Region 1 HF un VHF/UHF/SHF band plans;
- sākotnējā projekta dati un vēsturiskās vizualizācijas.

Datu avoti un to pārbaudes datumi tiek glabāti strukturēti `src/data/sources.ts`.

## 2026. gada modernizācija

Projektā ir veikta būtiska datu un aplikācijas pārbūve:

- Latvijas juridiskie noteikumi nodalīti no IARU rekomendācijām;
- strukturēti un validēti 38 A kategorijas, 9 B kategorijas un 2 C kategorijas juridiskie noteikumi;
- pievienoti juridiskie nosacījumi, jaudas veidi, maksimālie joslas platumi, darba veidi un izstarojuma klases;
- izveidota saīsinājumu un terminu vārdnīca (`PRIM`, `PRIMeks`, `sek`, `pX`, `pZ`, `e.i.r.p.`, `CW`, `SSB`, `MGM`, `EME`, `MS` u.c.);
- IARU Region 1 dati normalizēti integer Hz formātā un aktualizēti līdz 250 GHz;
- kanoniskajā IARU slānī ir 191 segments un 49 aktivitāšu marķieri;
- detalizētās joslu lapas izmanto kanoniskos juridiskos un IARU datus;
- pievienots frekvences meklētājs “Vai es te drīkstu raidīt?”;
- pievienots automātisks datu validators;
- GitHub Actions CI pārbauda datu validāciju, IARU auditu un pilnu Astro build.

## Tehnoloģijas

- [Astro](https://astro.build/)
- Vue
- TypeScript
- Bun

## Izstrāde

Nepieciešams Bun.

```bash
bun install
bun run dev
```

Lokālais development serveris pēc noklusējuma būs pieejams Astro norādītajā adresē.

## Datu validācija

```bash
bun run validate:data
```

IARU migrācijas/audita pārbaude:

```bash
bun run audit:iaru
```

## Production build

```bash
bun run build
```

Build rezultāts tiek izveidots `dist/` direktorijā.

Pašreizējā produkcijas izvietojumā statiskais saturs tiek publicēts no Apache webroot, izmantojot `rsync` no `dist/`.

## Projekta statuss

Projekts tiek aktīvi uzturēts un attīstīts.

Prioritātes:

- uzturēt Latvijas juridiskos datus aktuālus;
- sekot IARU Region 1 bandplānu izmaiņām;
- skaidri nodalīt juridiski saistošus noteikumus no IARU rekomendācijām;
- uzlabot frekvences meklēšanu un joslu vizualizāciju;
- saglabāt datu izcelsmi un pārbaudāmību.

Kļūdu vai novecojušu datu gadījumā vēlams atvērt GitHub issue ar konkrēto frekvenci, joslu un avotu.
