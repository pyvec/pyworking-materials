# Soubory a barvy

Na tomto workshopu si seřadíme fotky podle barev – něco jako když
Google zjišťuje [které obrázky jsou žluté][yellow-pics].

Naučíme se u toho něco o:

* Souborech a adresářích, a jak k nim z Pythonu přistupovat
* Teorii barev
* Práci s poli s pomocí knihovny NumPy

[yellow-pics]: https://www.google.com/search?q=photo&tbs=ic:specific,isc:yellow,isz:l&tbm=isch


## Kdy a kde

17\. 6. v Brně – bude upřesněno


## Příprava

Před workshopem si prosím připrav sadu barevných obrázků – ideálně fotografií, třeba z dovolené.
Mělo by jich stačit 10, ale ideál je 100 nebo i víc.
Není třeba je nějak třídit, klidně můžou být v několika různých adresářích/složkách.
Jen se ujisti že ti nebude vadit, když je někdo cizí na tvém monitoru uvidí.

Z fotek vyber zhruba tři v různých barvách, na kterých budeš program zkoušet
(např. modrá obloha, zelený les, žlutá kytka).

V aktivovaném virtuálním prostředí (s Pythonem 3) si pak nainstaluj
potřebné závislosti:

```console
$ python -m pip install --upgrade pip
$ python -m pip install notebook numpy pillow ipywidgets
```

## Materiály

* [Jupyter Notebook](https://naucse.python.cz/course/mi-pyt/intro/notebook/)
* [Soubory](soubory.md)
* [`pathlib.Path`: práce se soubory a cestami](pathlib.ipynb)
  * [Archiv](archiv.tar.gz)
  * [Tahák na soubory](https://pyvec.github.io/cheatsheets/pathlib/pathlib-cs.pdf)
* [Teorie barev](barvy.ipynb)
  * [pomocný modul `mix_demo`](mix_demo.py)
* [NumPy](https://naucse.python.cz/course/mi-pyt/intro/numpy/)
  * [Tahák na NumPy](https://pyvec.github.io/cheatsheets/numpy/numpy-cs.pdf)
