insert into User (username, password) values
    ('makut', '{noop}123'),
    ('kulpet345', '{noop}meow-meow');

insert into Code (user_id, name, added, code) values
    (1, 'first try', to_timestamp('01/01/2020 12:15:20', 'MM/DD/YYYY HH24:MI:SS'),
'import math
print(math.ceil(2.5))'),
    (2, 'hello', to_timestamp('01/01/2020 21:30:15', 'MM/DD/YYYY HH24:MI:SS'), 'print("Petyan")');