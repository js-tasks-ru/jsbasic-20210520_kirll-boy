function showSalary(users, curAge) {
  return users
    .filter((user) => user.age <= curAge)
    .map((user) => user.name + ', ' + user.balance)
    .join('\n');
}