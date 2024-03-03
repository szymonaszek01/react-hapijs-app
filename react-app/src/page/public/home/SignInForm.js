const SignInForm = () => {
  const action = () => {
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

  const actionException = () => {

  };

  return (
    <div className={`w-100 flex-container text-primary gap-normal`}>
      <div className={`w-100 flex-container gap-small`}>
        <p className={`text-small ml-small`}>Email</p>
        <input className={`w-100`} />
      </div>
      <div className={`w-100 flex-container gap-small`}>
        <p className={`text-small ml-small`}>Password</p>
        <input className={`w-100`} />
      </div>
      <button className={`w-25`} onClick={action}>Sign in</button>
    </div>
  );
};

export default SignInForm;
