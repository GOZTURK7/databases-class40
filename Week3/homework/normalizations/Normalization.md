

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

##1) What Columns violate 1NF

1. Single valued columns (each column should have atomic value, no multiple values)
   ```
   food_code and food_description coulmns violates this rule because they have multiple values. like C1, C2 or Cury, Cake
2. Column domain (for any column) should not change.
   ```
   dinner_date column violate this beacause because ithas different kind/type of value like '2020-03-15' , '2020/03/15' and 'Mar 25 '20'
   ```
3. No duplicate records (every record has a primary key).
   ```
   member_id 1 and 3 are dublicated in the table so it violates this rule
   ```

##2) What entities do you recognize that could be extracted?
```
Members, Dinners, Venues and Foods tables.
```

##3) Name all the tables and columns that would make a 3NF compliant solution.

```
                MEMBERS                                    DINNERS                          VENUES                           FOODS
+-----------+---------------+----------------+   +-----------+-------------+   +------------+-------------------+   +-----------+------------------+
| member_id | member_name   | member_address |   | dinner_id | dinner_date |   | venue_code | venue_description |   | food_code | food_description |
+-----------+---------------+----------------+   +-----------+-------------+   +------------+-------------------+   +-----------+------------------+
|         1 | Amit          | 325 Max park   |   | D00001001 | 2020-03-15  |   | B01        | Grand Ball Room   |   | C1        | Curry            |
|         2 | Ben           | 24 Hudson lane |   | D00001002 | 2020-03-15  |   | B02        | Zoku Roof Top     |   | C2        | Cake             |
|         3 | Cristina      | 516 6th Ave    |   | D00001003 | 2020-03-20  |   | B03        | Goat Farm         |   | S1        | Soup,            |
|         4 | Dan           | 89 John St     |   | D00001004 | 2020-03-25  |   | B04        | Mama's Kitchen    |   | P1        | Pie              |
|         5 | Gabor         | 54 Vivaldi St  |   | D00001005 | 2020-03-26  |   | B05        | Hungry Hungary    |   | T1        | Tea              |
|         6 | Hema          | 9 Peter St     |   +-----------+-------------+   +------------+-------------------+   | M1        | Mousse           |
+-----------+---------------+----------------+                                                                      | F1        | Falafal          |
                                                                                                                    | G1        | Goulash          |
                                                                                                                    | P2        | Pasca            |
                                                                                                                    +-----------+------------------+

     member_dinner                  member_venue              member_foood
+-----------+-----------+   +-----------+------------+   +-----------+-----------+
| member_id | dinner_id |   | member_id | venue_code |   | member_id | food_code |
+-----------+-----------+   +-----------+------------+   +-----------+-----------+
| 1         | D00001001 |   | 1         | B01        |   | 1         | C1        |
| 1         | D00001003 |   | 1         | B03        |   | 1         | C2        |
| 2         | D00001002 |   | 2         | B02        |   | 1         | P1        |
| 3         | D00001002 |   | 3         | B02        |   | 1         | T1        |
| 3         | D00001004 |   | 3         | B04        |   | 1         | M1        |
| 4         | D00001003 |   | 3         | B03        |   | 2         | S1        |
| 5         | D00001005 |   | 5         | B05        |   | 2         | C2        |
| 6         | D00001003 |   | 6         | B03        |   | 3         | S1        |
+-----------+-----------+   +-----------+------------+   | 3         | C2        |
                                                         | 3         | F1        |
                                                         | 3         | M1        |
                                                         | 4         | P1        |
                                                         | 4         | T1        |
                                                         | 4         | M1        |
                                                         | 5         | G1        |
                                                         | 5         | P2        |
                                                         | 6         | P1        |
                                                         | 6         | T1        |
                                                         | 6         | M1        |
                                                         +-----------+-----------+

```


