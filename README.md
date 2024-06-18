Website Chat Bot dengan Groq AI ( dari api https://console.groq.com/keys ) 
Project ini dibuat dengan menggunakan react vite dan express JS serta mysql sebagai databasenya.
Memiliki fitur Authentication standard yang menyimpan akun user di database.
Ada dua cara login yaitu Login sebagai user dan sebagai admin
Jika login sebagai admin maka dapat menghapus registrasi user yang masuk lewat dashboard admin.
Password user di lakukan hash dengan algortima bcrypt dari library javascript sehingga lebih aman.
Database berisi 2 table yaitu table user dan table message
Table message berelasi dengan table user dengan jenis relasai cascade.
