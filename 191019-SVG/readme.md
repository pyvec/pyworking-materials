# SVG

Poznámky k PyWorkingu

## Inkscape

Editor vektorové grafiky.
Vektorová vs. bitmapová grafika 

### Základní tvary

Teď budeme jenom kreslit

* Obdélníky/čtverce + zaoblené rohy
    * nastavení (toolbar)
    * "Odoblit" rohy
* Kolečka/elipsy + výseče a úseče
    * nastavení
* Hvězdičky/mnohoúhelníky + "kaňky"
    * nastavení
* Spirály
* Tužka – Čáry rukou
* "Pentelka" – Rovné čáry (zatím)
    * Enter ukončí

* Vsuvka: Změny barvy (z palety)
    * Výplň vs. obrys (pravý klik na paletě)
    * Šířka z obrysu (pravý klik na číslo vlevo dole)

* Kaligrafické pero (dělá výplň!)
* Text
    * Jednořádkový
    * Víceřádkový

### Modifikace celých objektů

Nakreslete překrývající se objekty

* Navigace
    * Scroll
    * Tažení prostředním tlačítkem
    * Zoom
        * Ctrl + Scroll
        * `%` vpravo dole; 
            * pravý klik vpravo dole

* Vybírání
    * Klikání
    * Přidání do výběru – Shift
    * Výběr oblasti – potažení
    * Výběr "vespodu" – Alt

* Vybírací a transformovací "šipečka"
    * Mezerník
    * Přesouvání
        * Ctrl: jen horizontálně/vertikálně
    * Základ – zoom
        * Ctrl: poměr
        * Shift: Dle středu
        * Alt: Skoky
    * Rotační mód
        * Rotace
        * Zkosení
        * Shift: Podle opačného rohu
        * Ctrl: Skokově
        * Změna středu potažením

* Pořadí objektů
    * PgUp/PgDown
    * Home/End

(Jak se mění *tvar* objektu – křivky, zjistíme pak)

### Barvy, výplň a obrysy

* Object – Fill & Stroke (Ctrl+Shift+F)
    * Dialogová okna – přesouvání, F12
* Fill – barva výplně
    * Barvy - RGB/HSL parametry; trojúhelník(!)
    * Průhlednost (A)
    * Zrušení výplně
        * Na další módy koukneme pak
* Stroke – barva obrysu (to samé co výplň...)
* Stroke style
    * Šířka
    * Čerchování
    * Šipky (nepoužívat...)
    * Styl rohů
        * Miter limit
    * Pořadí vykreslení
* Rozostření
* Průhlednost (celého objektu)

### Barevné přechody

* Nástroj na přechody
* Kontrolní body (jen na čáře)
    * Dvojklik – přidání
    * Výběr & Delete - odebrání
* Přebarvení
* Výběr gradientu ze seznamu

### Editace čar

* "Pentelka" – křivky
    * Enter ukončí
* Editace bodů: "úzká šipečka"
    * Kontrolní body/čáry
    * Špičaté/hladké/symetrické body
    * Tažení křivky
    * "Zatažení/Vytažení" kontrolního bodu
        * Ctrl – zatažení
        * Shift – vytažení
    * Nové body – poklepání, Delete
    * Ruku na Ctrl+Z ☺

### Duplikace

* Ctrl+C, Ctrl+V
* Ctrl+D
* Klonování
    * "Hodiny"
    * "Vlny"

### Objekty a křivky

* Převod na křivky
* Booleovské operace
* Linked Offset

### Seskupování

* Ctrl+G / Ctrl+Shift+G
* Typ objektu – spodní pruh
* Vrstvy - Layer/Layers... (Shift+Ctrl+L)
* vsuvka: Import obrázku
* Pořadí
* Zamknutí vrstvy
* Průhlednost

### Stránka a pomůcky

* Uložení; ukázání v prohlížeči
* File/Document Properties (Shift+Ctrl+D)
* Změna velikosti stránky
    * Přizpůsobit výběru
* Barva pozadí
    * Průhlednost pozadí – viz prohlížeč
* Mřížky
    * Může jich být víc
    * Zoomování
    * <kbd>#</kbd>
