DB Pyworking – info k obsahu

<ul><li>Co je to databáze, relační databáze, proč se používá a jak ji použít z Pythonu</li>
<li>Základy SQL - jazyka pro manipulaci s daty v relační databázi: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE</li>
<li>Pokročilé dotazování: agregace, JOIN</li>
<li>Databázové principy: indexy, ACID, transakce </li>
<li>Vše si prakticky ukážeme i na příkladech v Pythonu</li>
<li>Abychom vše reálně použili, vytvoříme si jednoduchou webovou aplikaci ve Flasku pracující s databází SQLite</li>
</ul>




<a href="https://docs.google.com/presentation/d/1T_oei3efSJwDjpFk0aImpcLnuMAAQN0uum44In0hdts/edit?usp=sharing">slides</a>
<a href="https://gist.github.com/messa/bb6063214182b922fcdc66bcb1d69e27">
Jupyter notebook s příklady ze slajdů</a>

https://github.com/messa/db-workshop-web-app
branch dokonceno obsahuje autorské řešení :)
pro zájemce je v branchi sqlalchemy řešení pomocí tzv. ORM, to je Python knihovna, která, stručně řečeno, za vás řeší ty otazníčky a umí vyjádřit SQL dotazy pomocí Python konstrukcí. Je to ale samo o sobě rozsáhlé téma.


Todo web app anketa:
* Rozmyslet si strukturu tabulek
* Vyplnit tělo funkce prepare_schema; tip: CREATE TABLE IF NOT EXISTS [název] … - nevyhodí chybu, pokud tabulka už existuje
* Vyplnit tělo funkce insert_suggestion - vložení návrhu
* Upravit list_suggestions, aby to vracelo data vložená přes insert_suggestion
* Vyzkoušet si vložit nový návrh (suggestion) :)
* Doplnit tělo funkce insert_vote a upravit list_suggestions, aby u jednotlivých návrhů byl i počet hlasů
* Bonus: zabránit dvojitému hlasování pomocí cookie, do které si uložíte nějakou náhodnou hodnotu, která pak bude identifikovat daného hlasujícího uživatele - http://flask.pocoo.org/docs/0.12/quickstart/#cookies 
* Tip: nezapomenout na commit ;)


<b>Priklad - Kniznica</b>

* Clenove
* id_clena
* Meno
* Priezvisko
* Rodne_cislo

Knihy

* id_knihy
* Nazov_knihy
* Pocet_kusov_celkom

Pujcky

* Id_clena
* Id_knihy
* Pozicane_od
* Pozicane_do


Priklady:

* Vytvorit tabulky
* Zadat 5 clenov, 5knih, 5vypujcek
* Vyselectovat knihy knihy co su pozicane, kym a do kedy (tj. Meno, kniha, do kedy)
* Vypisat knihy co su teraz v knihovne (nie pujcene) - toto je poněkud advanced :) probereme spolu
* Vypsat Top3 nejčastěji půjčované knihy, zoradene podla #vypozicani


 <a href="https://docs.python.org/3/library/sqlite3.html">Python sqlite3 dokumentace</a>



