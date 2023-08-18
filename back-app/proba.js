let i = 1;
async function run() {
  // Simulacija funkcije run
  console.log("i = ", i);
  i++;

  // Simulacija čekanja 2 sekunde
  //   await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function executeSteps(steps) {
  for (const step of steps) {
    const [delay, action] = step.split("-");
    const repetitions = parseInt(delay, 10);

    for (let i = 0; i < repetitions; i++) {
      await run();
      if (i < repetitions - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

const steps = ["2-u", "1-l", "3-r"];

executeSteps(steps)
  .then(() => {
    console.log("All steps completed.");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
