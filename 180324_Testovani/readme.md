# Pyworking na téma Testování – pytest.jdem.cz

24.3.2018 se koná Pyworking na téma Testování od Mira Hrončoka v Apiary v Karlíně.

3.11.2018 se koná znovu v rámci konference OpenAlt v Brně.

18.5.2019 se koná opět v Apiary v Karlíně, pro účastnice kurzů PyLadies.

23.11.2019 se koná opět pro účastnice kurzů pražských PyLadies, tentokrát v Barclays na Pankráci.

Kde není uvedono jinak, jsou tyto materiály pod licencí [CC0](https://creativecommons.org/publicdomain/zero/1.0/deed.cs), můžete si s nimi tedy dělat prakticky cokoliv.

## Co očekávat?

Workshop pro ty, kdo umí Python zhruba na úrovni [začátečnického kurzu pro PyLadies](http://naucse.python.cz/course/pyladies/), ale z testování jsou spíše zmatení nebo o něm příliš nevědí.

Když píšeš programy podle nějaké své představy (nebo zadání), většinou zkoušíš, jestli **fungují správně**. Zkoušení toho, jestli program funguje správně, se obecně říká **testování**. Testování ale existuje celá řada druhů. Pro malé úlohy na úrovni jednotlivých úkolů z domácích projektů kurzu PyLadies často stačí program **vyzkoušet ručně**. Pro rozsáhlejší a komplexnější projekty je to však otravné a často téměř nemožné.

Na workshopu si ukážeme, jak zkoušení programů automatizovat pomocí **automatických testů**. Ukážeme a vysvětlíme si, jaké druhy testů existují, k čemu se které hodí a jak je vytvářet pomocí nástroje `pytest`. Ukážeme si také, jak se vypořádat s nejčastějšími problémy, které psaní automatických testů komplikují, a jak psát programy tak, aby se **jednoduše testovaly**, a jak psát testy tak, aby byly užitečné a dobře udržitelné.

Popovídáme si i o tom, **kdy testy psát**, a o tom, jak je důležité je udržovat aktuální a **stále je spouštět**.

Pokud zbude čas, můžeme se podívat i na další věci, například jak integrovat testy na GitHub tak, aby samy proběhly při každé změně a případně změnu odmítly, když testy odhalí chybu.

## Co budeš potřebovat

* Python 3.6, 3.7 nebo 3.8
* Git
* Textový editor
* Příkazovou řádku
* Virtuální prostředí

Instalace & nastavení – viz [začátečnický kurz](http://naucse.python.cz/course/pyladies/sessions/install/).

### Knihovny z PyPI

Pro urychlení instalace si ve virtuálním prostředí nainstaluj následující:

```console
(venv) $ python -m pip install pytest
```

## Funguje program správně?

Začneme na jednoduchém příkladu, na hře kámen, nůžky, papír. Nejprve napíšeme
jednoduchý program, který nám umožní hrát proti počítači. Napíšeme ho velmi naivně,
bez použití funkcí a jiných vymožeností, což by zkušené programátorky a programátory
ani nenapadlo, ale začátečníci to udělají nějak takhle.

```python
# rps.py

import random

human = input('rock, paper or scissors? ')

while human not in ['rock', 'paper', 'scissors']:
    human = input('rock, paper or scissors? ')

computer = random.choice(['rock', 'paper', 'scissors'])

print(computer)

if human == computer:
    print('it\'s a tie!')
elif ...:
    ...  # tuhle část jistě zvládnete napsat sami
```

Máte? A funguje to? Jak jste to zjistili? Vyzkoušeli jste to. Paráda, právě jste
provedli několik prvních testování. Provedli jste manuální testování a usoudili jste,
že se program chová správně. Kdybyste chtěli být důkladní, zkoušeli byste program tak dlouho,
dokud by nenastaly všechny možné kombinace. To by mohl trvat dlouho.

Když se rozhodnete program změnit (udělat jej čitelnější, rychlejší nebo prostě jiný),
musíte manuální testování zopakovat. Manuální testování se běžně používá, ale většinou tam,
kde je to levnější (na čas, peníze atd.) než psát testy automatické.

Dnes si ukážeme jak takový program opatřit automatickými testy. Těch existuje
několik druhů a my se nyní zaměříme na testy jednotkové a a testy integrační.

 * **Jednotkové testy** testují malou část našeho programu v izolovaném prostředí.
   Často například funkci. Bývají jednodušší a kratší, ale vyžadují aby byl program
   napsán *rozumně* (tedy například by využíval funkce).
 * **Integrační testy** testují program jako celek, jako magickou krabičku, která něco dělá.
   Často bývá složitější je připravit, ale nevyžadují větší zásahy do struktury programu.

**Poznámka:** *Existuje vědní disciplína, která se zabývá dokazováním toho,
že výsledek programu musí být správný. Tou se ale dnes zabývat nebudeme.*

## Funkce jako základní stavební kámen programu

Dříve než se se pustíme do psaní testů se vrátíme k funkcím.
Zopakujeme si, [co taková funkce je](http://naucse.python.cz/course/pyladies/beginners/def/).

Abychom mohli psát jednoduché a účelné jednotkové testy, potřebujeme mít jednoduché a účelné funkce. Pokud napíšeme naše funkce tak, aby se dobře testovaly, budou se i dobře používat.
Psaní *pěkných* funkcí nás učí čistěji a lépe programovat.

Ukážeme si to na příkladu, který s naší jednoduchou hrou nesouvisí:

```python
# shapes.py

from math import pi


def ellipse_area(a, b):
    """Given the lengths of the semi-major and semi-minor axes, returns the
    area of the ellipse."""
    return pi * a * b
```

Tato funkce počítá plochu elipsy. Je *rozumná*. Bere vstup pouze pomocí argumentů,
něco spočítá a výsledek vrací.

Nemá žádné vedlejší efekty. Nepíše nic do terminálu, neptá se na nic, netelefonuje
nikomu, nezalévá kytky. Napsat pro takovou funkci test je jednoduché.

Pro napsání testu je třeba vybrat takovou elipsu, o které víme její plochu.
Vezmeme si tedy kružnici s průměrem 1, což je elipsa s poloosami délky 1 a 1,
její plocha je π. To ověříme.

Pomocí frameworku pytest se testy píšou jako funkce používající `assert`, ale tyto funkce se nikde nevolají.
Jsou použity čistě jako prostředek k dosažení cíle. Na workshopu si to ukážeme,
pokud tento text čtete doma, odkážu vás na
[lekci o testování ze začátečnického kurzu](http://naucse.python.cz/course/pyladies/beginners/testing/).
Pomocí `assert` zde říkáme: „ujisti se, že (něco platí)“.

```python
# test_shapes.py

import math
import shapes


def test_circle_area_is_pi():
    assert shapes.ellipse_area(1, 1) == math.pi
```

Testy pustíme pomocí:


```console
(venv) $ python -m pytest -v test_shapes.py
...
test_shapes.py::test_circle_area_is_pi PASSED
```

Test prochází. Výborně. Správně bychom tedy měli napsat nějaký další a snažit
se pomocí testů odhalit, že program funguje. Nyní se ale pojďme vrátit k funkcím.

Podívejme se, jak by někdo mohl funkci na spočítání obsahu elipsy také napsat:

```python
# shapes_ugly.py

from math import pi


def ellipse_area():
    """Given the lengths of the semi-major and semi-minor axes, prints the
    area of the ellipse."""
    a = float(input('lengths of the semi-major axes: '))
    b = float(input('lengths of the semi-minor axes: '))
    print('the area is', pi * a * b)
```

Tato funkce není *rozumná*. Dělá vylomeniny. Nebere žádné argumenty, nic nevrací.
Píše něco do terminálu a to se nám nelíbí. Takovou funkci (zatím) neumíme otestovat.

### Kámen, nůžky, papír?

Mohli byste namítnout: „No jo, ale tohle je matika, ale náš program je jiný.“
Pojďme tedy naší jednoduchou hru rozdělit na jednotlivé podproblémy a říct si,
které vyřešíme rozumnou funkcí. Náš program musí:

 * načítat tah člověčího hráče
 * zkontrolovat, že tah je v pořádku
 * zahrát náhodný tah
 * informovat hráče o tomto tahu
 * tahy porovnat a vyhodnotit hru
 * informovat hráče o výsledku

Nebudu vás napínat, všechny body, které nezačínají „načítat“ nebo „informovat“,
lze vyřešit pomocí rozumné funkce, která půjde otestovat jednoduše.

#### Zkontrolovat, že tah je v pořádku

Co je argumentem funkce? Tah hráče. Jak jej načteme zatím neřešte.

Co je návratovou hodnotou funkce? Správnost, tedy buďto `True` nebo `False`.

```python
# rps.py

def is_valid_play(play):
    ...  # to zvládnete sami
```

Jak funkci otestujeme? Jednoduše, napíšeme testy se správnými vstupy:

```python
# test_rps.py

import rps


def test_rock_is_valid_play():
    assert rps.is_valid_play('rock') is True


def test_paper_is_valid_play():
    assert rps.is_valid_play('paper') is True


def test_scissors_is_valid_play():
    assert rps.is_valid_play('scissors') is True
```

```console
(venv) $ python -m pytest -v test_rps.py 
...
test_rps.py::test_rock_is_valid_move PASSED
test_rps.py::test_paper_is_valid_move PASSED
test_rps.py::test_scissors_is_valid_move PASSED
```

**Pozor!** naším testům by ale vyhovovala i tato funkce:

```python
def is_valid_play(play):
    return True
```

Co děláme špatně? Je hrozně důležíté testovat i špatné věci, nejen ty dobré:

```python
# test_rps.py

import rps

...

def test_lizard_is_invalid_play():
    assert rps.is_valid_play('lizard') is False


def test_spock_is_invalid_play():
    assert rps.is_valid_play('spock') is False
```

```console
(venv) $ python -m pytest -v test_rps.py 
...
test_rps.py::test_rock_is_valid_move PASSED
test_rps.py::test_paper_is_valid_move PASSED
test_rps.py::test_scissors_is_valid_move PASSED
test_rps.py::test_lizard_is_invalid_move PASSED
test_rps.py::test_spock_is_invalid_move PASSED 
```

#### Zahrát náhodný tah

Co je argumentem funkce? Nic, náš počítačový hráč se chová pokaždé stejně.

Co je návratovou hodnotou funkce? Tah počítače.

```python
# rps.py

import random

...

def random_play():
    ...  # to zvládnete sami
```

Jak ji otestujme? Máme tady náhodu, nemůžeme tedy testovat konkrétní výsledek.
Můžeme se ale ujistit, že hra je validní (na to máme ostatně funkci).
Je dobré to udělat vícekrát, aby bylo velmi pravděpodobné, že nastanou všechny situace.
Na rozdíl od manuálního testování je automatické testování funkce, které nepočítá nic složitého, rychlé.

```python
def test_random_play_is_valid():
    for _ in range(100):
        play = rps.random_play()
        rps.is_valid_play(play)
```

Tady ale pozor. Když využíváme při testu jedné funkce funkci jinou, musíme si být jisti,
že funguje správně. My ji ale máme otestovanou, takže ji věříme.
Pokud bychom ale testovali pouze tímto jedním testem zároveň funkce `random_play`
i `is_valid_play`, mohlo by dojít k tomu, že máme v obou funkcích stejnou chybu,
a proto ji neodhalíme.

Otestovali jsme všechno. Co když naše funkce `random_play` hraje dokola jenom kámen?
Pojďme to zjistit:

```python
def test_random_play_is_fairish():
    plays = [rps.random_play() for _ in range(100)]
    assert plays.count('rock') > 10
    assert plays.count('paper') > 10
    assert plays.count('scissors') > 10
```

Proč zrovna 10? Tak nějak doufáme, že alespoň tolik jich tam bude, ale jedná se o náhodu,
takže si nemůžeme být nikdy jisti. Tento test tedy může v extrémní situaci selhat.
Je dobré si to k němu poznamenat:

```python
def test_random_play_is_fairish():
    """This test relies on some kind of fairness in the randomness.
    That is of course not 100% accurate, but should work anyway."""
    ...
```

#### Tahy porovnat a vyhodnotit hru

Co je vstupem funkce? Dva tahy v určitém pořadí.

Co je návratovou hodnotou? Informace o tom, kdo vyhrál.

```python
def determine_game_result(human, computer):
    if human == computer:
        return 'tie'
    elif ...:
        ...  # tuhle část zvládnete napsat sami
```

A jak to otestovat? Kombinací není mnoho:

```python
def test_paper_beats_rock():
    assert rps.determine_game_result('paper', 'rock') == 'human'

...

# zbytek vymyslíme spolu
```

### Slepit a poskládat program

Všechny *rozumné* funkce už máme, tak z nich poskládáme program:

```python
valid = False
while not valid:
    human = input('rock, paper or scissors? ')
    valid = is_valid_play(human)

computer = random_play()
print(computer)

result = determine_game_result(human, computer)

if result == 'tie':
    print('it\'s a tie')
else:
    print(result, 'won!')
```


Pozor na to, že naše testy se vložením kódu hlavního programu rozbijí.
Při importování `rps` se kód provede. Aby se to nestalo, vyhradíme si na program
vlastní *nerozumnou* funkci. Funkci s hlavním programem často nazýváme `main`.
Tuto funkci zavoláme pouze, když je náš soubor spouštěn, ale ne když je importován.

```python
def main():
    valid = False
    while not valid:
        human = input('rock, paper or scissors? ')
        valid = is_valid_play(human)

    computer = random_play()
    print(computer)

    result = determine_game_result(human, computer)

    if result == 'tie':
        print('it\'s a tie')
    else:
        print(result, 'won!')


# když importujeme rps, __name__ je 'rsp'
# když spouštíme python rps.py, __name__ je '__main__'
if __name__ == '__main__':
    main()
```

Teď už nezbývá než vyzkoušet, že to funguje. A jsme zase na začátku :D
Ve skutečnosti ale máme výhodu. Víme, že dílčí jednotky (funkce) našeho programu fungují dobře.
Veškerý problém tak teď může nastat pouze v naší finální slepovací nerozumné funkci.


## Integrační testy

Tak jako jednotkové testy testují jednotlivé funkce (metody, třídy, atd.),
často je vhodné otestovat program jako celek. Pro zjednodušení zde řekneme, že
náš program *je* funkce `main()` (později si ukážeme, jak se od tohoto
oprostit). Jak ale můžeme otestovat funkci `main()`, když tato funkce
komunikuje s uživatelem?

### Čtení výstupu

Naše funkce printuje. To je nešťastné, jelikož printovaný text neumíme zachytit
a zkontrolovat. Framework `pytest` má naštěstí mechanismus, jak tento problém
jednoduše obejít. Slouží k tomu takzvaná *fixture*. Fixture si můžete představit
jako speciální „věc“, kterou test potřebuje k tomu, aby fungoval.
Existuje jich v pytestu celá řada a každá se hodí na něco jiného.
Později si ukážeme, jak napsat vlastní.
Fixture, která nás zajímá, se jmenuje [`capsys`](https://docs.pytest.org/en/latest/capture.html).

Pytest standardně veškerý výstup našeho programu zachytává a pokud testy prochází,
tak jej schová, ale pokud neprochází, tak ho ukáže. To je užitečné, protože
v testech můžeme nechat pomocné printy.

```python
def test_with_print():
    print('useful debugging information here')
    # assert False
    assert True 
```

Pomocí přepínače `-s` při spouštění testů tuto vlastnost můžete vypnout.
Fixture `capsys` umožní takto zachycený výstup programu programově číst.

```python
def test_with_print(capsys):
    print('useful debugging information here')
    captured = capsys.readouterr()
    assert 'information' in captured.out
```

Pro použití fixture stačí přidat její jméno jako argument funkce.
To je možná zvláštní, ale jak bylo řečeno dřív, funkce je v pytestu jen médium,
které nám umožní testy zapsat, není to tedy funkce, kterou bychom někde volali
sami.

Zachycený výstup samozřejmě nemusí být jen z printu přímo v testu, ale i
z printu volaného z funkce, kterou testujeme. Pojďme to tedy zkusit nejprve na
jednoduchém příkladě. Napište si *nerozumnou* funkci, která vypíše něco
zajímavého a zkuste ji otestovat. Kouči vám případně pomohou.

A co naše funkce `main()`? Pojďme to zkusit:

```python
def test_full_game(capsys):
    rps.main()  # call the main program
    captured = capsys.readouterr()
    assert 'rock, paper or scissors?' in captured.out
```

To ale pořád nejde:

```
...
    human = input('rock, paper or scissors? ')
...
E       OSError: reading from stdin while output is captured
...
```

### Fingování vstupu

Problém tedy není s printem, ale s funkcí `input`. Musíme nějak v testu docílit
toho, aby funkce nečekal na vstup, ale aby jsme vstup mohli poslat z testu.
Předpřipravená fixture, která by podvrhla uživatelský vstup, ale bohužel
neexistuje. Můžeme místo toho použít fixture [`monkeypatch`](https://docs.pytest.org/en/latest/monkeypatch.html), která nám umožní
vyměnit v testovaném kódu opravdovou funkci `input`, za naši falešnou funkci
`input`, která bude dělat to, co chceme (tomu se říká *monkeypatchovat*, někdy
taky v širším významu *mockovat*).

```python
def input_faked_rock(prompt):
    """Acts like input(prompt), but instead of waiting for user input,
    assumes the user said 'rock'"""
    print(prompt)
    return 'rock'


def test_full_game(capsys, monkeypatch):
    monkeypatch.setattr('builtins.input', input_faked_rock)  # user keeps saying rock
    rps.main()  # call the main program
    captured = capsys.readouterr()
    assert 'rock, paper or scissors?' in captured.out
```

Několik poznámek:

 * Normální funkce `input` vypíše otázku, my tedy ve falešné funkci musíme udělat to samé.
 * `monkeypatch` umí nastavit atribut modulu. Pro zabudované
   funkce se použije `'builtins.název'`, ale pro věci, které importujete,
   použijete např. `'random.choice'`.
 * Nedoporučuje se monkeypatchovat některé speciální funkce, které může používat
   samotný pytest. Monkeypatchování je nebezpečné.

Pro lepší znovupoužitelnost si můžete udělat funkci, která vrací funkci:

```python
def input_faked(fake):
    def _input_faked(prompt):
        f"""Acts like input(prompt), but instead of waiting for user input,
        assumes the user said '{fake}'"""
        print(prompt)
        return fake
    return _input_faked
```

Ale není to nutné, pokud je to pro vás příliš mnoho úrovní abstrakce.

Pokud chcete, můžete si vytvořit vlastní fixture, která tuto část bude dělat za vás.
Fixture nemusí být nic speciálního, pouze odekorovaná funkce (dekorátor je ta věc se zavináčem, zde použitá pouze proto, aby pytest věděl, že je to fixture):

```python
import pytest

...

@pytest.fixture
def fake_input_rock(monkeypatch):
    monkeypatch.setattr('builtins.input', input_faked_rock)


def test_full_game(capsys, fake_input_rock):
    rps.main()  # call the main program, input will be faked by using fake_input_rock fixture
    captured = capsys.readouterr()
    assert 'rock, paper or scissors?' in captured.out
```

Jinou možností, jak podvrhnout funkci `input`, je vytvořit funkci `main` tak,
aby umožňovala místo funkce `input` použít jakoukoliv jinou, tím, že ji bude
přebírat jako argument. Tomuto přístupu se
říká *dependency injection* a obecně se považuje za čistší (monkeypatchování
je příliš magické).

```python
def main(input=input):
    ...
    human = input('rock, paper or scissors? ')
    ...
```

Pomocí tohoto zápisu docílíte toho, že když použijete funkci `main` bez argumentů,
vevnitř se použije opravdová funkce `input`, ale když ji dáte jako arguemnt
jinou funkci, použije se místo toho. Zkuste si to:

```python
main(lambda x: 'rock')
```

Toho můžete využít v testech:

```
def test_full_game(capsys):
    rps.main(input=input_faked_rock)  # call the main program with faked input
    captured = capsys.readouterr()
    assert 'rock, paper or scissors?' in captured.out
```

U *dependency injection* často můžete narazit na problém, že takových závislostí
(dependencí) bude příliš mnoho. V takovém případě je lepší je předávat např. ve slovníku.

### Testy k funkci `main()`

Když už umíte otestovat nerozumnou funkci, pojďme spolu vymyslet nějaké integrační testy.

(Tuto část uděláme na workshopu interaktivně, laskavý čtenář promine.)

### O úroveň výše, integrace pomocí podprocesů

Někdo by mohl namítat, že pouštění programu pomocí funkce `main()` není opravdový
integrační test, protože naši uživatelé nebudou hru spouštět pomocí funkce,
ale např. tak, že napíšou do konzole `python rps.py`. Jak toto tedy nasimulovat
a vytvořit opravdový integrační test? Jednoduše, z Pythonu totiž můžeme pouštět
programy jako z příkazové řádky pomocí modulu [`subprocess`](https://docs.python.org/3/library/subprocess.html).

```python
import subprocess
import sys


def test_wrong_play_results_in_repeated_question():
    # sys.executable is the same python the test run on in case you have more
    # cp means completed process
    cp = subprocess.run([sys.executable, 'rps.py'],  # needs list/tuple, not one str
                        input='asdf\nrock',  # \n is new line (Enter)
                        encoding='utf-8',  # otherwise we would need to operate on bytes
                        stdout=subprocess.PIPE)  # capture the output
    assert cp.stdout.count('rock, paper or scissors?') == 2
```

> Pokud se na Windows setkáte s `UnicodeDecodeError` zkuste nastavit `encoding='cp1250'` místo `encoding='utf-8'` v `subprocess.run`.

Výhodou tohoto přístupu je, že nemusíte řešit vstup a výstup žádnými podvody,
modul `subprocess` je na to připraven. (Kdo se nyní nudí, udělá fixture, kterou může
použít ve více testech.)

## TDD: Test driven development

Jednou z technik, jak psát programy a testy je psát vždy nejprve test a pak část
programu, ale minimálně, tak aby testy prošly. A pak další testy a pak zase část programu.

My si to ukážeme společně na workshopu na jiné hře, nazvané *fizzbuzz*.
Pravidla takové hry jsou jednoduché, děti v kolečku postupně říkají čísla od jedné dále,
ale když je číslo dělitelné třemi, řeknou místo něj *fizz*, když je dělitelné pěti,
řeknou *buzz* a konečně když je dělitelné oběma, řeknou *fizzbuzz*.
Kdo to splete, musí z kola ven. Na workshopu si to vyzkoušíme.

Napíšeme si tedy funkci, která dostane číslo a vrátí řetězec s číslem, `fizz`, `buzz` nebo `fizzbuzz`. Ale začneme testem.

```python
# test_fizzbuzz.py

from fz import fizzbuzz

def test_fizzbuzz_1_returns_numeric():
    assert fizzbuzz(1) == '1'
```

Testy selžou, žádnou funkci nemáme. Napíšeme tedy nejjednodušší funkci, která
projde:

```python
# fz.py

def fizzbuzz(number):
   return str(number)
```

A takto budeme postupovat dál a dál. Zde v materiálech tuto část vynechám,
zabrala by příliš mnoho místa a textu. Účelem tohoto cvičení je seznámit se
s tímto způsobem, ale uvědomit si, že nic se nemá přehánět.

V rámci cvičení si také ukážeme, jak se testy dají parametrizovat.
Čtenáře odkážu na [pokročilý kurz](http://naucse.python.cz/course/mi-pyt/intro/testing/), zde pouze ukázka:

```python
import pytest

...
@pytest.mark.parametrize('number', (3, 33, 9, 18, 3333))
def test_fizz(number):
    assert fizzbuzz(number) == 'fizz'
```

### Kdy tedy testy psát?

Co člověk to názor. Mně se osvědčil tento postup:

#### Pokud vzniká nová funkcionalita:

 1. píšu funkci, dokud ji nepotřebuju vyzkoušet
 2. vyzkouším ji (ručně), pokud nefunguje, opravím
 3. ruční vyzkoušení přeměním na test
    (pokud vím, že takto se má funkce ve finále chovat a výsledek není pouze dočasný)
 4. postup opakuji, dokud funkci nepovažuji za hotovu

#### Pokud opravuji chybu:

 1. zjistím, jak chybu zreprodukovat (docílit účelně, aby se stala)
 2. napíšu test, který selže kvůli této chybě
 3. opravuji kód, který je špatně, dokud test neprojde
   * u toho samozřejmě spouštím i ostatní testy, abych věděl, že nic nerozbíjím

Takovým testům se říká regresní a je vhodné je doplnit odkazem na hlášení chyby,
kvůli které byl test přidán, například na GitHub issue.

## Kdy testy pouštět?

Pořád. Jakmile máte testy, které nepouštíte pořád, nevíte, jestli prochází.
Když máte testy, které neprochází, jsou na nic. To je potřeba okamžitě opravit.

K tomu můžete použít různé automatizace, například nějakou službu, která bude testy pouštět na GitHubu. Kdykoli pushnete do svého repozitáře, nebo kdykoli někdo pošle
pull Request. Jenou z výhod takové služby je i to, že testy běží na jiném počítači,
než tom vašem. Tím se odhalí mnoho problémů (například soubor, který jste zapomněli přidat do gitu).

### Travis CI

Jednou z takových služeb, kterým se říká *Continues Integration*, je
[Travis CI]. Travis CI je zadarmo pro veřejné repozitáře.

Přihlaste se pomocí GitHubu (vpravo nahoře).
Pak opět vpravo nahoře zvolte [Accounts](https://travis-ci.org/profile)
a povolte Travis pro váš repozitář.

Do repozitáře přidejte soubor `.travis.yml`:

```yaml
language: python
dist: xenial
python:
- '3.7'
install:
- python -m pip install -U pytest
script:
- python -m pytest test_rps.py
```

Po pushnutí by se na Travisu měl automaticky spustit test.
Více informací o použití pro Python najdete
v [dokumentaci](https://docs.travis-ci.com/user/languages/python/).

Proběhlé testy uvidíte na GitHubu v seznamu commitů.
Když někdo pošle Pull Request, uvidíte, jestli testy procházejí, nebo ne.

[Travis CI]: https://travis-ci.org/
