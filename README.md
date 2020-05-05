# vertical_sql_to_tsv

very simple nodejs script that conver sql \G result in cli to tsv format:

run `node convert_vertical_sql_to_tsv.js sql_result.txt sql_result.tsv` 

```
mysql> select * from sbtest1 limit 1\G;
*************************** 1. row ***************************
 id: 1
  k: 4
  c: 8
pad: 6
1 row in set (0.00 sec)
```

to

```
"id" "k" "c" "pad"
"1" "4" "8" "6"
```
