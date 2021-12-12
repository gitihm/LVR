import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const {
    receipt: { contractAddress },
  } = await deploy('Compound', {
    from: deployer,
    log: true,
  });

  /* Wait for 30 seconds before Etherscan verification */
  await new Promise((resolve) => setTimeout(resolve, 30000));
  console.log('3');

  await hre.run('verify:verify', {
    address: contractAddress,
  });
  console.log('4');
};

export default func;
func.tags = ['CP'];
