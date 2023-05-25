import { EmbalmerFacet__factory, ViewStateFacet__factory } from '@sarcophagus-org/sarcophagus-v2-contracts';
import { BigNumber, ethers } from 'ethers';
import { safeContractCall } from './helpers/safeContractCall';
import { CallOptions } from './types';
import {
  SarcophagusSettings,
  sarcophagusSettingsSchema,
  archaeologistSettingsArraySchema,
  ArchaeologistSettings,
} from './helpers/validation';
import { getSubgraphSarcoCounts, getSubgraphSarcophagi, getSubgraphSarcophagusWithRewraps } from './helpers/subgraph';
import {
  SarcoCounts,
  SarcophagusData,
  SarcophagusDetails,
  SarcophagusFilter,
  SarcophagusResponseContract,
} from './types/sarcophagi';
import { getSarcophagusState } from './utils';
import { getCurrentTimeSec } from './helpers/misc';

/**
 * The Sarcophagus API class provides a high-level interface for interacting with
 * sarcophagi on the Sarcophagus V2 protocol.
 */
export class SarcophagusApi {
  private embalmerFacet: ethers.Contract;
  private viewStateFacet: ethers.Contract;
  private subgraphUrl: string;
  private signer: ethers.Signer;

  constructor(diamondDeployAddress: string, signer: ethers.Signer, subgraphUrl: string) {
    this.embalmerFacet = new ethers.Contract(diamondDeployAddress, EmbalmerFacet__factory.abi, signer);
    this.viewStateFacet = new ethers.Contract(diamondDeployAddress, ViewStateFacet__factory.abi, signer);
    this.subgraphUrl = subgraphUrl;
    this.signer = signer;
  }

  /**
   * Creates a new sarcophagus.
   *
   * @param sarcoId - The ID of the sarcophagus to be created
   * @param sarcophagusSettings - The configuration settings for the sarcophagus
   * @param selectedArchaeologists - The archaeologists to be responsible for and cursed on the sarcophagus
   * @param arweaveTxId - The ID of the Arweave transaction containing the encrypted data
   * @param options - Options for the contract method call
   * @returns The transaction response
   * */
  async createSarcophagus(
    sarcoId: string,
    sarcophagusSettings: SarcophagusSettings,
    selectedArchaeologists: ArchaeologistSettings[],
    arweaveTxId: string,
    options: CallOptions = {}
  ): Promise<ethers.providers.TransactionResponse> {
    sarcophagusSettings = await sarcophagusSettingsSchema.validate(sarcophagusSettings);
    selectedArchaeologists = await archaeologistSettingsArraySchema.validate(selectedArchaeologists);

    if (selectedArchaeologists.length < sarcophagusSettings.threshold) {
      throw new Error('Not enough archaeologists selected');
    }

    return safeContractCall(
      this.embalmerFacet,
      'createSarcophagus',
      [sarcoId, sarcophagusSettings, selectedArchaeologists, arweaveTxId],
      options
    );
  }

  /**
   * Resets the resurrection time of a sarcophagus to a further time in the future.
   *
   * @param sarcoId - The ID of the sarcophagus to be rewrapped
   * @param resurrectionTime - The new resurrection time
   * @param options - Options for the contract method call
   * @returns The transaction response
   * */
  async rewrapSarcophagus(
    sarcoId: string,
    resurrectionTime: number,
    options: CallOptions = {}
  ): Promise<ethers.providers.TransactionResponse> {
    return safeContractCall(this.embalmerFacet, 'rewrapSarcophagus', [sarcoId, resurrectionTime], options);
  }

  /**
   * Invalidates the Sarcophagus by setting a MaxUint32 resurrection time. Once this is done,
   * the sarcophagus can never be resurrected. Cursed archaeologists are freed from their curse and
   * their locked bonds are returned to them.
   *
   * This can only be called by the sarcophagus owner.
   *
   * @param sarcoId - The ID of the sarcophagus to be buried
   * @param options - Options for the contract method call
   * @returns The transaction response
   * */
  async burySarcophagus(sarcoId: string, options: CallOptions = {}): Promise<ethers.providers.TransactionResponse> {
    return safeContractCall(this.embalmerFacet, 'burySarcophagus', [sarcoId], options);
  }

