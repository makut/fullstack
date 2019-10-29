drop table if exists testtbl;

create table testtbl (
    id INT PRIMARY KEY,
    name VARCHAR(250)
);

insert into testtbl (id, name) values
    (1, 'Maxim'),
    (2, 'John');