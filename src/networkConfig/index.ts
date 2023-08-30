import { SarcoNetworkConfig } from '../types';

const arweaveConfig = {
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
};

export const goerliNetworkConfig = (providerUrl: string, etherscanApiKey = ''): SarcoNetworkConfig => ({
  chainId: 5,
  networkName: 'Goerli Testnet',
  networkShortName: 'Goerli',
  sarcoTokenAddress: '0x4633b43990b41B57b3678c6F3Ac35bA75C3D8436',
  diamondDeployAddress: '0x23205431DAa31e9b54d0EBF40e45CC03aC759a22',
  etherscanApiUrl: 'https://api-goerli.etherscan.io/api',
  etherscanApiKey,
  explorerUrl: 'https://goerli.etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
    providerUrl,
  },
  arweaveConfig,
  providerUrl,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/sarco-goerli-test/two',
});

export const mainnetNetworkConfig = (providerUrl: string, etherscanApiKey = ''): SarcoNetworkConfig => ({
  chainId: 1,
  networkName: 'Etherum Mainnet',
  networkShortName: 'Mainnet',
  sarcoTokenAddress: '0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a',
  diamondDeployAddress: '0x0Ec977D1863Eb919a2Ecd65d17Cc3f2CFdaCe3Ab',
  etherscanApiUrl: 'https://api.etherscan.io/api',
  etherscanApiKey,
  explorerUrl: 'https://etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://node1.bundlr.network',
    providerUrl,
  },
  providerUrl,
  arweaveConfig,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/sarcophagus-v2/v0.0.1',
});

export const sepoliaNetworkConfig = (providerUrl: string, etherscanApiKey: string = ''): SarcoNetworkConfig => ({
  chainId: 11155111,
  networkName: 'Sepolia Testnet',
  networkShortName: 'Sepolia',
  sarcoTokenAddress: '0x9F8FBFb135bfA9233347FA43516E6Ce233EA7e1D',
  diamondDeployAddress: '0x03333b101F653D5ad13BDd9f524b760e0cCe9f8b',
  etherscanApiUrl: 'https://api-sepolia.etherscan.io/api',
  etherscanApiKey,
  explorerUrl: 'https://sepolia.etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
    providerUrl,
  },
  providerUrl,
  arweaveConfig,
  subgraphUrl: 'https://api.studio.thegraph.com/query/44302/sarcotest2/18',
});