* Přichytávání
    * Co k čemu jde přichytit a jak to nastavit
    * Shift – nepřichytávat
* Vodící čáry
    * Vytažení
    * Přetažení
    * Shift – rotace
    * Ctrl – hýbání bodem
    * Editace poklikáním
* Měření
    * Shift – reset úhlu
    * Ctrl – skokově
    * "Foťák"
        * zmizí
    * Převod na objekt
    * Převod na vodící čáry
* Paleta / Swatch
    * Přepnutí na Auto

### Nástroje

* Align & Distribute
* Transform
* Export PNG
* Object Properties

### Had

Praktický příklad – https://github.com/encukou/had/blob/master/sprites.svg

* Nový dokument
    * Ctrl+A; Del

* Nastavení jednotek
* Nastavení velikosti
* Nastavení mřížky
    * Ikonky
    * Pixely
* Swatches
    * 3 zelené (černá – tmavá – světlá/žlutější)
    * 3 červené (černá – tmavá/hnědá – světlá)
* Had
    * Převést na křivky!
    * Editovat křivky
    * Jazyk + oči
    * Linked Offset
    * Copy+Paste; druhý Linked Offset
    * Jazyk + oči
    * Deformace

## Export PNG

* Inkscape z přík. řádky
    * `--help`
    * Windows:
        * `C:/Program Files/Inkscape/inkscape`
        * `C:/Program Files (x86)/Inkscape/inkscape`
* Export do PNG
* Export jednoho objektu
* Object Properties

## Formát SVG

* Jednoduchý dokument:
    * Obdélník
    * Křivka (víc typů bodů)
    * Text
* Otevření v SVG editoru
* SVG vs. Inkscape SVG
    * Tvary kontrolních bodů
    * Střed otáčení
    * Pohled
* XML editor
* Hvězdička/kaňka

## Python

```console
$ pip install lxml cssselect cssutils
```

```python
from lxml import etree  # element tree
from copy import copy
import cssutils
import logging

document = etree.parse('demo.svg')
print(document)

root = document.getroot()
print(root)

# - "in root:"  (iterchildren)
# - iter()
# - find()

for child in root.iter('{*}rect'):
    print('-', child)

(rect,) = root.iter('{*}rect')

print(rect)

print(rect.attrib)

rect.attrib['x'] = '30'

def to_hex_color(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)


cssutils.log.setLevel(logging.ERROR)
css = cssutils.parseStyle(rect.attrib['style'])
print(css)
print(css['fill'])
css['fill'] = to_hex_color(255, 150, 5)
print(css.cssText)
rect.attrib['style'] = css.cssText

for x in range(11):
    for y in range(11):
        new_rect = copy(rect)
        new_rect.attrib['x'] = str(10 + x * 8)
        new_rect.attrib['y'] = str(200 + y * 8)
        new_rect.attrib['width'] = '6'
        new_rect.attrib['height'] = '6'
        css['fill'] = to_hex_color(x*25, y*25, 0)
        new_rect.attrib['style'] = css.cssText
        rect.getparent().append(new_rect)

print(rect.attrib['style'])

document.write('vystup.svg')
```

```python
import math

sablona = """<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 640 640"
    height="640"
    width="640">
    <g
        id="layer1">
        <path
        d="{}"
        style="fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:1"
            />
    </g>
    </svg>
    """

class Zelva:
    def __init__(self):
        self.x = 320
        self.y = 320
        self.rot = 0
        self.instrukce = ['M 320,320']

    def left(self, uhel):
        self.rot += uhel

    def right(self, uhel):
        self.rot -= uhel

    def forward(self, delka):
        uhel_v_rad = math.radians(self.rot)
        self.x += math.cos(uhel_v_rad) * delka
        self.y -= math.sin(uhel_v_rad) * delka
        self.instrukce.append(f'L {self.x},{self.y}')

    def export_svg(self):
        return sablona.format(' '.join(self.instrukce))

michelangelo = Zelva()

michelangelo.forward(50)
michelangelo.left(60)
michelangelo.forward(50)


with open('kresba.svg', 'w') as file:
    file.write(michelangelo.export_svg())
```
