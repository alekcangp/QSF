import { ethers } from "hardhat";
import hre from "hardhat";
import * as fs from "fs";

async function main() {
  let data = fs.readFileSync("../in.txt", { encoding: "utf8", flag: "r" });
  var args = JSON.parse(data);

  //console.log(args[1]);
  // return;
  const owner = args[0] == "Morph404" ? args[1] : args[2]; //owner: faucet or user address

  const contract = await ethers.deployContract(args[0], [
    owner,
    args[3], //name
    args[4], //symbol
    args[5], // supply
  ]);

  console.log('{"' + args[7] + '":"' + contract.target + '"}');

  await contract.waitForDeployment();

  if (args[0] == "Morph404") {
    const tx = await contract.setWhitelist(args[2], true);
    await tx.wait();
    const tx2 = await contract.setTokenURI(args[6]);
    await tx2.wait();
    const tx3 = await contract.transferOwnership(args[2]);
    await tx3.wait();
  }

  await hre.run("verify:verify", {
    address: contract.target,
    constructorArguments: [owner, args[3], args[4], args[5]],
  });
}

main().catch((error) => {
  console.error(error);
  //process.exitCode = 1;
});
