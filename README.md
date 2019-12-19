Web Simple Storage
====

Web Simple Storage (WSS) is a library that make access to web-based storage to be more unified, secure, and efficient.

Introduction
----

WSS composes from two block: **coding** and **backend**.

- **Coding** describes how storage keys/values are transformed before being put into **backend**. Currently following coding is implemented:
  - **Raw** best suited for development environment, when all the keys and values are stored as-is.
  - **AES** keys/values are encrypted with user-provided string key before being stored.
  - **lz** (TODO) compression only.
- **Backend** is where keys/values stored after data are transformed. Currently following backend are supported:
  - **Local** use browser local storage.
  - **Session** use brower session storage.

Features
----

The library was designed with following feature:

- **Isolation** Access to your storage is exclusive. You will never worried if your storage key could conflict with some other app which run on same origin. This situtation could be a problem if your app is not only web app on a domain.    
  Also every storage is name-spaced so even when two app using this library the chance of confliction happened is relatively small.
- **Secure** With the support of secure coding algorithm like AES, user storaged data is still safe even when attacker have user raw storage data, like localStorage. This is a real thread when recently there were more and more accident about poisoned package published on NPM.
- **Tiny** Data is compressed before being put into backend so it could save you some bytes.
