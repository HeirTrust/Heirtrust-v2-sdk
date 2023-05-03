import { ethers, Signer } from 'ethers';
import { getNetwork } from './helpers/getNetwork';
import { getSigner } from './helpers/getSigner';
import { SarcoClientConfig } from './types';
import { Api } from './Api';

/**
 * The SarcoClient class provides a high-level interface for interacting with the Sarcophagus V2 protocol.
 */
export class SarcoClient {
  signer: Signer = {} as Signer;
  network: ethers.providers.Network = {} as ethers.providers.Network;
  api: Api;

  /**
   * Constructs a new SarcoClient instance. The provider defaults to ethers default provider if not
   * provided.
   *
   * @param config - The configuration options for the SarcoClient.
   * @throws Will throw an error if none of the signer, private key, or mnemonic is provided.
   */
  constructor(config?: SarcoClientConfig) {
    this.api = new Api(this);

    this.initialize(config);
  }

  async initialize(config?: SarcoClientConfig): Promise<void> {
    // Get the signer based on the configuration
    this.signer = getSigner(config);

    // Gets the network the signer is connected to
    this.network = await getNetwork(this.signer);
  }

  async setProvider(customProvider: ethers.providers.Provider) {
    const signer = getSigner({ provider: customProvider });
    this.signer = signer;
    this.network = await getNetwork(this.signer);
  }
}
