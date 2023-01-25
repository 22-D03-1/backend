# Security

## Triangle

![image](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/what-is-cybersecurity-and-why/Cybersecurity_CIA_Diagram_1-06.svg)

* **Confidentiality** - Nur die, die Zugriff haben sollen, haben Zugriff
* **Integrity** - Daten sollten nur verändert werden können, von denen die es dürfen
* **Availability** - Daten sollten verlässlich zugänglich sein

## Authentication
Wer bist du?
Beispiel: Am Flughafen wird, bevor man ins Flugzeug einsteigt, mit deinem Ausweis geklärt, dass du die Person bist, die wirklich auf dem Ticket steht

### Single Factor Authentication
Klassischste Form der Authentifizierung, Nutzername und Passwort. ABER wird immer unsicherer

![image](https://static-assets.codecademy.com/content/paths/web-security/authentication-authorization-encryption/single-factor-auth.png)

### Multi Factor Authentication
zwei oder mehr Faktoren werden genutzt um sich zu authentifizieren. Bspw Man gibt sein Passwort ein und bekommt eine Benachrichtigung an das Smartphone geschickt.

![image](https://static-assets.codecademy.com/content/paths/web-security/authentication-authorization-encryption/Cybersecurity_MultiFactorAuth_v2-07.svg)

#### Faktoren

* **Wissen** - Passwort
* **Eigentum** - Smartphone
* **Inhärenz** - Fingerabdruck

![image](https://static-assets.codecademy.com/content/paths/web-security/evolution-of-authentication/ThreeFactorsofAuthenticationDiagram-v2.svg)

### Single Sign On
Anmelden mit Foogle, Facebook, Github etc. Als Standard nutzen wir **OAuth 2.0**. Evtl lernen wir noch wie wir das einbinden.

### How secure is my Password
https://www.security.org/how-secure-is-my-password/

* Passwort - Instantly
* 05071991 - 2 Millisekunden
* DonaldDuck - 1 Monat
* D0na!dDuck1991 - 200.000.000 Jahre

## Authorization
Was darfst du?
Beispiel: Am Flughafen sind wir ins Flugzeug eingesiegen und unser Ticket erlaub mir nur in der Economy Class zu sitzen und nicht in der First Class. Der Pilotenausweis ermöglicht es dir sogar ins Cockpit zu gehen. Dadurch haben wir verschiedene Level der Authorisierung.

## Encryption
Daten werden mithilfe eines Schlüssels nicht mht lesbar gemacht und man benötigt einen weiteren Schlüssel um auf die Daten wieder zuzugreifen

## Hashing
Wenn sich ein Nutzer bei uns registriert, gibt er das Passwort in Plaintext ein. SO wollenw ir das Passwort aber nicht speichern. Ansonsten könntze jemand mit Zugriff auf die Datenbank sich einfach anmelden oder schlimmer noch mithilfer der Daten sich wo andersd anmelden kann. Daher nutzen wir Algorithmen wie bspw. MD4 oder SHA256 um aus einem Text mit beliebiger Länge einen so genannten Hash Value von fester Länge zu erzeugen.

Beispiel Hashes: https://www.browserling.com/tools/all-hashes

![image](https://cwatch.comodo.com/blog/wp-content/uploads/2020/05/Hashing-definition.jpg)

### Salting
Wir fügen ein weiteren Wert an das zu hashenede Passwort ran, um nicht zu ermöglichen mithilfe von Rainbow Tabellen, Tabellen in denen Passwörter mit dem dazugehörigen Hash gespeichert werden, Rückschlüsse auf unser Passwort zu bekommen.

Bspw:

**Password**: JamesDean

**Hashed Password**: 4a6fc7c76f9a9ca5ba7c39b59e113865

**Salt**: SalDeMar

**Passwort to be hashed**: JamesDeanSalDeMar

**Hashed Salted Password**: e6babac237d7260afa0a24f1ae3f0de1

![image](https://static-assets.codecademy.com/Courses/introduction-to-cybersecurity/practical-cryptography/Cybersecurity_HashingvsEncryption_v2_padding-01.svg)