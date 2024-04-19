import { ethers } from "hardhat";
import hre from "hardhat";
import * as fs from "fs";

async function main() {
  let data = fs.readFileSync("../in.txt", { encoding: "utf8", flag: "r" });
  var args = JSON.parse(data);

  //console.log(args[1]);
  //return;

  const contract = await ethers.deployContract(args[0], [
    args[1],
    args[2],
    args[3],
    args[4],
  ]);

  console.log(contract.target);

  await contract.waitForDeployment();

  if (args[0] == "Morph404") {
    const tx = await contract.setWhitelist(args[1], true);
    await tx.wait();
  }

  await hre.run("verify:verify", {
    address: contract.target,
    constructorArguments: [args[1], args[2], args[3], args[4]],
  });
}

main().catch((error) => {
  console.error(error);
  //process.exitCode = 1;
});
