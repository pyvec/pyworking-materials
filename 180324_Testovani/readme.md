# Pyworking na téma Testování

24.3.2018 se koná Pyworking na téma Testování od Mira Hrončoka v Apiary v Karlíně.

## Co očekávat?

Workshop pro ty, kdo umí Python zhruba na úrovni [začátečnického kurzu pro PyLadies](http://naucse.python.cz/course/pyladies/), ale z testování jsou spíše zmatení nebo o něm příliš nevědí.

Když píšeš programy podle nějaké své představy (nebo zadání), většinou zkoušíš, jestli **fungují správně**. Zkoušení toho, jestli program funguje správně, se obecně říká **testování**. Testování ale existuje celá řada druhů. Pro malé úlohy na úrovni jednotlivých úkolů z domácích projektů kurzu PyLadies často stačí program **vyzkoušet ručně**. Pro rozsáhlejší a komplexnější projekty je to však otravné a často téměř nemožné.

Na workshopu si ukážeme, jak zkoušení programů automatizovat pomocí **automatických testů**. Ukážeme a vysvětlíme si, jaké druhy testů existují, k čemu se které hodí a jak je vytvářet pomocí nástroje `pytest`. Ukážeme si také, jak se vypořádat s nejčastějšími problémy, které psaní automatických testů komplikují, a jak psát programy tak, aby se **jednoduše testovaly**, a jak psát testy tak, aby byly užitečné a dobře udržitelné.

Popovídáme si i o tom, **kdy testy psát**, a o tom, jak je důležité je udržovat aktuální a **stále je spouštět**.

Pokud zbude čas, můžeme se podívat i na další věci, například jak integrovat testy na GitHub tak, aby samy proběhly při každé změně a případně změnu odmítly, když testy odhalí chybu.

## Co budeš potřebovat

* Python 3.6
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
jednoduchý program, který nám umožní hrát prosti počítači. Napíšeme ho velmi naivně,
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
že výsledek programu musí bát správný. Tou se ale dnes zabývat nebudeme.*

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

```
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
Při importování `rps` se kód provede. Aby se to nestalo, vyhadíme si na program
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

XXX

