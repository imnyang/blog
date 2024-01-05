+++
title = 'simple_sqli - Dreamhack Write Up'
date = 2023-12-16T11:25:02+09:00
draft = false
tags = [
    "Dreamhack",
]
+++

[simple_sqli](https://dreamhack.io/wargame/challenges/24)

`SQL INJECTION 취약점을 통해 플래그를 획득하세요.`라고 설명에 쓰여져 있다.

ID도 SQL INJECTION으로 얻으면 될거 같지만 귀찮으니
SQL DB 소스코드부터 살펴보자
```py
DATABASE = "database.db"
if os.path.exists(DATABASE) == False:
    db = sqlite3.connect(DATABASE)
    db.execute('create table users(userid char(100), userpassword char(100));')
    db.execute(f'insert into users(userid, userpassword) values ("guest", "guest"), ("admin", "{binascii.hexlify(os.urandom(16)).decode("utf8")}");')
    db.commit()
    db.close()
```

ID는 admin이라는 것을 알아내었다 랜덤으로 생성되는 비밀번호지만 우리는 비밀번호 없이 인젝션으로 들어갈거다.

SQL엔 주석 기능이 있다 -- 을 사용하면 주석으로 설정된다 그럼

```sql
admin"--
```
이러면 해결될 간단한 문제 같다.

![dreamhack-24-1](<./img/login.png>)
![dreamhack-24-flag](<./img/flag.png>)