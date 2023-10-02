import { SarcoNetworkConfig } from '../types';

const arweaveConfig = {
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
};

export const MAINNET_CHAIN_ID = 1;
export const GOERLI_CHAIN_ID = 5;
export const SEPOLIA_CHAIN_ID = 11155111;
export const BASE_GOERLI_CHAIN_ID = 84531;
export const POLYGON_MUMBAI_CHAIN_ID = 80001;
export const HARDHAT_CHAIN_ID = 31337;

export type SarcoSupportedNetwork =
  | 'mainnet'
  | 'goerli'
  | 'sepolia'
  | 'baseGoerli'
  | 'polygonMumbai'
  | typeof MAINNET_CHAIN_ID
  | typeof GOERLI_CHAIN_ID
  | typeof SEPOLIA_CHAIN_ID
  | typeof BASE_GOERLI_CHAIN_ID
  | typeof POLYGON_MUMBAI_CHAIN_ID;

export const hardhatNetworkConfig = (override?: {
  providerUrl?: string;
  sarcoTokenAddress?: string;
  diamondDeployAddress?: string;
}): SarcoNetworkConfig => ({
  chainId: HARDHAT_CHAIN_ID,
  networkName: 'Hardhat Local Network',
  networkShortName: 'HardHat',
  tokenSymbol: 'ETH',
  sarcoTokenAddress: override?.sarcoTokenAddress ?? '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  diamondDeployAddress: override?.diamondDeployAddress ?? '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  etherscanApiUrl: '',
  etherscanApiKey: '',
  explorerUrl: '',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: '',
  },
  arweaveConfig,
  providerUrl: override?.providerUrl ?? '',
  subgraphUrl: '',
  zeroExApiKey: '',
  apiUrlBase: '',
});

export const polygonMumbaiNetworkConfig = (
  providerUrl: string,
  config?: { polygonMumbaiApiKey?: string; zeroExApiKey?: string }
): SarcoNetworkConfig => ({
  chainId: POLYGON_MUMBAI_CHAIN_ID,
  networkName: 'PolygonMumbai Testnet',
  networkShortName: 'PolygonMumbai',
  tokenSymbol: 'MATIC',
  sarcoTokenAddress: '0x2BC9019e6d9e6a26D7D8d8CDDa4e5dE9B787D7bb',
  diamondDeployAddress: '0x42F2C41e0285B3CBED8084b2c7476F11730935Bc',
  etherscanApiUrl: 'https://api-testnet.polygonscan.com/api',
  etherscanApiKey: config?.polygonMumbaiApiKey ?? '',
  explorerUrl: 'https://mumbai.polygonscan.com/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
  },
  arweaveConfig,
  providerUrl,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/polygon-mumbai/v0.0.1',
  zeroExApiKey: config?.zeroExApiKey ?? '',
  apiUrlBase: 'https://api.encryptafile.com',
});

export const baseGoerliNetworkConfig = (
  providerUrl: string,
  config?: { basescanApiKey?: string; zeroExApiKey?: string }
): SarcoNetworkConfig => ({
  chainId: BASE_GOERLI_CHAIN_ID,
  networkName: 'BaseGoerli Testnet',
  networkShortName: 'BaseGoerli',
  tokenSymbol: 'ETH',
  sarcoTokenAddress: '0x2BC9019e6d9e6a26D7D8d8CDDa4e5dE9B787D7bb',
  diamondDeployAddress: '0xB933926f50b33797d0fa1DaEe65D5830224E53E1',
  etherscanApiUrl: 'https://api-goerli.basescan.org/api',
  etherscanApiKey: config?.basescanApiKey ?? '',
  explorerUrl: 'https://goerli.basescan.org',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
  },
  arweaveConfig,
  providerUrl,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/base-goerli/v0.0.1',
  zeroExApiKey: config?.zeroExApiKey ?? '',
  apiUrlBase: 'https://api.encryptafile.com',
});

export const goerliNetworkConfig = (
  providerUrl: string,
  config?: { etherscanApiKey?: string; zeroExApiKey?: string }
): SarcoNetworkConfig => ({
  chainId: GOERLI_CHAIN_ID,
  networkName: 'Goerli Testnet',
  networkShortName: 'Goerli',
  tokenSymbol: 'ETH',
  sarcoTokenAddress: '0x4633b43990b41B57b3678c6F3Ac35bA75C3D8436',
  diamondDeployAddress: '0x23205431DAa31e9b54d0EBF40e45CC03aC759a22',
  etherscanApiUrl: 'https://api-goerli.etherscan.io/api',
  etherscanApiKey: config?.etherscanApiKey ?? '',
  explorerUrl: 'https://goerli.etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
  },
  arweaveConfig,
  providerUrl,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/sarco-goerli-test/two',
  zeroExApiKey: config?.zeroExApiKey ?? '',
  apiUrlBase: 'https://api.encryptafile.com',
});

export const mainnetNetworkConfig = (
  providerUrl: string,
  config?: { etherscanApiKey?: string; zeroExApiKey?: string }
): SarcoNetworkConfig => ({
  chainId: MAINNET_CHAIN_ID,
  networkName: 'Etherum Mainnet',
  networkShortName: 'Mainnet',
  tokenSymbol: 'ETH',
  sarcoTokenAddress: '0x7697b462a7c4ff5f8b55bdbc2f4076c2af9cf51a',
  diamondDeployAddress: '0x0Ec977D1863Eb919a2Ecd65d17Cc3f2CFdaCe3Ab',
  etherscanApiUrl: 'https://api.etherscan.io/api',
  etherscanApiKey: config?.etherscanApiKey ?? '',
  explorerUrl: 'https://etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://node1.bundlr.network',
  },
  providerUrl,
  arweaveConfig,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/sarcophagus-v2/v0.0.1',
  zeroExApiKey: config?.zeroExApiKey ?? '',
  apiUrlBase: 'https://api.encryptafile.com',
});

export const sepoliaNetworkConfig = (
  providerUrl: string,
  config?: { etherscanApiKey?: string; zeroExApiKey?: string }
): SarcoNetworkConfig => ({
  chainId: SEPOLIA_CHAIN_ID,
  networkName: 'Sepolia Testnet',
  networkShortName: 'Sepolia',
  tokenSymbol: 'ETH',
  sarcoTokenAddress: '0x9F8FBFb135bfA9233347FA43516E6Ce233EA7e1D',
  diamondDeployAddress: '0x03333b101F653D5ad13BDd9f524b760e0cCe9f8b',  etherscanApiUrl: 'https://api-sepolia.etherscan.io/api',
  etherscanApiKey: config?.etherscanApiKey ?? '',
  explorerUrl: 'https://sepolia.etherscan.io/',
  bundlr: {
    currencyName: 'ethereum',
    nodeUrl: 'https://devnet.bundlr.network',
  },
  providerUrl,
  arweaveConfig,
  subgraphUrl: 'https://api.studio.thegraph.com/query/49076/sepolia/v0.0.1',
  zeroExApiKey: config?.zeroExApiKey ?? '',
  apiUrlBase: 'https://api.encryptafile.com',
});
