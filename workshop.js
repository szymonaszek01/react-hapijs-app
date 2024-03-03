const example = () => {
  const user = {
    firstname: 'Szymon',
    age: '99',
    email: 'js@gmail.com',
  };
  const users = [
    {
      firstname: 'Szymon',
      age: '99',
      email: 'js@gmail.com',
    }, {
      firstname: 'Tomek',
      age: '89',
      email: 'tj@gmail.com',
    }, {
      firstname: 'Ania',
      age: '79',
      email: 'aj@gmail.com',
    },
  ];
  console.log(`Value: ${Object.values(user)}`);
  console.log(`Key: ${Object.keys(user)}`);
  console.log(`Entry: ${Object.entries(user)}`);
  console.log(`---------------`);
  // for (const u of users) {
  //   if (u.email === "aj@gmail.com") {
  //     console.log("Ania here");
  //   }
  // }
  const newUsers = users.map(u => {
    return { email: u.email, age: u.age * 2 };
  });
  newUsers.forEach(u => console.log(`Age: ${u.age}`));
  const newUsers2 = newUsers.filter(u => u.age > 80).map(u => {
    return { email: u.email, isOld: true };
  });
  newUsers.forEach(u => console.log(`Email: ${u.email}`));
};