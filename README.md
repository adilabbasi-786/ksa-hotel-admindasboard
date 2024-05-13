# ksa-hotel-admindasboard

date api http://localhost:1337/api/salaries?filters[date][$between]=2024-05-01&filters[date][$between]=2024-06-01
type enum http://localhost:1337/api/salaries?filters[salary_type]=ADVANCE
working api is http://localhost:1337/api/salaries?filters[date][$between]=2024-05-01&filters[date][$between]=2024-05-31&filters[salary_type]=ADVANCE&&filters[salary_type]=MONTHLY&filters[employees_datum][hotel_name][id][$eq]=2
