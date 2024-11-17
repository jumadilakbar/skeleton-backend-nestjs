# Skeleton NEST JS
Struktur dasar project REST API service menggunakan NestJS.

# Daftar Isi
* [Prakata](#prakata)
* [Fitur](#fitur)
    * [Configuration](#configuration)
    * [Authentication](#authentication)
    * [Database](#database)
* [Cara Menjalankan](#cara-menjalankan)
    * [Prerequisites](#prerequisites)
    * [Persiapan](#persiapan)
    * [Menjalankan Project](#menjalankan-project)
* [API](#api)

# Prakata
Dalam pengembangan aplikasi, diperlukan struktur dasar yang dapat disepakati dan dipelajari
oleh seluruh anggota tim development. Sehingga dibuatlah skeleton [NestJS](https://docs.nestjs.com) ini untuk memenuhi
kebutuhan tersebut.

# Fitur
Berikut ini adalah fitur-fitur yang terdapat dalam skeleton ini.

### Configuration
Agar aplikasi dapat berjalan dengan parameter-parameter tertentu, sebaiknya dapat memanfaatkan
konfigurasi manajemen. Berikut ini modul yang digunakan terkait konfigurasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Config](https://npmjs.com/package/@nestjs/config) | memanajemen konfigurasi |

### Authentication
Metode otentikasi yang digunakan adalah Bearer dengan JWT sebagai tokennya.
Berikut ini modul terkait kebutuhan otentikasi.
| Modul | Kegunaan |
|-|-|
| [NestJS Passport](https://www.npmjs.com/package/@nestjs/passport) | melakukan otentikasi sesuai strategi yang digunakan |
| [NestJS JWT](https://www.npmjs.com/package/@nestjs/jwt) | membuat dan memvalidasi token | 

### Database
Skeleton ini dapat memanajemen data dengan memanfaatkan database management system (DBMS).
Pemanfaatan database ini dibantu ORM (Object-Relational Mapping) dengan rangkaian modul
berikut ini.
| Modul | Kegunaan |
|-|-|
| [NestJS TypeORM](https://www.npmjs.com/package/@nestjs/typeorm) | sebagai ORM |
| [PG](https://www.npmjs.com/package/pg) | menyambungkan ke DBMS PostgreSQL |

# Cara Menjalankan
Berikut ini hal-hal yang perlu dilakukan agar project ini dapat dijalankan.

## Prerequisites
Skeleton ini membutuhkan sistem lain seperti DBMS, cache database, dll. Agar proses
persiapan sampai menjalankan project dapat berjalan lancar, berikut ini yang harus
diinstall lebih dahulu.
| Sistem Lain | Kegunaan |
|-|-|
| [Git](http://git-scm.com) | manajemen versi |
| [NodeJS](https://nodejs.org/en) | sebagai mesin yang menjalankan project |
| [NPM](https://www.npmjs.com) atau [Yarn](https://yarnpkg.com) | memanajemen modul dalam project |
| [PostgreSQL](https://www.postgresql.org) | memanajemen data secara permanen |
| [Redis](https://redis.io) | memanajemen data secara sementara |

## Persiapan
Sebelum project dapat dijalankan, ada beberapa hal yang perlu dipersiapkan.
Berikut ini langkah-langkah untuk mempersiapkan project.

1. Clone repository ini dengan menjalankan perintah berikut di terminal emulator.
```sh
git clone https://github.com/jumadilakbar/skeleton-backend-nestjs.git
```
2. Masuk ke direktory project dengan menjalankan perintah berikut ini.
```sh
cd ./skeleton-backend-nestjs
```
3. Install modul-modul yang dibutuhkan project dengan menjalankan perintah berikut ini.
```sh
# dengan npm
npm install
```

> Apabila menggunakan yarn, maka perintah yang digunakan adalah berikut ini.
> ```sh
> yarn
> ```

4. Buat file bernama `.env` dan isi dengan konfigurasi yang diinginkan.
> Contoh isi file `.env` ini dapat di lihat di file [.env.example](./.env.example)

## Menjalankan Project
Setelah project siap, selanjutnya dapat dijalankan dengan menggunakan perintah berikut ini.
```sh
npm run start:dev
```

> Apabila menggunakan yarn, maka perintah yang digunakan adalah berikut ini.
> ```sh
> yarn start:dev
> ```

# API
Dalam skeleton ini, sudah terdapat beberapa API yang dapat digunakan.
Untuk melihat API apa saja yang tersedia, silakan buka file [docs/Skeleton NestJS.postman_collection.json](./docs/Skeleton NestJS.postman_collection.json) menggunakan [Postman](https://www.postman.com).
