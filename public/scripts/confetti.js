// for starting the confetti

const start = () =>
{
  setTimeout(function ()
  {
    confetti.start()
  }, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti

const stop = () =>
{
  setTimeout(function ()
  {
    confetti.stop()
  }, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};
// after this here we are calling both the function so it works
start();
stop();
