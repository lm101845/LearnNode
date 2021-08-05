# 通过*把users【表】里面所有的列全部查出来
SELECT * FROM users;

SELECT username FROM users;

SELECT username,password FROM users;

insert into users(username,password) values('tony',"098123");

-- 将id为4的用户密码更新为88888888 
update users set password = '8888' where id = 4;

-- 更新id为2的用户，把用户密码更新为admin123,同时把用户状态更新为1
update users set password  = 'admin123',status = 1 where id = 2;
  
# 删除uses表中id为4的用户alter
delete from users where id = 4;

-- 演示where字句的使用
select * from users where status = 1;

select * from users where id >= 2;

select * from users where username <> 'ls';
-- 不等号也可以写成!=

-- 使用AND来显示所有状态为0且id小于3的用户
select * from users where status = 0 and id < 3;

-- 使用or来显示所有状态为1或usename为zs的用户
select * from users where status = 1 or username = 'zs';

-- 对users表中的数据，按照status字段进行升序排序

-- 按照id对结果进行降序的排序(desc表示降序，asc表示升序——默认是是升序)
select * from users order by id desc;

-- 对users表中的数据先按照status进行降序排序，再按照username字母的顺序进行升序排序
select * from users order by status desc,username asc;

-- 使用count(*)来统计users表中状态为0用户的总数量
select count(*) from users where status = 0;

-- 使用as关键字给列起别名
select count(*) as total  from users where status = 0;

select username as uname,password as upwd from users;
