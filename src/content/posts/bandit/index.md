---
title: Bandit 풀이
published: 2024-07-06
description: 'Bandit의 풀이가 담겨있습니다.'
image: ''
tags: []
category: 'Hacking'
draft: false 
---

## Level 0
`ssh bandit1@bandit.labs.overthewire.org -p 2220`

## Level 0 -> 1

```bash
bandit0@bandit:~$ cat readme
Congratulations on your first steps into the bandit game!!
Please make sure you have read the rules at https://overthewire.org/rules/
If you are following a course, workshop, walthrough or other educational activity,
please inform the instructor about the rules as well and encourage them to
contribute to the OverTheWire community so we can keep these games free!

The password you are looking for is: [passwd]

```

## Level 1 -> 2

`ssh bandit1@bandit.labs.overthewire.org -p 2220`
```bash
bandit1@bandit:~$ cat ./-
[passwd]
```

## Level 2 -> 3
`ssh bandit2@bandit.labs.overthewire.org -p 2220`

```bash
bandit2@bandit:~$ cat spaces\ in\ this\ filename
[passwd]
```

## Level 3 -> 4
`ssh bandit3@bandit.labs.overthewire.org -p 2220`

```bash
bandit3@bandit:~$ cd inhere/
bandit3@bandit:~/inhere$ ls
bandit3@bandit:~/inhere$ ls -al
total 12
drwxr-xr-x 2 root    root    4096 Jun 20 04:07 .
drwxr-xr-x 3 root    root    4096 Jun 20 04:07 ..
-rw-r----- 1 bandit4 bandit3   33 Jun 20 04:07 ...Hiding-From-You
bandit3@bandit:~/inhere$ cat ...Hiding-From-You
[passwd]
```

## Level 4 -> 5
`ssh bandit4@bandit.labs.overthewire.org -p 2220`

```bash
bandit4@bandit:~$ cd inhere/
bandit4@bandit:~/inhere$ ls -al
total 48
drwxr-xr-x 2 root    root    4096 Jun 20 04:07 .
drwxr-xr-x 3 root    root    4096 Jun 20 04:07 ..
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file00
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file01
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file02
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file03
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file04
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file05
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file06
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file07
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file08
-rw-r----- 1 bandit5 bandit4   33 Jun 20 04:07 -file09

bandit4@bandit:~/inhere$ find ./ -type f | xargs tail -n +1

==> ./-file00 <==
�Z0�y�B�i���A��n���O6K�5

==> ./-file01 <==
��B!:�Å(�kkq��I zt���*�ɔ�tPc�9

==> ./-file02 <==
ުk|)둖��?G  ��3p�

==> ./-file03 <==
,�W�1��_2LC[�F�N��6Є�v��

==> ./-file04 <==
%(ڪY,��\3

==> ./-
file05 <==
A:���Ei�EO콯,�Ƚ�Js��

==> ./-file06 <==
�����;vB���(O�Z��?�!CaE6�^_�R
�

==> ./-file07 <==
[passwd]

==> ./-file08 <==
5�DN���'��ڒonY�
S��`�!��

==> ./-file09 <==
�tz�w�P�
$S��tc�puņm\�4tX�
```

이 값으로 대조했을때 ./-file07이 맞는 답으로 추정된다

## Level 5 -> 6
`ssh bandit5@bandit.labs.overthewire.org -p 2220`

```bash
bandit5@bandit:~$ cd inhere/
bandit5@bandit:~/inhere$ ls
maybehere00  maybehere03  maybehere06  maybehere09  maybehere12  maybehere15  maybehere18
maybehere01  maybehere04  maybehere07  maybehere10  maybehere13  maybehere16  maybehere19
maybehere02  maybehere05  maybehere08  maybehere11  maybehere14  maybehere17
bandit5@bandit:~/inhere$ find . -type f -size 1033c ! -executable -exec head -c 1033 {} \;
[passwd]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                        bandit5@bandit:~/inhere$
```

이 레벨에서 제공한 조건은 이렇다
- 사람이 읽을 수 있으면서
- 크기는 1033 바이트여야만 하고
- 실행할 수 없어야 즉 +x가 없어야한다

라는 조건인데

`-size 1033c`로 크기가 1033 바이트인 것만 가져오며

`! -executable`로 실행 할 수 없는 파일인지 확인하고

`-exec head -c 1033 {} \;`
이 명령으로 처음 1033 바이트만 출력하게 함

## Level 6 -> 7
`ssh bandit6@bandit.labs.overthewire.org -p 2220`

```bash
bandit6@bandit:~$ find / -type f -user bandit7 -group bandit6 -size 33c 2>/dev/null
/var/lib/dpkg/info/bandit7.password
bandit6@bandit:~$ cat /var/lib/dpkg/info/bandit7.password
[passwd]
```
이 레벨에서 제공한 조건은 이렇다
- 사용자 bandit7이 소유함
- bandit6 그룹 소유
- 크기는 33바이트

라는 조건인데

## Level 7 -> 8
`ssh bandit7@bandit.labs.overthewire.org -p 2220`

```bash
bandit7@bandit:~$ cat data.txt | grep millionth
millionth       dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc
```

## Level 8 -> 9
`ssh bandit8@bandit.labs.overthewire.org -p 2220`

```bash
bandit8@bandit:~$ cat data.txt | sort | uniq -c
     10 data0
     10 data1
     10 data2
     10 data3
     10 data4
     10 data5
      1 [passwd]
...
```

## Level 9 -> 10
`ssh bandit9@bandit.labs.overthewire.org -p 2220`

```bash
bandit9@bandit:~$ strings data.txt | grep "^=*[[:print:]]"
...
========== FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey
...
```

`grep "^=*[[:print:]]"` : 찾아보니 =으로 시작하고 사람이 읽을 수 있는 것으로 grep을 하고 싶으면 이렇게 쓰면 된다고 한다.

## Last Update
2024.07.06에 마지막으로 업데이트 되었으며 bandit9까지 풀이되었습니다.