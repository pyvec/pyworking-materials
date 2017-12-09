
## Distribuce Pythonních programů

Má napsaný program, teď ho stačí jen dostat k uživatelům. Ale jak? Webovou aplikaci nasadíš na server, ale program, který má běžet na počítači uživatele, je potřeba připravit jinak.

Ukážeme si jak napsat jednoduchý [*GUI*](https://cs.wikipedia.org/wiki/Grafick%C3%A9_u%C5%BEivatelsk%C3%A9_rozhran%C3%AD) program (s okýnkem a tlačítkem), a ukážeme si, jak ho „zabalit“:

* na *[PyPI](http://naucse.python.cz/2017/mipyt-zima/intro/distribution/)*, aby si ho mohl vyzkoušet kdokoli, kdo už má nainstalovaný Python,
* pro *Windows* jako `.exe`,
* pro Linux (*Fedoru*) jako `.rpm`,

a možná další...


## Co budeš potřebovat

* Python 3.6
* Git
* Programátorský editor

Instalace & nastavení – viz [začátečnický kurz](http://naucse.python.cz/course/pyladies/sessions/install/).

### Účty na webových službách

Budeš-li mít před workshopem trochu času, založ si předem účty u těchto služeb (pokud je ještě nemáš):

* https://github.com
* https://travis-ci.org/ (pihlášení přes GitHub)
* https://www.appveyor.com/ (pihlášení přes GitHub)
* https://admin.fedoraproject.org/accounts/user/new

### Knihovny z PyPI

Pro urychlení instalace si ve virtuálním prostředí nainstaluj následující:

```console
$ python -m pip install pyinstaller pyglet PyQt5 importlib-resources travis-encrypt
```

### Program k zabalení

* Máš-li Asteroidy ze začátenického kurzu, dej je do Gitu; můžeš pracovat s nimi!

* Pro tvorbu "okýnkové" aplikace si nainstaluj Qt Designer:
  * Fedora: `sudo dnf install qt5-designer`
  * Debian: `sudo apt-get install qttools5-dev-tools`
  * Mac: `brew install qt5; brew linkapps qt5`
  * Windows: [z instalátoru](https://www.qt.io/download-open-source/#section-2)