  /**
   * Cleans a sarcophagus that failed to be unwrapped. This can only be called by the sarcophagus owner
   * within a certain time period after the resurrection time has passed. Otherwise it can only be called
   * by the Sarcophagus DAO.
   *
   * @param sarcoId - The ID of the sarcophagus to be cleaned
   * @param options - Options for the contract method call
   * @returns The transaction response
   * */
  async cleanSarcophagus(sarcoId: string, options: CallOptions = {}): Promise<ethers.providers.TransactionResponse> {
    return safeContractCall(this.embalmerFacet, 'cleanSarcophagus', [sarcoId], options);
  }

  /**
   * Returns detailed information about a sarcophagus.
   * @param options - Options for the contract method call
   * @returns The number of sarcophagi
   * */
  async getSarcophagusDetails(sarcoId: string, options: CallOptions = {}): Promise<SarcophagusDetails> {
    const sarcosSubgraph = await getSubgraphSarcophagusWithRewraps(this.subgraphUrl, sarcoId);

    const gracePeriod = (await safeContractCall(
      this.viewStateFacet,
      'getGracePeriod',
      [],
      options
    )) as unknown as BigNumber;

    const sarcoContract = (await safeContractCall(
      this.viewStateFacet,
      'getSarcophagus',
      [sarcoId],
      options
    )) as unknown as SarcophagusResponseContract;

    const currentTimeMs = (await getCurrentTimeSec(this.signer.provider!)) * 1000;
    return {
      ...sarcoContract,
      state: getSarcophagusState(sarcoContract, gracePeriod.toNumber(), currentTimeMs),
      id: sarcoId,
      rewraps: sarcosSubgraph.rewraps,
    };
  }

  /**
   * Returns a list of sarcophagi for a given embalmer address.
   * @param address - The address to get sarcophagi for
   * @param options - Options for the contract method call
   * @returns The list of sarcophagi
   * */
  async getEmbalmerSarcophagi(address: string, options: CallOptions = {}): Promise<SarcophagusData[]> {
    return this.getSarcophagi(address, { ...options, filter: SarcophagusFilter.embalmer });
  }

  /**
   * Returns a list of sarcophagi for a given recipient address.
   * @param address - The address to get sarcophagi for
   * @param options - Options for the contract method call
   * @returns The list of sarcophagi
   * */
  async getRecipientSarcophagi(address: string, options: CallOptions = {}): Promise<SarcophagusData[]> {
    return this.getSarcophagi(address, { ...options, filter: SarcophagusFilter.recipient });
  }

  private async getSarcophagi(
    address: string,
    options: CallOptions & { filter: SarcophagusFilter }
  ): Promise<SarcophagusData[]> {
    let sarcoIds: string[] = [];
    let methodName: string;

    switch (options.filter) {
      case SarcophagusFilter.embalmer:
        methodName = 'getEmbalmerSarcophagi';
        break;

      case SarcophagusFilter.recipient:
        methodName = 'getRecipientSarcophagi';
        break;
    }

    sarcoIds = (await safeContractCall(this.viewStateFacet, methodName, [address], options)) as unknown as string[];

    const gracePeriod = (await safeContractCall(
      this.viewStateFacet,
      'getGracePeriod',
      [],
      options
    )) as unknown as BigNumber;

    const sarcophagi: SarcophagusData[] = await Promise.all(
      sarcoIds.map(async sarcoId => {
        const sarcoContract = (await safeContractCall(
          this.viewStateFacet,
          'getSarcophagus',
          [sarcoId],
          options
        )) as unknown as SarcophagusResponseContract;

        const currentTimeMs = (await getCurrentTimeSec(this.signer.provider!)) * 1000;
        return {
          ...sarcoContract,
          state: getSarcophagusState(sarcoContract, gracePeriod.toNumber(), currentTimeMs),
          id: sarcoId,
        } as SarcophagusData;
      })
    );

    return sarcophagi;
  }

  /**
   * Returns the number of sarcophagi in the contract.
   * @param options - Options for the contract method call
   * @returns The number of sarcophagi
   * */
  async getSarcophagiCount(): Promise<SarcoCounts> {
    return getSubgraphSarcoCounts(this.subgraphUrl);
  }
}