drop table if exists User;
drop table if exists Code;

create table User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250)
);

create table Code (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    code CLOB(10K),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

insert into User (username, password) values
    ('makut', '123'),
    ('kulpet345', 'meow-meow');

insert into Code (user_id, code) values
    (1,
'import math
print(math.ceil(2.5))'),
    (2, 'print("Petyan")');