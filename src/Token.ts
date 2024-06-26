import { ERC20, HeirTrustTokenMock__factory, HeirTrustToken__factory  } from '@heirtrust/heirtrust-v2-contracts';
import { BigNumber, ethers } from 'ethers';
import { safeContractCall } from './helpers/safeContractCall';
import { CallOptions } from './types';

export class Token {
  private diamondDeployAddress: string;
  private sarcoToken: ERC20;

  constructor(sarcoTokenAddress: string, diamondDeployAddress: string, signer: ethers.Signer) {
    this.diamondDeployAddress = diamondDeployAddress;
    //@ts-ignore
    this.sarcoToken = new ethers.Contract(sarcoTokenAddress, HeirTrustToken__factory.abi, signer);
  }

  async approve(amount: BigNumber, options: CallOptions = {}) {
    return await safeContractCall(this.sarcoToken, 'approve', [this.diamondDeployAddress, amount], options);
  }

  async allowance(owner: string): Promise<BigNumber> {
    try {
      return await this.sarcoToken.allowance(owner, this.diamondDeployAddress);
    } catch (err) {
      const error = err as Error;
      console.error(`Error while getting allowance: ${error.message}`);
      throw error;
    }
  }
}
